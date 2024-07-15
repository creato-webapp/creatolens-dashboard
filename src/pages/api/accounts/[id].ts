import type { NextApiRequest, NextApiResponse } from 'next'

import PAPI from '@constants/endpoints/papi'

import AccountInstance from '../../../helpers/axios/Account'

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
      response = await AccountInstance.get(`${PAPI.ACCOUNTS}/${id}`, cookieHeader)
      return res.status(response.status).json(response.data)
    }
    case 'PATCH':
      response = await AccountInstance.patch(`${PAPI.UPDATE_ACCOUNT}/${id}`, body, cookieHeader)
      return res.status(response.status).json(response.data)
    default:
      res.setHeader('Allow', ['GET', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
