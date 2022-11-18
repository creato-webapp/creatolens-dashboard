import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInstance from '../axiosInstance/Account'
export default async function AccountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    body,
    method,
  } = req
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(`/accounts/${id}`)
      return res.status(response.status).json(response.data)
    }

    // fetch(process.env.ACCOUNT_SERVICE + `/accounts/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     res.status(200).json(data)
    //   })
    //   .catch((err) => {
    //     console.log(err.message)
    //   })

    // break

    case 'PATCH':
      const response = await AccountInstance.patch(
        `/accounts/update/${id}`,
        body
      )
      return res.status(response.status).json(response.data)

    // let resCode = 400
    // fetch(process.env.ACCOUNT_SERVICE + `/accounts/update/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-type': 'application/json' },
    //   body: JSON.stringify(body),
    // })
    //   .then((response) => {
    //     resCode = response.status
    //     console.log(
    //       response.status,
    //       process.env.ACCOUNT_SERVICE + `/accounts/update/${id}`
    //     )
    //     const data = fetch(process.env.ACCOUNT_SERVICE + `/accounts/${id}`)
    //       .then((response) => response.json())
    //       .then((data) => res.status(200).json(data))
    //   })
    //   .catch((err) => {
    //     console.log(err.message)
    //   })
    // break
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
