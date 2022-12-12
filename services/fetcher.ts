import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'

const FetcherInstance = axios.create({
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
          console.log('Not Found')
          return error.response

        case 400:
          console.log('Bad Request')
          return error.response

        default:
          console.log(error.message)
          return error.response
      }
    }
    return Promise.reject(error)
  }
)

export const Fetcher = {
  POST: async (url: string, data: any, customConfig?: AxiosRequestConfig) =>
    await FetcherInstance.post(url, data, customConfig),
  GET: async (url: string, params: any) => {
    return await FetcherInstance.get(`${url}`, { params: params }).then(
      (res) => res.data
    )
  },
  PATCH: async (url: string, data: any) =>
    await FetcherInstance.patch(url, data),
  DELETE: async (url: string) => await FetcherInstance.delete(url),
}
export const FetchWithId = {
  GET: async (url: string, id: string) => {
    const newUrl = `${url}${id}`
    return await Fetcher.GET(newUrl, { id: id }).then((res) => res)
  },
}
