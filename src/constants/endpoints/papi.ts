const PAPI = {
  ACCOUNTS: '/accounts',
  CREATE_NEW_ACCOUNT: '/accounts/create',
  QUERY_ACCOUNTS: '/accounts/query',
  UPDATE_ACCOUNT: '/accounts/update',

  ACCOUNT_SESSION: '/account-session',
  RENEW_SESSION: '/account-session/renewal',

  AVAILABLE_ACCOUNTS: '/available-accounts',
  CREATE_AVAILABLE_ACCOUNT: '/available-accounts/create',
  UPDATE_AVAILABLE_ACCOUNT: '/available-accounts/update',

  BLOCKED_ACCOUNTS: '/forbidden-accounts',
  CREATE_BLOCKED_ACCOUNT: '/forbidden-accounts/create',
  UPDATE_BLOCKED_ACCOUNT: '/forbidden-accounts/update',

  ACCOUNTS_ERROR: '/handlers',
  QUERY_ACCOUNTS_ERROR: '/handlers/query',

  DASHBOARD_HISTORY: '/api/dashboard_reports',
  HASHTAG_HISTORY: '/api/history/image-to-hashtag',
  UPDATE_HISTORY: '/api/posts',

  //label
  LABEL_IMAGE: '/api/image/labels',
} as const

export default PAPI
