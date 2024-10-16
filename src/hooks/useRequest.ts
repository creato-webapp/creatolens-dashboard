import useSWR, { Key, SWRConfiguration } from 'swr'

import fetcher from '../helpers/fetcher'
import { IMethodType } from '@constants/method'

// TODO: using mapper to replace below if else logic, separate into readFunction and writeFunctions
const useRequest = <T = unknown>(key: Key, method: IMethodType, config?: SWRConfiguration) => {
  const { data, error, ...swr } = useSWR(key, fetcher[method], config)

  return {
    data: data as T | undefined,
    error,
    ...swr,
  }
}

export default useRequest
