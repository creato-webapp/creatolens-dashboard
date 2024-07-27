import { useRemoteConfig } from './useRemoteConfig'

import { ImageCategoryType } from '@constants/imageStyle'

type ImageAspectRatioType = {
  [key: string]: {
    label: string
    value: string
    width: number
    height: number
  }
}

type ImageStyleType = {
  [key: string]: {
    name: string
    value: string
    image: string
  }
}

type SocialMediaPlatformsType = Array<string>

export const usePromptTemplate = () => {
  const { configValue: ImageAspectRatios } = useRemoteConfig<ImageAspectRatioType>('IMAGE_ASPECT_RATIOS')
  const { configValue: ImageCategories } = useRemoteConfig<ImageCategoryType>('IMAGE_CATEGORY')
  const { configValue: ImageStyles } = useRemoteConfig<ImageStyleType>('IMAGE_STYLE')
  const { configValue: SocialMediaPlatforms } = useRemoteConfig<SocialMediaPlatformsType>('SOCIAL_MEDIA_PLATFORMS')

  return { ImageAspectRatios, ImageCategories, ImageStyles, SocialMediaPlatforms }
}
