/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
