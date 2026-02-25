import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/**' },
      { protocol: 'https', hostname: '*.printful.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.printify.com', pathname: '/**' },
    ],
  },
  async rewrites() {
    return [
      { source: '/api/connect/:path*', destination: '/api/stripe/connect/:path*' },
    ];
  },
};

export default nextConfig;
