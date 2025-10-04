'use client';
import { useRef, useEffect, useState, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

export const LazySection = ({ 
  children, 
  fallback, 
  rootMargin = '200px',
  threshold = 0.1 
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
};