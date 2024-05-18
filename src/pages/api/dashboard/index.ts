import type { NextApiRequest, NextApiResponse } from 'next'

import MetaInstance from '@api/axiosInstance/Meta'
export default async function dashboardQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { accId, days },
  } = req

  const response = await MetaInstance.get(`/${accId}/scrapped_posts/info?`, {
    params: { days },
    headers: {
      Cookie: req.headers.cookie,
    },
  })

  return res.status(response.status).json(response.data)
}
