import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

import ENDPOINT_API from '../constants/endpoints/api'

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(3, '10 s'),
})

export default async function rateLimitMiddleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(ENDPOINT_API.LABEL_IMAGE)) {
    return NextResponse.next()
  }

  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  return NextResponse.next()
}
