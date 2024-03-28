import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../../axiosInstance/Account'
import { AxiosRequestConfig } from 'axios'
export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { username, pageNumber, pageSize, orderBy, isAsc },
    method,
  } = req
  switch (method) {
    case 'GET': {
      const params: AxiosRequestConfig = {
        headers: {
          Cookie: req.headers.cookie,
        },
      }
      if (username) {
        params.params = { username }
      }
      const response = await AccountInstance.get(
        `/account-session?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`,
        params
      )

      return res.status(response.status).json(response.data)
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
