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

export type ModelResult = {
  data: hashtag[]
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
        maxBodyLength: 8 * 1024 * 1024,
        maxContentLength: 8 * 1024 * 1024,
        ...customConfig,
      }
    )

    return response
  } catch (error: any) {
    window.alert('Image upload failed: ' + error.message)
    throw new Error('Image upload failed: ' + error.message)
  }
}
