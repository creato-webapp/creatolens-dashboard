import { MetaInstance } from '@helpers/axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function dashboardPostPicQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { shortcode, batch_id, is_video },
  } = req

  try {
    const response = await MetaInstance.get(`v1/posts/pic`, {
      headers: {
        Cookie: req.headers.cookie,
      },
      params: {
        is_video: is_video,
        shortcode: shortcode,
        batch_id: batch_id,
      },
    })

    const signedUrl = response.data

    try {
      await axios.get(signedUrl)
      return res.end(signedUrl)
    } catch (error) {
      console.error('Signed URL from v1 is not accessible, trying v2')
    }
  } catch (error) {
    console.error('Failed to fetch signed URL from v1:', error)
  }

  try {
    const responseV2 = await MetaInstance.get(`v2/posts/pic`, {
      headers: {
        Cookie: req.headers.cookie,
      },
      params: {
        is_video: is_video,
        shortcode: shortcode,
        batch_id: batch_id,
      },
    })
    const signedUrlV2 = responseV2.data
    return res.end(signedUrlV2)
  } catch (error2) {
    console.error('Failed to fetch signed URL from v2:', error2)
    res.status(500).json({ error: 'Failed to fetch image' })
  }
}
