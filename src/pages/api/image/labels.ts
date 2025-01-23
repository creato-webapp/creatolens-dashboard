import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { ImageInstance } from '@helpers/axios'
import { CombinedUser } from '@api/auth/[...nextauth]'
import { decode } from 'next-auth/jwt'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const decoded = await decode({
      token: req.cookies['next-auth.session-token'] ?? req.cookies['__Secure-next-auth.session-token'],
      secret: process.env.JWT_SECRET as string,
    })
    const user = decoded?.user as CombinedUser
    const {
      query: { image_url },
    } = req
    const response = await ImageInstance.get(`/api/image-tagen/labels`, {
      params: {
        image_url,
        user_id: user.id,
      },
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    return res.status(200).json(response.data)
  },
  [METHOD.POST]: async (req: NextApiRequest, res: NextApiResponse) => {
    const { image_url, existing_labels } = req.body
    const response = await ImageInstance.post(
      '/gemini/images/re-label',
      {
        imageUrl: image_url,
        existing_labels: existing_labels,
        isGcsUri: false,
      },
      {
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    )
    return res.status(200).json(response.data)
  },
})
