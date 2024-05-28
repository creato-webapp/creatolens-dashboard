import axios, { AxiosError, AxiosRequestConfig } from 'axios'

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

// export const Fetcher = {
//   GET: <T>(url: string, customConfig?: AxiosRequestConfig) => FetcherInstance.get<T>(url, customConfig).then((res) => res.data),

//   POST: <T, D = {}>(url: string, data?: D, customConfig?: AxiosRequestConfig) =>
//     FetcherInstance.post<T>(url, data, customConfig).then((res) => res.data),

//   PATCH: <T, D = {}>(url: string, data?: Partial<D>, customConfig?: AxiosRequestConfig) =>
//     FetcherInstance.patch<T>(url, data, customConfig).then((res) => res.data),

//   DELETE: <T>(url: string, customConfig?: AxiosRequestConfig) => FetcherInstance.delete<T>(url, customConfig).then((res) => res.data),
// }

export type CancellablePromise<T> = Promise<T> & {
  cancel: () => void
}

export const Fetcher = {
  GET: <T>(url: string, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = FetcherInstance.get<T>(url, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },

  POST: <T, D = {}>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = FetcherInstance.post<T>(url, data, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },

  PATCH: <T, D = {}>(url: string, data?: Partial<D>, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = FetcherInstance.patch<T>(url, data, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },

  DELETE: <T>(url: string, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const promise = FetcherInstance.delete<T>(url, config).then((res) => res.data)
    ;(promise as CancellablePromise<T>).cancel = () => controller.abort()
    return promise as CancellablePromise<T>
  },
}
