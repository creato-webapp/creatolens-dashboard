import { AxiosRequestConfig } from 'axios'

import { IHashet } from 'src/pages/recommendation'

import { Fetcher } from './fetcher'

export async function getHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await Fetcher.GET<{ data: IHashet[] }>(`/api/hashet`, {
    ...customConfig,
    params: {
      recommend: input,
    },
  })
  return response
}

export async function getImageHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await Fetcher.GET<{ data: IHashet[] }>(`/api/blob`, {
    ...customConfig,
    params: {
      input,
    },
  })
  return response
}