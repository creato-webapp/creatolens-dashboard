import { DropdownOption } from '@components/Form/DropdownV2'

export const IMAGE_STYLE = {
  GENERAL: {
    name: 'General',
    value: 'GENERAL',
    image: '/hashtag/general.png', // Update with actual path or URL
  },
  GRAPHIC_DESIGN: {
    name: 'Graphic Design',
    value: 'GRAPHIC_DESIGN',
    image: '/hashtag/graphic-design.png', // Update with actual path or URL
  },
  STOCK_IMAGE: {
    name: 'Stock Image',
    value: 'STOCK_IMAGE',
    image: '/hashtag/stock.png', // Update with actual path or URL
  },
  WEBSITE_DESIGN: {
    name: 'Website Design',
    value: 'WEBSITE_DESIGN',
    image: '/hashtag/website-design.png', // Update with actual path or URL
  },
} as const

export type ImageStyleKeys = keyof typeof IMAGE_STYLE

export type IImageStyleType =
  | typeof IMAGE_STYLE.GENERAL
  | typeof IMAGE_STYLE.GRAPHIC_DESIGN
  | typeof IMAGE_STYLE.STOCK_IMAGE
  | typeof IMAGE_STYLE.WEBSITE_DESIGN

export const IMAGE_ASPECT_RATIOS = {
  SQUARE: { label: 'Square', value: '1:1', width: 1, height: 1 },
  LANDSCAPE_16_9: { label: 'Landscape 16:9', value: '16:9', width: 16, height: 9 },
  PORTRAIT_9_16: { label: 'Portrait 9:16', value: '9:16', width: 9, height: 16 },
  LANDSCAPE_4_3: { label: 'Landscape 4:3', value: '4:3', width: 4, height: 3 },
  PORTRAIT_3_4: { label: 'Portrait 3:4', value: '3:4', width: 3, height: 4 },
}

export const IMAGE_CATEGORY: ImageCategoryType = {
  LIGHTING: {
    templateType: ['GENERAL', 'GRAPHIC_DESIGN', 'STOCK_IMAGE', 'WEBSITE_DESIGN'],
    label: 'Lighting',
    key: 'lighting',
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
    templateType: ['GENERAL', 'WEBSITE_DESIGN'],
    label: 'Environment',
    key: 'environment',
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
    templateType: ['GENERAL', 'GRAPHIC_DESIGN', 'STOCK_IMAGE', 'WEBSITE_DESIGN'],
    label: 'Color Scheme',
    key: 'color_scheme',
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
    templateType: ['GENERAL', 'GRAPHIC_DESIGN', 'STOCK_IMAGE'],
    label: 'Point of View',
    key: 'point_of_view',
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
    templateType: ['GENERAL', 'GRAPHIC_DESIGN', 'STOCK_IMAGE'],
    label: 'Camera Angle',
    key: 'camera_angle',
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
    templateType: ['GENERAL', 'GRAPHIC_DESIGN', 'STOCK_IMAGE', 'WEBSITE_DESIGN'],
    label: 'Lens Type',
    key: 'lens_type',
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
    templateType: ['GENERAL', 'GRAPHIC_DESIGN', 'STOCK_IMAGE', 'WEBSITE_DESIGN'],
    label: 'Background',
    key: 'background',
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
    templateType: ['GENERAL', 'GRAPHIC_DESIGN', 'STOCK_IMAGE', 'WEBSITE_DESIGN'],
    label: 'Mood',
    key: 'mood',
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
    templateType: ['GENERAL', 'GRAPHIC_DESIGN', 'STOCK_IMAGE', 'WEBSITE_DESIGN'],
    label: 'Theme',
    key: 'theme',
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
    key: 'general',
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
    templateType: ['GENERAL', 'WEBSITE_DESIGN'],
    label: 'Action and Movement',
    key: 'action_and_movement',
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

type Modifier = {
  label: string
  options: DropdownOption[]
  templateType: ImageStyleKeys[]
  key: string
}

export type ImageCategoryType = {
  [key: string]: Modifier
}
