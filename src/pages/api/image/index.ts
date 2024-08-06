import FormData from 'form-data'
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs'

import { parseForm } from '@helpers/form'
import ImageInstance from '../../../helpers/axios/Image'

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
}

export default async function ImageUpload(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST': {
      try {
        const { fields, files } = await parseForm(req)

        const fileArray = files.file as formidable.File[]
        const usernameArray = fields.username as string[]

        const file = fileArray[0] as formidable.File
        const fileStream = fs.createReadStream(file.filepath)

        const formData = new FormData()

        formData.append('file', fileStream, file.originalFilename as string)
        formData.append('username', usernameArray[0] as string)

        const response = await ImageInstance.post(`/api/image-tagen`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        return res.status(response.status).json(response.data)
      } catch (error) {
        console.error('Error uploading image:', error)
        return res.status(500).send({ message: 'Internal Server Error', error })
      }
    }
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
