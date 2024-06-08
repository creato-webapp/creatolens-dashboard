import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import useSWR, { SWRConfiguration } from 'swr'

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
  [Method.GET]: <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...data ,...customConfig, signal: controller.signal }
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
  [Method.PATCH]: <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = instance.patch<T>(url, data, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
  [Method.PUT]: <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = instance.put<T>(url, data, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
  [Method.DELETE]: <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = instance.delete<T>(url, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
}

type Keys = [string, unknown?, AxiosRequestConfig?];

const useRequest = <T>(key: Keys | null, method: keyof typeof Method, config?: SWRConfiguration) => {
  const { data, error, ...swr } = useSWR<T>(key, (key) => CustomFetcher[method](...key), config);

  return {
    data,
    error,
    ...swr,
  };
};

export { CustomFetcher as Fetcher, useRequest, Method }
