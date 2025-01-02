import { SEOKeywordInstance } from '@helpers/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function seoKeywordsHandler(req: NextApiRequest, res: NextApiResponse) {
  const response = await SEOKeywordInstance.get('/map', {
    headers: {
      Cookie: req.headers.cookie,
    },
  })
  return res.status(response.status).json(response.data)
}
