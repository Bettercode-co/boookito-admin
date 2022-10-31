/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['bookito-object-storage.storage.iran.liara.space'],
  },
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
