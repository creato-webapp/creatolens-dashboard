import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../axiosInstance/Account'
export default async function accountQueryHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      let response = undefined
      if (id) {
        response = await AccountInstance.get('/handler/query', {
          params: {
            filter: `account == ${id}`,
            orderby: 'occurred_at',
            isAsc: false,
          },
        })
      } else {
        response = await AccountInstance.get('/handler/query', {
          params: { orderby: 'occurred_at', isAsc: false },
        })
      }
      return res.status(response.status).json(response.data)
    }
  }
}
