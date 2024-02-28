import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Fetcher } from '../fetcher'
import { Labels } from './ImageBlob'

export interface confidence {
  [key: string]: number
}

export interface LabelImageResponse {
  code: number
  data: {
    categories: string
    confidence: confidence[]
    labels: Labels[]
  }
  status_code: number
}

export async function LabelImage(gcsuri: string, customConfig?: AxiosRequestConfig): Promise<Labels[]> {
  try {
    const response: LabelImageResponse = await Fetcher.POST('api/blob/gemini', { imageUrl: gcsuri, isGcsUri: true }, customConfig)
    return response.data.labels
  } catch (error) {
    // Handle error here
    console.error('Error calling Gemini API:', error)
    throw error
  }
}
