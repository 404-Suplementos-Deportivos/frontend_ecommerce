/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.sscontent.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
