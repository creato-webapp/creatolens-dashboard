import { IHashet } from 'src/pages/recommendation'
import { Fetcher } from './fetcher'
import { AxiosRequestConfig } from 'axios'

export async function getHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await Fetcher.GET(
    `/api/hashet`,
    {
      recommend: input,
    },
    { ...customConfig }
  )
  return response
}
