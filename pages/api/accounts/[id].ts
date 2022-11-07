import type { NextApiRequest, NextApiResponse } from 'next'

export default function AccountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    body,
    method,
  } = req
  switch (method) {
    case 'GET':
      fetch(`http://localhost:2020/accounts/${id}`)
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
      fetch(
        `https://account-service-y7nazd37ga-df.a.run.app/accounts/update/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        }
      )
        .then((response) => {
          console.log(response.status)
          return response.json()
        })
        .then((data) => res.status(200).json(data))
        .catch((err) => {
          console.log(err.message)
        })
      break
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
