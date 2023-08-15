//TODO write Get, Gets, Update,
import { Fetcher } from './fetcher'
import { IAccount } from '@lib/Account/Account'

export interface PaginationParams {
  pageNumber: number
  pageSize: number
  orderBy: string
  isAsc: boolean
}

export interface PaginationMetadata {
  data: IAccount[]
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
  session_cookies: any
  status: 'active' | 'blocked' | 'banned' | 'retry' | 'test' | 'scrapping' | 'occupied'
  updated_at: string
}>

const localServerUrl = 'http://localhost:3000'

export default class AccountHelper {
  static generateAccountFilter(account: PartialAccount): string {
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

  static async GetAccount(id: string): Promise<IAccount> {
    const response = await Fetcher.GET(`${localServerUrl}/api/accounts/${id}`)
    return response.data
  }

  static async GetAccounts(account?: Partial<IAccount>, orderBy?: string, isAsc?: boolean): Promise<IAccount[]> {
    const response = await Fetcher.GET(`${localServerUrl}/api/accounts/query`, {
      params: { filter: account ? this.generateAccountFilter(account) : null, orderby: orderBy, isAsc: isAsc },
    })
    return response.data
  }

  static async GetAccountsPagination(params: PaginationParams, account?: Partial<IAccount>): Promise<PaginationMetadata> {
    const response = await Fetcher.GET(`${localServerUrl}/api/accounts`, {
      ...(account ? { filter: AccountHelper.generateAccountFilter(account) } : {}),
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      isAsc: params.isAsc,
    })

    return response
  }

  static async UpdateAccount(id: string, updatedAccount: IAccount): Promise<IAccount> {
    const res = await Fetcher.PATCH(`${localServerUrl}/${id}`, updatedAccount, { params: { id: updatedAccount.id } })
    return res.data
  }

  static async UpdateSession(id: string, updatedAccount: IAccount): Promise<any> {
    //TODO Call Helper Function e.g. helperUpdateAccount function
    const res = await Fetcher.POST(`${localServerUrl}/session/${id}`, { username: updatedAccount.username })
    return res.data
  }
}
