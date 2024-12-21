import { ReactNode, createContext, useCallback, useState } from 'react'

import { IHashet } from 'pages/recommendation'
import { ImageStyleKeys } from '@constants/imageStyle'
import { useGenerateImage } from '@hooks/useGenerateImage'

export type ImageDetailsType = {
  path?: string
  format?: string
  extension?: string
  size?: number
}

export type ImageConfigType = {
  imageStyle: ImageStyleKeys
  aspectRatio: string
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
  negativeKeywords: string[]
  addNegativeKeywords: (arg: string) => void
  removeNegativeKeyword: (arg: string) => void
  hashtags: IHashet[]
  updateHashtags: (arg: IHashet[]) => void
  imageConfig: ImageConfigType
  updateImageConfig: (config: Partial<ImageConfigType>) => void
  updateImageCategory: (category: string, option: string) => void
  generateImageWithKeywords: () => void
  generatedImageUri: string | null
  negativePrompt: string
  setNegativePrompt: (text: string) => void
  isLoading: boolean
  error: string | null
}

export const HashtagImageContext = createContext<HashtagImageContextType | undefined>(undefined)

interface HashtagImageProviderProps {
  children: ReactNode
}

type ImageModifier = {
  [key: string]: string
}

const initialGeneral: ImageModifier = {}

export const HashtagImageProvider = ({ children }: HashtagImageProviderProps) => {
  const [negativeKeywords, setNegativeKeywords] = useState<string[]>([])
  const [hashtags, setHashtags] = useState<IHashet[]>([])
  const [imageCategory, setImageCategory] = useState<ImageModifier>(initialGeneral)
  const [imageConfig, setImageConfig] = useState<ImageConfigType>({
    imageStyle: 'GENERAL',
    aspectRatio: '3:4',
  })
  const { generatedImageUri, isLoading, error, generateImage } = useGenerateImage()

  const updateStep = useCallback((arg: number) => {
    setStep(arg)
  }, [])

  const addNegativeKeywords = useCallback((text: string) => {
    setNegativeKeywords((pre) => [...new Set([...pre, text])])
  }, [])

  const removeNegativeKeyword = useCallback((text: string) => {
    setNegativeKeywords((pre) => pre.filter((keyword) => keyword !== text))
  }, [])

  const addKeywords = useCallback((text: string) => {
    setKeywords(text)
  }, [])

  const updateHashtags = useCallback((newHashtags: IHashet[]) => {
    setHashtags(newHashtags)
  }, [])

  /*  */
  const generateImageWithKeywords = useCallback(async () => {
    const data = {
      aspectRatio: imageConfig.aspectRatio,
      hashtags: hashtags,
      imageCategory: imageCategory,
      imageStyle: imageConfig.imageStyle,
      keywords: keywords,
    }
    await generateImage(data)
  }, [keywords, imageConfig, imageCategory, hashtags, generateImage])

  const updateImageConfig = useCallback((config: Partial<ImageConfigType>) => {
    setImageConfig((prev) => ({
      ...prev,
      ...config,
    }))
  }, [])

  const updateImageCategory = useCallback((category: string, option: string) => {
    setImageCategory((prev) => ({
      ...prev,
      [category]: option,
    }))
  }, [])

  return (
    <HashtagImageContext.Provider
      value={{
        addImage,
        addKeywords,
        currentImageIndex,
        error,
        generateImageWithKeywords,
        generatedImageUri,
        goBack,
        goForward,
        hashtags,
        imageConfig,
        images,
        isLoading,
        keywords,
        negativeKeywords,
        addNegativeKeywords,
        removeNegativeKeyword,
        updateImageCategory,
        updateImageConfig,
        updateHashtags,
        updateStep,
      }}
    >
      {children}
    </HashtagImageContext.Provider>
  )
}
