import METHOD from '@constants/method'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

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

export type CancellablePromise<T> = Promise<T> & {
  cancel: () => void
}

const fetcher = {
  [METHOD.GET]: async <T>(url: string, customConfig?: AxiosRequestConfig) => {
    const response = await instance.get<T>(url, customConfig).then((res) => res.data)
    return response
  },
  [METHOD.POST]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const response = await instance.post<T>(url, data, customConfig).then((res) => res.data)
    return response
  },
  [METHOD.UPLOAD]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const config = { ...customConfig, headers: { 'Content-Type': 'application/octet-stream' } }
    const response = await instance.put<T>(url, data, config).then((res) => res.data)
    return response
  },
  [METHOD.PATCH]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const config = { ...customConfig }
    const response = await instance.patch<T>(url, data, config).then((res) => res.data)
    return response
  },
  [METHOD.PUT]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const config = { ...customConfig }
    const response = await instance.put<T>(url, data, config).then((res) => res.data)
    return response
  },
  [METHOD.DELETE]: async <T>(url: string, customConfig?: AxiosRequestConfig) => {
    const config = { ...customConfig }
    const response = await instance.delete<T>(url, config).then((res) => res.data)
    return response
  },
} as const

export default fetcher
