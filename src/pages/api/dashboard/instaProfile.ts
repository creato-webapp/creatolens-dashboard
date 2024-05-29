import type { NextApiRequest, NextApiResponse } from 'next'

import MetaInstance from '@api/axiosInstance/Meta'
export default async function instaProfileHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { profile_id },
  } = req

  const response = await MetaInstance.get(`/users/${profile_id}/info`, {
    headers: {
      Cookie: req.headers.cookie,
    },
  })
  return res.status(response.status).json(response.data)
}
