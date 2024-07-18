import { useEffect } from 'react'

import { IAccount } from '@components/Account/Account'
import { updateAccount as updateAccountHelper, updateSession as updateSessionHelper } from '@services/Account/Account'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import XAPI from '@constants/endpoints/xapi'

import useRequest from './useRequest'
import METHOD from '@constants/method'

export const useAccount = (id: string, defaultShouldFetch: boolean = true, fallbackData?: IAccount) => {
  const { data, error, mutate, ...swr } = useRequest<IAccount>([XAPI.ACCOUNT + id], METHOD.GET, {
    shouldFetch: defaultShouldFetch,
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
    error,
    updateAccount,
    updateSession,
    mutate,
    ...swr,
  }
}

export const useGetAccountsPagination = (
  paginationParams: PaginationParams,
  defaultShouldFetch?: boolean,
  fallbackData?: PaginationMetadata<IAccount[]>
) => {
  const { data, error, mutate, ...swr } = useRequest<PaginationMetadata<IAccount[]>>(
    [
      XAPI.GET_ACCOUNTS_PAGINATION,
      {
        params: paginationParams,
      },
    ],
    METHOD.GET,
    {
      shouldFetch: defaultShouldFetch,
      refreshInterval: 0,
      fallbackData: fallbackData,
      revalidateOnMount: false,
    }
  )
  useEffect(() => {
    mutate()
  }, [paginationParams, mutate])

  return {
    data,
    error,
    mutate,
    ...swr,
  }
}
