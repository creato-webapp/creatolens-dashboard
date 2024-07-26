import { AxiosError, AxiosRequestConfig } from 'axios'

import METHOD from '@constants/method'
import useMutation from './useMutation'
import { useEffect } from 'react'

const REQUEST_CONFIG = {
  maxBodyLength: 8 * 1024 * 1024,
  maxContentLength: 8 * 1024 * 1024,
}

const FORM_DATA_HEADER = {
  'Content-Type': 'multipart/form-data',
  keepAlive: false,
}

export interface ImageUploaderResponse {
  path: string
}

export default function useImageUploader(
  config?: AxiosRequestConfig,
  onCompleted?: (response: ImageUploaderResponse) => void,
  onError?: (error: AxiosError) => void
) {
  const { data, error, isMutating, trigger } = useMutation('/api/image', METHOD.POST, {
    request: {
      headers: FORM_DATA_HEADER,
      ...REQUEST_CONFIG,
      ...config,
    },
  })

  useEffect(() => {
    if (isMutating) {
      if (error) {
        onError && onError(error)
      } else {
        onCompleted && onCompleted(data as ImageUploaderResponse)
      }
    }
  }, [isMutating])

  const uploadImage = async (file: File) => {
    const formData = new FormData()

    formData.append('file', file)

    return trigger({ formData })
  }

  return { response: data as ImageUploaderResponse, error, loading: isMutating, uploadImage }
}
