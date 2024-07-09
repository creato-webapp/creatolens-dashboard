import { NextRequest, NextResponse  } from 'next/server'

import { authMiddleware } from './middlewares/authMiddleware'
import rateLimitMiddleware from './middlewares/rateLimitMiddleware'

async function runMiddlewares(request: NextRequest, middlewares: CallableFunction[]) {
  for (const middleware of middlewares) {
    const response = await middleware(request)
    if (response) {
      return response
    }
  }
  return NextResponse.next()
}

export default async function middleware(request: NextRequest) {
  const middlewares = [authMiddleware, rateLimitMiddleware]
  return await runMiddlewares(request, middlewares)
}

export const config = { 
  matcher: [
    '/accounts/:path*', 
    '/recommendation', 
    '/guide',
    '/api/image/:path*',
    '/api/hashtag/:path*',
  ]
}