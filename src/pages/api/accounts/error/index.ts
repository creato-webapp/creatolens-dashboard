import { AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import PAPI from '@constants/endpoints/papi'

import AccountInstance from '../../../../helpers/axios/Account'
import METHOD from '@constants/method'
import handler from '@helpers/api/handlers'

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
        filter: `account == ${username}`,
        page_number: pageNumber,
        page_size: pageSize,
        orderby: orderBy,
        isAsc,
      }
    }
    const response = await AccountInstance.get(PAPI.ACCOUNTS_ERROR, params)
    return res.status(response.status).json(response.data)
  },
})
