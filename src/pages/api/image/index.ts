import type { NextApiRequest, NextApiResponse } from 'next'
import ImageInstance from '../axiosInstance/Image'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function ImageUpload(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST': {
      try {
        const response = await ImageInstance.post(`/api/image-tagen`, req, {
          headers: {
            'Content-Type': req.headers['content-type'],
          },
        })
        return res.status(response.status).json(response.data)
      } catch (error) {
        console.error('Error uploading image:', error)
        return res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
