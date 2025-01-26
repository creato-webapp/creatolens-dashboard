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
  BLOG: '/blog',
  //static
  STATIC_DASHBOARD: '/features/instagram-trend-analysis',
  STATIC_ACCOUNTS: '/features/instabot',
  STATIC_RECOMMENDATION: '/features/hashtags-recommendation',
  STATIC_HASHTAG_TO_IMAGE: '/features/hashtags-to-image',
  STATIC_IMAGE_TO_HASHTAG: '/features/image-to-hashtags',
} as const

export default ROUTE
