import useSWR from 'swr'
import { getSessionPagination } from '@services/Account/Session'
import { IAccountSession } from 'src/pages/accounts/session'
import { PaginationMetadata, PaginationParams } from './usePagination'

export const useAccountSessionPagination = (
  paginationParams: PaginationParams,
  shouldFetch: boolean = true,
  fallbackData?: PaginationMetadata<IAccountSession[]>
) => {
  const { data, error, mutate, isLoading, ...swr } = useSWR({ ...paginationParams, username }, getSessionPagination, {
    refreshInterval: 0,
    fallbackData: fallbackData,
  })

  return {
    sessions: data,
    isLoading: isLoading,
    error: error,
    mutate,
    ...swr,
  }
}
