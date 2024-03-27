import useSWR from 'swr'
import { IRetryAccount } from '@lib/Account/Account/interface'

import { getRetryAccountsPagination, getRetryAccount, updateRetryAccount as updateRetryAccountHelper } from '@services/Account/RetryAccount'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
export const useRetryAccount = (id: string, shouldFetch: boolean = true, fallbackData?: IRetryAccount) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [id] : null, (id) => getRetryAccount(id), {
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
    isLoading: !error && !data,
    error: error,
    updateRetryAccount,
    mutate,
    ...swr,
  }
}

export const useGetRetryAccountsPagination = (
  paginationParams: PaginationParams,
  shouldFetch?: true,
  fallbackData?: PaginationMetadata<IRetryAccount[]>
) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [paginationParams] : null, getRetryAccountsPagination, {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })
  return {
    accounts: data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}
