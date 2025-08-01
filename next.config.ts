import type { NextConfig } from 'next';

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

export default nextConfig;
