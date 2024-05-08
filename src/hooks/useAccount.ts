import { useState } from 'react'
import useSWR from 'swr'
import { IAccount } from '@lib/Account/Account'
import {
  getAccountsPagination,
  getAccount,
  updateSession as updateSessionHelper,
  updateAccount as updateAccountHelper,
} from '@services/Account/Account'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'

export const useAccount = (id: string, defaultShouldFetch: boolean = true, fallbackData?: IAccount | null) => {
  const [shouldFetch, setShouldFetch] = useState(defaultShouldFetch)
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [id] : null, (id) => getAccount(id), {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  const updateAccount = async (updatedAccount: IAccount) => {
    const res = await updateAccountHelper(id, updatedAccount)
    mutate()
    return res
  }

  const updateSession = async (updatedAccount: IAccount) => {
    const res = await updateSessionHelper(id, updatedAccount)
    mutate()
    return res
  }

  return {
    data,
    isLoading: !error && !data,
    error,
    updateAccount,
    updateSession,
    setShouldFetch,
    mutate,
    ...swr,
  }
}

export const useGetAccountsPagination = (
  paginationParams: PaginationParams,
  defaultShouldFetch?: boolean,
  fallbackData?: PaginationMetadata<IAccount[]>
) => {
  const [shouldFetch, setShouldFetch] = useState(defaultShouldFetch)
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [paginationParams] : null, getAccountsPagination, {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  return {
    data,
    isLoading: !error && !data,
    error,
    shouldFetch,
    setShouldFetch,
    mutate,
    ...swr,
  }
}
