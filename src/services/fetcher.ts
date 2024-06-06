import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import useSWR, { Fetcher, Key, SWRConfiguration, SWRResponse } from 'swr'
import useSWRMutation, { SWRMutationConfiguration, SWRMutationResponse  } from 'swr/mutation'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER_URL,
  withCredentials: true,
  timeout: 100000,
})

instance.interceptors.request.use(
  async function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    if (axios.isAxiosError(error)) {
      if (typeof window !== 'undefined') {
        // window.alert(error.message)
        console.error(error.message)
      }

      console.error(error.response?.data)
    }
    return Promise.reject(error)
  }
)

enum Method {
  POST = 'POST',
  UPLOAD = 'UPLOAD',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}


export type CancellablePromise<T> = Promise<T> & {
  cancel: () => void
}

export const CustomFetcher = {
  [Method.GET]: <T>(url: string, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = instance.get<T>(url, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
  [Method.POST]: <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = instance.post<T>(url, data, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
  [Method.UPLOAD]: <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, headers: { 'Content-Type': 'application/octet-stream' } }
    const promise = instance.put<T>(url, data, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
  [Method.PATCH]: <T, D = unknown>(url: string, data?: Partial<D>, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = instance.patch<T>(url, data, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
  [Method.PUT]: <T, D = unknown>(url: string, data?: Partial<D>, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = instance.put<T>(url, data, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
  [Method.DELETE]: <T>(url: string, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = instance.delete<T>(url, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
}

enum RequestType {
  READ = 'READ',
  WRITE = 'WRITE',
}

const useRequest = {
  [RequestType.READ]: (key: Key, fetcher: Fetcher, options?: SWRConfiguration) => {
    const { data, error, ...swr } = useSWR(key, fetcher, options)

    return {
      data,
      error,
      ...swr,
    } as SWRResponse
  },
  [RequestType.WRITE]: <T>(key: Key, fetcher: Fetcher, options?: SWRMutationConfiguration<unknown, Error, Key, unknown, T>) => {
    const { trigger, data, error, ...swr } = useSWRMutation(key, fetcher, options)

    return { 
      trigger,
      data,
      error,
      ...swr,
    } as SWRMutationResponse
  },
}

export { CustomFetcher as Fetcher, useRequest, Method }
