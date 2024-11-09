import { MetaInstance } from '@helpers/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function dashboardKeywordQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { accId, start_date, end_date },
  } = req

  const response = await MetaInstance.get(`/${accId}/scrapped_posts/count?`, {
    params: { start_date, end_date },
    headers: {
      Cookie: req.headers.cookie,
    },
  })
  return res.status(response.status).json(response.data)
}
