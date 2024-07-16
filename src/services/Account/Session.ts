//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'

import XAPI from '@constants/endpoints/xapi'
import { IAccountSession } from 'pages/accounts/session'

import fetcher from '../../helpers/fetcher'

export interface PaginationParams {
  pageNumber: number
  pageSize: number
  orderBy: string
  isAsc: boolean
}

export interface PaginationMetadata<T = unknown> {
  data: T
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
  const response = await fetcher.GET<PaginationMetadata<IAccountSession[]>>(XAPI.GET_ACCOUNT_SESSION_PAGINATION, {
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
