import { useRemoteConfig } from './useRemoteConfig'
import { ImageCategoryType } from 'src/constants/imageStyle';

type PromptModifier = {
  [key: string]: {
    label: string
    options: Array<{
      label: string
      value: string | number
    }>
  }
}

type ImageAspectRatioType = {
  [key: string]: {
    label: string
    value: string
    width: number
    height: number
  }
}

type ImageCategoryType = {
  [key: string]: {
    label: string
    options: Array<{
      label: string
      value: string
    }>
  }
}

type ImageUsageType = {
  [key: string]: string
}

type SocialMediaPlatformsType = Array<string>

export const usePromptTemplate = () => {
  const { configValue: ImageAspectRatios } = useRemoteConfig<ImageAspectRatioType>('IMAGE_ASPECT_RATIOS')
  const { configValue: ImageCategories } = useRemoteConfig<ImageCategoryType>('IMAGE_CATEGORY')
  const { configValue: ImageStyles } = useRemoteConfig<PromptModifier>('IMAGE_STYLE')
  const { configValue: ImageUsages } = useRemoteConfig<ImageUsageType>('IMAGE_USAGE')
  const { configValue: SocialMediaPlatforms } = useRemoteConfig<SocialMediaPlatformsType>('SOCIAL_MEDIA_PLATFORMS')

  return { ImageAspectRatios, ImageCategories, ImageStyles, ImageUsages, SocialMediaPlatforms }
}
