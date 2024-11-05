const ROUTE = {
  GUIDE: '/guide',
  ACCOUNTS: '/accounts',
  ACCOUNT_BOT_GET: '/accounts/bot/[id]',
  ACCOUNT_BOT_CREATE: 'accounts/bot/new',
  RECOMMENDATION: '/recommendation',
  DASHBOARD: '/dashboard',
  IMAGE_TO_HASHTAG: '/hashtag/image-to-hashtag',
  HASHTAG_TO_IMAGE: '/hashtag/hashtag-to-image',
  CONTACT_US: '/contact-us',
  FAQ: '/faqs',
} as const

export default ROUTE
