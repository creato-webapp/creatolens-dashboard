import METHOD, { IMethodType } from '@constants/method'
import { NextApiRequest, NextApiResponse } from 'next'

function errorHandler(err: Error, res: NextApiResponse) {
  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' })
  }

  // default to 500 server error
  console.error(err)
  return res.status(500).json({ message: err.message })
}

type IHandlerType = Partial<Record<IMethodType, (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>>>

function apiHandler(handler: IHandlerType) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const method = req.method!.toUpperCase() as keyof typeof METHOD

      // check handler supports HTTP method
      if (!handler[method]) return res.status(405).end(`Method ${req.method} Not Allowed`)
      // global middleware
      // await jwtMiddleware(req, res)

      // route handler
      await handler[method](req, res)
    } catch (err) {
      // global error handler
      errorHandler(err as Error, res)
    }
  }
}
const handler = {
  api: apiHandler,
  error: errorHandler,
}

export default handler
