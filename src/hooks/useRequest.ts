import useSWR, { Key, SWRConfiguration } from 'swr'

import { Method, fetcher } from '../helpers/fetcher'

const useRequest = <T>(key: Key, method: keyof typeof Method, config?: SWRConfiguration) => {
  const { data, error, ...swr } = useSWR<T>(key, fetcher[method], config)

  return {
    data,
    error,
    ...swr,
  }
}

export default useRequest
