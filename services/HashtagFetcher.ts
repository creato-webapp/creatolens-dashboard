import { AxiosRequestConfig } from 'axios'
import { Fetcher } from './fetcher'

export const HashtagFetcher = {
  GET: (url: string, params?: any, customConfig?: AxiosRequestConfig) => Fetcher('GET', url, undefined, params, customConfig),
}
