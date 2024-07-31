import { ReactNode, createContext, useCallback, useState } from 'react'

import { IHashet } from 'pages/recommendation'
import { ImageStyleKeys } from '@constants/imageStyle'
import { renderPromptAndGenImage } from '@services/imagePromptsHelper'

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
  currentImageIndex: number
  hashtags: IHashet[]
  updateHashtags: (arg: IHashet[]) => void
  imageConfig: ImageConfigType
  updateImageConfig: (config: Partial<ImageConfigType>) => void
  updateImageCategory: (category: string, option: string) => void
  generateImage: () => void
  generatedImageUri: string | null
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
  const [step, setStep] = useState<number>(1)
  const [images, setImages] = useState<ImageType[]>([])
  const [keywords, setKeywords] = useState<string>('')
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [hashtags, setHashtags] = useState<IHashet[]>([])
  const [imageCategory, setImageCategory] = useState<ImageModifier>(initialGeneral)
  const [imageConfig, setImageConfig] = useState<ImageConfigType>({
    imageStyle: 'GENERAL',
    aspectRatio: '3:4',
  })
  const [generatedImageUri, setGeneratedImageUri] = useState<string | null>(null)

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
  const generateImage = useCallback(async () => {
    const data = {
      aspectRatio: imageConfig.aspectRatio,
      hashtags: hashtags,
      imageCategory: imageCategory,
      imageStyle: imageConfig.imageStyle,
      keywords: keywords,
    }
    const uri = await renderPromptAndGenImage(data)
    setGeneratedImageUri(uri)
  }, [keywords, imageConfig, imageCategory, hashtags])

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
        generatedImageUri,
        goBack,
        goForward,
        generateImage,
      }}
    >
      {children}
    </HashtagImageContext.Provider>
  )
}
