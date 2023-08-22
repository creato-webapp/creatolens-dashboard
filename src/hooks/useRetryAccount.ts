import useSWR from 'swr'
import { IRetryAccount } from '@lib/Account/Account/interface'
import {
  GetRetryAccountsPagination,
  GetRetryAccount,
  UpdateRetryAccount,
  PaginationParams,
  PaginationMetadata,
} from '../services/Account/RetryAccount'
export const useRetryAccount = (id: string, shouldFetch: boolean = true, fallbackData?: any) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [id] : null, (id) => GetRetryAccount(id), {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  const updateRetryAccount = async (updatedAccount: IRetryAccount) => {
    const res = await UpdateRetryAccount(id, updatedAccount)
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

export const useGetRetryAccountsPagination = (paginationParams: PaginationParams, shouldFetch?: true, fallbackData?: PaginationMetadata) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [paginationParams] : null, GetRetryAccountsPagination, {
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
