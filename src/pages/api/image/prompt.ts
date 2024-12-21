import type { NextApiRequest, NextApiResponse } from 'next'
import { decode } from 'next-auth/jwt'

import { CombinedUser } from '@api/auth/[...nextauth]'

import fetcher from '@helpers/fetcher'
import { renderTemplate } from '@helpers/mustache'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { ImageInstance } from '@helpers/axios'

type PromptData = {
  imageCategory: {
    [key: string]: string
  }
  hashtags: string[]
  keywords: string
  imageStyle: string
  aspectRatio: string
  platform: string
  usage: string
  negativeKeywords: string
}

export default handler.api({
  [METHOD.POST]: async (req: NextApiRequest, res: NextApiResponse) => {
    const { prompt_type } = req.query

    if (!prompt_type) {
      return res.status(400).json({ error: 'Prompt type is required' })
    }

    const body = req.body as PromptData

    const decoded = await decode({
      token: req.cookies['next-auth.session-token'] ?? req.cookies['__Secure-next-auth.session-token'],
      secret: process.env.JWT_SECRET as string,
    })
    const user = decoded?.user as CombinedUser

    const promptTemplate = await fetcher.GET<string>(`/api/remote-config?prompt_type=${prompt_type}`)

    if (!promptTemplate) {
      return res.status(404).json({ error: 'Prompt template not found' })
    }

    const renderedPrompt = renderTemplate(promptTemplate, { labels: body.keywords, ...body.imageCategory })

    const response = await ImageInstance.post<string>(`/api/image-tagen/prompt/image`, {
      prompt: renderedPrompt,
      user_id: user.id,
      aspect_ratio: body.aspectRatio,
      negative_prompt: body.negativeKeywords,
    })

    return res.status(200).json(response.data)
  },
})
