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
        response = await AccountInstance.get('/account-session/query', {
          params: {
            filter: `username == ${username}`,
            orderby: 'created_at',
            isAsc: false,
          },
          headers: {
            Cookie: req.headers.cookie,
          },
        })
      } else {
        response = await AccountInstance.get('/account-session/query', {
          params: { orderby: 'created_at', isAsc: false },
          headers: {
            Cookie: req.headers.cookie,
          },
        })
      }
      return res.status(response.status).json(response.data)
    }
  }
}
