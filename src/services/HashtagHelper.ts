import { AxiosRequestConfig } from 'axios'

import ENDPOINT_FRONTEND from 'src/constants/endpoints/frontend'
import { IHashet } from 'src/pages/recommendation'

import { Fetcher } from './fetcher'

export async function getHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await Fetcher.GET<{ data: IHashet[] }>(ENDPOINT_FRONTEND.HASHTAG, {
    ...customConfig,
    params: {
      recommend: input,
    },
  })
  return response
}
