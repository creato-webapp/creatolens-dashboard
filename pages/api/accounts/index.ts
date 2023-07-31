import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../axiosInstance/Account'
export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, name, pageNumber, pageSize, orderBy, isAsc },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(`/accounts?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      console.log(`/accounts?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`)
      console.log(response.data)
      return res.status(response.status).json(response.data)
    }

    case 'POST': {
      const response = await AccountInstance.post('/accounts/create', body, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })
        .then(function (response) {
          return res.status(response.status).json(response.data)
        })
        .catch(function (error) {})
    }
  }
}
