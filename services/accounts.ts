import { AxiosRequestConfig } from 'axios'
import { FetcherInstance } from './fetcher'

const commonRequest = async (
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  url: string,
  data?: any,
  params?: any,
  customConfig?: AxiosRequestConfig
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
    ...customConfig,
  }

  return await FetcherInstance(config).then((res) => res.data)
}

export const AccountsFetcher = {
  GET: (url: string, params?: any, customConfig?: AxiosRequestConfig) => commonRequest('GET', url, undefined, params, customConfig),

  POST: (url: string, data?: any, customConfig?: AxiosRequestConfig) => commonRequest('POST', url, data, undefined, customConfig),

  PATCH: (url: string, data?: any, customConfig?: AxiosRequestConfig) => commonRequest('PATCH', url, data, undefined, customConfig),

  DELETE: (url: string, customConfig?: AxiosRequestConfig) => commonRequest('DELETE', url, undefined, undefined, customConfig),
}
