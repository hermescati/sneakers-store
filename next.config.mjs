import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        pathname: '**',
        port: '3000',
        protocol: 'http'
      }
    ]
  }
}

export default withPayload(nextConfig)
