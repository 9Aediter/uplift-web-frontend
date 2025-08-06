'use client';

import React, { useState, useEffect } from 'react';
import { ProductHeroCTA } from './product-hero-cta';

interface MobileCTAProps {
  buttons?: Array<{
    text: string;
    href: string;
    variant?: "default" | "outline" | "secondary";
    icon?: string;
  }>;
}

export const ProductHeroMobileCTA: React.FC<MobileCTAProps> = ({ buttons }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Hide CTA when scrolled past 100vh (full screen height)
      setIsVisible(scrollY < windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`sm:hidden fixed bottom-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-md py-6 px-8 shadow-lg shadow-black/50 transition-all duration-500 ease-out transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0'
      }`}
    >
      <ProductHeroCTA buttons={buttons} />
    </div>
  );
};