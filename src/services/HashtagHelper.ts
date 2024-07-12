import { AxiosRequestConfig } from 'axios'

import { IHashet } from 'pages/recommendation'

import { Fetcher } from '../helpers/fetcher'

export async function getHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await Fetcher.GET<{ data: IHashet[] }>(`/api/hashet`, {
    ...customConfig,
    params: {
      recommend: input,
    },
  })
  return response
}
