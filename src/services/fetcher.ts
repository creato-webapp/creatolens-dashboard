import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const FetcherInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER_URL,
  withCredentials: true,
  timeout: 10000,
})

FetcherInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sen

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

FetcherInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
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
  GET: <T>(url: string, customConfig?: AxiosRequestConfig) => FetcherInstance.get<T>(url, customConfig).then((res) => res.data),

  POST: <T, D = {}>(url: string, data?: D, customConfig?: AxiosRequestConfig) =>
    FetcherInstance.post<T>(url, data, customConfig).then((res) => res.data),

  PATCH: <T, D = {}>(url: string, data?: Partial<D>, customConfig?: AxiosRequestConfig) =>
    FetcherInstance.patch<T>(url, data, customConfig).then((res) => res.data),

  DELETE: <T>(url: string, customConfig?: AxiosRequestConfig) => FetcherInstance.delete<T>(url, customConfig).then((res) => res.data),
}
