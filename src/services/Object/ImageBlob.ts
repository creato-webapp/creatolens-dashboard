import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { imageToBase64 } from '../util'

type hashtag = {
  acc: number
  hashtag: string
}

export type Labels = {
  description: string
  score: number
}

export type ImageResponse = {
  labels: Array<Labels>
  data: Array<ImageRecord>
  firstTwo: Array<hashtag>
  middleTwo: Array<hashtag>
  lastTwo: Array<hashtag>
  error?: any
}

export type ImageRecord = {
  labels: Array<string>
  target: Array<string>
}

function validateImage(file: File, maxSize: number, validTypes: string[]): void {
  if (file.size > maxSize) {
    window.alert(`File size should not exceed ${maxSize / 1024 / 1024} MB`)
  }

  if (!validTypes.includes(file.type)) {
    window.alert(`Invalid file type. The following types are supported: ${validTypes.join(', ')}`)
  }
}

export async function uploadImage(file: File, customConfig?: AxiosRequestConfig): Promise<ImageResponse> {
  try {
    validateImage(file, 2 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/gif'])

    const imageString = await imageToBase64(file)
    const response = await Fetcher.POST(
      '/api/blob',
      JSON.stringify({
        filename: file.name,
        body: imageString,
        format: 'JPEG',
        size: file.size,
      }),
      {
        ...customConfig,
      }
    )

    return response
  } catch (error: any) {
    throw new Error('Image upload failed: ' + error.message)
  }
}
