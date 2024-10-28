import { ReactNode, createContext, useCallback, useState } from 'react'

import { getImageLabel } from '@services/Image'
import { IHashet } from 'pages/recommendation'
import { reAnnotateLabel } from '@services/Label'

type UploadStatus = 'pending' | 'uploading' | 'completed' | 'failed'

export type ImageDetailsType = {
  path?: string
  format?: string
  extension?: string
  size?: number
}

export interface StepProps {
  step: number
  setStep: (arg: number) => void
}

type ImageType = {
  image: string | null
  labels?: string[]
  selectedLabels: string[]
  hashtags?: string[]
  uploadStatus: UploadStatus
}

type ImageHashtagContextType = {
  step: number
  updateStep: (arg: number) => void
  goBack: () => void
  goForward: () => void
  images: ImageType[] // Corrected property name from 'dialoguese' to 'dialogues'
  addImage: (arg: string, labels: string[]) => void
  currentImageIndex: number
  updateSelectedLabels: (label: string) => void
  selectAllLabels: () => void
  getCurrentImageLabels: () => void
  loadingLabels: boolean
  //Below is for hashtag
  hashtags: IHashet[]
  updateHashtag: (arg: IHashet[]) => void
  updateLabel: (arg: { image_url: string; existing_labels: string[]; number: number }) => void
  generateImageByHashtag: () => void
}

export const ImageHashtagContext = createContext<ImageHashtagContextType | undefined>(undefined)

interface ImageHashtagProviderProps {
  children: ReactNode
}

export const ImageHashtagProvider = ({ children }: ImageHashtagProviderProps) => {
  const [step, setStep] = useState<number>(1)

  const [images, setImages] = useState<ImageType[] | []>([])
  const [loadingLabels, setloadingLabels] = useState<boolean>(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  const [hashtags, setHashtags] = useState<IHashet[]>([])

  const updateStep = useCallback((arg: number) => {
    setStep(arg)
  }, [])
  const goBack = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1)) // Ensures step doesn't go below 1
  }, [])

  const goForward = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

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
            selectedLabels: [],
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

  const selectAllLabels = useCallback(() => {
    setImages((prevImages) => {
      const updatedImages = prevImages.map((img, idx) => {
        if (idx === currentImageIndex && img.labels) {
          return {
            ...img,
            selectedLabels: img.labels,
          }
        }
        return img
      })
      return updatedImages
    })
  }, [currentImageIndex])

  const updateHashtag = useCallback(
    (hashtag: IHashet[]) => {
      setHashtags(hashtag)
    },
    [setHashtags]
  )

  const updateLabel = useCallback(
    async (data: { image_url: string; existing_labels: string[]; number: number }) => {
      setloadingLabels(true)
      const newLabels: string[] = await reAnnotateLabel(data)

      setImages((prevImages) => {
        const updatedImages = prevImages.map((img, idx) => {
          if (idx === currentImageIndex && img.labels) {
            // Check if all labels are selected
            const allLabelsSelected = img.labels.length === img.selectedLabels.length
            if (allLabelsSelected) {
              return img // No need to replace if all labels are selected
            }

            const usedLabels = new Set<string>() // Set to keep track of used new labels
            const newLabelsIterator = newLabels.values() // Create an iterator for new labels

            const updatedLabels = img.labels.map((label) => {
              if (img.selectedLabels.includes(label)) {
                return label
              } else {
                let newLabel
                do {
                  const result = newLabelsIterator.next()
                  newLabel = result.value
                } while (newLabel && usedLabels.has(newLabel))

                if (newLabel) {
                  usedLabels.add(newLabel)
                  return newLabel
                } else {
                  return label // Use the existing label if no new label is found
                }
              }
            })

            return {
              ...img,
              labels: updatedLabels,
              selectedLabels: updatedLabels,
            }
          }
          return img
        })
        setloadingLabels(false)
        return updatedImages
      })
    },
    [currentImageIndex]
  )

  const generateImageByHashtag = useCallback(() => {
    // Generate image by hashtags
  }, [])

  return (
    <ImageHashtagContext.Provider
      value={{
        images,
        addImage,
        currentImageIndex,
        selectAllLabels,
        updateSelectedLabels,
        getCurrentImageLabels,
        updateLabel,
        loadingLabels,
        hashtags,
        updateHashtag,
        generateImageByHashtag,
        step,
        updateStep,
        goBack,
        goForward,
      }}
    >
      {children}
    </ImageHashtagContext.Provider>
  )
}
