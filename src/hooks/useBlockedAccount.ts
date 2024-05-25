import useSWR from 'swr'
import { IBlockedAccount } from '@lib/Account/Account/interface'
import { getBlockedAccountsPagination, getBlockedAccount, updateBlockedAccount } from '@services/Account/BlockAccount'
import { PaginationMetadata, PaginationParams } from './usePagination'

export const useBlockAccount = (id: string, shouldFetch: boolean = true, fallbackData?: IBlockedAccount | null) => {
  const { data, error, mutate, isLoading, ...swr } = useSWR(shouldFetch ? id : null, (id) => getBlockedAccount(id), {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  const updateBlockAccount = async (updatedAccount: IBlockedAccount) => {
    const res = await updateBlockedAccount(id, updatedAccount)
    mutate()
    return res
  }

  return {
    data,
    isLoading: isLoading,
    error: error,
    updateBlockAccount,
    mutate,
    ...swr,
  }
}

export const useGetBlockAccountsPagination = (paginationParams: PaginationParams, fallbackData?: PaginationMetadata<IBlockedAccount[]>) => {
  const { data, error, mutate, isLoading, ...swr } = useSWR(paginationParams, getBlockedAccountsPagination, {
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
