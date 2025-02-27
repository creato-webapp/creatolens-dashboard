import { AxiosRequestConfig } from 'axios'

import fetcher from '../../helpers/fetcher'

export type Labels = {
  description: string
  score: number
}
export interface confidence {
  [key: string]: number
}
//TODO flatten the data body
export interface LabelImageResponse {
  code: number
  data: {
    code: number
    data: {
      categories: string
      confidence: confidence[]
      labels: Labels[]
    }
  }
  status_code: number
}

export async function LabelImage(gcsuri: string, customConfig?: AxiosRequestConfig): Promise<Labels[]> {
  try {
    const response: LabelImageResponse = await fetcher.POST('api/blob/gemini', { imageUrl: gcsuri, isGcsUri: true }, customConfig)

    return response.data.data.labels
  } catch (error) {
    // Handle error here
    console.error('Error calling Gemini API:', error)
    throw error
  }
}
