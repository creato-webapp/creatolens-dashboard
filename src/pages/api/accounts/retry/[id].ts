import type { NextApiRequest, NextApiResponse } from 'next'

import ENDPOINT_BACKEND from '@constants/endpoints/backend'

import AccountInstance from '../../axiosInstance/Account'

export default async function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req
  let response

  switch (method) {
    case 'GET': {
      response = await AccountInstance.get(`${ENDPOINT_BACKEND.AVAILABLE_ACCOUNTS}/${id}`)
      return res.status(response.status).json(response.data)
    }

    case 'PATCH':
      response = await AccountInstance.patch(`${ENDPOINT_BACKEND.UPDATE_AVAILABLE_ACCOUNT}/${id}`, body)
      return res.status(response.status).end()

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
