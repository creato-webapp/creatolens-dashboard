import { useState } from 'react'

import { AxiosRequestConfig } from 'axios'

import { UploadImageResponse, uploadImage as uploadImageAPI } from '@services/Object/ImageBlob'

interface UseImageUploadHook {
  uploadImage: (file: File) => Promise<void>
  isLoading: boolean
  error: Error | null
  response: UploadImageResponse | null
}

export function useFileUpload(customConfig?: AxiosRequestConfig): UseImageUploadHook {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [response, setResponse] = useState<UploadImageResponse | null>(null)

  const uploadImage = async (file: File) => {
    setIsLoading(true)
    setError(null)
    try {
      const uploadResponse = await uploadImageAPI(file, customConfig)
      setResponse(uploadResponse)
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('An unexpected error occurred during image upload.'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { uploadImage, isLoading, error, response }
}
