import { useState, useCallback } from 'react'
import { renderPromptAndGenImage } from '@services/imagePromptsHelper'
import { ImageStyleKeys } from '@constants/imageStyle'
import { IHashet } from 'pages/recommendation'

interface ImageGenerationData {
  aspectRatio: string
  hashtags: IHashet[]
  imageCategory: { [key: string]: string }
  imageStyle: ImageStyleKeys
  keywords: string
}

interface UseGenerateImageResult {
  generatedImageUri: string | null
  isLoading: boolean
  error: string | null
  generateImage: (data: ImageGenerationData) => Promise<void>
}

export function useGenerateImage(): UseGenerateImageResult {
  const [generatedImageUri, setGeneratedImageUri] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const generateImage = useCallback(async (data: ImageGenerationData) => {
    setIsLoading(true)
    setError(null)
    setGeneratedImageUri(null)
    try {
      const uri = await renderPromptAndGenImage(data)
      setGeneratedImageUri(uri)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])
  return {
    generatedImageUri,
    isLoading,
    error,
    generateImage,
  }
}
