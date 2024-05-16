import type { NextApiRequest, NextApiResponse } from 'next'
import MetaInstance from '@api/axiosInstance/Meta'

export default async function dashboardUserPicQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { profile_id },
  } = req

  try {
    const response = await MetaInstance.get(`/users/${profile_id}/info`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    })

    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Failed to fetch image:', error)
    res.status(500).json({ error: 'Failed to fetch image' })
  }
}
