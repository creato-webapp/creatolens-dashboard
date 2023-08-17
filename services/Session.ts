//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'
import { Fetcher } from './fetcher'

export interface PaginationParams {
  pageNumber: number
  pageSize: number
  orderBy: string
  isAsc: boolean
}

export interface PaginationMetadata {
  data: any
  has_next: boolean
  has_prev: boolean
  page: number
  size: number
  total_items: number
}

export async function GetSessionPagination(params: PaginationParams, customConfig?: AxiosRequestConfig): Promise<PaginationMetadata> {
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
