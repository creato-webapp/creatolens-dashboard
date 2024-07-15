import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { UploadImageResponse } from '@services/Object/ImageBlob'

import BlobInstance from '../../../helpers/axios/Blob'
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function CloudStorage(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        if (!req.headers.cookie) {
          return res.status(401).json({ message: 'Unauthorized' })
        }
        const response = await axios.get(`${process.env.IMAGE_HASHTAG_1}/model`, {
          headers: {
            Cookie: req.headers.cookie,
          },
          params: { input: req.query.input },
          timeout: 30000,
        })
        if (response.status !== 200) {
          return res.status(response.status).json({ message: 'Cannot Recommend the image' })
        }
        return res.status(200).json(response.data)
      } catch (error) {
        return res.status(500).json({ message: 'Something went wrong in recommendation stage', error: error })
      }
    case 'POST':
      try {
        if (!req.headers.cookie) {
          return res.status(401).json({ message: 'Unauthorized' })
        }
        const response = await BlobInstance.post<UploadImageResponse>(`/cloud-vision`, req, {
          headers: {
            'Content-Type': req.headers['content-type'],
          },
        })
        if (response.status !== 200) {
          return res.status(response.status).json({ message: 'Cannot store the image' })
        }
        if (!response.data) {
          return res.status(400).json({ message: 'Invalid request' })
        }
        return res.status(200).json(response.data)
      } catch (error) {
        return res.status(500).json({ message: 'Something went wrong in uploading stage', error: error })
      }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
