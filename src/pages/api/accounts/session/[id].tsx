import type { NextApiRequest, NextApiResponse } from 'next'

import ENDPOINT_BACKEND_ACCOUNT_SESSION from 'src/constants/endpoints/backend'

import AccountInstance from '../../axiosInstance/Account'

export default function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req

  switch (method) {
    case 'POST': {
      AccountInstance.post(`${ENDPOINT_BACKEND_ACCOUNT_SESSION.RENEW_SESSION}/${id}`, body)
        .then((response) => {
          res.status(200).json(response.data)
        })
        .catch((error) => {
          console.error('Error:', error)
          res.status(500).json({ error: 'Internal Server Error' }) // Handle errors
        })
      break
    }

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
