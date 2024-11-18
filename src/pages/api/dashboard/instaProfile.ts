import { MetaInstance } from '@helpers/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function instaProfileHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { profile_id, session_id, location },
  } = req
  try {
    const response = await MetaInstance.get(`/users/${profile_id}/info`, {
      params: {
        session_id,
        location,
      },
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Failed to fetch image:', error)
    return res.status(500).json({ error: 'Failed to fetch image' })
  }
}
