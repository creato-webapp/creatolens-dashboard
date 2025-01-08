import useSWR, { Key, KeyedMutator, SWRConfiguration } from 'swr'

import fetcher from '../helpers/fetcher'
import { IMethodsType } from '@constants/method'
import { useCallback, useMemo, useState } from 'react'

type IRequestConfig = SWRConfiguration & {
  shouldFetch?: boolean
}

const useRequest = <T = unknown>(key: Key, method: IMethodsType, config?: IRequestConfig) => {
  const [shouldFetch, setShouldFetch] = useState(config?.shouldFetch)

  // @ts-expect-error tuple type from key cannot pass correctly into fetcher
  const { data, error, mutate: onMutate, isLoading, ...swr } = useSWR(shouldFetch ? key : null, (key) => fetcher[method](...key), config)

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
      isLoading,
      error,
      mutate,
      ...swr,
    }),
    [data, error, isLoading, mutate, swr]
  )
}

export default useRequest
