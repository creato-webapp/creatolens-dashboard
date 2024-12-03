import useSWR from 'swr'

import { IAccountError } from '@components/Account/AccountErrors/interface'
import { getErrorPagination } from '@services/Account/AccountErros'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'

export const useAccountErrorPagination = (
  paginationParams: PaginationParams,
  username?: string,
  fallbackData?: PaginationMetadata<IAccountError[]>
) => {
  const { data, error, mutate, isLoading, ...swr } = useSWR({ ...paginationParams, username }, getErrorPagination, {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  return {
    errors: data,
    isLoading: isLoading,
    error: error,
    mutate,
    ...swr,
  }
}
