import { useEffect } from 'react'

import { IAccount } from '@components/Account/Account'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import XAPI from '@constants/endpoints/xapi'

import useRequest from './useRequest'
import METHOD from '@constants/method'

const useAccounts = (paginationParams: PaginationParams, defaultShouldFetch?: boolean, fallbackData?: PaginationMetadata<IAccount[]>) => {
  const { data, error, mutate, ...swr } = useRequest<PaginationMetadata<IAccount[]>>(
    [
      XAPI.ACCOUNT,
      {
        params: paginationParams,
      },
    ],
    METHOD.GET,
    {
      shouldFetch: defaultShouldFetch,
      refreshInterval: 0,
      fallbackData: fallbackData,
      revalidateOnMount: false,
    }
  )
  useEffect(() => {
    mutate()
  }, [paginationParams, mutate])

  return {
    response: data,
    error,
    mutate,
    ...swr,
  }
}

export default useAccounts
