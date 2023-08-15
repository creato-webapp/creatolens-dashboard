import useSWR from 'swr'
import { IAccount } from '@lib/Account/Account'
import AccountsHelper, { PaginationParams, PaginationMetadata } from '../services/Account'

export const useAccount = (id: string, shouldFetch: boolean = true, fallbackData?: any) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [id] : null, (id) => AccountsHelper.GetAccount(id), {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  const updateAccount = async (updatedAccount: IAccount) => {
    const res = await AccountsHelper.UpdateAccount(id, updatedAccount)
    mutate()
    return res
  }

  const updateSession = async (updatedAccount: IAccount) => {
    const res = await AccountsHelper.UpdateSession(id, updatedAccount)
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

export const useGetAccountsPagination = (params: any, paginationParams: PaginationParams, shouldFetch?: true, fallbackData?: PaginationMetadata) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [paginationParams, params] : null, AccountsHelper.GetAccountsPagination, {
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
