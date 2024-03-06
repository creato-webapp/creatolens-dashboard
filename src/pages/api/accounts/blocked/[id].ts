import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../../axiosInstance/Account'
export default async function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(`forbidden-accounts/${id}`)
      return res.status(response.status).json(response.data)
    }

    case 'PATCH':
      const response = await AccountInstance.patch(`forbidden-accounts/update/${id}`, body)
      return res.status(response.status).json(response.data)

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
