'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      console.warn(`Failed to load image: ${src}`);
      setImgSrc(fallbackSrc);
      setIsError(true);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || 'Image'}
      onError={handleError}
      unoptimized={isError}
    />
  );
}
