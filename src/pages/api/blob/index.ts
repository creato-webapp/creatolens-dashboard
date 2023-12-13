import type { NextApiRequest, NextApiResponse } from 'next'
import BlobInstance from '../axiosInstance/Blob'
import axios from 'axios'
const FormData = require('form-data')
const fs = require('fs')
import LabelInstance from '../axiosInstance/Labels'
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
}

export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, name, pageNumber, pageSize, orderBy, isAsc },
    body,
    method,
  } = req
  console.log(req)
  switch (method) {
    // case 'GET': {
    //   const response = await BlobInstance.get(`/accounts?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`, {
    //     headers: {
    //       Cookie: req.headers.cookie,
    //     },
    //   })
    //   return res.status(response.status).json(response.data)
    // }

    case 'POST':
      {
        try {
          if (!req.headers.cookie) {
            return res.status(401).json({ message: 'Unauthorized' })
          }
          if (!req.body) {
            return res.status(400).json({ message: 'Invalid request' })
          }

          const response = await BlobInstance.post('/cloud-vision', body, {
            headers: {
              Cookie: req.headers.cookie,
            },
          })
          console.log(response)
          if (response.status !== 200) {
            return res.status(response.status).json({ message: 'Something went wrong' })
          }
          if (!response.data) {
            return res.status(400).json({ message: 'Invalid request' })
          }
          const labels = response.data.map((e: any) => e.description)
          console.log(labels.join(', '))
          const hashtagRes = await Promise.allSettled([
            axios.get(process.env.IMAGE_HASHTAG_1 as string, {
              params: { input: labels.join(', ') },
            }),
            axios.get(process.env.IMAGE_HASHTAG_2 as string, {
              params: { input: labels.join(', ') },
            }),
            axios.get(process.env.IMAGE_HASHTAG_3 as string, {
              params: { input: labels.join(', ') },
            }),
          ])
            .then((results) => {
              const data1 = results[0].status === 'fulfilled' ? results[0].value.data.data : null
              const data2 = results[1].status === 'fulfilled' ? results[1].value.data.data : null
              const data3 = results[2].status === 'fulfilled' ? results[2].value.data.data : null

              const error = results.find((result) => result.status === 'rejected')?.status || null

              return res.status(response.status).json({ labels: response.data, firstTwo: data1, middleTwo: data2, lastTwo: data3, error: error })
            })
            .catch((error) => {
              console.log(error)
              return res.status(response.status).json({ labels: response.data, error: error })
            })
          return hashtagRes
        } catch (error) {
          console.log(error)
        }
      }
      return res.status(400).json({ message: 'Nothing happened' })
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
