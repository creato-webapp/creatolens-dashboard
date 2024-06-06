import type { NextApiRequest, NextApiResponse } from 'next'

import HashtagInstance from '../axiosInstance/Hashtag'
export default async function hashtagQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { recommend, update },
  } = req

  const response = await HashtagInstance.get('', {
    params: { recommend: recommend, update: update },
    headers: {
      Cookie: req.headers.cookie,
    },
  })
  return res.status(response.status).json(response.data)
}
