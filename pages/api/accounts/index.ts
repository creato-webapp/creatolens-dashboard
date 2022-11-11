import type { NextApiRequest, NextApiResponse } from 'next'

export default function accountQueryHandler(
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
      fetch(
        process.env.ACCOUNT_SERVICE + `/accounts/query?filter=username != null`
      )
        .then((response) => response.json())
        .then((data) => {
          return res.status(200).json(data)
        })
        .catch((err) => {
          console.log(err.message)
          return res.status(405)
        })
      break

    case 'POST':
      fetch(process.env.ACCOUNT_SERVICE + `/accounts/create`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.status === 409) {
            return { status: 409, body: 'Account Already Exist' }
          }
          return response.json().then((data) => ({
            status: data.status,
            body: data,
          }))
        })
        .then((data) => {
          return res.status(data.status).json(data)
        })
        .catch((err) => {
          console.log(err)
          console.log(err.message)
        })
      break
  }
}
