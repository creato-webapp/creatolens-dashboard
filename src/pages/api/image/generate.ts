import type { NextApiRequest, NextApiResponse } from 'next'

import ImageInstance from '../axiosInstance/Image'

export default async function postImagePrompt(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST': {
      try {
        const { prompt } = req.body
        const response = await ImageInstance.get(`/api/image-tagen/labels`, { prompt: prompt })
        return res.status(200).json(response.data)
      } catch (error) {
        console.error('Error generating labels:', error)
        return res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message })
      }
    }
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
