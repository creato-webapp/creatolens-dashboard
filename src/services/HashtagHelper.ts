import { AxiosRequestConfig } from 'axios'

import fetcher from '../helpers/fetcher'
import XAPI from '@constants/endpoints/xapi'
import { IHashet } from 'pages/recommendation'

export async function getHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await fetcher.GET<{ data: IHashet[] }>(XAPI.HASHTAG, {
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
