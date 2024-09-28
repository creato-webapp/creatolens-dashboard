import type { NextApiRequest, NextApiResponse } from 'next'

import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { AccountInstance } from '@helpers/axios'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await AccountInstance.get(`/contacts?filter=email != null`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    return res.status(response.status).json(response.data)
  },
})
