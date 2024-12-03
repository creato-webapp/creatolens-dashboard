import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

type IInterceptorParamType<V> = {
  onFulfilled?: (value: V) => void
  onRejected?: (error: AxiosError) => void
}

const createInstance = (
  { baseURL = '', timeout = 5000, ...params }: CreateAxiosDefaults,
  interceptor?: {
    request?: IInterceptorParamType<AxiosRequestConfig>
    response?: IInterceptorParamType<AxiosResponse>
  }
): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    timeout: timeout,
    ...params,
  })

  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      interceptor?.request?.onFulfilled && interceptor.request.onFulfilled(config)
      return config
    },
    function (error) {
      interceptor?.request?.onRejected && interceptor.request.onRejected(error)
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      // Do something with response data
      interceptor?.response?.onFulfilled && interceptor.response.onFulfilled(response)
      return response
    },
    function (error: AxiosError) {
      if (error.response) {
        switch (error.response.status) {
          case StatusCodes.BAD_REQUEST:
            console.error(ReasonPhrases.BAD_REQUEST)
            return error.response

          case StatusCodes.UNAUTHORIZED:
            console.error(StatusCodes.UNAUTHORIZED)
            return error.response

          case StatusCodes.NOT_FOUND:
            console.error(ReasonPhrases.NOT_FOUND)
            return error.response

          default:
            if (interceptor?.response?.onRejected) {
              interceptor.response.onRejected(error)
            }
            console.error(error.message)
            return error.response
        }
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export { createInstance }
