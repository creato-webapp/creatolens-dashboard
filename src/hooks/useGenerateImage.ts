import { useState, useCallback, useEffect } from 'react'
import { renderPromptAndGenImage } from '@services/imagePromptsHelper'
import { ImageStyleKeys } from '@constants/imageStyle'
import { IHashet } from 'pages/recommendation'
import { Status } from '@context/DialogueContext'
import { useDialogues } from './useDialogues'

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
  const { addDialogue } = useDialogues()

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
        addDialogue('Failed to generate image', Status.FAILED)

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
