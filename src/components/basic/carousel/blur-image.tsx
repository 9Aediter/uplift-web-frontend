"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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

  return (
    <Image
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
      width={typeof width === 'number' ? width : parseInt(String(width)) || 800}
      height={typeof height === 'number' ? height : parseInt(String(height)) || 600}
      fill={fill}
      style={style}
      loading="lazy"
      alt={alt || "Background of a beautiful view"}
    />
  );
};