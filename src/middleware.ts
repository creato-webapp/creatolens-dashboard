export { default } from 'next-auth/middleware'

export const config = { 
    matcher: [
      '/accounts/:path*', 
      '/recommendation', 
      '/guide',
      '/api/image/:path*',
      '/api/hashtag/:path*',
    ]
  }