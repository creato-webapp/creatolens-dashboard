import { useState, useCallback, useEffect } from 'react'
import { renderPromptAndGenImage } from '@services/imagePromptsHelper'
import { ImageStyleKeys } from '@constants/imageStyle'
import { IHashet } from 'pages/recommendation'

interface ImageGenerationData {
  aspectRatio: string
  hashtags: IHashet[]
  imageCategory: { [key: string]: string }
  imageStyle: ImageStyleKeys
  keywords: string
  negativeKeywords: string
}

interface UseGenerateImageResult {
  generatedImageUri: string | null
  isLoading: boolean
  error: string | null
  generateImage: (data: ImageGenerationData) => Promise<void>
  removeImage: () => void
  loadingIndicator: number
}

export function useGenerateImage(): UseGenerateImageResult {
  const [generatedImageUri, setGeneratedImageUri] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingIndicator, setLoadingIndicator] = useState<number>(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => setLoadingIndicator((prev) => prev + 10), 1000)
      return () => clearInterval(interval)
    } else {
      setLoadingIndicator(0)
    }
  }, [isLoading])

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

  const removeImage = useCallback(async () => {
    setIsLoading(false)
    setError(null)
    setGeneratedImageUri(null)
    setLoadingIndicator(0)
  }, [])

  return {
    generatedImageUri,
    isLoading,
    loadingIndicator,
    error,
    generateImage,
    removeImage,
  }
}
