import type { NextApiRequest, NextApiResponse } from 'next'
const { Storage } = require('@google-cloud/storage')
const storage = new Storage()

export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { fileName, bucket },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      console.log(`gs://${bucket}/${fileName} downloaded to ${fileName}.`)
      try {
        const [file] = await storage.bucket(bucket).file(fileName).download()
        const objectData = JSON.parse(file.toString('utf-8'))
        console.log('Fetched object:', objectData)
        res.status(200).json(objectData)
      } catch (error) {
        console.error('Error fetching object:', error)
        res.status(500).send('Internal Server Error')
      }
    }
  }
}
