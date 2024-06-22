import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getImageLabel(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST': {
      try {
        // const response = await ImageInstance.post(`/api/image-tagen`, req, {
        //   headers: {
        //     'Content-Type': req.headers['content-type'],
        //   },
        // })

        const response = {
          data: ['label1', 'label2'],
        }
        return res.status(200).json(response.data)
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
