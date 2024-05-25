import useSWR from 'swr'
import { getErrorPagination } from '@services/Account/AccountErros'
import { IAccountError } from '@lib/Account/AccountErrors/interface'
import { PaginationMetadata, PaginationParams } from './usePagination'

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
