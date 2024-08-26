import { IAccountError } from '@components/Account/AccountErrors/interface'
import XAPI from '@constants/endpoints/xapi'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import useRequest from './useRequest'
import METHOD from '@constants/method'
import { buildUrlWithParams } from '@services/util'

export const useAccountErrorPagination = (
  paginationParams: PaginationParams,
  username?: string,
  fallbackData?: PaginationMetadata<IAccountError[]>
) => {
  const url = buildUrlWithParams(XAPI.ACCOUNT_ERRORS, paginationParams)
  const { data, error, mutate, isLoading, ...swr } = useRequest<PaginationMetadata<IAccountError[]>>(url, METHOD.GET, {
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
