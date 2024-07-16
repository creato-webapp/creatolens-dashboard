import { useEffect, useState } from 'react'

import { useRemoteConfig } from './useRemoteConfig'

type PromptModifier = {
  [key: string]: {
    label: string
    options: Array<{
      label: string
      value: string | number
    }>
  }
}

export const usePromptTemplate = () => {
  const { configValue: ImageAspectRatios } = useRemoteConfig<PromptModifier>('IMAGE_ASPECT_RATIOS')
  const { configValue: ImageCategories } = useRemoteConfig<PromptModifier>('IMAGE_CATEGORY')
  const { configValue: ImageStyles } = useRemoteConfig<PromptModifier>('IMAGE_STYLE')
  const { configValue: ImageUsages } = useRemoteConfig<PromptModifier>('IMAGE_USAGE')
  const { configValue: SocialMediaPlatforms } = useRemoteConfig<PromptModifier>('SOCIAL_MEDIA_PLATFORMS')
  
  


  return { ImageAspectRatios, ImageCategories, ImageStyles, ImageUsages, SocialMediaPlatforms }
}
