import type { NextApiRequest, NextApiResponse } from 'next'

import ImageInstance from '../../../helpers/axios/Image'

export default async function getImageLabel(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { image_url },
  } = req

  switch (method) {
    case 'GET': {
      try {
        const response = await ImageInstance.get(`/api/image-tagen/labels`, {
          params: {
            image_url,
          },
        })
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
