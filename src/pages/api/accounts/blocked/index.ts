import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../../axiosInstance/Account'
export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { pageNumber, pageSize, orderBy, isAsc },
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
      try {
        const response = await AccountInstance.post('/forbidden-accounts/create', body, {
          headers: {
            Cookie: req.headers.cookie,
          },
        })
        console.log(response)
        return res.status(response.status).json(response.data)
      } catch (error) {
        console.log(error)
        // If you want to send a response on error, you should do it here.
        // Make sure to return after sending a response to avoid trying to send
        // another response which would cause an error.
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
