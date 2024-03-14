//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'
import { Fetcher } from '../fetcher'
import { IAccount } from '@lib/Account/Account'
import { CountryEnum } from '../../enums/CountryCodeEnums'
import { PaginationParams, PaginationMetadata } from './AccountInterface'
interface Cookies {
  [key: string]: string
}

type PartialAccount = Partial<{
  id: string
  username: string
  created_at: string
  enabled: boolean
  is_authenticated: boolean
  is_occupied: boolean
  last_login_dt: string
  location?: CountryEnum
  login_attempt_count: number
  login_count: number
  post_scrapped_count: number
  pwd: string
  session_cookies: Cookies
  status: 'active' | 'blocked' | 'banned' | 'retry' | 'test' | 'scrapping' | 'occupied'
  updated_at: string
}>

export function generateAccountFilter(account: PartialAccount): string {
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

export async function CreateAccount(account: IAccount, customConfig?: AxiosRequestConfig): Promise<IAccount> {
  const response = await Fetcher.POST(`/api/accounts`, account, customConfig)
  return response
}

export async function GetAccount(id: string, customConfig?: AxiosRequestConfig): Promise<IAccount> {
  const response = await Fetcher.GET(`/api/accounts/${id}`, customConfig)
  return response
}

export async function GetAccounts(account?: Partial<IAccount>, orderBy?: string, isAsc?: boolean): Promise<IAccount[]> {
  const response = await Fetcher.GET(`/api/accounts/query`, {
    params: { filter: account ? generateAccountFilter(account) : null, orderby: orderBy, isAsc: isAsc },
  })
  return response
}

export async function GetAccountsPagination(params: PaginationParams, customConfig?: AxiosRequestConfig): Promise<PaginationMetadata<IAccount[]>> {
  const response = await Fetcher.GET(
    `/api/accounts`,
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

interface SessionUpdateResponse {
  success: boolean
  message?: string
  // Include other fields expected in the response
}

export async function UpdateAccount(id: string, updatedAccount: IAccount, customConfig?: AxiosRequestConfig): Promise<IAccount> {
  const res = await Fetcher.PATCH(`/api/accounts/${id}`, updatedAccount, { ...customConfig, params: { id: updatedAccount.id } })
  return res
}

export async function UpdateSession(id: string, updatedAccount: IAccount, customConfig?: AxiosRequestConfig): Promise<SessionUpdateResponse> {
  const res = await Fetcher.POST<{
    username: string
    password: string
    account_id: string
  }>(
    `/api/accounts/session/${id}`,
    {
      username: updatedAccount.username,
      password: updatedAccount.pwd,
      account_id: updatedAccount.id,
    },
    { ...customConfig }
  )
  return res
}
