import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../axiosInstance/Account'
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
      })
      return res.status(response.status).json(response.data)
    }

    case 'POST': {
      const response = await AccountInstance.post('/accounts/create', body)
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
