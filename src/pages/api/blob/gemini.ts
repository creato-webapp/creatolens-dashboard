import type { NextApiRequest, NextApiResponse } from 'next'

import { LabelImageResponse } from '@services/Object/Gemini'

import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { BlobInstance } from '@helpers/axios'

export const config = {
  api: {
    bodyParser: false,
  },
}
export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.headers.cookie) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const response = await BlobInstance.post<LabelImageResponse>(`/gemini/images/label`, req, {
      headers: {
        'Content-Type': req.headers['content-type'],
      },
    })
    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Gemini Cannot Label the image' })
    }
    if (!response.data) {
      return res.status(400).json({ message: 'Invalid request' })
    }
    return res.status(200).json(response.data)
  },
})
