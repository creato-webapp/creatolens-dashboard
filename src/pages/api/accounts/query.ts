import type { NextApiRequest, NextApiResponse } from 'next'

import ENDPOINT_BACKEND from 'src/constants/endpoints/backend'

import AccountInstance from '../axiosInstance/Account'


export default async function accountDashboardQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { filter },
    method,
  } = req
  const cookieHeader = {
    headers: {
      Cookie: req.headers.cookie,
    },
  }

  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(ENDPOINT_BACKEND.QUERY_ACCOUNTS, {
        params: { filter },
        ...cookieHeader,
      })
      return res.status(response.status).json(response.data)
    }

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
