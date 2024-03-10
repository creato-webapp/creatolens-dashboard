import type { NextApiRequest, NextApiResponse } from 'next'
import BlobInstance from '../axiosInstance/Blob'
import { LabelImageResponse } from '@services/Object/Gemini'
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function GeminiAnnotations(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        if (!req.headers.cookie) {
          return res.status(401).json({ message: 'Unauthorized' })
        }
        const response = await BlobInstance.post<LabelImageResponse>(`/gemini/images/label`, req, {
          headers: {
            'Content-Type': req.headers['content-type'],
          },
        })
        if (response.status !== 200) {
          return res.status(response.status).json({ message: 'Gemini Cannot Label the image' })
        }
        if (!response.data) {
          return res.status(400).json({ message: 'Invalid request' })
        }
        return res.status(200).json(response.data)
      } catch (error) {
        return res.status(500).json({ message: 'Something went wrong in labeling stage', error: error })
      }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
