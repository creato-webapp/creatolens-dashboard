import { ImageStyleKeys } from '@constants/imageStyle'

import fetcher from '@helpers/fetcher'
import { ImageGenErrorCodeEnums } from 'enums/ImageGenErrorCodeEnums'
import { IHashet } from 'pages/recommendation'

interface PromptData {
  aspectRatio: string
  hashtags: IHashet[]
  imageCategory: { [key: string]: string }
  keywords: string
  imageStyle: ImageStyleKeys
}

interface PromptResponse {
  err_code: ImageGenErrorCodeEnums
}

export async function renderPromptAndGenImage(data: PromptData): Promise<string> {
  if (!data.imageStyle) {
    throw new Error('No image style selected')
  }

  try {
    const response = await fetcher.POST<string | PromptResponse>('/api/image/prompt', data, {
      params: {
        prompt_type: data.imageStyle,
      },
    })

    if (typeof response === 'string') {
      return response
    }

    switch (response.err_code) {
      case ImageGenErrorCodeEnums.SensitiveContentError:
        throw new Error('Sensitive content detected')
      default:
        throw new Error(`Unexpected error code: ${response.err_code}`)
    }
  } catch (error) {
    throw new Error(`Error generating image`)
  }
}
