import FormData from 'form-data'
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs'

import { parseForm } from '@helpers/form'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { ImageInstance } from '@helpers/axios'

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
}

export default handler.api({
  [METHOD.POST]: async (req: NextApiRequest, res: NextApiResponse) => {
    const { fields, files } = await parseForm(req)

    const fileArray = files.file as formidable.File[]
    const userIdFieldsArray = fields.user_id as string[]

    const file = fileArray[0] as formidable.File
    const fileStream = fs.createReadStream(file.filepath)

    const formData = new FormData()

    formData.append('file', fileStream, file.originalFilename as string)
    formData.append('user_id', userIdFieldsArray[0] as string)

    const response = await ImageInstance.post(`/api/image-tagen`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.status(response.status).json(response.data)
  },
})
