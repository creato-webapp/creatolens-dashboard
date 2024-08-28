import { AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import ENDPOINT_BACKEND_ACCOUNT_SESSION from '@constants/endpoints/papi'

import AccountInstance from '../../../../helpers/axios/Account'

import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { username, pageNumber, pageSize, orderBy, isAsc },
    } = req
    const params: AxiosRequestConfig = {
      headers: {
        Cookie: req.headers.cookie,
      },
    }
    if (username) {
      params.params = {
        page_number: pageNumber,
        page_size: pageSize,
        orderby: orderBy,
        isAsc,
        username,
      }
    }
    const response = await AccountInstance.get(ENDPOINT_BACKEND_ACCOUNT_SESSION.ACCOUNT_SESSION, params)
    return res.status(response.status).json(response.data)
  },
})
