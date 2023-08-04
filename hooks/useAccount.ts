import useSWR, { mutate } from 'swr'
import { AccountFetcher } from 'services/AccountFetcher'
import { IAccount } from '@lib/Account/Account'
import { useGetPagination } from './usePagination'
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

export const useAccount = (url: string, id: string, shouldFetch: boolean = true, fallbackData?: any) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [url, id] : null, (url, id) => AccountFetcher.GET(`${url}/${id}`), {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })
  const updateAccount = async (updatedAccount: IAccount) => {
    await AccountFetcher.PATCH(`${url}/${id}`, updatedAccount, { params: { id: updatedAccount.id } })
    mutate()
  }

  const updateSession = async (updatedAccount: IAccount) => {
    console.log(`${url}/session/${id}`, { username: updatedAccount.username })
    const res = await AccountFetcher.POST(`${url}/session/${id}`, { username: updatedAccount.username })
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

export const useGetAccountsPagination = (url: string, paginationParams: PaginationParams, fallbackData?: PaginationMetadata) => {
  const { data, error, mutate, ...swr } = useGetPagination(url, paginationParams, fallbackData)

  return {
    accounts: data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}
