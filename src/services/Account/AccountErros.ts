//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { IAccountError } from '@lib/Account/AccountErrors/interface'
import { PaginationMetadata, PaginationParams } from '@hooks/usePagination'

interface ExtendedPaginationParams extends PaginationParams {
  username?: string
}
export async function getErrorPagination(params: ExtendedPaginationParams, customConfig?: AxiosRequestConfig) {
  const response = await Fetcher.GET<PaginationMetadata<IAccountError[]>>(`/api/accounts/error`, {
    ...customConfig,
    params: {
      username: params.username ?? undefined,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      isAsc: params.isAsc,
    },
  })
  return response
}
