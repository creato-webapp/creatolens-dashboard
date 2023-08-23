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
        `/forbidden-accounts?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`,
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
      const response = await AccountInstance.post('/forbidden-accounts/create', body, {
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
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
