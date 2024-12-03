import { ImageCategoryType } from '@constants/imageStyle'
import { useRemoteStringConfig } from './useRemoteConfig'

export const usePromptTemplate = () => {
  // const { configValue: ImageAspectRatios } = useRemoteConfig>('IMAGE_ASPECT_RATIOS')
  const { config: imageCategories } = useRemoteStringConfig<ImageCategoryType>('IMAGE_CATEGORY')
  const { config: imageStyles } = useRemoteStringConfig<Record<string, { value: string; image: string; name: string }>>('IMAGE_STYLE')
  const { config: socialMediaPlatforms } = useRemoteStringConfig('SOCIAL_MEDIA_PLATFORMS')

  return { imageCategories, imageStyles, socialMediaPlatforms }
}
