import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

import FormData from 'form-data'
import formidable from 'formidable'
import { parseForm } from '@helpers/form'
import { ImageInstance } from '@helpers/axios'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function CloudStorage(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
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
      } catch (error) {
        return res.status(500).json({ message: 'Something went wrong in recommendation stage', error: error })
      }
    case 'POST':
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
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
