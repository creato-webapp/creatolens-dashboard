import type { NextApiRequest, NextApiResponse } from 'next'

import { IPromptType, PROMPT_TEMPLATE } from '@constants/prompt'

import { remoteConfig } from '@helpers/firebase/admin'

const INITIAL_CONFIG = {
  defaultConfig: PROMPT_TEMPLATE,
}

type mapper = {
  [key in IPromptType]?: string
}

const MAPPER_TEMPLATE_TYPE = 'MAPPER_TEMPLATE_TYPE'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const promptType = req.query.prompt_type as IPromptType
  switch (method) {
    case 'GET':
      try {
        if (!promptType) {
          return res.status(400).send({ error: 'Prompt type is required' })
        }
        const template = await remoteConfig.getServerTemplate(INITIAL_CONFIG)

        const serverConfig = template.evaluate()
        const promptMapperString = serverConfig.getString(MAPPER_TEMPLATE_TYPE)
        const promptMapper: mapper = JSON.parse(promptMapperString)
        if (!promptMapper) {
          return res.status(404).send({ error: 'Prompt template not found' })
        }
        const prompt = serverConfig.getString(promptMapper[promptType]!)
        if (!prompt) {
          return res.status(404).send({ error: 'Prompt template not found' })
        }
        return res.status(200).json(prompt)
      } catch (error) {
        return res.status(500).send({ error: 'Failed to get the Remote Config template' })
      }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
