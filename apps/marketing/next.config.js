/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const withMDX = require('@next/mdx')()

const ENV_FILES = ['.env', '.env.local', `.env.${process.env.NODE_ENV || 'development'}`]

ENV_FILES.forEach((file) => {
  require('dotenv').config({
    path: path.join(__dirname, `../../${file}`),
  })
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: [
    '@repo/prisma',
    '@repo/tailwind-config',
    '@repo/web-ui',
    '@repo/api',
    '@repo/assets',
    '@repo/helper',
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },

      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },

      {
        protocol: 'https',
        hostname: '**.fna.fbcdn.net',
      },
    ],
  },
}

module.exports = withMDX(nextConfig)
