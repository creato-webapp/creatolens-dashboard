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
        window.alert(error.message)
      }

      console.error(error.response?.data)
    }
    return Promise.reject(error)
  }
)

export const Fetcher = {
  GET: <T>(url: string, customConfig?: AxiosRequestConfig) => instance.get<T>(url, customConfig).then((res) => res.data),

  POST: <T, D = Record<string, unknown>>(url: string, data?: D, customConfig?: AxiosRequestConfig) =>
    instance.post<T>(url, data, customConfig).then((res) => res.data),

  PATCH: <T, D = Record<string, unknown>>(url: string, data?: Partial<D>, customConfig?: AxiosRequestConfig) =>
    instance.patch<T>(url, data, customConfig).then((res) => res.data),

  DELETE: <T>(url: string, customConfig?: AxiosRequestConfig) => instance.delete<T>(url, customConfig).then((res) => res.data),
}
