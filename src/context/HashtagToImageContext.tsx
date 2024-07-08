import { ReactNode, createContext, useCallback, useContext, useState } from 'react'

import { IMAGE_CATEGORY } from 'src/constants/imageStyle'
import { IHashet } from 'src/pages/recommendation'

export type ImageDetailsType = {
  path?: string
  format?: string
  extension?: string
  size?: number
}

export type ImageConfigType = {
  imageStyle: string
  aspectRatio: string
  usage: {
    name: string
    platform: string
  }
}

export interface StepProps {
  step: number
  setStep: (arg: number) => void
}

type ImageType = {
  image: string | null
}

type HashtagImageContextType = {
  step: number
  updateStep: (arg: number) => void
  goBack: () => void
  goForward: () => void
  images: ImageType[]
  addImage: (arg: string, labels: string[]) => void
  keywords: string
  addKeywords: (arg: string) => void
  currentImageIndex: number
  hashtags: IHashet[]
  updateHashtags: (arg: IHashet[]) => void
  imageConfig: ImageConfigType
  updateImageConfig: (config: Partial<ImageConfigType>) => void
  updateImageCategory: (category: keyof GeneralType, option: string) => void
  generateImage: () => void
}

const HashtagImageContext = createContext<HashtagImageContextType | undefined>(undefined)

interface HashtagImageProviderProps {
  children: ReactNode
}

type GeneralType = {
  [key in keyof typeof IMAGE_CATEGORY]?: string
}

const initialGeneral: GeneralType = {}

export const HashtagImageProvider = ({ children }: HashtagImageProviderProps) => {
  const [step, setStep] = useState<number>(1)
  const [images, setImages] = useState<ImageType[]>([])
  const [keywords, setKeywords] = useState<string>('')
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [hashtags, setHashtags] = useState<IHashet[]>([])
  const [imageCategory, setImageCategory] = useState<GeneralType>(initialGeneral)
  const [imageConfig, setImageConfig] = useState<ImageConfigType>({
    imageStyle: '',
    aspectRatio: '3:4',
    usage: {
      name: '',
      platform: '',
    },
  })

  const updateStep = useCallback((arg: number) => {
    setStep(arg)
  }, [])
  const goBack = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1)) // Ensures step doesn't go below 1
  }, [])

  const goForward = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

  const addImage = useCallback((image: string, labels: string[]) => {
    setImages((prevImages) => [
      ...prevImages,
      {
        image,
        labels,
        selectedLabels: [],
        uploadStatus: 'pending',
      },
    ])
    setCurrentImageIndex(image.length) // Set to the index of the new image
  }, [])

  const addKeywords = useCallback((text: string) => {
    setKeywords(text)
  }, [])

  const updateHashtags = useCallback((newHashtags: IHashet[]) => {
    setHashtags(newHashtags)
  }, [])

  /*  */
  const generateImage = useCallback(() => {
    const data = {
      imageCategory: imageCategory,
      hashtags: hashtags,
      keywords: keywords,
      imageStyle: imageConfig.imageStyle,
      aspectRatio: imageConfig.aspectRatio,
      platform: imageConfig.usage.platform,
      usage: imageConfig.usage.name,
    }
    // const prompt = promptGenerator(data)
  }, [])

  const updateImageConfig = useCallback((config: Partial<ImageConfigType>) => {
    setImageConfig((prev) => ({
      ...prev,
      ...config,
    }))
  }, [])

  const updateImageCategory = (category: keyof GeneralType, option: string) => {
    setImageCategory((prev) => ({
      ...prev,
      [category]: option,
    }))
  }

  return (
    <HashtagImageContext.Provider
      value={{
        images,
        imageConfig,
        updateImageConfig,
        updateImageCategory,
        addImage,
        addKeywords,
        keywords,
        currentImageIndex,
        hashtags,
        updateHashtags,
        step,
        updateStep,
        goBack,
        goForward,
        generateImage,
      }}
    >
      {children}
    </HashtagImageContext.Provider>
  )
}

export const useHashtagImageContext = () => {
  const context = useContext(HashtagImageContext)
  if (!context) {
    throw new Error('useHashtagImageContext must be used within a HashtagImageProvider')
  }
  return context
}
