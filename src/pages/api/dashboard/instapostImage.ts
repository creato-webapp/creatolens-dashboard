import type { NextApiRequest, NextApiResponse } from 'next'
import MetaInstance from '@api/axiosInstance/Meta'

export default async function dashboardPostPicQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { shortcode, batch_id },
  } = req

  try {
    const response = await MetaInstance.get(`/posts/pic?`, {
      headers: {
        Cookie: req.headers.cookie,
      },
      params: {
        shortcode: shortcode, // Assuming you need the profile ID as a query parameter
        batch_id: batch_id, // Assuming you need the batch ID as a query parameter
      },
    })

    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Failed to fetch image:', error)
    res.status(500).json({ error: 'Failed to fetch image' })
  }
}
