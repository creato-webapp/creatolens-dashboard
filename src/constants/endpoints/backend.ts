const ENDPOINT_BACKEND = {
  ACCOUNTS: '/accounts',
  CREATE_NEW_ACCOUNT: '/accounts/create',
  QUERY_ACCOUNTS: '/accounts/query',
  ACCOUNTS_PAGINATION: '/accounts',
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
} as const

export default ENDPOINT_BACKEND
