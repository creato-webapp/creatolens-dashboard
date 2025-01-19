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
    domains: ['storage.googleapis.com', 'essaa-creatolen-cdst-lens-image_gen_user_files-sit'],
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
}

module.exports = nextConfig
