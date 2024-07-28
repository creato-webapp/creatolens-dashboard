import { AxiosError, AxiosRequestConfig } from 'axios'

import { UploadImageResponse } from '@services/Object/ImageBlob'
import METHOD from '@constants/method'
import useMutation from './useMutation'
import { useEffect } from 'react'

const REQUEST_CONFIG = {
  maxBodyLength: 8 * 1024 * 1024,
  maxContentLength: 8 * 1024 * 1024,
}

export default function useImageUploader(
  config?: AxiosRequestConfig,
  onCompleted?: (response: UploadImageResponse) => void,
  onError?: (error: AxiosError) => void
) {
  const { data, error, isMutating, trigger } = useMutation('/api/blob', METHOD.POST, {
    request: {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...REQUEST_CONFIG,
      ...config,
    },
  })

  useEffect(() => {
    if (isMutating) {
      if (error) {
        onError && onError(error)
      } else {
        onCompleted && onCompleted(data as UploadImageResponse)
      }
    }
  }, [isMutating])

  const uploadImage = async (file: File) => {
    const formData = new FormData()

    formData.append('file', file)

    return trigger({ formData })
  }

  return { response: data as UploadImageResponse, error, loading: isMutating, uploadImage }
}
