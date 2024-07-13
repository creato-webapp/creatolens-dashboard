//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'

import { IAccountError } from '@components/Account/AccountErrors/interface'
import ENDPOINT_FRONTEND from '@constants/endpoints/frontend'

import { PaginationMetadata, PaginationParams } from './AccountInterface'

import fetcher from '../../helpers/fetcher'

interface ExtendedPaginationParams extends PaginationParams {
  username?: string
}
export async function getErrorPagination(params: ExtendedPaginationParams, customConfig?: AxiosRequestConfig) {
  const response = await fetcher.GET<PaginationMetadata<IAccountError[]>>(ENDPOINT_FRONTEND.ACCOUNT_ERRORS, {
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
