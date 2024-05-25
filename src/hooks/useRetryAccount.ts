import useSWR from 'swr'
import { IRetryAccount } from '@lib/Account/Account/interface'

import { getRetryAccountsPagination, getRetryAccount, updateRetryAccount as updateRetryAccountHelper } from '@services/Account/RetryAccount'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
export const useRetryAccount = (id: string, shouldFetch: boolean = true, fallbackData?: IRetryAccount) => {
  const { data, error, mutate, isLoading, ...swr } = useSWR(id, (id) => getRetryAccount(id), {
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
    isLoading: isLoading,
    error: error,
    updateRetryAccount,
    mutate,
    ...swr,
  }
}

  const { data, error, mutate, isLoading, ...swr } = useSWR(paginationParams, getRetryAccountsPagination, {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })
  return {
    accounts: data,
    isLoading: isLoading,
    error: error,
    mutate,
    ...swr,
  }
}
