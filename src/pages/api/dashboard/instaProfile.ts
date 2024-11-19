import { MetaInstance } from '@helpers/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const MOCK_SESSION_ID = 'LnXn%fcWaMh_QtR3pXB_ml0FKRPASa9qXIuEPmIVDSWgDhVfp%OGXDRYuGzM_E8xCilt20thX'
const MOCK_LOCATION = 'HK'

export default async function instaProfileHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { profile_id },
  } = req
  try {
    const response = await MetaInstance.get(`/users/${profile_id}/info`, {
      params: {
        session_id: MOCK_SESSION_ID,
        location: MOCK_LOCATION,
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
