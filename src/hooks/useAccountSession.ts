import useSWR from 'swr'
import { GetSessionPagination, PaginationParams, PaginationMetadata } from '@services/Account/Session'
import { IAccountSession } from 'src/pages/accounts/session'

export const useAccountSessionPagination = (
  paginationParams: PaginationParams,
  shouldFetch: boolean = true,
  fallbackData?: PaginationMetadata<IAccountSession[]>
) => {
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
