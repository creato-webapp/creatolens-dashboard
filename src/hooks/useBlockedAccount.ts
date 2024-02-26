import useSWR from 'swr'
import { IBlockedAccount } from '@lib/Account/Account/interface'
import {
  GetBlockedAccountsPagination,
  GetBlockedAccount,
  UpdateBlockedAccount,
  PaginationParams,
  PaginationMetadata,
} from '@services/Account/BlockAccount'

export const useBlockAccount = (id: string, shouldFetch: boolean = true, fallbackData?: IBlockedAccount) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [id] : null, (id) => GetBlockedAccount(id), {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  const updateBlockAccount = async (updatedAccount: IBlockedAccount) => {
    const res = await UpdateBlockedAccount(id, updatedAccount)
    mutate()
    return res
  }

  return {
    data,
    isLoading: !error && !data,
    error: error,
    updateBlockAccount,
    mutate,
    ...swr,
  }
}

export const useGetBlockAccountsPagination = (paginationParams: PaginationParams, shouldFetch?: true, fallbackData?: PaginationMetadata) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [paginationParams] : null, GetBlockedAccountsPagination, {
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
