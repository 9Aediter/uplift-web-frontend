import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "uplift-uploads.s3.ap-southeast-1.amazonaws.com",
      "picsum.photos",
    ],
  },
};

export default nextConfig;
