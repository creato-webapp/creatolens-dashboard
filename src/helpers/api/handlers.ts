import METHOD, { IMethodsType } from '@constants/method'
import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'

function errorHandler(err: Error, res: NextApiResponse) {
  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token' })
  }

  // default to 500 server error
  console.error(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
}

type IApiHandlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

type IHandlersType =
  | ({
      [key in Extract<IMethodsType, typeof METHOD.POST>]: IApiHandlerType
    } & Partial<{
      [key in Exclude<IMethodsType, typeof METHOD.POST>]: IApiHandlerType
    }>)
  | ({
      [key in Extract<IMethodsType, typeof METHOD.GET>]: IApiHandlerType
    } & Partial<{
      [key in Exclude<IMethodsType, typeof METHOD.GET>]: IApiHandlerType
    }>)
  | ({
      [key in Extract<IMethodsType, typeof METHOD.PUT>]: IApiHandlerType
    } & Partial<{
      [key in Exclude<IMethodsType, typeof METHOD.PUT>]: IApiHandlerType
    }>)
  | ({
      [key in Extract<IMethodsType, typeof METHOD.PATCH>]: IApiHandlerType
    } & Partial<{
      [key in Exclude<IMethodsType, typeof METHOD.PATCH>]: IApiHandlerType
    }>)
  | ({
      [key in Extract<IMethodsType, typeof METHOD.DELETE>]: IApiHandlerType
    } & Partial<{
      [key in Exclude<IMethodsType, typeof METHOD.DELETE>]: IApiHandlerType
    }>)

function apiHandler(handlers: IHandlersType) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toUpperCase() as IMethodsType
    const handler = handlers[method]

    if (!method || !handler) return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${method} Not Allowed`)

    try {
      // global middleware
      // await jwtMiddleware(req, res)

      // route handler
      await handler(req, res)
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
