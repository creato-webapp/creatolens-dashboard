import { DropdownOption } from '@components/Form/DropdownV2'

import { PromptTemplate } from './prompt'

export const IMAGE_STYLE = {
  GRAPHIC_DESIGN: {
    name: 'Graphic Design',
    value: 'graphic_design',
    image: '/hashtag/graphic-design.png', // Update with actual path or URL
  },
  STOCK_IMAGE: {
    name: 'Stock Image',
    value: 'stock_image',
    image: '/hashtag/stock.png', // Update with actual path or URL
  },
  ARTISTIC: {
    name: 'Artistic',
    value: 'artistic',
    image: '/hashtag/artistic.png', // Update with actual path or URL
  },
  PHOTOGRAPHY: {
    name: 'Photography',
    value: 'photography',
    image: '/hashtag/photography.png', // Update with actual path or URL
  },
} as const

export type IImageStyleType =
  | typeof IMAGE_STYLE.GRAPHIC_DESIGN
  | typeof IMAGE_STYLE.STOCK_IMAGE
  | typeof IMAGE_STYLE.ARTISTIC
  | typeof IMAGE_STYLE.PHOTOGRAPHY

export const IMAGE_USAGE = {
  GENERAL: PromptTemplate.PROMPT_TEMPLATE_GENERAL,
  SOCIAL_MEDIA: PromptTemplate.PROMPT_TEMPLATE_SOCIAL_MEDIA,
  LOGO_DESIGN: PromptTemplate.PROMPT_TEMPLATE_LOGO_DESIGN,
  STOCK_IMAGE: PromptTemplate.PROMPT_TEMPLATE_STOCK_IMAGE,
  WEBSITE_DESIGN: PromptTemplate.PROMPT_TEMPLATE_WEBSITE_DESIGN,
} as const

export type ImageUsageType = typeof IMAGE_USAGE

export type ImageUsageTypeKey = keyof typeof IMAGE_USAGE

export enum SOCIAL_MEDIA_PLATFORMS {
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  TikTok = 'TikTok',
  Snapchat = 'Snapchat',
}

export const IMAGE_ASPECT_RATIOS = {
  SQUARE: { label: 'Square', value: '1:1', width: 1, height: 1 },
  LANDSCAPE_16_9: { label: 'Landscape 16:9', value: '16:9', width: 16, height: 9 },
  PORTRAIT_9_16: { label: 'Portrait 9:16', value: '9:16', width: 9, height: 16 },
  LANDSCAPE_4_3: { label: 'Landscape 4:3', value: '4:3', width: 4, height: 3 },
  PORTRAIT_3_4: { label: 'Portrait 3:4', value: '3:4', width: 3, height: 4 },
}

export const IMAGE_CATEGORY: ImageCategoryType = {
  LIGHTING: {
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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
    templateType: ['GENERAL'],
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

type Category = {
  label: string
  options: DropdownOption[]
  templateType: ImageUsageTypeKey[]
}

export type ImageCategoryType = {
  [key: string]: Category
}
