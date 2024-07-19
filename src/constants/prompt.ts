export enum PromptTemplate {
  PROMPT_TEMPLATE_GENERAL = 'PROMPT_TEMPLATE_GENERAL',
  PROMPT_TEMPLATE_LOGO_DESIGN = 'PROMPT_TEMPLATE_LOGO_DESIGN',
  PROMPT_TEMPLATE_SOCIAL_MEDIA = 'PROMPT_TEMPLATE_SOCIAL_MEDIA',
  PROMPT_TEMPLATE_STOCK_IMAGE = 'PROMPT_TEMPLATE_STOCK_IMAGE',
  PROMPT_TEMPLATE_WEBSITE_DESIGN = 'PROMPT_TEMPLATE_WEBSITE_DESIGN',
}

export type IPromptType =
  | typeof PromptTemplate.PROMPT_TEMPLATE_GENERAL
  | typeof PromptTemplate.PROMPT_TEMPLATE_LOGO_DESIGN
  | typeof PromptTemplate.PROMPT_TEMPLATE_SOCIAL_MEDIA
  | typeof PromptTemplate.PROMPT_TEMPLATE_STOCK_IMAGE
  | typeof PromptTemplate.PROMPT_TEMPLATE_WEBSITE_DESIGN

export const PROMPT_TEMPLATE = {
  [PromptTemplate.PROMPT_TEMPLATE_GENERAL]: 'Generate a Image with content of {{labels}} which match {{hashtags}}',
  [PromptTemplate.PROMPT_TEMPLATE_LOGO_DESIGN]:
    '{ "negative_prompt": "T-shirt, human, photoframe, poster frame, background, complicated", "prompt": "simple, plain flat design, A {{General_Modifiers}} and {{labels}} which match {{hashtags}}" }',
  [PromptTemplate.PROMPT_TEMPLATE_SOCIAL_MEDIA]: '{{labels}} in {{General_Modifiers}}. In {{social_mediaType}} context.',
  [PromptTemplate.PROMPT_TEMPLATE_STOCK_IMAGE]: '{{Stock_image_modifier}} of {{labels}}, to be used in {{Presentation_Modifiers}}',
  [PromptTemplate.PROMPT_TEMPLATE_WEBSITE_DESIGN]:
    'A {{labels}} in emoji style, 2d, IOS App icon style, simplelist, white background, minimalistic ,and match {{hashtags}}',
}
