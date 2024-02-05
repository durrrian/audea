const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  reactStrictMode: true,

  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '**.cdninstagram.com',
  //     },
  //   ],
  // },

  experimental: {
    serverMinification: false,
  },
}

module.exports = withMDX(nextConfig)
