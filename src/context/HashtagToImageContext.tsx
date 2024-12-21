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

type HashtagImageContextType = {
  keywords: string[]
  addKeywords: (arg: string) => void
  removeKeywords: (arg: string) => void
  negativeKeywords: string[]
  addNegativeKeywords: (arg: string) => void
  removeNegativeKeyword: (arg: string) => void
  hashtags: IHashet[]
  updateHashtags: (arg: IHashet[]) => void
  imageConfig: ImageConfigType
  updateImageConfig: (config: Partial<ImageConfigType>) => void
  imageCategory: ImageModifier
  updateImageCategory: (category: string, option: string) => void
  generateImageWithKeywords: () => void
  generatedImageUri: string | null
  isImageGenerated?: boolean
  isLoading: boolean
  error: string | null
  loadingIndicator: number
  resetToDefault: () => void
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
  const [keywords, setKeywords] = useState<string[]>([])
  const [negativeKeywords, setNegativeKeywords] = useState<string[]>([])
  const [hashtags, setHashtags] = useState<IHashet[]>([])
  const [imageCategory, setImageCategory] = useState<ImageModifier>(initialGeneral)
  const [imageConfig, setImageConfig] = useState<ImageConfigType>({
    imageStyle: 'GENERAL',
    aspectRatio: '3:4',
  })
  const [isImageGenerated, setIsImageGenerated] = useState<boolean>(false)

  const { generatedImageUri, isLoading, error, generateImage, loadingIndicator, removeImage } = useGenerateImage()

  const addNegativeKeywords = useCallback((text: string) => {
    setNegativeKeywords((pre) => [...new Set([...pre, text])])
  }, [])

  const removeNegativeKeyword = useCallback((text: string) => {
    setNegativeKeywords((pre) => pre.filter((keyword) => keyword !== text))
  }, [])

  const addKeywords = useCallback((text: string) => {
    setKeywords((prevKeywords) => [...new Set([...prevKeywords, text])])
  }, [])

  const removeKeywords = useCallback((text: string) => {
    setKeywords((prevKeywords) => prevKeywords.filter((keyword) => keyword !== text))
  }, [])

  const updateHashtags = useCallback((newHashtags: IHashet[]) => {
    setHashtags(newHashtags)
  }, [])

  const updateImageGenerated = useCallback((generated: boolean) => {
    setIsImageGenerated(generated)
  }, [])

  /*  */
  const generateImageWithKeywords = useCallback(async () => {
    updateImageGenerated(false)
    const keywordString = keywords.map((keyword) => keyword.replace(/\s/g, '').trimEnd()).join(', ')
    const negativeKeywordString = negativeKeywords.map((keyword) => keyword.replace(/\s/g, '').trimEnd()).join(', ')

    const data = {
      aspectRatio: imageConfig.aspectRatio,
      hashtags: hashtags,
      imageCategory: imageCategory,
      imageStyle: imageConfig.imageStyle,
      keywords: keywordString,
      negativeKeywords: negativeKeywordString,
    }
    await generateImage(data)
    updateImageGenerated(true)
  }, [updateImageGenerated, keywords, negativeKeywords, imageConfig.aspectRatio, imageConfig.imageStyle, hashtags, imageCategory, generateImage])

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

  const resetToDefault = () => {
    setKeywords([])
    setNegativeKeywords([])
    setImageConfig({ aspectRatio: '1:1', imageStyle: 'GENERAL' })
    setImageCategory({})
    setIsImageGenerated(false)
    removeImage()
  }

  return (
    <HashtagImageContext.Provider
      value={{
        addKeywords,
        removeKeywords,
        error,
        generateImageWithKeywords,
        generatedImageUri,
        hashtags,
        imageConfig,
        isLoading,
        keywords,
        negativeKeywords,
        addNegativeKeywords,
        removeNegativeKeyword,
        imageCategory,
        updateImageCategory,
        updateImageConfig,
        updateHashtags,
        loadingIndicator,
        isImageGenerated,
        resetToDefault,
      }}
    >
      {children}
    </HashtagImageContext.Provider>
  )
}
