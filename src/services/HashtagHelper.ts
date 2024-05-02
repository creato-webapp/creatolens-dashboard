import { IHashet } from 'src/pages/recommendation'
import { Fetcher } from './fetcher'
import { AxiosRequestConfig } from 'axios'

export async function getHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await Fetcher.GET<{ data: IHashet[] }>(`/api/hashet`, {
    ...customConfig,
    params: {
      recommend: input,
    },
  })
  return response
}
