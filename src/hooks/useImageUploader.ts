import { AxiosError, AxiosRequestConfig } from 'axios'

import { UploadImageResponse } from '@services/Object/ImageBlob'
import METHOD from '@constants/method'
import useMutation from './useMutation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

const REQUEST_CONFIG = {
  maxBodyLength: 8 * 1024 * 1024,
  maxContentLength: 8 * 1024 * 1024,
}

export default function useImageUploader(config?: AxiosRequestConfig, onCompleted?: (path: string) => void, onError?: (error: AxiosError) => void) {
  const { data: session } = useSession()

  const { data, error, isMutating, trigger } = useMutation<UploadImageResponse>('/api/image', METHOD.POST, {
    request: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...REQUEST_CONFIG,
      ...config,
    },
  })

  useEffect(() => {
    if (isMutating) {
      if (error) {
        onError && onError(error)
      } else if (data) {
        onCompleted && onCompleted(data.data)
      }
    }
  }, [isMutating, error, data, onCompleted, onError])

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    if (session?.user?.name) {
      formData.append('username', session?.user?.name)
    } else {
      formData.append('username', 'null')
    }

    return trigger(formData)
  }

  return { response: data as UploadImageResponse, error, loading: isMutating, uploadImage }
}
