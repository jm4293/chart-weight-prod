import type { NextConfig } from 'next';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
});

const nextConfig: NextConfig = {
  images: {
    domains: ['jsabzyzotamfwjefvasb.supabase.co'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 10MB로 제한 상향
    },
  },
  /* config options here */
};

module.exports = withPWA(nextConfig);
export default nextConfig;
