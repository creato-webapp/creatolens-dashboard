export interface IAccount extends Record<string, string | number | boolean> {
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
  session_cookies?: any
  status:
    | 'active'
    | 'blocked'
    | 'banned'
    | 'retry'
    | 'test'
    | 'scrapping'
    | 'occupied'
  updated_at: string
}
