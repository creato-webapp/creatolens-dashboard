import useSWR from 'swr'
import { GetErrorPagination, PaginationParams, PaginationMetadata } from 'src/services/Account/AccountErros'

export const useAccountErrorPagination = (paginationParams: PaginationParams, shouldFetch: boolean = true, fallbackData?: PaginationMetadata) => {
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
