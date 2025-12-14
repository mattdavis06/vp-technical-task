import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: 'images-nonprod.victorianplumbing.co.uk' }],
  },
}

export default nextConfig
