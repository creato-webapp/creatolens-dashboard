import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useSession, signIn, signOut, getProviders } from 'next-auth/react'
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
          console.log(error.message)
          return error.response

        case 400:
          console.log(error.message)
          return error.response

        case 401:
          console.log(error.message)
          signOut()
          if (typeof window !== 'undefined') {
            window.alert('Your session has expired. Please login again.')
          }
          return error

        default:
          console.log(error.message)
          return error.response
      }
    }
    return Promise.reject(error)
  }
)

export const CommonRequest = async (
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  url: string,
  data?: any,
  params?: any,
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
  GET: (url: string, params?: any, customConfig?: AxiosRequestConfig) => CommonRequest('GET', url, undefined, params, customConfig),

  POST: (url: string, data?: any, customConfig?: AxiosRequestConfig) => CommonRequest('POST', url, data, undefined, customConfig),

  PATCH: (url: string, data?: any, customConfig?: AxiosRequestConfig) => CommonRequest('PATCH', url, data, undefined, customConfig),

  DELETE: (url: string, customConfig?: AxiosRequestConfig) => CommonRequest('DELETE', url, undefined, undefined, customConfig),
}
