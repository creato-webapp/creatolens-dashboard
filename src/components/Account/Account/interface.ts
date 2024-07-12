import { CountryEnum } from 'enums/CountryCodeEnums'

export interface Cookies {
  [key: string]: string
}

//TODO write a account interface that without id
export interface AbstractAccount {
  username: string
  pwd: string
  created_by: string
  updated_by: string
  enabled: boolean
  is_authenticated: boolean
  is_occupied: boolean
  location?: CountryEnum
  last_login_dt: string
  login_attempt_count: number
  login_count: number
  post_scrapped_count: number
  session_cookies?: Cookies
  status: 'active' | 'blocked' | 'banned' | 'retry' | 'test' | 'scrapping' | 'occupied'
  updated_at: string
  created_at: string
}

export interface IAccount {
  id: string
  username: string
  created_at: string
  created_by: string
  updated_by: string
  enabled: boolean
  is_authenticated: boolean
  is_occupied: boolean
  location: CountryEnum
  last_login_dt: string
  login_attempt_count: number
  login_count: number
  post_scrapped_count: number
  pwd: string
  wait_until: string
  session_cookies?: Cookies
  status: 'active' | 'blocked' | 'banned' | 'retry' | 'test' | 'scrapping' | 'occupied'
  updated_at: string
  [key: string]: string | number | boolean | Cookies | undefined // Adding an index signature
}

export interface IBlockedAccount {
  id: string
  username: string
  created_at: string
  banned_at: string
  blocked_at: string
  blocked_count: number
  blocked_reason: string
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
  [key: string]: string | number | boolean | Cookies | undefined // Adding an index signature
}

export interface IRetryAccount {
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
  [key: string]: string | number | boolean | Cookies | undefined // Adding an index signature
}
