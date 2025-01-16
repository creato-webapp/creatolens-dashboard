import { AxiosError, AxiosRequestConfig } from 'axios'

import METHOD from '@constants/method'
import useMutation from './useMutation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { CombinedUser } from '@api/auth/[...nextauth]'

const REQUEST_CONFIG = {
  maxBodyLength: 8 * 1024 * 1024,
  maxContentLength: 8 * 1024 * 1024,
}

interface UploadImageResponse {
  code: number
  data: string
}

export default function useImageUploader(config?: AxiosRequestConfig, onCompleted?: (path: string) => void, onError?: (error: AxiosError) => void) {
  const { data: session } = useSession()

  const user = session?.user as CombinedUser | undefined
  const user_id = user?.id

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
    if (user_id) {
      formData.append('user_id', user_id)
    }
    return trigger(formData)
  }

  return { response: data as UploadImageResponse, error, loading: isMutating, uploadImage }
}
