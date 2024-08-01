import { Arguments, Key } from 'swr'

import fetcher from '../helpers/fetcher'
import METHOD, { IMethodsType } from '@constants/method'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'
import { AxiosError, AxiosRequestConfig } from 'axios'

type IRequestArgument = {
  arg: Arguments
}

type IMutationConfig<T> = {
  request?: AxiosRequestConfig
  swr?: SWRMutationConfiguration<Awaited<T>, AxiosError>
}

const useMutation = <T, A = undefined>(key: Key, method: IMethodsType, config?: IMutationConfig<T>) => {
  const { data, error, ...swr } = useSWRMutation<Awaited<T>, AxiosError, Key, Arguments>(
    key,
    async (url: string, { arg }: IRequestArgument): Promise<Awaited<T>> => {
      switch (method) {
        case METHOD.GET:
        case METHOD.DELETE:
          return await fetcher[method]<T>(url, { params: arg as A, ...config?.request })
        default:
          return await fetcher[method]<T>(url, arg as A, config?.request)
      }
    },
    {
      ...config?.swr,
    }
  )

  return {
    data: data as T | undefined,
    error,
    ...swr,
  }
}

export default useMutation
