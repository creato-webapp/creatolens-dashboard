import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../../axiosInstance/Account'
export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, name, pageNumber, pageSize, orderBy, isAsc },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(
        `/available-accounts?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`,
        {
          params: { filter: 'username != null', isAsc: false },
          headers: {
            Cookie: req.headers.cookie,
          },
        }
      )
      return res.status(response.status).json(response.data)
    }

    case 'POST': {
      const response = await AccountInstance.post('/available-accounts/create', body, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })
        .then(function (response) {
          console.log(response)
          return res.status(response.status).json(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
