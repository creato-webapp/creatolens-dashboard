import type { NextApiRequest, NextApiResponse } from 'next'

import PAPI from '@constants/endpoints/papi'

import AccountInstance from '../../../../helpers/axios/Account'
import METHOD from '@constants/method'
import handler from '@helpers/api/handlers'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { pageNumber, pageSize, orderBy, isAsc },
    } = req
    const response = await AccountInstance.get(PAPI.BLOCKED_ACCOUNTS, {
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
  [METHOD.POST]: async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req
    const response = await AccountInstance.post(PAPI.CREATE_BLOCKED_ACCOUNT, body, {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    return res.status(response.status).json(response.data)
  },
})
