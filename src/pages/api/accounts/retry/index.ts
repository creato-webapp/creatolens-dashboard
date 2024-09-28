import type { NextApiRequest, NextApiResponse } from 'next'

import PAPI from '@constants/endpoints/papi'

import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { AccountInstance } from '@helpers/axios'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { pageNumber, pageSize, orderBy, isAsc },
    } = req
    const response = await AccountInstance.get(PAPI.AVAILABLE_ACCOUNTS, {
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
  },
  [METHOD.POST]: async (req, res) => {
    const { body } = req
    const response = await AccountInstance.post(PAPI.CREATE_AVAILABLE_ACCOUNT, body, {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    return res.status(response.status).json(response.data)
  },
})
