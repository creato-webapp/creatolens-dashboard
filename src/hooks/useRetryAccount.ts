import useSWR from 'swr'

import { IRetryAccount } from '@components/Account/Account/interface'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import { getRetryAccount, getRetryAccountsPagination, updateRetryAccount as updateRetryAccountHelper } from '@services/Account/RetryAccount'
import useRequest from './useRequest'
import METHOD from '@constants/method'
import XAPI from '@constants/endpoints/xapi'
import { buildUrlWithParams } from '@services/util'
export const useRetryAccount = (id: string, shouldFetch: boolean = true, fallbackData?: IRetryAccount) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? id : null, (id) => getRetryAccount(id), {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  const updateRetryAccount = async (updatedAccount: IRetryAccount) => {
    const res = await updateRetryAccountHelper(id, updatedAccount)
    mutate()
    return res
  }

  return {
    data,
    error: error,
    updateRetryAccount,
    mutate,
    ...swr,
  }
}

export const useRetryAccounts = (
  paginationParams: PaginationParams,
  defaultShouldFetch: boolean,
  fallbackData?: PaginationMetadata<IRetryAccount[]>
) => {
  // const { data, error, mutate, ...swr } = useSWR(paginationParams, getRetryAccountsPagination, {
  //   refreshInterval: 0,
  //   fallbackData: fallbackData,
  // })
  const url = buildUrlWithParams(XAPI.GET_AVAILABLE_ACCOUNTS_PAGINATION, paginationParams)

  const { data, error, mutate, ...swr } = useRequest<PaginationMetadata<IRetryAccount[]>>(XAPI.GET_AVAILABLE_ACCOUNTS_PAGINATION, METHOD.GET, {
    shouldFetch: defaultShouldFetch,
    refreshInterval: 0,
    fallbackData: fallbackData,
    revalidateOnMount: false,
    keepPreviousData: true,
    params: paginationParams,
  })
  return {
    accounts: data,
    error: error,
    mutate,
    ...swr,
  }
}
