import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { imageToBase64 } from '../util'

export async function uploadImage(file: File, customConfig?: AxiosRequestConfig): Promise<Array<String>> {
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
