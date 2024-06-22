import { getImageLabel } from '@services/Image'
import { createContext, ReactNode, useContext, useState } from 'react'

type UploadStatus = 'pending' | 'uploading' | 'completed' | 'failed'

type ImageType = {
  image: string | null
  labels: string[]
  selectedLabels: string[]
  uploadStatus: UploadStatus
}

type ImageHashtagContextType = {
  images: ImageType[] // Corrected property name from 'dialoguese' to 'dialogues'
  addImage: (arg: string, labels: string[]) => void
  currentImage: number
  updateSelectedLabels: (arg: number, label: string) => void
  getCurrentImageLabels: () => void
}

const ImageHashtagContext = createContext<ImageHashtagContextType | undefined>(undefined)

interface ImageHashtagProviderProps {
  children: ReactNode
}

export const ImageHashtagProvider = ({ children }: ImageHashtagProviderProps) => {
  const [images, setImages] = useState<ImageType[] | []>([])
  const [currentImage, setCurrentImage] = useState<number>(0)

  const addImage = (image: string, labels: string[]) => {
    setImages((prevImages) => [
      ...prevImages,
      {
        image,
        labels,
        selectedLabels: [],
        uploadStatus: 'pending',
      },
    ])
    setCurrentImage((pre) => pre! + 1)
  }

  const getCurrentImageLabels = async () => {
    const data = {
      args: {
        file: currentImage,
      },
    }
    const labels = await getImageLabel(data)
    console.log('labels', labels)
  }

  const updateSelectedLabels = (index: number, label: string) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages]
      const selectedLabels = updatedImages[index]?.selectedLabels || []
      if (!selectedLabels.includes(label)) {
        updatedImages[index].selectedLabels = [...selectedLabels, label]
      }
      return updatedImages
    })
  }

  return (
    <ImageHashtagContext.Provider value={{ images, addImage, currentImage, updateSelectedLabels, getCurrentImageLabels }}>
      {children}
    </ImageHashtagContext.Provider>
  )
}

export const useImageHashtagContext = () => {
  const context = useContext(ImageHashtagContext)
  if (!context) {
    throw new Error('useImageHashtagContext must be used within an ImageHashtagProvider')
  }
  return context
}
