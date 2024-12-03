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
        label: 'Ring Light',
      },
      {
        value: 'neon',
        label: 'Neon',
      },
    ],
  },
  ENVIRONMENT: {
    label: 'Environment',
    options: [
      {
        value: 'indoor',
        label: 'Indoor',
      },
      {
        value: 'outdoor',
        label: 'Outdoor',
      },
      {
        value: 'underwater',
        label: 'Underwater',
      },
      {
        value: 'in space',
        label: 'In Space',
      },
    ],
  },
  COLOR_SCHEME: {
    label: 'Color Scheme',
    options: [
      {
        value: 'vibrant',
        label: 'Vibrant',
      },
      {
        value: 'dark',
        label: 'Dark',
      },
      {
        value: 'pastel',
        label: 'Pastel',
      },
      {
        value: 'bright',
        label: 'Bright',
      },
    ],
  },
  POINT_OF_VIEW: {
    label: 'Point of View',
    options: [
      {
        value: 'front',
        label: 'Front',
      },
      {
        value: 'overhead',
        label: 'Overhead',
      },
      {
        value: 'side',
        label: 'Side',
      },
    ],
  },
  CAMERA_ANGLE: {
    label: 'Camera Angle',
    options: [
      {
        value: 'full shot',
        label: 'Full Shot',
      },
      {
        value: 'close up',
        label: 'Close Up',
      },
    ],
  },
  LENS_TYPE: {
    label: 'Lens Type',
    options: [
      {
        value: 'macro lens',
        label: 'Macro Lens',
      },
      {
        value: 'wide angle',
        label: 'Wide Angle',
      },
    ],
  },
  BACKGROUND: {
    label: 'Background',
    options: [
      {
        value: 'solid colour',
        label: 'Solid Colour',
      },
      {
        value: 'nebula',
        label: 'Nebula',
      },
      {
        value: 'forest',
        label: 'Forest',
      },
    ],
  },
  MOOD: {
    label: 'Mood',
    options: [
      {
        value: 'energetic',
        label: 'Energetic',
      },
      {
        value: 'peaceful',
        label: 'Peaceful',
      },
      {
        value: 'joyful',
        label: 'Joyful',
      },
      {
        value: 'chaotic',
        label: 'Chaotic',
      },
      {
        value: 'aggressive',
        label: 'Aggressive',
      },
      {
        value: 'tense',
        label: 'Tense',
      },
    ],
  },
  THEME: {
    label: 'Theme',
    options: [
      {
        value: 'film',
        label: 'Film',
      },
      {
        value: 'noir',
        label: 'Noir',
      },
    ],
  },
  GENERAL: {
    label: 'General',
    options: [
      {
        value: 'masterpiece',
        label: 'Masterpiece',
      },
      {
        value: 'classic',
        label: 'Classic',
      },
      {
        value: 'cinematic',
        label: 'Cinematic',
      },
    ],
  },
  ACTION_AND_MOVEMENT: {
    label: 'Action and Movement',
    options: [
      {
        value: 'cinematic action',
        label: 'Cinematic Action',
      },
      {
        value: 'flying',
        label: 'Flying',
      },
      {
        value: 'speeding',
        label: 'Speeding',
      },
      {
        value: 'running',
        label: 'Running',
      },
      {
        value: 'slow pan',
        label: 'Slow Pan',
      },
      {
        value: 'zoom',
        label: 'Zoom',
      },
    ],
  },
}
