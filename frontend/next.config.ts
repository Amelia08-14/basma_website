import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  devIndicators: false,
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
