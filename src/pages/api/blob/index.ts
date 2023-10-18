import type { NextApiRequest, NextApiResponse } from 'next'
import BlobInstance from '../axiosInstance/Blob'

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
      console.log(response.data)
      return res.status(response.status).json(response.data)
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
