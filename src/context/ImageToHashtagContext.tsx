import { ReactNode, createContext, useCallback, useContext, useState } from 'react'

import { getImageLabel } from '@services/Image'

type UploadStatus = 'pending' | 'uploading' | 'completed' | 'failed'

export type ImageDetailsType = {
  path?: string
  format?: string
  extension?: string
  size?: number
}

type ImageType = {
  image: string | null
  labels?: string[]
  selectedLabels: string[]
  uploadStatus: UploadStatus
}

type ImageHashtagContextType = {
  images: ImageType[] // Corrected property name from 'dialoguese' to 'dialogues'
  addImage: (arg: string, labels: string[]) => void
  currentImageIndex: number
  updateSelectedLabels: (label: string) => void
  getCurrentImageLabels: () => void
  loadingLabels: boolean
}

const ImageHashtagContext = createContext<ImageHashtagContextType | undefined>(undefined)

interface ImageHashtagProviderProps {
  children: ReactNode
}

export const ImageHashtagProvider = ({ children }: ImageHashtagProviderProps) => {
  const [images, setImages] = useState<ImageType[] | []>([])
  const [loadingLabels, setloadingLabels] = useState<boolean>(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  const addImage = useCallback(
    (image: string) => {
      setImages((prevImages) => [
        ...prevImages,
        {
          image,
          selectedLabels: [],
          uploadStatus: 'pending',
        },
      ])
      setCurrentImageIndex(() => images.length) // Set to the index of the new image
    },
    [images.length]
  )

  const getCurrentImageLabels = async () => {
    setloadingLabels(true)
    try {
      const labels: string[] = await getImageLabel(images[currentImageIndex]?.image as string)
      if (labels && labels.length > 0) {
        setImages((prevImages) => {
          const updatedImages = [...prevImages]
          updatedImages[currentImageIndex] = {
            ...updatedImages[currentImageIndex],
            labels: labels,
            selectedLabels: labels,
            uploadStatus: 'completed',
          }
          return updatedImages
        })
      } else {
        setImages((prevImages) => {
          const updatedImages = [...prevImages]
          updatedImages[currentImageIndex] = {
            ...updatedImages[currentImageIndex],
            uploadStatus: 'failed',
          }
          return updatedImages
        })
      }
      setloadingLabels(false)
    } catch {
      setloadingLabels(false)
    }
  }

  const updateSelectedLabels = useCallback(
    (label: string) => {
      setImages((prevImages) => {
        const updatedImages = prevImages.map((img, idx) => {
          if (idx === currentImageIndex) {
            const selectedLabels = img.selectedLabels.includes(label)
              ? img.selectedLabels.filter((item) => item !== label)
              : [...img.selectedLabels, label]

            return {
              ...img,
              selectedLabels,
            }
          }
          return img
        })
        return updatedImages
      })
    },
    [currentImageIndex]
  )
  return (
    <ImageHashtagContext.Provider value={{ images, addImage, currentImageIndex, updateSelectedLabels, getCurrentImageLabels, loadingLabels }}>
      {children}
    </ImageHashtagContext.Provider>
  )
}

export const useImageHashtagContext = () => {
  // move to useHook folder
  const context = useContext(ImageHashtagContext)
  if (!context) {
    throw new Error('useImageHashtagContext must be used within an ImageHashtagProvider')
  }
  return context
}
