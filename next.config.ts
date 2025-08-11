import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "uplift-uploads.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
    // Add loader config for problematic domains
    loader: 'default',
    // Disable optimization for S3 images temporarily
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add timeout for image loading
    minimumCacheTTL: 60,
  },
  

};

export default nextConfig;
