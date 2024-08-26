import METHOD from '@constants/method'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { createInstance } from './axios/base'

const abortControllers = new Map()

export type CancellablePromise<T> = Promise<T> & {
  cancel: () => void
}

export const instance = createInstance(
  {
    baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER_URL,
    withCredentials: true,
    timeout: 100000,
  },
  {
    request: {
      onFulfilled: function (config) {
        const controller = new AbortController()
        config.signal = controller.signal

        abortControllers.set(config.url, controller)
        return config
      },
    },
    response: {
      onFulfilled: function (response) {
        abortControllers.delete(response.config.url)
        return response
      },
      onRejected: function (error: AxiosError) {
        abortControllers.delete(error.config?.url)
        if (axios.isAxiosError(error)) {
          if (typeof window !== 'undefined') {
            // window.alert(error.message)
            console.error(error.message)
          }
        }
        return Promise.reject(error)
      },
    },
  }
)

const fetcher = {
  [METHOD.GET]: async <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) => {
    try {
      console.log('config',config)
      const response = await instance.get<T>(url, config).then((res) => res.data)
      return response
    } catch (error) {
      console.error('GET request failed:', error)
      throw error
    }
  },
  [METHOD.POST]: async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    try {
      const response = await instance.post<T>(url, data, config).then((res) => res.data)
      return response
    } catch (error) {
      console.error('POST request failed:', error)
      throw error
    }
  },
  [METHOD.PATCH]: async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    try {
      const response = await instance.patch<T>(url, data, config).then((res) => res.data)
      return response
    } catch (error) {
      console.error('PATCH request failed:', error)
      throw error
    }
  },
  [METHOD.PUT]: async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    try {
      const response = await instance.put<T>(url, data, config).then((res) => res.data)
      return response
    } catch (error) {
      console.error('PUT request failed:', error)
      throw error
    }
  },
  [METHOD.DELETE]: async <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) => {
    try {
      const response = await instance.delete<T>(url, config).then((res) => res.data)
      return response
    } catch (error) {
      console.error('DELETE request failed:', error)
      throw error
    }
  },
} as const

export default fetcher
