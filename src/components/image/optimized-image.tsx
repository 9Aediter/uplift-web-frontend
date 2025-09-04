'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  showPlaceholder?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  fallbackSrc = '/images/placeholder.jpg',
  showPlaceholder = true,
  className,
  ...props 
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    console.warn(`Failed to load image: ${imgSrc}`);
    setHasError(true);
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // If all images fail and no placeholder should be shown
  if (hasError && (!fallbackSrc || imgSrc === fallbackSrc) && !showPlaceholder) {
    return null;
  }

  // Show placeholder div if image fails and no fallback
  if (hasError && (!fallbackSrc || imgSrc === fallbackSrc) && showPlaceholder) {
    return (
      <div 
        className={`bg-muted animate-pulse flex items-center justify-center ${className || ''}`}
        style={{ aspectRatio: 'var(--aspect-ratio, auto)' }}
      >
        <div className="text-muted-foreground text-sm">
          {alt || 'Image unavailable'}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && showPlaceholder && (
        <div 
          className={`absolute inset-0 bg-muted animate-pulse ${className || ''}`}
        />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoadComplete}
        // Add loading strategy for external images
        loading={props.priority ? 'eager' : 'lazy'}
        // Add quality optimization
        quality={props.quality || 75}
        // Add placeholder for better UX
        placeholder={showPlaceholder ? 'blur' : 'empty'}
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </div>
  );
};