//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { PaginationParams, PaginationMetadata } from './AccountInterface'
import { IAccountError } from '@lib/Account/AccountErrors/interface'

export async function getErrorPagination(params: PaginationParams, customConfig?: AxiosRequestConfig) {
  const response = await Fetcher.GET<PaginationMetadata<IAccountError[]>>(`/api/accounts/error`, {
    ...customConfig,
    params: {
      username: params.username,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      isAsc: params.isAsc,
    },
  })
  return response
}
