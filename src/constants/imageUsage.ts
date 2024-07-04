export const IMAGE_USAUGE = {
  SOCIAL_MEIDA: 'Social Media',
  WEBSITE: 'Website',
} as const

export const SOCIAL_MEDIA_PLATFORMS = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'TikTok', 'Snapchat']

export type IImageStyleType = typeof IMAGE_USAUGE.SOCIAL_MEIDA | typeof IMAGE_USAUGE.WEBSITE
