//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'

import { IAccountError } from '@components/Account/AccountErrors/interface'

import { PaginationMetadata, PaginationParams } from './AccountInterface'

import { Fetcher } from '../fetcher'

export async function getErrorPagination(params: PaginationParams, customConfig?: AxiosRequestConfig) {
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
