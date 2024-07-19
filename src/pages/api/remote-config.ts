import type { NextApiRequest, NextApiResponse } from 'next'

import { IPromptType, PROMPT_TEMPLATE } from '@constants/prompt'

import { remoteConfig } from '@utils/backend/firebaseAdmin'

const INITIAL_CONFIG = {
  defaultConfig: PROMPT_TEMPLATE,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const promptType = req.query.prompt_type as IPromptType
  switch (method) {
    case 'GET':
      try {
        if (!promptType) {
          return res.status(400).send({ error: 'Prompt type is required' })
        }
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
