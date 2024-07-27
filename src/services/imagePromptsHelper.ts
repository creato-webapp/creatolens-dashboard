import { ImageStyleKeys } from '@constants/imageStyle'

import fetcher from '@helpers/fetcher'
import { IHashet } from 'pages/recommendation'

interface PromptData {
  aspectRatio: string
  hashtags: IHashet[]
  imageCategory: { [key: string]: string }
  keywords: string
  imageStyle: ImageStyleKeys
}

export async function renderPromptAndGenImage(data: PromptData): Promise<string> {
  try {
    if (!data.imageStyle) {
      throw new Error('No image style selected')
    }

    const response = await fetcher.POST<string>('/api/image/prompt', data, {
      params: {
        prompt_type: data.imageStyle,
      },
    })

    return response
  } catch (error) {
    console.error('Error generating prompt or calling API:', error)
    throw error
  }
}
