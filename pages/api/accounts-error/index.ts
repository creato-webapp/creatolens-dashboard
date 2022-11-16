import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../axios'
export default async function accountQueryHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      let response = undefined
      console.log(id)
      if (id) {
        response = await AccountInstance.get('/handler/query', {
          params: { filter: `account == ${id}`, orderby: 'occurred_at' },
        })
      } else {
        response = await AccountInstance.get('/handler/query', {
          params: { orderby: 'occurred_at' },
        })
      }
      return res.status(response.status).json(response.data)
    }
  }
}
