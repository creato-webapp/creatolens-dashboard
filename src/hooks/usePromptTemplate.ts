import { useRemoteStringConfig } from './useRemoteConfig'

export const usePromptTemplate = () => {
  // const { configValue: ImageAspectRatios } = useRemoteConfig>('IMAGE_ASPECT_RATIOS')
  const { config: imageCategories } = useRemoteStringConfig('IMAGE_CATEGORY')
  const { config: imageStyles } = useRemoteStringConfig('IMAGE_STYLE')
  const { config: socialMediaPlatforms } = useRemoteStringConfig('SOCIAL_MEDIA_PLATFORMS')

  return { imageCategories, imageStyles, socialMediaPlatforms }
}
