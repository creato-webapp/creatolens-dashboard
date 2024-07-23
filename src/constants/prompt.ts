export const PROMPT_TEMPLATE = {
  PROMPT_TEMPLATE_GENERAL: 'Generate a Image with content of {{labels}} which match {{hashtags}}',
  PROMPT_TEMPLATE_LOGO_DESIGN:
    '{ "negative_prompt": "T-shirt, human, photoframe, poster frame, background, complicated", "prompt": "simple, plain flat design, A {{General_Modifiers}} and {{labels}} which match {{hashtags}}" }',
  PROMPT_TEMPLATE_SOCIAL_MEDIA: '{{labels}} in {{General_Modifiers}}. In {{social_mediaType}} context.',
  PromptTemplate: '{{Stock_image_modifier}} of {{labels}}, to be used in {{Presentation_Modifiers}}',
  PROMPT_TEMPLATE_WEBSITE_DESIGN:
    'A {{labels}} in emoji style, 2d, IOS App icon style, simplelist, white background, minimalistic ,and match {{hashtags}}',
}

export type IPromptType = keyof typeof PROMPT_TEMPLATE
