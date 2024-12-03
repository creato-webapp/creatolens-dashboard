import { IAccount } from '@components/Account/Account'
import { CountryEnum } from 'enums/CountryCodeEnums'

const INSTABOT_TEMPLATE: IAccount[] = [
  {
    id: 'SWRCOsA1dV08XFlo0DrC',
    username: 'demo001',
    created_at: '2023-05-06 T01:26:37',
    created_by: 'bryan.leung@creatogether.app',
    updated_by: 'bryan.leung@creatogether.app',
    enabled: false,
    is_authenticated: true,
    is_occupied: true,
    location: CountryEnum.HK,
    last_login_dt: '2024-11-15 T01:26:37',
    login_attempt_count: 519,
    login_count: 511,
    post_scrapped_count: 14739,
    pwd: 'pwd',
    wait_until: '2024-11-15 T23:59:59',
    session_cookies: {
      sessionid: '62966494383%3Aetbxqng0c0lBOi%3A28%3AAYfW82AebB6cTUiaB_oQmFSf7cTjCUZ7Apx-kj4iluvhkfooddng',
    },
    status: 'active',
    updated_at: '2024-11-15 T01:26:37',
    profile_id: '62966494383',
  },
  {
    id: '7al0EIeaO4U4pvhYIM3Z',
    username: 'demo002',
    created_at: '2023-05-07 T06:17:22',
    created_by: 'bryan.leung@creatogether.app',
    updated_by: 'bryan.leung@creatogether.app',
    enabled: false,
    is_authenticated: true,
    is_occupied: false,
    location: CountryEnum.CA,
    last_login_dt: '2024-10-22 T19:00:00',
    login_attempt_count: 599,
    login_count: 588,
    post_scrapped_count: 16625,
    pwd: 'pwd',
    wait_until: '2024-11-15 T23:59:59',
    session_cookies: {
      sessionid: '63212857914%3AeMq0wAtNU1pZ4B%3A8%3AAYcbJOfH5Wk-YMjlVbyLh5hTylenolgun5bPphEuOZHwaEKRz6KA',
    },
    status: 'retry',
    updated_at: '2024-11-15T01:00:19',
    profile_id: '63212857914',
  },
  {
    id: '7Yf88la9ynCuEESN8QWh',
    username: 'demo003',
    created_at: '2023-03-07 T15:40:52',
    created_by: 'bryan.leung@creatogether.app',
    updated_by: 'bryan.leung@creatogether.app',
    enabled: true,
    is_authenticated: true,
    is_occupied: true,
    location: CountryEnum.HK,
    last_login_dt: '2023-03-07 T15:40:52',
    login_attempt_count: 598,
    login_count: 591,
    post_scrapped_count: 19793,
    pwd: 'pwd',
    wait_until: '2024-11-15 T23:59:59',
    session_cookies: {
      sessionid: '62017053088%3A6h6jO6RxQEoiV5%3A23%3AAYe0az0c3Bd_KrbZtkbW4aJWu4GQVCjFKtLKflytravel2021KGh2KQ',
    },
    status: 'active',
    updated_at: '2024-11-15T00:40:16',
  },
]

export const InstabotMapper = {
  iluvhkfood: 'demo001',
  Tylenolgun: 'demo002',
  flytravel2021: 'demo003',
} as const

export default INSTABOT_TEMPLATE
