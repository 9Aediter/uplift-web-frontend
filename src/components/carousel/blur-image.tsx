"use client";
import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
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
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm scale-105" : "blur-0 scale-100",
        className,
      )}
      onLoad={() => setLoading(false)}
      onError={() => {
        setLoading(false);
        setImageError(true);
      }}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyejVityTkKXj8U8k9VKxbZRkkcuV2pz7jysjZt32dSfaH9jL4zBE4yb5dvk5y3n/1/x"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};