import Mustache from 'mustache'

import { IMAGE_USAGE } from 'src/constants/imageStyle'

import { Fetcher } from './fetcher'

import { PROMPT_TEMPLATE } from '../constants/promptTemplate'

interface PromptData {
  Stock_image_modifier?: string
  labels: string
  hashtags?: string
  General_Modifiers?: string
  social_mediaType?: string
  Presentation_Modifiers?: string
}

type ApiResponse = {
    signed_urls: string[]
}

export const USAGE_PROMPT_MAP = {
  [IMAGE_USAGE.SOCIAL_MEDIA]: PROMPT_TEMPLATE.SOCIAL_MEDIA_PLATFORMS,
  [IMAGE_USAGE.WEBSITE]: PROMPT_TEMPLATE.WEBSITE_DESIGN,
}

export async function renderPromptAndGenImage(promptType: keyof typeof USAGE_PROMPT_MAP, data: PromptData): Promise<{ signed_urls: string[] }> {
  try {
    const template = USAGE_PROMPT_MAP[promptType]
    const renderedPrompt = Mustache.render(template, { ...data })

    const response = await Fetcher.POST<ApiResponse>('/api/image/generate', { prompt: renderedPrompt })

    return response
  } catch (error) {
    console.error('Error generating prompt or calling API:', error)
    throw error
  }
}
