import React from "react";
import { cn } from "@/lib/utils";

interface SSRImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export const SSRImage = ({ src, alt, className, fill, width, height }: SSRImageProps) => {
  const imgStyle = fill 
    ? { position: 'absolute' as const, inset: 0, width: '100%', height: '100%' }
    : { width: width || 'auto', height: height || 'auto' };

  return (
    <img
      src={src}
      alt={alt}
      style={imgStyle}
      className={cn("object-cover", className)}
      loading="lazy"
      decoding="async"
    />
  );
};