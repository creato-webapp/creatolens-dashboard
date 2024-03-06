import type { NextApiRequest, NextApiResponse } from 'next'
import BlobInstance from '../axiosInstance/Blob'
import axios from 'axios'
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
  maxDuration: 10,
}

export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req
  switch (method) {
    case 'POST': {
      try {
        if (!req.headers.cookie) {
          return res.status(401).json({ message: 'Unauthorized' })
        }
        if (!req.body) {
          return res.status(400).json({ message: 'Invalid request' })
        }

        const response = await BlobInstance.post('/cloud-vision', body, {
          headers: {
            Cookie: req.headers.cookie,
          },
        })
        if (response.status !== 200) {
          return res.status(response.status).json({ message: 'Something went wrong' })
        }
        if (!response.data) {
          return res.status(400).json({ message: 'Invalid request' })
        }
        const labels = response.data.map((e: { description: string }) => e.description)
        const hashtagRes = await Promise.allSettled([
          axios.get(process.env.IMAGE_HASHTAG_1 as string, {
            params: { input: labels.join(', ') },
          }),
          axios.get(process.env.IMAGE_HASHTAG_2 as string, {
            params: { input: labels.join(', ') },
          }),
          axios.get(process.env.IMAGE_HASHTAG_3 as string, {
            params: { input: labels.join(', ') },
          }),
        ])
          .then((results) => {
            const data1 = results[0].status === 'fulfilled' ? results[0].value.data.data : null
            const data2 = results[1].status === 'fulfilled' ? results[1].value.data.data : null
            const data3 = results[2].status === 'fulfilled' ? results[2].value.data.data : null

            const error = results.find((result) => result.status === 'rejected')?.status || null

            return [data1, data2, data3, error]
          })
          .catch((error) => {
            console.error(error)
            return res.status(response.status).json({ labels: response.data, error: error })
          })
        if (hashtagRes) {
          return res
            .status(response.status)
            .json({ labels: response.data, firstTwo: hashtagRes[0], middleTwo: hashtagRes[1], lastTwo: hashtagRes[2] })
        }
        return res.status(response.status).json({ labels: response.data, error: hashtagRes?.[3] })
      } catch (error) {
        return res.status(400).json({ message: 'Something went wrong in labeling stage', error: error })
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
