import React from "react";
import Image from "next/image";
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
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      loading="lazy"
      decoding="async"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};