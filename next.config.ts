import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  images: {
    domains: ['images.unsplash.com'],
  }
};

export default nextConfig;
