const ENDPOINT_FRONTEND = {
  CREATE_NEW_ACCOUNT: '/api/accounts',
  ACCOUNT: '/api/accounts/',
  GET_ACCOUNTS: '/api/accounts/query',
  GET_ACCOUNTS_PAGINATION: '/api/accounts',

  ACCOUNT_SESSION: '/api/accounts/session/',
  GET_ACCOUNT_SESSION_PAGINATION: '/api/accounts/session',

  ACCOUNT_ERRORS: `/api/accounts/error`,

  BLOCKED_ACCOUNT: '/api/accounts/blocked/',
  GET_BLOCKED_ACCOUNTS: '/api/accounts/blocked/query',

  AVAILABLE_ACCOUNT: '/api/accounts/retry/',
  GET_AVAILABLE_ACCOUNTS: '/api/accounts/retry/query',
  GET_AVAILABLE_ACCOUNTS_PAGINATION: '/api/accounts/retry',

  ANNOTATE_LABELS: '/api/image/labels',
  HASHTAG: '/api/hashtags',

  DASHBOARD: '/api/dashboard',
  DASHBOARD_KEYWORDS: '/api/dashboard/keyword',
  DASHBOARD_POST_COUNT: '/api/dashboard/postCount',
  DASHBOARD_PROFILE: '/api/dashboard/instaProfile',
  DASHBOARD_POST_IMAGE: '/api/dashboard/instapostImage',
} as const

export default ENDPOINT_FRONTEND
