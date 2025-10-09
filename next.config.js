const { i18n } = require('./next-i18next.config')
const env = require('./env.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  eslint: {
    dirs: ['src'],
  },
  env,
  reactStrictMode: process.env.NODE_ENV === 'development',
  swcMinify: true,
  images: {
    domains: [
      'storage.googleapis.com',
      'essaa-creatolen-cdst-lens-image_gen_user_files-sit',
      '2tag.ai',
      '2tag-fi446chi3-creato-webapps-projects.vercel.app/en',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'v1.wix:image',
        pathname: '/**', // Allow all paths under this hostname
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/:locale/features',
        destination: '/:locale',
        permanent: true,
        locale: false,
      },
      {
        source: '/features',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
