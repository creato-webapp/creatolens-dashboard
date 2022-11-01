import type { NextApiRequest, NextApiResponse } from 'next'

export default function accountQueryHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    method,
  } = req
  fetch(
    `https://account-service-y7nazd37ga-df.a.run.app/accounts/query?filter=username != null`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err.message)
    })
}
