import type { NextApiRequest, NextApiResponse } from 'next'

import PROMPT_TYPE, { IPromptType } from 'src/constants/prompt'

import { remoteConfig } from '../../utils/backend/firebaseAdmin'

const INITIAL_CONFIG = {
  defaultConfig: {
    [PROMPT_TYPE.PROMPT_TEMPLATE_GENERAL]:
      '{#isGeneralPrompt}} Generate a {{stockImageModifier}} with content of {{labels}} which match {{hashtags}}. {{/isGeneralPrompt}}',
    [PROMPT_TYPE.PROMPT_TEMPLATE_LOGO_DESIGN]:
      '{{#isLogoDesign}}{ "negative_prompt": "T-shirt, human, photoframe, poster frame, background, complicated", "prompt": "simple, plain flat design, A {{General_Modifiers}} and {{labels}} which match {{hashtags}}" }{{/isLogoDesign}}',
    [PROMPT_TYPE.PROMPT_TEMPLATE_SOCIAL_MEDIA]:
      '{{#isSocialMediaPost}} {{labels}} in {{General_Modifiers}}. In {{social_mediaType}} context {{/isSocialMediaPost}}',
    [PROMPT_TYPE.PROMPT_TEMPLATE_STOCK_IMAGE]:
      '{{#isStockImage}} {{Stock_image_modifier}} of {{labels}}, to be used in {{Presentation_Modifiers}} {{/isStockImage}}',

    [PROMPT_TYPE.PROMPT_TEMPLATE_WEBSITE_DESIGN]:
      '{{#isWebsiteDesign}}A {{labels}} in emoji style, 2d, IOS App icon style, simplelist, white background, minimalistic and match {{hashtags}} {{/isWebsiteDesign}}',
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const promptType = req.query.prompt_type as IPromptType
        const template = remoteConfig.initServerTemplate(INITIAL_CONFIG)
        await template.load()
        const serverConfig = template.evaluate()
        const generalPrompt = serverConfig.getString(promptType)
        return res.status(200).json(generalPrompt)
      } catch (error) {
        return res.status(500).send({ error: 'Failed to get the Remote Config template' })
      }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
