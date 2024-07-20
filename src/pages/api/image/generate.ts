import type { NextApiRequest, NextApiResponse } from 'next'
import { decode } from 'next-auth/jwt'

import { CombinedUser } from '@api/auth/[...nextauth]'

import ImageInstance from '@helpers/axios/Image'

export default async function postImagePrompt(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST': {
      try {
        const { prompt } = req.body

        const decoded = await decode({
          token: req.cookies['next-auth.session-token'] ?? req.cookies['__Secure-next-auth.session-token'],
          secret: process.env.JWT_SECRET as string,
        })
        const user = decoded?.user as CombinedUser
        const response = await ImageInstance.post(`/api/image-tagen/prompt/image`, {
          prompt: prompt,
          user_id: user.id,
        })
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
