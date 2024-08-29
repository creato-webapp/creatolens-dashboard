import useSWR, { Key, KeyedMutator, SWRConfiguration } from 'swr'

import fetcher from '../helpers/fetcher'
import { IMethodsType } from '@constants/method'
import { useCallback, useMemo, useState } from 'react'

type IRequestConfig = SWRConfiguration & {
  shouldFetch?: boolean
}

const useRequest = <T = unknown>(key: Key, method: IMethodsType, config?: IRequestConfig) => {
  const [shouldFetch, setShouldFetch] = useState(config?.shouldFetch)
  const { data, error, mutate: onMutate, ...swr } = useSWR(shouldFetch ? key : null, (key) => fetcher[method](...key), config)

  const mutate: KeyedMutator<unknown> = useCallback(
    async (data, opts) => {
      setShouldFetch(true)
      await onMutate(data, opts)
    },
    [onMutate]
  )

  return useMemo(
    () => ({
      setShouldFetch,
      data: data as T | undefined,
      error,
      mutate,
      ...swr,
    }),
    [data, error, mutate, swr]
  )
}

export default useRequest
