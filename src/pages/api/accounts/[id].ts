import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../axiosInstance/Account'
export default async function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req
  const cookieHeader = {
    headers: {
      Cookie: req.headers.cookie,
    },
  }
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(`accounts/${id}`, cookieHeader)
      return res.status(response.status).json(response.data)
    }
    case 'PATCH':
      const response = await AccountInstance.patch(`accounts/update/${id}`, body, cookieHeader)

      return res.status(response.status).json(response.data)
    default:
      res.setHeader('Allow', ['GET', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
