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
  IMAGE_HASHTAG_HISTORY: `${XAPI_PREFIX}history`,

  DASHBOARD: `${XAPI_PREFIX}dashboard`,
  DASHBOARD_KEYWORDS: `${XAPI_PREFIX}dashboard/keyword`,
  DASHBOARD_POST_COUNT: `${XAPI_PREFIX}dashboard/postCount`,
  DASHBOARD_PROFILE: `${XAPI_PREFIX}dashboard/instaProfile`,
  DASHBOARD_HISTORY: `${XAPI_PREFIX}dashboard/history`,
  DASHBOARD_POST_IMAGE: `${XAPI_PREFIX}dashboard/instapostImage`,

  SEO_KEYWORDS: `${XAPI_PREFIX}seo/keywords`,
  SEO_HASHTAGS_BY_KEYWORD: `${XAPI_PREFIX}seo/hashtags`,
} as const

export default XAPI
