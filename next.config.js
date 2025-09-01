import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
    loader: 'custom',
    loaderFile: './imageLoader.js', // Custom loader file
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            titleProp: true,
            ref: true,
          },
        },
      ],
    })

    return config
  },
  env: {
    DATABASE_URI: process.env.DATABASE_URI, // pulls from .env file
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET, // pulls from .env file
    SERVER_URL: process.env.SERVER_URL, // pulls from .env file
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_ENDPOINT: process.env.S3_ENDPOINT,

    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL, // pulls from .env file
  },
  output: 'standalone',
  reactStrictMode: true,
  redirects,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withPayload(nextConfig)
