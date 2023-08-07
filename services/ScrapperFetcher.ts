import { AxiosRequestConfig } from 'axios'
import { Fetcher } from './fetcher'

export const ScrapperFetcher = {
  GET: (url: string, params?: any, customConfig?: AxiosRequestConfig) => Fetcher('GET', url, undefined, params, customConfig),

  POST: (url: string, data?: any, customConfig?: AxiosRequestConfig) => Fetcher('POST', url, data, undefined, customConfig),

  PATCH: (url: string, data?: any, customConfig?: AxiosRequestConfig) => Fetcher('PATCH', url, data, undefined, customConfig),

  DELETE: (url: string, customConfig?: AxiosRequestConfig) => Fetcher('DELETE', url, undefined, undefined, customConfig),
}
