import XAPI from '@constants/endpoints/xapi'
import { IAccountSession } from 'pages/accounts/session'

import { PaginationMetadata, PaginationParams } from './usePagination'
import useRequest from './useRequest'
import METHOD from '@constants/method'

export const useAccountSessionPagination = (
  paginationParams: PaginationParams,
  username?: string,
  fallbackData?: PaginationMetadata<IAccountSession[]>
) => {
  const { data, error, mutate, isLoading, ...swr } = useRequest<PaginationMetadata<IAccountSession[]>>(
    [XAPI.GET_ACCOUNT_SESSION_PAGINATION, { ...paginationParams, username }],
    METHOD.GET,
    {
      refreshInterval: 0,
      fallbackData: fallbackData,
    }
  )

  return {
    sessions: data,
    isLoading: isLoading,
    error: error,
    mutate,
    ...swr,
  }
}
