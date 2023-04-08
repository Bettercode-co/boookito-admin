/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  output: 'standalone',
  swcMinify: true,
  images: {
    domains: ['bookito-data-storage.storage.iran.liara.space'],
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