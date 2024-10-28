import type { NextApiRequest, NextApiResponse } from 'next'

import { IPromptType, PROMPT_TEMPLATE } from '@constants/prompt'

import { remoteConfig } from '@helpers/firebase/admin'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { NotFoundError, ValidationError } from '@services/error'

const INITIAL_CONFIG = {
  defaultConfig: PROMPT_TEMPLATE,
}

type mapper = {
  [key in IPromptType]?: string
}

const MAPPER_TEMPLATE_TYPE = 'MAPPER_TEMPLATE_TYPE'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const promptType = req.query.prompt_type as IPromptType

    if (!promptType) {
      throw new ValidationError('Prompt type is required')
    }
    const template = await remoteConfig.getServerTemplate(INITIAL_CONFIG)

    const serverConfig = template.evaluate()
    const promptMapperString = serverConfig.getString(MAPPER_TEMPLATE_TYPE)
    const promptMapper: mapper = JSON.parse(promptMapperString)
    if (!promptMapper) {
      throw new NotFoundError('Prompt mapper is required')
    }
    const prompt = serverConfig.getString(promptMapper[promptType]!)
    if (!prompt) {
      throw new NotFoundError('Prompt mapper is required')
    }
    return res.status(200).json(prompt)
  },
})
