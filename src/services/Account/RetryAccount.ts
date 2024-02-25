//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { Cookies, IRetryAccount } from '@lib/Account/Account/interface'

export interface PaginationParams {
  pageNumber: number
  pageSize: number
  orderBy: string
  isAsc: boolean
}

export interface PaginationMetadata {
  data: IRetryAccount[]
  has_next: boolean
  has_prev: boolean
  page: number
  size: number
  total_items: number
}

type PartialAccount = Partial<{
  id: string
  username: string
  created_at: string
  enabled: boolean
  is_authenticated: boolean
  is_occupied: boolean
  last_login_dt: string
  login_attempt_count: number
  login_count: number
  post_scrapped_count: number
  pwd: string
  session_cookies?: Cookies
  status: 'active' | 'blocked' | 'banned' | 'retry' | 'test' | 'scrapping' | 'occupied'
  updated_at: string
  wait_until: string
  retry_history: string
  retry_count: number
}>

export function generateRetryAccountFilter(account: PartialAccount): string {
  const filters = []

  if (account.id) {
    filters.push(`id = "${account.id}"`)
  }
  if (account.username) {
    filters.push(`username = "${account.username}"`)
  }
  if (account.created_at) {
    filters.push(`created_at = "${account.created_at}"`)
  }
  if (account.enabled !== undefined) {
    filters.push(`enabled = ${account.enabled}`)
  }
  if (account.is_authenticated !== undefined) {
    filters.push(`is_authenticated = ${account.is_authenticated}`)
  }
  if (account.is_occupied !== undefined) {
    filters.push(`is_occupied = ${account.is_occupied}`)
  }
  if (account.last_login_dt) {
    filters.push(`last_login_dt = "${account.last_login_dt}"`)
  }
  if (account.login_attempt_count !== undefined) {
    filters.push(`login_attempt_count = ${account.login_attempt_count}`)
  }
  if (account.login_count !== undefined) {
    filters.push(`login_count = ${account.login_count}`)
  }
  if (account.post_scrapped_count !== undefined) {
    filters.push(`post_scrapped_count = ${account.post_scrapped_count}`)
  }
  if (account.pwd) {
    filters.push(`pwd = "${account.pwd}"`)
  }
  if (account.status) {
    filters.push(`status = "${account.status}"`)
  }
  if (account.updated_at) {
    filters.push(`updated_at = "${account.updated_at}"`)
  }
  return filters.join(' && ')
}

export async function GetRetryAccount(id: string, customConfig?: AxiosRequestConfig): Promise<IRetryAccount> {
  const response = await Fetcher.GET(`/api/accounts/retry/${id}`, customConfig)
  return response
}

export async function GetRetryAccounts(account?: Partial<IRetryAccount>, orderBy?: string, isAsc?: boolean): Promise<IRetryAccount[]> {
  const response = await Fetcher.GET(`/api/accounts/retry/query`, {
    params: { filter: account ? generateRetryAccountFilter(account) : null, orderby: orderBy, isAsc: isAsc },
  })
  return response
}

export async function GetRetryAccountsPagination(params: PaginationParams, customConfig?: AxiosRequestConfig): Promise<PaginationMetadata> {
  const response = await Fetcher.GET(
    `/api/accounts/retry`,
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

export async function UpdateRetryAccount(id: string, updatedAccount: IRetryAccount, customConfig?: AxiosRequestConfig): Promise<IRetryAccount> {
  const res = await Fetcher.PATCH(`/api/accounts/retry/${id}`, updatedAccount, { ...customConfig, params: { id: updatedAccount.id } })
  return res
}
