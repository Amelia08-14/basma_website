import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  devIndicators: false,
  images: {
    remotePatterns: [],
  },
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
