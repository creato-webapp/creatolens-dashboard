// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const detectedIp = requestIp.getClientIp(req)
  console.log(detectedIp)
  res.status(200).json({ name: 'John Doe' })
}
