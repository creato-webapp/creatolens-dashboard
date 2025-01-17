import { AxiosRequestConfig } from 'axios'

import fetcher from '../helpers/fetcher'
import XAPI from '@constants/endpoints/xapi'
import { IHashet } from 'pages/recommendation'
import { ImageAspectRatioListType } from '@components/Hashtag/ImageGen/ImageAspect'
import { ImageStyleProps } from '@components/Hashtag/ImageGen/ImageStyle'
import { ImageCategoryListType } from '@components/Hashtag/ImageGen/ImageCategory'

const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_MODIFIERS_STORAGE_URL
const ENDPOINTS = {
  IMAGE_MODIFIERS: 'image-modifiers',
  ASPECT_RATIO: 'aspect-ratio',
  IMAGE_TYPE: 'image-type',
} as const
type ImageOption = { label: string; value: string; image: string }

export async function getHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await fetcher.GET<{ data: IHashet[] }>(XAPI.HASHTAG, {
    ...customConfig,
    params: {
      recommend: input,
    },
  })
  return response
}

export async function getImageHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await fetcher.GET<{ data: IHashet[] }>(`/api/blob`, {
    ...customConfig,
    params: {
      input,
    },
  })
  return response
}

const buildImageUrl = (category: string, value: string): string => `${STORAGE_BASE_URL}${category}/${value}.png`

export const getModifiersImage = (imageCategories: ImageCategoryListType) => {
  return Object.entries(imageCategories).map(([_, category]) => ({
    ...category,
    label: category.label,
    options: category.options.map((option) => ({
      ...option,
      image: buildImageUrl(`${ENDPOINTS.IMAGE_MODIFIERS}/${category.key}`, option.value.toString()),
    })),
  }))
}

export const getAspectImage = (imageAspectRatios: ImageAspectRatioListType): ImageOption[] =>
  Object.values(imageAspectRatios).map((aspect) => ({
    label: aspect.label,
    value: aspect.value,
    image: buildImageUrl(ENDPOINTS.ASPECT_RATIO, aspect.value.replace(':', '-')),
  }))

export const getImageStyle = (imageStyles: ImageStyleProps): ImageOption[] =>
  Object.values(imageStyles).map((style) => ({
    label: style.label,
    value: style.value,
    image: buildImageUrl(ENDPOINTS.IMAGE_TYPE, style.value.toString().replace('_', '-')),
  }))
