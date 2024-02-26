import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Fetcher } from '../fetcher'

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

interface LabelImageRequest {
  imageUrl: string
  isGcsUri: boolean
}

export interface LabelImageResponse {
  status_code: number
  data: Labels[]
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

export async function uploadImage(file: File, customConfig?: AxiosRequestConfig): Promise<Labels[]> {
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

    const response = await Fetcher.POST('/api/blob', formData, config)
    window.alert('Image upload ended')

    return response
  } catch (error: any) {
    window.alert('Image upload failed: ' + error.message)
    throw new Error('Image upload failed: ' + error.message)
  }
}

export async function labelImage(imageUrl: string, isGcsUri: boolean): Promise<LabelImageResponse> {
  const payload: LabelImageRequest = {
    imageUrl,
    isGcsUri,
  }

  try {
    const response: LabelImageResponse = await Fetcher.POST('/api/blob/withUrl', payload)
    return response
  } catch (error: any) {
    console.error('Error labeling image:', error.response?.data || error.message)
    throw error
  }
}
