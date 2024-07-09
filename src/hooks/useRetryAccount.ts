import useSWR from 'swr'

import { IRetryAccount } from '@components/Account/Account/interface'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import { getRetryAccount, getRetryAccountsPagination, updateRetryAccount as updateRetryAccountHelper } from '@services/Account/RetryAccount'
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

export const useGetRetryAccountsPagination = (paginationParams: PaginationParams, fallbackData?: PaginationMetadata<IRetryAccount[]>) => {
  const { data, error, mutate, ...swr } = useSWR(paginationParams, getRetryAccountsPagination, {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })
  return {
    accounts: data,
    error: error,
    mutate,
    ...swr,
  }
}
