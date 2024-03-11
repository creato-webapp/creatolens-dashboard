import useSWR from 'swr'
import { GetErrorPagination } from '@services/Account/AccountErros'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import { IAccountError } from '@lib/Account/AccountErrors/interface'

export const useAccountErrorPagination = (
  paginationParams: PaginationParams,
  shouldFetch: boolean = true,
  fallbackData?: PaginationMetadata<IAccountError[]>
) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [paginationParams] : null, GetErrorPagination, {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  return {
    errors: data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}
