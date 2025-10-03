import { ImageLoaderProps } from 'next/image';

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  // If it's already a data URL or blob, return as is
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  // If it's an external URL, return with optimization params
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  }

  // For local images, use default Next.js behavior
  return src;
}
