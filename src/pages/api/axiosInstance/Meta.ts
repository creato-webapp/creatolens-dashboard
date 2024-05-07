import axios, { AxiosError } from 'axios'

const MetaInstance = axios.create({
  baseURL: process.env.DASHBOARD_API,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 500000,
})

MetaInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

MetaInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error: AxiosError) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error('Not Found')
          return error.response

        case 400:
          console.error('Bad Request')
          return error.response

        case 401:
          console.error('Session Timed Out')
          return error.response
        default:
          console.error(error.message)
          return error.response
      }
    }
    return Promise.reject(error)
  }
)

export default MetaInstance
