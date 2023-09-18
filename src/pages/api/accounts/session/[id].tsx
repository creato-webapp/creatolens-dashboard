import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../../axiosInstance/Account'

export default function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, name },
    body,
    method,
  } = req

  switch (method) {
    case 'POST': {
      console.log(id, body)
      AccountInstance.post(`account-session/renewal/${id}`, body)
        .then((response) => {
          console.log(response)
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

// async function processInBackground(id: string, body: any) {
//   // Perform the long-running task here
//   const response = await AccountInstance.post(`account-session/renewal/${id}`, body)
//   return response.data
//   // You can handle the response here, such as storing it in a database or sending a notification
//   // ...
// }
