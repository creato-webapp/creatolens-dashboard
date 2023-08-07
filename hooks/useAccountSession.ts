import { PaginationParams, PaginationMetadata } from './usePagination'
import { useGetPagination } from './usePagination'

export const useAccountSessionPagination = (
  url: string,
  paginationParams: PaginationParams,
  shouldFetch: boolean = true,
  fallbackData?: PaginationMetadata
) => {
  const { data, error, mutate, ...swr } = useGetPagination(url, paginationParams, shouldFetch, fallbackData)

  return {
    accountErrors: data,
    isLoading: !error && !data,
    error: error,
    mutate,
    ...swr,
  }
}
