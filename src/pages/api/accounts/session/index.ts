import { AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import ENDPOINT_BACKEND_ACCOUNT_SESSION from 'src/constants/endpoints/backend'

import AccountInstance from '../../axiosInstance/Account'

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
        params.params = { 
          'page_number':pageNumber,
          'page_size': pageSize,
          'orderby': orderBy,
          isAsc,
          username
        }
      }
      const response = await AccountInstance.get(
        ENDPOINT_BACKEND_ACCOUNT_SESSION.ACCOUNT_SESSION,
        params
      )

      return res.status(response.status).json(response.data)
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
