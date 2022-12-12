import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const ScrapperInstance = axios.create({
  baseURL: process.env.SCRAPPER_SERVICE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

ScrapperInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

ScrapperInstance.interceptors.response.use(
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

export default ScrapperInstance
