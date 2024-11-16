const ROUTE = {
  GUIDE: '/guide',
  ACCOUNTS: '/accounts',
  ACCOUNT_BOT_GET: '/accounts/bot/[id]',
  ACCOUNT_BOT_CREATE: 'accounts/bot/new',
  RECOMMENDATION: '/recommendation',
  DASHBOARD: '/dashboard',
  IMAGE_TO_HASHTAG: '/hashtags/image-to-hashtags',
  HASHTAG_TO_IMAGE: '/hashtags/hashtags-to-image',
  CONTACT_US: '/contact-us',
  FAQ: '/faqs',
} as const

export default ROUTE
