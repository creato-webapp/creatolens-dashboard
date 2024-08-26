import { useEffect } from 'react'

import { IAccount } from '@components/Account/Account'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import XAPI from '@constants/endpoints/xapi'

import useRequest from './useRequest'
import METHOD from '@constants/method'
import { buildUrlWithParams } from '@services/util'
const useAccounts = (paginationParams: PaginationParams, defaultShouldFetch?: boolean, fallbackData?: PaginationMetadata<IAccount[]>) => {
  const url = buildUrlWithParams(XAPI.ACCOUNT, paginationParams)

  const { data, error, mutate, ...swr } = useRequest<PaginationMetadata<IAccount[]>>(url, METHOD.GET, {
    shouldFetch: defaultShouldFetch,
    refreshInterval: 0,
    fallbackData: fallbackData,
    revalidateOnMount: false,
    keepPreviousData: true,
  })

  useEffect(() => {
    mutate()
  }, [paginationParams])

  return {
    response: data,
    error,
    mutate,
    ...swr,
  }
}

export default useAccounts
