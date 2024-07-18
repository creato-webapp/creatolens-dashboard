import { Arguments, Key } from 'swr'

import fetcher from '../helpers/fetcher'
import METHOD, { IMethodsType } from '@constants/method'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

type IRequestArgument = {
  arg: Arguments
}

type IMutationConfig<T> = {
  request?: AxiosRequestConfig
  swr?: SWRMutationConfiguration<AxiosResponse<T>, AxiosError>
}

const useMutation = <T, D extends Arguments>(key: Key, method: IMethodsType, config?: IMutationConfig<T>) => {
  const { data, error, ...swr } = useSWRMutation<AxiosResponse<T>, AxiosError, Key, D>(
    key,
    async (url: string, { arg }: IRequestArgument): Promise<AxiosResponse<T>> => {
      switch (method) {
        case METHOD.GET:
        case METHOD.DELETE:
          return await fetcher[method](url, { params: arg, ...config?.request })
        default:
          return await fetcher[method](url, arg as D, config?.request)
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
