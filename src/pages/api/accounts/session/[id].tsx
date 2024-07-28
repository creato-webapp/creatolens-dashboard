import type { NextApiRequest, NextApiResponse } from 'next'

import ENDPOINT_BACKEND_ACCOUNT_SESSION from '@constants/endpoints/papi'
import { AccountInstance } from '@helpers/axios'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'

const updateSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    body,
  } = req

  AccountInstance.post(`${ENDPOINT_BACKEND_ACCOUNT_SESSION.RENEW_SESSION}/${id}`, body)
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((error) => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' }) // Handle errors
    })
}

export default handler.api({
  [METHOD.POST]: updateSession,
})
