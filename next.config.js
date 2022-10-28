/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://account-service-y7nazd37ga-df.a.run.app/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
