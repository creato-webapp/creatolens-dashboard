import type { NextApiRequest, NextApiResponse } from 'next'
import ImageInstance from './axiosInstance/Image'
export default async function ImageQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const {
    query: { filename, format },
  } = req

  switch (method) {
    case 'GET': {
      const response = await ImageInstance.get('/objects/get-signed-url?', {
        params: { filename: filename, format: format, bucket: process.env.IMAGE_UPLOAD_BUCKET_NAME },

        headers: {
          Cookie: req.headers.cookie,
        },
      })
      return res.status(response.status).json(response.data)
    }
  }
}
