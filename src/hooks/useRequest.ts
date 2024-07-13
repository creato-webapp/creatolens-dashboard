import { useCallback } from 'react'

import { AxiosRequestConfig } from 'axios'
import useSWR, { Key, SWRConfiguration } from 'swr'

import fetcher, { METHOD } from '../helpers/fetcher'

const fetcherMapper = {
  [METHOD.GET]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.GET](url, config),
  [METHOD.DELETE]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.DELETE](url, config),
  [METHOD.POST]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.POST](url, data, config),
  [METHOD.PUT]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.POST](url, data, config),
  [METHOD.PATCH]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.POST](url, data, config),
  [METHOD.UPLOAD]: (url: string, data: unknown, config?: AxiosRequestConfig) => fetcher[METHOD.POST](url, data, config),
}

const useRequest = <T = unknown>(key: Key, method: keyof typeof METHOD, config?: SWRConfiguration) => {
  const fetchFunction = useCallback(
    (url: string, data?: unknown, config?: AxiosRequestConfig) => {
      fetcherMapper[method](url, data, config)
    },
    [method]
  )

  const { data, error, ...swr } = useSWR(key, (url: string, data?: unknown, config?: AxiosRequestConfig) => fetchFunction(url, data, config), config)

  return {
    data: data as T | undefined,
    error,
    ...swr,
  }
}

export default useRequest
