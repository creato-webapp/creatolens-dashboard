import { Fetcher } from './fetcher'
import { AxiosRequestConfig } from 'axios'

export async function GetHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<any> {
  const response = await Fetcher.GET(
    `/api/hashet`,
    {
      recommend: input,
    },
    { ...customConfig }
  )
  return response
}
