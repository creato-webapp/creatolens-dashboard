import { HashtagInstance } from '@helpers/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function hashtagWeb3QueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { input, k },
  } = req

  const response = await HashtagInstance.get('/predict', {
    params: { input, k },
    headers: {
      Cookie: req.headers.cookie,
    },
  })
  return res.status(response.status).json(response.data)
}
