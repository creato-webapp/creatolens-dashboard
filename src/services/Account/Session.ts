//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { IAccountSession } from 'src/pages/accounts/session'
import { PaginationMetadata, PaginationParams } from '@hooks/usePagination'

export async function getSessionPagination(
  params: PaginationParams,
  customConfig?: AxiosRequestConfig
): Promise<PaginationMetadata<IAccountSession[]>> {
  const response = await Fetcher.GET<PaginationMetadata<IAccountSession[]>>(`/api/accounts/session`, {
    ...customConfig,
    params: {
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      isAsc: params.isAsc,
    },
  })
  return response
}
