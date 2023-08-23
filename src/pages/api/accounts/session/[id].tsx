import type { NextApiRequest, NextApiResponse } from 'next'
import ScrapperInstance from '../../axiosInstance/Scrapper'

export default function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, name },
    body,
    method,
  } = req

  switch (method) {
    case 'POST': {
      // Respond with 202 Accepted immediately
      res.status(202).json({ message: 'Processing' })

      // Continue processing in the background
      processInBackground(id as string, body).catch((error) => {
        console.error('Error processing in background:', error)
      })
      break
    }
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function processInBackground(id: string, body: any) {
  // Perform the long-running task here
  const response = await ScrapperInstance.post(`/instaloader/upload_session/${id}`, body)

  // You can handle the response here, such as storing it in a database or sending a notification
  // ...
}
