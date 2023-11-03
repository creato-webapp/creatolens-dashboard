import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { imageToBase64 } from '../util'

export type Labels = {
  description: string
  score: number
}

export type ImageResponse = {
  labels: Array<Labels>
  data: Array<ImageRecord>
}

export type ImageRecord = {
  labels: Array<string>
  target: Array<string>
}

export async function uploadImage(file: File, customConfig?: AxiosRequestConfig): Promise<ImageResponse> {
  try {
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
