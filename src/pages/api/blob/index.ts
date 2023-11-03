import type { NextApiRequest, NextApiResponse } from 'next'
import BlobInstance from '../axiosInstance/Blob'
import axios from 'axios'
const FormData = require('form-data')
const fs = require('fs')
import LabelInstance from '../axiosInstance/Labels'
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
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
  switch (method) {
    // case 'GET': {
    //   const response = await BlobInstance.get(`/accounts?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`, {
    //     headers: {
    //       Cookie: req.headers.cookie,
    //     },
    //   })
    //   return res.status(response.status).json(response.data)
    // }

    case 'POST': {
      const response = await BlobInstance.post('/cloud-vision', body, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      const labels = response.data.map((e: any) => e.description)
      var bodyFormData = new FormData()
      bodyFormData.append('labels', labels.join(', '))
      bodyFormData.append('top_n', '10')
      bodyFormData.append('model', 'glove')
      console.log(bodyFormData)
      const labelResponse = await LabelInstance.post('/get_similar_records', bodyFormData)
      return res.status(labelResponse.status).json({ labels: response.data, data: labelResponse.data })
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
