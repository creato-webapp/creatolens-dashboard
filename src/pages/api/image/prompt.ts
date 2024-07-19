import type { NextApiRequest, NextApiResponse } from 'next'
import { decode } from 'next-auth/jwt'

import { CombinedUser } from '@api/auth/[...nextauth]'

import ImageInstance from '@helpers/axios/Image'
import fetcher from '@helpers/fetcher'
import { IMAGE_USAGE, ImageUsageTypeKey } from '@constants/imageStyle'
import { renderTemplate } from '@helpers/mustache'

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
}

export default async function postImagePrompt(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST': {
      try {
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

        const promptTemplate = await fetcher.GET<string>(`/api/remote-config?prompt_type=${IMAGE_USAGE[prompt_type as ImageUsageTypeKey]}`)

        const renderedPrompt = renderTemplate(promptTemplate, { ...body, ...body.imageCategory })

        const response = await ImageInstance.post(`/api/image-tagen/prompt/image`, {
          prompt: renderedPrompt,
          user_id: user.id,
        })
        const data = response.data

        return res.status(200).json(response.data)
      } catch (error) {
        console.error('Error generating labels:', error)
        return res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message })
      }
    }
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
