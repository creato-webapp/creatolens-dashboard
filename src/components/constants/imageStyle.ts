export const IMAGE_STYLE = {
  GRAPHIC_DESIGN: {
    name: 'Graphic Design',
    value: 'graphic_design',
    image: '/logo_orange.png', // Update with actual path or URL
  },
  STOCK_IMAGE: {
    name: 'Stock Image',
    value: 'stock_image',
    image: '/logo_orange.png', // Update with actual path or URL
  },
  ARTISTIC: {
    name: 'Artistic',
    value: 'artistic',
    image: '/logo_orange.png', // Update with actual path or URL
  },
  PHOTOGRAPHY: {
    name: 'Photography',
    value: 'photography',
    image: '/logo_orange.png', // Update with actual path or URL
  },
} as const

export type IImageStyleType =
  | typeof IMAGE_STYLE.GRAPHIC_DESIGN
  | typeof IMAGE_STYLE.STOCK_IMAGE
  | typeof IMAGE_STYLE.ARTISTIC
  | typeof IMAGE_STYLE.PHOTOGRAPHY

export const IMAGE_USAGE = {
  SOCIAL_MEDIA: 'Social Media',
  WEBSITE: 'Website',
} as const

export const SOCIAL_MEDIA_PLATFORMS = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'TikTok', 'Snapchat']

export type IImageUsageType = typeof IMAGE_USAGE.SOCIAL_MEDIA | typeof IMAGE_USAGE.WEBSITE

export const IMAGE_ASPECT_RATIOS = {
  SQUARE: { label: 'Square', value: '1:1', width: 1, height: 1 },
  LANDSCAPE_16_9: { label: 'Landscape 16:9', value: '16:9', width: 16, height: 9 },
  PORTRAIT_9_16: { label: 'Portrait 9:16', value: '9:16', width: 9, height: 16 },
  LANDSCAPE_4_3: { label: 'Landscape 4:3', value: '4:3', width: 4, height: 3 },
  PORTRAIT_3_4: { label: 'Portrait 3:4', value: '3:4', width: 3, height: 4 },
}

export const GENERAL = {
  LIGHTING: {
    label: 'Lighting',
    options: [
      {
        value: 'soft',
        label: 'Soft',
      },
      {
        value: 'ambient',
        label: 'Ambient',
      },
      {
        value: 'ring light',
        label: 'Right Light',
      },
    ],
  },
  ENVIRONMENT: {
    label: 'Environment',
    options: [],
  },
  COLOR_SCHEME: {
    label: 'Color Scheme',
    options: [],
  },
  POINT_OF_VIEW: {
    label: 'Point of View',
    options: [],
  },
  CAMERA_ANGLE: {
    label: 'Camera Angle',
    options: [],
  },
  LENS_TYPE: {
    label: 'Lens type',
    options: [],
  },
  BACKGROUND: {
    label: 'Background',
    options: [],
  },
  MOOD: {
    label: 'Mood',
    options: [],
  },
  THEME: {
    label: 'Theme',
    options: [],
  },
  GENERAL: {
    label: 'General',
    options: [],
  },
  ACTION_AND_MOVEMENT: {
    label: 'Action and Movement',
    options: [],
  },
}
