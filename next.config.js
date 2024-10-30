const { i18n } = require('./next-i18next.config')
const env = require('./env.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  eslint: {
    dirs: ['src'],
  },
  env,
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
      },
    ],
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
