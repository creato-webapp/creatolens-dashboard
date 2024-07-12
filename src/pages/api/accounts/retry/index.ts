import type { NextApiRequest, NextApiResponse } from 'next'

import ENDPOINT_BACKEND from '@constants/endpoints/backend'

import AccountInstance from '../../axiosInstance/Account'
export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { pageNumber, pageSize, orderBy, isAsc },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(ENDPOINT_BACKEND.AVAILABLE_ACCOUNTS, {
        params: {
          filter: 'username != null',
          page_number: pageNumber,
          page_size: pageSize,
          orderby: orderBy,
          isAsc,
        },
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      return res.status(response.status).json(response.data)
    }

    case 'POST': {
      try {
        const response = await AccountInstance.post(ENDPOINT_BACKEND.CREATE_AVAILABLE_ACCOUNT, body, {
          headers: {
            Cookie: req.headers.cookie,
          },
        })
        return res.status(response.status).json(response.data)
      } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
