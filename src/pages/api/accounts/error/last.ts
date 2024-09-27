import type { NextApiRequest, NextApiResponse } from 'next'

import PAPI from '@constants/endpoints/papi'

import METHOD from '@constants/method'
import handler from '@helpers/api/handlers'
import { AccountInstance } from '@helpers/axios'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { username },
    } = req
    const response = await AccountInstance.get(PAPI.QUERY_ACCOUNTS_ERROR, {
      params: {
        filter: `document_id == ${username}`,
        orderby: 'occurred_at',
        isAsc: false,
      },
    })
    return res.status(response.status).json(response.data)
  },
})
