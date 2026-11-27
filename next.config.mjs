/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [{ source: '/portal/portal/:path*', destination: '/portal/:path*', permanent: false }]
  },
  async rewrites() {
    return [
      { source: '/portal', destination: '/portal/index.html' },
      { source: '/portal/:path((?!assets/).*)', destination: '/portal/index.html' },
    ]
  },
}

export default nextConfig
