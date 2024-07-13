import { AxiosRequestConfig } from 'axios'

import { fetcher } from '../../helpers/fetcher'

type hashtag = {
  acc: number
  hashtag: string
}

export type Labels = {
  description: string
  score: number
}

export type ModelResult = {
  data: hashtag[]
}

export interface UploadImageResponse {
  path: string
}

function validateImage(file: File, maxSize: number, validTypes: string[]): boolean {
  if (file.size > maxSize) {
    window.alert(`File size should not exceed ${maxSize / 1024 / 1024} MB`)
    return false
  }

  if (!validTypes.includes(file.type)) {
    window.alert(`Invalid file type. The following types are supported: ${validTypes.join(', ')}`)
    return false
  }
  return true
}

export async function uploadImage(file: File, customConfig?: AxiosRequestConfig): Promise<UploadImageResponse> {
  try {
    if (!validateImage(file, 8 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/gif'])) {
      throw new Error('Invalid image')
    }

    const formData = new FormData()
    formData.append('file', file)

    const config = {
      maxBodyLength: 8 * 1024 * 1024,
      maxContentLength: 8 * 1024 * 1024,
      ...customConfig,
    }

    const response: UploadImageResponse = await fetcher.POST('/api/blob', formData, config)

    return response
  } catch (error) {
    if (error instanceof Error) {
      console.error('Image upload failed: ' + error.message) // Log to console or handle accordingly
      throw new Error('Image upload failed: ' + error.message) // Rethrowing the error for the caller to handle
    } else {
      // Handling non-Error throwables
      console.error('An unexpected error occurred')
      throw new Error('An unexpected error occurred during image upload.')
    }
  }
}
