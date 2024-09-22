import type { NextApiRequest, NextApiResponse } from 'next'

import PAPI from '@constants/endpoints/papi'

import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { AccountInstance } from '@helpers/axios'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { filter },
    } = req
    const cookieHeader = {
      headers: {
        Cookie: req.headers.cookie,
      },
    }

    const response = await AccountInstance.get(PAPI.QUERY_ACCOUNTS, {
      params: { filter },
      ...cookieHeader,
    })
    return res.status(response.status).json(response.data)
  },
  [METHOD.PATCH]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { id },
      body,
    } = req
    const response = await AccountInstance.patch(`${PAPI.UPDATE_BLOCKED_ACCOUNT}/${id}`, body)
    return res.status(response.status).json(response.data)
  },
})
