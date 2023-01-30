import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const HashetInstance = axios.create({
  baseURL: process.env.HASHET_SERVICE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 50000,
})

HashetInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

HashetInstance.interceptors.response.use(
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

        case 401:
          console.log('Session Timed Out')
          return error.response
        default:
          console.log(error.message)
          return error.response
      }
    }
    return Promise.reject(error)
  }
)

export default HashetInstance
