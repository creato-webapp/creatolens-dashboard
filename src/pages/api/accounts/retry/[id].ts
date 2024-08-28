import type { NextApiRequest, NextApiResponse } from 'next'

import PAPI from '@constants/endpoints/papi'

import AccountInstance from '../../../../helpers/axios/Account'
import METHOD from '@constants/method'
import handler from '@helpers/api/handlers'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { id },
    } = req
    const response = await AccountInstance.get(`${PAPI.AVAILABLE_ACCOUNTS}/${id}`)
    return res.status(response.status).json(response.data)
  },
  [METHOD.PATCH]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { id },
      body,
    } = req
    const response = await AccountInstance.patch(`${PAPI.UPDATE_AVAILABLE_ACCOUNT}/${id}`, body)
    return res.status(response.status).json(response.data)
  },
})
