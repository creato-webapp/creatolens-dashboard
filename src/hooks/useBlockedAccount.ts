import useSWR from 'swr'

import { IBlockedAccount } from '@components/Account/Account/interface'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import { getBlockedAccountsPagination, updateBlockedAccount } from '@services/Account/BlockAccount'
import useRequest from './useRequest'
import METHOD from '@constants/method'
import XAPI from '@constants/endpoints/xapi'

export const useBlockAccount = (id: string, shouldFetch: boolean = true, fallbackData?: IBlockedAccount) => {
  const { data, error, mutate, isLoading, ...swr } = useRequest<IBlockedAccount>([XAPI.BLOCKED_ACCOUNT + id], METHOD.GET, {
    shouldFetch,
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
