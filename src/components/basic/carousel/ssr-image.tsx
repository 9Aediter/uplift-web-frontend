import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SSRImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export const SSRImage = ({ src, alt, className, fill, width, height }: SSRImageProps) => {
  return fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", className)}
      loading="lazy"
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={cn("object-cover", className)}
      loading="lazy"
    />
  );
};