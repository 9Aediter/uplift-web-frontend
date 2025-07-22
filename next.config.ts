import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "uplift-uploads.s3.ap-southeast-1.amazonaws.com",
      "picsum.photos",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;
