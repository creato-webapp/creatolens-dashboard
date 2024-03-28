//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { PaginationParams, PaginationMetadata } from './AccountInterface'
import { IAccountError } from '@lib/Account/AccountErrors/interface'

export async function getErrorPagination(params: PaginationParams, customConfig?: AxiosRequestConfig): Promise<PaginationMetadata<IAccountError[]>> {
  const response = await Fetcher.GET(
    `/api/accounts/error`,
    {
      username: params.username,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      isAsc: params.isAsc,
    },
    customConfig
  )
  return response
}
