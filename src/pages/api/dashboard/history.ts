import { NextApiRequest, NextApiResponse } from 'next'

export default async function dashboardSearchHistoryHandler(req: NextApiRequest, res: NextApiResponse) {
  // Mock response data
  const response = {
    status: 200, // OK status
    data: [], // Empty array as response data
  }

  return res.status(response.status).json(response.data)
}
