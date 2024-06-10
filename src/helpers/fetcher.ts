import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER_URL,
  withCredentials: true,
  timeout: 100000,
})

const abortControllers = new Map();

instance.interceptors.request.use(
  function (config) {
    const controller = new AbortController();
    config.signal = controller.signal;

    abortControllers.set(config.url, controller);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    abortControllers.delete(response.config.url);
    return response
  },
  function (error: AxiosError) {
    abortControllers.delete(error.config?.url);

    if (axios.isAxiosError(error)) {
      if (typeof window !== 'undefined') {
        // window.alert(error.message)
        console.error(error.message)
      }
    }
    return Promise.reject(error)
  }
)

enum Method {
  POST = 'POST',
  UPLOAD = 'UPLOAD',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type CancellablePromise<T> = Promise<T> & {
  cancel: () => void
}

type Fetchers = Record<Method, <T, D=unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => Promise<T>>

export const fetcher: Fetchers = {
  [Method.GET]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const response = await instance.get<T>(url, { ...customConfig, ...data }).then((res) => res.data)
    return response
  },
  [Method.POST]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const response = await instance.post<T>(url, data, customConfig).then((res) => res.data)
    return response
  },
  [Method.UPLOAD]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const config = { ...customConfig, headers: { 'Content-Type': 'application/octet-stream' } }
    const response = await instance.put<T>(url, data, config).then((res) => res.data)
    return response
  },
  [Method.PATCH]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const response = await instance.patch<T>(url, data, config).then((res) => res.data)
    return response 
  },
  [Method.PUT]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const response = await instance.put<T>(url, data, config).then((res) => res.data)
    return response 
  },
  [Method.DELETE]: async <T, D = unknown>(url: string, data?: D, customConfig?: AxiosRequestConfig) => {
    const controller = new AbortController()
    const config = { ...customConfig, signal: controller.signal }
    const response = await instance.delete<T>(url, config).then((res) => res.data)
    return response 
  },
}

export { Method }
