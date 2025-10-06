"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad' | 'unoptimized'> {
  fallbackSrc?: string;
  timeout?: number; // Timeout in milliseconds (default: 10000ms = 10s)
  onLoad?: () => void;
  forceUnoptimized?: boolean; // Force bypass Next.js optimization (default: true)
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  timeout = 10000,
  onLoad,
  forceUnoptimized = true, // Default to true - skip optimization by default
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if it's an external URL
  const isExternalImage = typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));

  // Determine if we should skip optimization
  const shouldUnoptimize = forceUnoptimized || isExternalImage;

  // Timeout handler
  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      if (isLoading && !isError) {
        console.warn(`Image loading timeout after ${timeout}ms: ${src}`);
        setIsError(true);
        setIsLoading(false);
        // Use fallback if provided, otherwise keep trying with original
        if (fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [isLoading, isError, timeout, src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      // Use unoptimized to skip Next.js Image Optimization (faster, no timeout issues)
      unoptimized={shouldUnoptimize}
      onLoad={() => {
        setIsLoading(false);
        onLoad?.(); // Call parent's onLoad if provided
      }}
      onError={() => {
        if (!isError) {
          setIsError(true);
          setIsLoading(false);
          // Use fallback if provided
          if (fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
          onLoad?.(); // Call parent's onLoad even on error
        }
      }}
    />
  );
}
