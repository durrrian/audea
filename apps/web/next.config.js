/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { version } = require('./package.json')
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

    serverComponentsExternalPackages: ['puppeteer-core', 'puppeteer'],
  },

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  transpilePackages: [
    '@repo/prisma',
    '@repo/tailwind-config',
    '@repo/web-ui',
    '@repo/api',
    '@repo/assets',
    '@repo/helper',
    '@repo/trigger',
  ],

  env: {
    APP_VERSION: version,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.stockbit.com',
      },

      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },

  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },

  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
}

module.exports = withMDX(nextConfig)
