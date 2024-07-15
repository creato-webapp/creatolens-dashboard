import type { NextApiRequest, NextApiResponse } from 'next'

import PAPI from '@constants/endpoints/papi'

import AccountInstance from '../../../../helpers/axios/Account'

export default async function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req
  let response

  switch (method) {
    case 'GET': {
      response = await AccountInstance.get(`${PAPI.BLOCKED_ACCOUNTS}/${id}`)
      return res.status(response.status).json(response.data)
    }

    case 'PATCH':
      response = await AccountInstance.patch(`${PAPI.UPDATE_BLOCKED_ACCOUNT}/${id}`, body)
      return res.status(response.status).json(response.data)

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
