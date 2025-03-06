import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { HashtagInstance } from '@helpers/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default handler.api({
  [METHOD.POST]: async (req: NextApiRequest, res: NextApiResponse) => {
    const { input, k } = req.body

    const response = await HashtagInstance.get('/predict', {
      params: { input, k },
    })

    return res.status(response.status).json(response.data)
  },
})
