import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'

export const FetcherInstance = axios.create({
  withCredentials: true,
  timeout: 5000,
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

        default:
          console.log(error.message)
          return error.response
      }
    }
    return Promise.reject(error)
  }
)

export const Fetcher = async (
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
