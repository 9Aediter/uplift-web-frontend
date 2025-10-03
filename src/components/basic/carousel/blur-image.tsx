"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps {
  height?: number | string;
  width?: number | string;
  src: string;
  className?: string;
  alt?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  style,
}: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render image until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={cn("h-full w-full bg-gray-800 animate-pulse", className)} />
    );
  }

  // Show error state if image fails to load
  if (imageError) {
    return (
      <div className={cn("h-full w-full bg-gray-800 flex items-center justify-center", className)}>
        <div className="text-gray-400 text-sm">Failed to load image</div>
      </div>
    );
  }

  const imgStyle = fill 
    ? { position: 'absolute' as const, inset: 0, width: '100%', height: '100%', ...style }
    : { width: width || 'auto', height: height || 'auto', ...style };

  return (
    <img
      className={cn(
        "h-full w-full transition duration-300 object-cover",
        isLoading ? "blur-sm scale-105" : "blur-0 scale-100",
        className,
      )}
      onLoad={() => setLoading(false)}
      onError={() => {
        setLoading(false);
        setImageError(true);
      }}
      src={src}
      style={imgStyle}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
    />
  );
};