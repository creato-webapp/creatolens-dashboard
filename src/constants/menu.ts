import ROUTE from './route'

export type NavLink = {
  readonly name: string
  readonly path: string
  readonly disabled: boolean
}

export const FEATURE_LINKS = [
  { name: 'Instagram Trend Analysis', path: ROUTE.DASHBOARD, disabled: false },
  { name: 'Instabot', path: ROUTE.ACCOUNTS, disabled: false },
  { name: 'Recommendation', path: ROUTE.RECOMMENDATION, disabled: true },
  { name: 'Hashtags-to-Image', path: ROUTE.HASHTAG_TO_IMAGE, disabled: false },
  { name: 'Image to Hashtags', path: ROUTE.IMAGE_TO_HASHTAG, disabled: false },
] as const

export const FEATURE_LINKS_STATIC = [
  { name: 'Instagram Trend Analysis', path: ROUTE.STATIC_DASHBOARD, disabled: false },
  { name: 'Instabot', path: ROUTE.STATIC_ACCOUNTS, disabled: false },
  { name: 'Recommendation', path: ROUTE.STATIC_RECOMMENDATION, disabled: false },
  { name: 'Hashtags-to-Image', path: ROUTE.STATIC_HASHTAG_TO_IMAGE, disabled: false },
  { name: 'Image to Hashtags', path: ROUTE.STATIC_IMAGE_TO_HASHTAG, disabled: false },
] as const

export const SUPPORT_LINKS = [
  { name: 'FAQs', path: ROUTE.FAQ, disabled: false },
  { name: 'Contact Us', path: ROUTE.CONTACT_US, disabled: false },
] as const

export const SIDE_MENU_CONFIG = [
  {
    header: 'Features',
    items: FEATURE_LINKS,
  },
  {
    header: 'Support',
    items: [
      { name: 'Contact', path: ROUTE.CONTACT_US, disabled: false },
      { name: 'FAQs', path: ROUTE.FAQ, disabled: false },
      { name: 'Blog', path: ROUTE.BLOG, disabled: false },
    ],
  },
] as const

export const SIDE_MENU_CONFIG_STATIC = [
  {
    header: 'Features',
    items: FEATURE_LINKS_STATIC,
  },
  {
    header: 'Support',
    items: [
      { name: 'Contact', path: ROUTE.CONTACT_US, disabled: false },
      { name: 'FAQs', path: ROUTE.FAQ, disabled: false },
      { name: 'Blog', path: ROUTE.BLOG, disabled: false },
    ],
  },
] as const
