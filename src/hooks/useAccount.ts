import { useEffect, useState } from 'react'

import { IAccount } from '@components/Account/Account'
import { updateAccount as updateAccountHelper, updateSession as updateSessionHelper } from '@services/Account/Account'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import ENDPOINT_FRONTEND from 'src/constants/endpoints/frontend'

import useRequest from './useRequest'

import { METHOD } from '../helpers/fetcher'

export const useAccount = (id: string, defaultShouldFetch: boolean = true, fallbackData?: IAccount) => {
  const [shouldFetch, setShouldFetch] = useState(defaultShouldFetch)
  const { data, error, mutate, ...swr } = useRequest<IAccount>(shouldFetch ? [ENDPOINT_FRONTEND.ACCOUNT + id] : null, METHOD.GET, {
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
  const { data, error, mutate, ...swr } = useRequest<PaginationMetadata<IAccount[]>>(
    shouldFetch
      ? [
          ENDPOINT_FRONTEND.GET_ACCOUNTS_PAGINATION,
          {
            params: paginationParams,
          },
        ]
      : null,
    METHOD.GET,
    {
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
    shouldFetch,
    setShouldFetch,
    mutate,
    ...swr,
  }
}
