import type { NextApiRequest, NextApiResponse } from 'next'

import PAPI from '@constants/endpoints/papi'

import AccountInstance from '../../../helpers/axios/Account'
import METHOD from '@constants/method'
import handler from '@helpers/api/handlers'

export default handler.api({
  //
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { id },
    } = req
    const cookieHeader = {
      headers: {
        Cookie: req.headers.cookie,
      },
    }
    const response = await AccountInstance.get(`${PAPI.ACCOUNTS}/${id}`, cookieHeader)
    return res.status(response.status).json(response.data)
  },
  [METHOD.PATCH]: async (req: NextApiRequest, res: NextApiResponse) => {
    const cookieHeader = {
      headers: {
        Cookie: req.headers.cookie,
      },
    }
    const {
      query: { id },
      body,
    } = req

    const response = await AccountInstance.patch(`${PAPI.UPDATE_ACCOUNT}/${id}`, body, cookieHeader)
    return res.status(response.status).json(response.data)
  },
})
