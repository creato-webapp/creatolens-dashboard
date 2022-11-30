import type { NextApiRequest, NextApiResponse } from 'next'
import ScrapperInstance from '../../axiosInstance/Scrapper'
export default async function AccountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    body,
    method,
  } = req
  switch (method) {
    case 'POST': {
      const response = await ScrapperInstance.post(
        `/instaloader/upload_session/${id}`,
        body
      )
      return res.status(response.status).json(response.data)
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
