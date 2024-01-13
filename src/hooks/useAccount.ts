import useSWR from 'swr'
import { IAccount } from '@lib/Account/Account'
import { GetAccountsPagination, GetAccount, UpdateSession, UpdateAccount, PaginationParams, PaginationMetadata } from '@services/Account/Account'
import { useRef } from 'react'

export const useAccount = (id: string, shouldFetch: boolean = true, fallbackData?: any) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [id] : null, (id) => GetAccount(id), {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  const updateAccount = async (updatedAccount: IAccount) => {
    const res = await UpdateAccount(id, updatedAccount)
    mutate()
    return res
  }

  const updateSession = async (updatedAccount: IAccount) => {
    const res = await UpdateSession(id, updatedAccount)
    mutate()
    return res
  }

  return {
    data,
    isLoading: !error && !data,
    error: error,
    updateAccount,
    updateSession,
    mutate,
    ...swr,
  }
}

export const useGetAccountsPagination = (paginationParams: PaginationParams, shouldFetch?: true, fallbackData?: PaginationMetadata) => {
  const mutableRef = useRef<PaginationMetadata>()
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [paginationParams] : null, GetAccountsPagination, {
    refreshInterval: 0,
    fallbackData: mutableRef.current ? mutableRef.current : undefined,
  })

  if (data !== undefined) mutableRef.current = data

  return {
    accounts: data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}
