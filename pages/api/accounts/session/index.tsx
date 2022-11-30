import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from 'pages/api/axiosInstance/Account'
export default async function accountQueryHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get('/accounts/query', {
        params: { filter: 'username != null', isAsc: false },
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      return res.status(response.status).json(response.data)
    }
  }
}
