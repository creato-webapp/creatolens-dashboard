import type { NextApiRequest, NextApiResponse } from 'next'
import HashetInstance from '../axiosInstance/Hashet'
export default async function hashtagQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { recommend },
  } = req
  const response = await HashetInstance.get('/model', {
    params: { input: recommend },
    headers: {
      Cookie: req.headers.cookie,
    },
  })
  return res.status(response.status).json(response.data)
}
