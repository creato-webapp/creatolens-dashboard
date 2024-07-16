import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import PAPI from '@constants/endpoints/papi'

const LOCAL_IP = '127.0.0.1'

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(3, '10 s'),
})

export default async function rateLimitMiddleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith(PAPI.LABEL_IMAGE)) {
    const ip = request.ip ?? LOCAL_IP
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return new NextResponse(ReasonPhrases.TOO_MANY_REQUESTS, { status: StatusCodes.TOO_MANY_REQUESTS })
    }
  }

  return NextResponse.next()
}
