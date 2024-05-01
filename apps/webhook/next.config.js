/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const ENV_FILES = ['.env', '.env.local', `.env.${process.env.NODE_ENV || 'development'}`]

ENV_FILES.forEach((file) => {
  require('dotenv').config({
    path: path.join(__dirname, `../../${file}`),
  })
})

/** @type {import('next').NextConfig} */
module.exports = {
  pageExtensions: ['ts', 'tsx'],

  transpilePackages: ['@repo/prisma', '@repo/api', '@repo/email', '@repo/helper', '@repo/trigger'],

  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', 'puppeteer'],
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
