import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../../axiosInstance/Account'
export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { username },
    method,
  } = req
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get('/handler/query', {
        params: {
          filter: `document_id == ${username}`,
          orderby: 'occurred_at',
          isAsc: false,
        },
      })
      return res.status(response.status).json(response.data)
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
