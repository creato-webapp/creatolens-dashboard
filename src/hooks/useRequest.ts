import { AxiosRequestConfig } from 'axios'
import useSWR, { Key, SWRConfiguration } from 'swr'

import fetcher, { METHOD } from '../helpers/fetcher'

const fetcherMapper = {
  [METHOD.GET]: (url: string, data: object, config?: AxiosRequestConfig) => fetcher[METHOD.GET](url, { ...data, ...config }),
  [METHOD.DELETE]: (url: string, data: object, config?: AxiosRequestConfig) => fetcher[METHOD.DELETE](url, { ...data, ...config }),
  [METHOD.POST]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.POST](url, data, config),
  [METHOD.PUT]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.POST](url, data, config),
  [METHOD.PATCH]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.POST](url, data, config),
  [METHOD.UPLOAD]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.POST](url, data, config),
}

const fetchFunction = (method: keyof typeof METHOD, ...args: [string, unknown?, AxiosRequestConfig?]) => {
  const [url, data, config] = args

  if (method === METHOD.GET || method === METHOD.DELETE) {
    if (typeof data !== 'object' || data === null) {
      throw new Error(`Data must be an object for ${method} requests.`)
    }
    return fetcherMapper[method](url, data as object, config)
  }

  return fetcherMapper[method](url, data, config)
}

// TODO: using mapper to replace below if else logic, separate into readFunction and writeFunctions
const useRequest = <T = unknown>(key: Key, method: keyof typeof METHOD, config?: SWRConfiguration) => {
  const { data, error, ...swr } = useSWR(key, (key: [string, unknown, AxiosRequestConfig]) => fetchFunction(method, ...key), config)

  return {
    data: data as T | undefined,
    error,
    ...swr,
  }
}

export default useRequest
