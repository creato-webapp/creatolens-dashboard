import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from './axiosInstance/Account'
export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, name, pageNumber, pageSize, orderBy, isAsc },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(`/contacts?filter=email != null`, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      return res.status(response.status).json(response.data)
    }
  }
}
