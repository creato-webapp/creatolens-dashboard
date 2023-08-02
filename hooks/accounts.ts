import useSWR, { mutate } from 'swr'
import { AccountsFetcher } from 'services/accounts'
import { IAccount } from '@lib/Account/Account'

export interface PaginationParams {
  pageNumber: number
  pageSize: number
  orderBy: string
  isAsc: boolean
}

export interface PaginationMetadata {
  data: IAccount[]
  has_next: boolean
  has_prev: boolean
  page: number
  size: number
  total_items: number
}

export const useAccounts = (url: string, shouldFetch: boolean = true, fallbackData?: IAccount) => {
  const { data, error, mutate } = useSWR(shouldFetch ? url : null, AccountsFetcher.GET, { refreshInterval: 0, fallbackData: fallbackData })
  const updateAccount = async (updatedAccount: IAccount) => {
    await AccountsFetcher.PATCH(`${url}/${updatedAccount.id}`, updatedAccount)
    mutate(url)
  }

  return {
    accounts: data,
    isLoading: !error && !data,
    isError: error,
    updateAccount,
    mutate,
  }
}

export const useAccountsPagination = (url: string, paginationParams: PaginationParams, fallbackData?: PaginationMetadata) => {
  console.log(paginationParams)
  const { data, error } = useSWR([url, paginationParams], AccountsFetcher.GET, { refreshInterval: 0, fallbackData: fallbackData })

  return {
    accounts: data,
    isLoading: !error && !data,
    error: error,
  }
}

export const useAccountById = (url: string, id: string) => {
  const { data, error } = useSWR(id ? `${url}/${id}` : null, AccountsFetcher.GET)

  return {
    accounts: data,
    isLoading: !error && !data,
    isError: error,
  }
}
