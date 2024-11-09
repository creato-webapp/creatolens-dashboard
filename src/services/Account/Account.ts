//TODO write Get, Gets, Update,
import { AxiosRequestConfig } from 'axios'

import { IAccount } from '@components/Account/Account'
import XAPI from '@constants/endpoints/xapi'
import { IAccountStatusType } from '@constants/status'

import { PaginationMetadata, PaginationParams } from './AccountInterface'

import { CountryEnum } from '../../enums/CountryCodeEnums'
import fetcher from '../../helpers/fetcher'

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
  status: IAccountStatusType
  updated_at: string
  created_by: string
}>

function generateAccountFilter(account: PartialAccount): string {
  const filters = []

  if (account?.id) {
    filters.push(`id = "${account.id}"`)
  }
  if (account?.username) {
    filters.push(`username = "${account.username}"`)
  }
  if (account?.created_at) {
    filters.push(`created_at = "${account.created_at}"`)
  }
  if (account?.enabled !== undefined) {
    filters.push(`enabled = ${account.enabled}`)
  }
  if (account?.is_authenticated !== undefined) {
    filters.push(`is_authenticated = ${account.is_authenticated}`)
  }
  if (account?.is_occupied !== undefined) {
    filters.push(`is_occupied = ${account.is_occupied}`)
  }
  if (account?.last_login_dt) {
    filters.push(`last_login_dt = "${account.last_login_dt}"`)
  }
  if (account?.login_attempt_count !== undefined) {
    filters.push(`login_attempt_count = ${account.login_attempt_count}`)
  }
  if (account?.login_count !== undefined) {
    filters.push(`login_count = ${account.login_count}`)
  }
  if (account?.post_scrapped_count !== undefined) {
    filters.push(`post_scrapped_count = ${account.post_scrapped_count}`)
  }
  if (account?.pwd) {
    filters.push(`pwd = "${account.pwd}"`)
  }
  if (account?.status) {
    filters.push(`status = "${account.status}"`)
  }
  if (account?.updated_at) {
    filters.push(`updated_at = "${account.updated_at}"`)
  }
  if (account?.created_by) {
    filters.push(`created_by == ${account.created_by}`)
  }
  return filters.join(' && ')
}

export async function createAccount(username: string, password: string, customConfig?: AxiosRequestConfig) {
  const response = await fetcher.POST<IAccount, { username: string; password: string }>(
    `/api/accounts`,
    {
      username: username,
      password: password,
    },
    customConfig
  )
  return response
}

export async function getAccount(id: string, customConfig?: AxiosRequestConfig): Promise<IAccount> {
  const response = await fetcher.GET<IAccount>(XAPI.ACCOUNT + id, customConfig)
  return response
}

export async function getFilteredAccounts(
  params: { account?: Partial<IAccount>; orderBy?: string; isAsc?: boolean },
  customConfig?: AxiosRequestConfig
): Promise<IAccount[]> {
  const filterData = params.account && generateAccountFilter(params.account)
  const response = await fetcher.GET<IAccount[]>(XAPI.GET_ACCOUNTS, {
    ...customConfig,
    params: {
      orderBy: params.orderBy,
      isAsc: params.isAsc,
      filter: filterData,
    },
  })
  return response
}
export async function getAccounts(params: PaginationParams, customConfig?: AxiosRequestConfig) {
  const response = await fetcher.GET<PaginationMetadata<IAccount[]>>(XAPI.ACCOUNT, {
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
