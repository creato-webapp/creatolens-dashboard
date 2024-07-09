import type { NextApiRequest, NextApiResponse } from 'next'

import ENDPOINT_BACKEND from 'src/constants/endpoints/backend'

import AccountInstance from '../../axiosInstance/Account'

export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { username },
    method,
  } = req
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(ENDPOINT_BACKEND.QUERY_ACCOUNTS_ERROR, {
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
