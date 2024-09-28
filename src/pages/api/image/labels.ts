import type { NextApiRequest, NextApiResponse } from 'next'

import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { ImageInstance } from '@helpers/axios'

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { image_url },
    } = req
    const response = await ImageInstance.get(`/api/image-tagen/labels`, {
      params: {
        image_url,
      },
    })
    return res.status(200).json(response.data)
  },
  [METHOD.POST]: async (req: NextApiRequest, res: NextApiResponse) => {
    const { image_url, existing_labels } = req.body
    const response = await ImageInstance.post('/gemini/images/re-label', {
      imageUrl: image_url,
      existing_labels: existing_labels,
      isGcsUri: false,
    })
    return res.status(200).json(response.data)
  },
})
