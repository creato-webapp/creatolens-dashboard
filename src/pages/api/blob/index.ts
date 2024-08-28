import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
// import fs from 'fs'

// import FormData from 'form-data'
// import formidable from 'formidable'
// import { parseForm } from '@helpers/form'
// import { ImageInstance } from '@helpers/axios'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'

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
    const response = await axios.get(`${process.env.IMAGE_HASHTAG_1}/model`, {
      headers: {
        Cookie: req.headers.cookie,
      },
      params: { input: req.query.input },
      timeout: 30000,
    })
    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Cannot Recommend the image' })
    }
    return res.status(200).json(response.data)
  },
})
