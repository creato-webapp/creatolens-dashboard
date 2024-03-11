import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { signOut } from 'next-auth/react'
import { getCookie } from 'cookies-next'

export const FetcherInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER_URL,
  withCredentials: true,
  timeout: 10000,
})

FetcherInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const idToken = getCookie('idToken')
    axios.defaults.headers.common['idToken'] = idToken ? idToken : '' // for all requests

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
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error(error.message)
          return error.response

        case 400:
          console.error(error.message)
          return error.response

        case 401:
          console.error(error.message)
          signOut()
          if (typeof window !== 'undefined') {
            window.alert('Your session has expired. Please login again.')
          }
          return error

        default:
          console.error(error.message)
          return error.response
      }
    }
    return Promise.reject(error)
  }
)

export const CommonRequest = async <D, P>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  url: string,
  data?: D,
  params?: P,
  customConfig?: AxiosRequestConfig
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
    ...customConfig,
  }
  return await FetcherInstance(config).then((res) => res.data)
}

export const Fetcher = {
  GET: <P>(url: string, params?: P, customConfig?: AxiosRequestConfig) => CommonRequest('GET', url, undefined, params, customConfig),

  POST: <D>(url: string, data?: D, customConfig?: AxiosRequestConfig) => CommonRequest('POST', url, data, undefined, customConfig),

  PATCH: <D>(url: string, data?: D, customConfig?: AxiosRequestConfig) => CommonRequest('PATCH', url, data, undefined, customConfig),

  DELETE: (url: string, customConfig?: AxiosRequestConfig) => CommonRequest('DELETE', url, undefined, undefined, customConfig),
}
