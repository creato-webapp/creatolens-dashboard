import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { Fetcher } from 'swr'
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER_URL,
  withCredentials: true,
  timeout: 100000,
})

const abortControllers = new Map()

instance.interceptors.request.use(
  function (config) {
    const controller = new AbortController()
    config.signal = controller.signal

    abortControllers.set(config.url, controller)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response) {
    abortControllers.delete(response.config.url)
    return response
  },
  function (error: AxiosError) {
    abortControllers.delete(error.config?.url)

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
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type CancellablePromise<T> = Promise<T> & {
  cancel: () => void
}

type Fetchers = Record<Method, Fetcher>

export const fetcher: Fetchers = {
  [Method.GET]: async <T>(...key: [string, AxiosRequestConfig?]) => {
    const response = await instance.get<T>(...key).then((res) => res.data)
    return response
  },
  [Method.POST]: async <T, D = unknown>(...key: [string, D?, AxiosRequestConfig?]) => {
    const [url, data, config] = key
    const response = await instance.post<T>(url, data, config).then((res) => res.data)
    return response
  },
  [Method.PATCH]: async <T, D = unknown>(...key: [string, D?, AxiosRequestConfig?]) => {
    const response = await instance.patch<T>(...key).then((res) => res.data)
    return response
  },
  [Method.PUT]: async <T, D = unknown>(...key: [string, D?, AxiosRequestConfig?]) => {
    const response = await instance.put<T>(...key).then((res) => res.data)
    return response
  },
  [Method.DELETE]: async <T>(...key: [string, AxiosRequestConfig?]) => {
    const response = await instance.delete<T>(...key).then((res) => res.data)
    return response
  },
}

export { Method }
