export const PROMPT_TEMPLATE = {
  GENERAL: `{{#isGeneralPrompt}} Generate a {{stockImageModifier}} with content of {{labels}} which match {{hashtags}}. {{/isGeneralPrompt}}`,
  LOGO_DESIGN: `{{#isLogoDesign}}{ "negative_prompt": "T-shirt, human, photoframe, poster frame, background, complicated", "prompt": "simple, plain flat design, A {{General_Modifiers}} and {{labels}} which match {{hashtags}}"}{{/isLogoDesign}}`,
  SOCIAL_MEDIA_PLATFORMS: `{{#isSocialMediaPost}} {{labels}} in {{General_Modifiers}}. In {{social_mediaType}} context {{/isSocialMediaPost}}`,
  STOCK_IMAGE: `{{#isStockImage}} {{Stock_image_modifier}} of {{labels}}, to be used in {{Presentation_Modifiers}} {{/isStockImage}}`,
  WEBSITE_DESIGN: `{{#isWebsiteDesign}}A {{labels}} in emoji style, 2d, IOS App icon style, simplelist, white background, minimalistic and match {{hashtags}} {{/isWebsiteDesign}}`,
} as const
