import useSWR, { Key, KeyedMutator, SWRConfiguration } from 'swr'

import fetcher from '../helpers/fetcher'
import { IMethodsType } from '@constants/method'
import { useState } from 'react'

type IRequestConfig = SWRConfiguration & {
  shouldFetch?: boolean
}

// TODO: using mapper to replace below if else logic, separate into readFunction and writeFunctions
const useRequest = <T = unknown>(key: Key, method: IMethodsType, config?: IRequestConfig) => {
  const [shouldFetch, setShouldFetch] = useState(config?.shouldFetch)
  const { data, error, mutate: onMutate, ...swr } = useSWR(shouldFetch ? key : null, fetcher[method], config)

  const mutate: KeyedMutator<unknown> = async (data, opts) => {
    setShouldFetch(true)
    await onMutate(data, opts)
  }

  return {
    setShouldFetch,
    data: data as T | undefined,
    error,
    mutate,
    ...swr,
  }
}

export default useRequest
