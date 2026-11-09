import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Product photography is served by the Unsplash image CDN, which resizes
    // and converts formats itself — a custom loader passes width/quality on.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
  poweredByHeader: false,
}

export default nextConfig
