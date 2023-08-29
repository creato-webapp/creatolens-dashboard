import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../axiosInstance/Account'
import axios from 'axios'
export default async function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req
  axios.defaults.headers.common['value1'] = 'value'
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(`accounts/${id}`, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      return res.status(response.status).json(response.data)
    }
    case 'PATCH':
      const response = await AccountInstance.patch(`accounts/update/${id}`, body, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })

      return res.status(response.status).json(response.data)
    default:
      res.setHeader('Allow', ['GET', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
