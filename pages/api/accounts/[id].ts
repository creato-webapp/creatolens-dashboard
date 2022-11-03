import type { NextApiRequest, NextApiResponse } from 'next'

export default function AccountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    method,
  } = req
  console.log(id)
  switch (method) {
    case 'GET':
      fetch(`https://account-service-y7nazd37ga-df.a.run.app/accounts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          res.status(200).json(data)
        })
        .catch((err) => {
          console.log(err.message)
        })

      break
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({ id, name: name || `User ${id}` })
      break
    case 'PATCH':
      // Update or create data in your database
      console.log(req.query)
      res.status(200).json({ id, name: name || `User ${id}` })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
