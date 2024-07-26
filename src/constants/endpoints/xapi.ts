const XAPI_PREFIX = `/api/`

const XAPI = {
  CREATE_NEW_ACCOUNT: `${XAPI_PREFIX}accounts`,
  ACCOUNT: `${XAPI_PREFIX}accounts/`,
  GET_ACCOUNTS: `${XAPI_PREFIX}accounts/query`,

  ACCOUNT_SESSION: `${XAPI_PREFIX}accounts/session/`,
  GET_ACCOUNT_SESSION_PAGINATION: `${XAPI_PREFIX}accounts/session`,

  ACCOUNT_ERRORS: `${XAPI_PREFIX}accounts/error`,

  BLOCKED_ACCOUNT: `${XAPI_PREFIX}accounts/blocked/`,
  GET_BLOCKED_ACCOUNTS: `${XAPI_PREFIX}accounts/blocked/query`,

  AVAILABLE_ACCOUNT: `${XAPI_PREFIX}accounts/retry/`,
  GET_AVAILABLE_ACCOUNTS: `${XAPI_PREFIX}accounts/retry/query`,
  GET_AVAILABLE_ACCOUNTS_PAGINATION: `${XAPI_PREFIX}accounts/retry`,

  ANNOTATE_LABELS: `${XAPI_PREFIX}image/labels`,
  HASHTAG: `${XAPI_PREFIX}hashtags`,

  DASHBOARD: `${XAPI_PREFIX}dashboard`,
  DASHBOARD_KEYWORDS: `${XAPI_PREFIX}dashboard/keyword`,
  DASHBOARD_POST_COUNT: `${XAPI_PREFIX}dashboard/postCount`,
  DASHBOARD_PROFILE: `${XAPI_PREFIX}dashboard/instaProfile`,
  DASHBOARD_POST_IMAGE: `${XAPI_PREFIX}dashboard/instapostImage`,
} as const

export default XAPI
