import type { NextApiRequest, NextApiResponse } from 'next'

import ENDPOINT_BACKEND from '@constants/endpoints/backend'

import AccountInstance from '../axiosInstance/Account'

export default async function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req
  const cookieHeader = {
    headers: {
      Cookie: req.headers.cookie,
    },
  }
  let response

  switch (method) {
    case 'GET': {
      response = await AccountInstance.get(`${ENDPOINT_BACKEND.ACCOUNTS}/${id}`, cookieHeader)
      return res.status(response.status).json(response.data)
    }
    case 'PATCH':
      response = await AccountInstance.patch(`${ENDPOINT_BACKEND.UPDATE_ACCOUNT}/${id}`, body, cookieHeader)
      return res.status(response.status).json(response.data)
    default:
      res.setHeader('Allow', ['GET', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
