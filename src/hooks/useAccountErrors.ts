import { IAccountError } from '@components/Account/AccountErrors/interface'
import XAPI from '@constants/endpoints/xapi'
import { PaginationMetadata, PaginationParams } from '@services/Account/AccountInterface'
import useRequest from './useRequest'
import METHOD from '@constants/method'

export const useAccountErrorPagination = (
  paginationParams: PaginationParams,
  username?: string,
  fallbackData?: PaginationMetadata<IAccountError[]>
) => {
  const { data, error, mutate, isLoading, ...swr } = useRequest<PaginationMetadata<IAccountError[]>>(
    [
      XAPI.ACCOUNT_ERRORS,
      {
        ...paginationParams,
        username,
      },
    ],
    METHOD.GET,
    {
      refreshInterval: 0,
      fallbackData: fallbackData,
    }
  )

  return {
    errors: data,
    isLoading: isLoading,
    error: error,
    mutate,
    ...swr,
  }
}
