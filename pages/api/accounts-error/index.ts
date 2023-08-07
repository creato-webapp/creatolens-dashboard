import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../axiosInstance/Account'
export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, username, pageNumber, pageSize, orderBy, isAsc },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      let response = undefined
      if (username) {
        response = await AccountInstance.get(`/handlers?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`, {
          params: {
            filter: `account == ${username}`,
          },
          headers: {
            Cookie: req.headers.cookie,
          },
        })
      } else {
        response = await AccountInstance.get(`/handlers?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`, {
          headers: {
            Cookie: req.headers.cookie,
          },
        })
      }
      return res.status(response.status).json(response.data)
    }
  }
}
