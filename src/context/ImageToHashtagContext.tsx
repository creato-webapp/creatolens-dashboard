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
  details: ImageDetailsType
}

type ImageHashtagContextType = {
  step: number
  updateStep: (arg: number) => void
  goBack: () => void
  goForward: () => void
  image: ImageType // Changed from images array to single image
  addImage: (arg: string, details: ImageDetailsType) => void
  clearImage: () => void
  updateSelectedLabels: (label: string) => void
  selectAllLabels: () => void
  getCurrentImageLabels: () => void
  loadingLabels: boolean
  hashtags: IHashet[]
  updateHashtag: (arg: IHashet[]) => void
  updateLabel: (arg: { image_url: string; existing_labels: string[]; number: number }) => void
  generateImageByHashtag: () => void
  addCustomLabels: (arg: string[]) => void
}

export const ImageHashtagContext = createContext<ImageHashtagContextType | undefined>(undefined)

interface ImageHashtagProviderProps {
  children: ReactNode
}

export const ImageHashtagProvider = ({ children }: ImageHashtagProviderProps) => {
  const [step, setStep] = useState<number>(1)

  // Changed from array to single object
  const [image, setImage] = useState<ImageType>({
    image: null,
    selectedLabels: [],
    uploadStatus: 'pending',
    details: {},
  })

  const [loadingLabels, setloadingLabels] = useState<boolean>(false)
  const [hashtags, setHashtags] = useState<IHashet[]>([])

  const updateStep = useCallback((arg: number) => {
    setStep(arg)
  }, [])

  const goBack = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1))
  }, [])

  const goForward = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

  const addImage = useCallback((imageUrl: string, details: ImageDetailsType) => {
    setImage({
      image: imageUrl,
      selectedLabels: [],
      uploadStatus: 'pending',
      details: details,
    })
  }, [])

  const clearImage = useCallback(() => {
    setImage({
      image: null,
      selectedLabels: [],
      uploadStatus: 'pending',
      details: {},
    })
    setHashtags([])
    setStep(1)
  }, [])

  const getCurrentImageLabels = useCallback(async () => {
    setloadingLabels(true)
    try {
      const labels: string[] = await getImageLabel(image.image as string)
      if (labels && labels.length > 0) {
        setImage((prevImage) => ({
          ...prevImage,
          labels: labels,
          selectedLabels: [],
          uploadStatus: 'completed',
        }))
      } else {
        setImage((prevImage) => ({
          ...prevImage,
          uploadStatus: 'failed',
        }))
      }
      setloadingLabels(false)
    } catch {
      setloadingLabels(false)
    }
  }, [image.image])

  const updateSelectedLabels = useCallback((label: string) => {
    setImage((prevImage) => {
      const selectedLabels = prevImage.selectedLabels.includes(label)
        ? prevImage.selectedLabels.filter((item) => item !== label)
        : [...prevImage.selectedLabels, label]

      return {
        ...prevImage,
        selectedLabels,
      }
    })
  }, [])

  const selectAllLabels = useCallback(() => {
    setImage((prevImage) => ({
      ...prevImage,
      selectedLabels: prevImage.labels || [],
    }))
  }, [])

  const updateHashtag = useCallback((hashtag: IHashet[]) => {
    setHashtags(hashtag)
  }, [])

  const updateLabel = useCallback(async (data: { image_url: string; existing_labels: string[]; number: number }) => {
    setloadingLabels(true)
    const newLabels: string[] = await reAnnotateLabel(data)

    setImage((prevImage) => {
      if (prevImage.labels) {
        const allLabelsSelected = prevImage.labels.length === prevImage.selectedLabels.length
        if (allLabelsSelected) {
          return prevImage
        }

        const usedLabels = new Set<string>()
        const updatedLabels = prevImage.labels.map((label) => {
          if (prevImage.selectedLabels.includes(label)) {
            return label
          }

          let newLabel = null
          for (const labelOption of newLabels) {
            if (!usedLabels.has(labelOption)) {
              newLabel = labelOption
              usedLabels.add(labelOption)
              break
            }
          }
          return newLabel || label
        })

        return {
          ...prevImage,
          labels: updatedLabels,
          selectedLabels: prevImage.selectedLabels,
        }
      }
      return prevImage
    })
    setloadingLabels(false)
  }, [])

  const addCustomLabels = useCallback((labels: string[]) => {
    setImage((prevImage) => {
      const newLabels = labels.filter((label) => !prevImage.selectedLabels.includes(label))
      const currentLabels = prevImage.labels || []
      const currentSelectedLabels = prevImage.selectedLabels || []

      return {
        ...prevImage,
        labels: [...currentLabels, ...newLabels],
        selectedLabels: [...currentSelectedLabels, ...newLabels],
      }
    })
  }, [])

  const generateImageByHashtag = useCallback(() => {
    // Generate image by hashtags
  }, [])

  return (
    <ImageHashtagContext.Provider
      value={{
        image,
        addImage,
        clearImage,
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
        addCustomLabels,
      }}
    >
      {children}
    </ImageHashtagContext.Provider>
  )
}
