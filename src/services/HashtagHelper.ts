import { AxiosRequestConfig } from 'axios'

import ENDPOINT_FRONTEND from 'src/constants/endpoints/frontend'
import { IHashet } from 'src/pages/recommendation'

import fetcher from '../helpers/fetcher'

export async function getHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await fetcher.GET<{ data: IHashet[] }>(ENDPOINT_FRONTEND.HASHTAG, {
    ...customConfig,
    params: {
      recommend: input,
    },
  })
  return response
}

export async function getImageHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await fetcher.GET<{ data: IHashet[] }>(`/api/blob`, {
    ...customConfig,
    params: {
      input,
    },
  })
  return response
}
