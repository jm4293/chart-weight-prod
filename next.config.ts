import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 10MB로 제한 상향
    },
  },
  /* config options here */
};

export default nextConfig;
