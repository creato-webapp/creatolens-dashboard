import { ImageUsageType, SOCIAL_MEDIA_PLATFORMS } from '@constants/imageStyle'

import fetcher from '@helpers/fetcher'
import { IHashet } from 'pages/recommendation'

interface PromptData {
  hashtags: IHashet[]
  keywords: string
  imageStyle: string
  aspectRatio: string
  platform: keyof typeof SOCIAL_MEDIA_PLATFORMS
  usage: keyof ImageUsageType
}

type ApiResponse = {
  signed_urls: string[]
}

export async function renderPromptAndGenImage(prompt: keyof ImageUsageType, data: PromptData): Promise<{ signed_urls: string[] }> {
  try {
    const response = await fetcher.POST<ApiResponse>('/api/image/prompt', data, {
      params: {
        prompt_type: prompt,
      },
    })

    return response
  } catch (error) {
    console.error('Error generating prompt or calling API:', error)
    throw error
  }
}
