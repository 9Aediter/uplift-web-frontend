import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https", 
        hostname: "uplift-uploads.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
        port: "",
        pathname: "/**",
      }
    ],
    
    // Image optimization settings for production
    formats: ['image/webp', 'image/avif'],
    
    // Increase timeout for slow external images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Size limits
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache settings
    minimumCacheTTL: 60,
    
    // Domain-specific configurations
    domains: [], // Keep empty, use remotePatterns instead
    
    // For development vs production
    ...(process.env.NODE_ENV === 'production' && {
      loader: 'default',
      path: '/_next/image/',
    }),
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  
  // Compress responses
  compress: true,

  // Output configuration for standalone deployment
  output: 'standalone',
  
};

export default nextConfig;
