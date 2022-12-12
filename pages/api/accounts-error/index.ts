import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../axiosInstance/Account'
export default async function accountQueryHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { username },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      let response = undefined
      if (username) {
        response = await AccountInstance.get('/handler/query', {
          params: {
            filter: `account == ${username}`,
            orderby: 'occurred_at',
            isAsc: false,
          },
          headers: {
            Cookie: req.headers.cookie,
          },
        })
      } else {
        response = await AccountInstance.get('/handler/query', {
          params: { orderby: 'occurred_at', isAsc: false },
          headers: {
            Cookie: req.headers.cookie,
          },
        })
      }
      return res.status(response.status).json(response.data)
    }
  }
}
