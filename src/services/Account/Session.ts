//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { IAccountSession } from 'src/pages/accounts/session'

export interface PaginationParams {
  pageNumber: number
  pageSize: number
  orderBy: string
  isAsc: boolean
}

export interface PaginationMetadata<T> {
  data?: T
  has_next: boolean
  has_prev: boolean
  page: number
  size: number
  total_items: number
}

export async function getSessionPagination(
  params: PaginationParams,
  customConfig?: AxiosRequestConfig
): Promise<PaginationMetadata<IAccountSession[]>> {
  const response = await Fetcher.GET(
    `/api/accounts/session`,
    {
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      isAsc: params.isAsc,
    },
    customConfig
  )
  return response
}
