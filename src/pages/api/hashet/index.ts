import { HashetInstance } from '@helpers/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function hashtagQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { recommend },
  } = req
  const response = await HashetInstance.get('/model', {
    params: { input: recommend },
    headers: {
      Cookie: req.headers.cookie,
    },
  })
  return res.status(response.status).json(response.data)
}
