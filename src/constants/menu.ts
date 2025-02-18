import InstagramIcon from '@components/Icon/InstagramIcon'
import ROUTE from './route'
import SpotifyIcon from '@components/Icon/SpotifyIcon'
import LinkedInIcon from '@components/Icon/LinkedInIcon'
import YoutubeIcon from '@components/Icon/YoutubeIcon'

export type NavLink = {
  readonly name: string
  readonly path: string
  readonly disabled: boolean
}

export const FEATURE_LINKS = [
  { name: 'Instagram Trend Analysis', path: ROUTE.DASHBOARD, disabled: false },
  { name: 'Instabot', path: ROUTE.ACCOUNTS, disabled: false },
  { name: 'Hashtags Recommendation', path: ROUTE.RECOMMENDATION, disabled: false },
  { name: 'Hashtags-to-Image', path: ROUTE.HASHTAG_TO_IMAGE, disabled: false },
  { name: 'Image to Hashtags', path: ROUTE.IMAGE_TO_HASHTAG, disabled: false },
] as const

export const FEATURE_LINKS_STATIC = [
  { name: 'Instagram Trend Analysis', path: ROUTE.STATIC_DASHBOARD, disabled: false },
  { name: 'Instabot', path: ROUTE.STATIC_ACCOUNTS, disabled: false },
  { name: 'Hashtags Recommendation', path: ROUTE.RECOMMENDATION, disabled: false },
  { name: 'Hashtags-to-Image', path: ROUTE.STATIC_HASHTAG_TO_IMAGE, disabled: false },
  { name: 'Image to Hashtags', path: ROUTE.STATIC_IMAGE_TO_HASHTAG, disabled: false },
] as const

export const SUPPORT_LINKS = [
  { name: 'FAQs', path: ROUTE.FAQ, disabled: false },
  { name: 'Terms & Conditions', path: ROUTE.TERMS_AND_CONDITIONS, disabled: false },
  { name: 'Privacy Policy', path: ROUTE.PRIVACY_POLICY, disabled: false },
  { name: 'Contact Us', path: ROUTE.CONTACT_US, disabled: false },
] as const

export const RESOURCE_LINKS = [
  { name: 'Hashtags & Keywords', path: ROUTE.RESOURCE_HASHTAG, disabled: false },
  { name: 'Blog', path: ROUTE.RESOURCE_BLOG, disabled: false },
] as const

export const SIDE_MENU_CONFIG = [
  {
    header: 'Features',
    items: FEATURE_LINKS,
  },
  {
    header: 'Support',
    items: SUPPORT_LINKS,
  },
  {
    header: 'Resources',
    items: RESOURCE_LINKS,
  },
] as const

export const SIDE_MENU_CONFIG_STATIC = [
  {
    header: 'Features',
    items: FEATURE_LINKS_STATIC,
  },
  {
    header: 'Support',
    items: SUPPORT_LINKS,
  },
  {
    header: 'Resources',
    items: RESOURCE_LINKS,
  },
] as const

export const FOOTER_LINKS = [
  {
    header: 'Features',
    items: FEATURE_LINKS,
  },
  {
    header: 'Support',
    items: SUPPORT_LINKS,
  },
  {
    header: 'Resources',
    items: RESOURCE_LINKS,
  },
] as const

export const FOOTER_LINKS_STATIC = [
  {
    header: 'Features',
    items: FEATURE_LINKS_STATIC,
  },
  {
    header: 'Support',
    items: SUPPORT_LINKS,
  },
  {
    header: 'Resources',
    items: RESOURCE_LINKS,
  },
] as const

export const SOCIAL_MEDIA_LINKS = [
  {
    alt: 'Instagram',
    Icon: InstagramIcon,
    href: 'https://www.instagram.com/creatogether.app/',
  },
  {
    alt: 'Linkedin',
    Icon: LinkedInIcon,
    href: 'https://www.linkedin.com/company/creato-edu/',
  },
  {
    alt: 'Spotify',
    Icon: SpotifyIcon,
    href: 'https://open.spotify.com/show/1nOYgPbId7Cq8fQoqXuxf5?si=dceab17fa4c04db5&nd=1&dlsi=9c44e2be6f314145',
  },
  {
    alt: 'Youtube',
    Icon: YoutubeIcon,
    href: 'https://www.youtube.com/@Creatopodcast',
  },
] as const
