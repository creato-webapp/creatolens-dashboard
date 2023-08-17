import useSWR from 'swr'
import { GetSessionPagination } from 'services/Account/Session'
import { PaginationParams, PaginationMetadata } from './usePagination'

export const useAccountSessionPagination = (paginationParams: PaginationParams, shouldFetch: boolean = true, fallbackData?: PaginationMetadata) => {
  const { data, error, mutate, ...swr } = useSWR(shouldFetch ? [paginationParams] : null, GetSessionPagination, {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  return {
    sessions: data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}
