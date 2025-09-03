'use client';

import React, { useEffect, useState } from 'react';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface Certificate {
  name: string;
  issuer?: string;
  date?: string;
  icon?: React.ReactNode;
}

interface CertificateCarouselProps {
  certificates: string[] | Certificate[];
  autoScrollInterval?: number;
}

const CertificateCarousel: React.FC<CertificateCarouselProps> = ({ 
  certificates, 
  autoScrollInterval = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Convert string array to Certificate objects if needed
  const processedCertificates: Certificate[] = certificates.map(cert => 
    typeof cert === 'string' 
      ? { name: cert, issuer: cert.split(' ')[0] }
      : cert
  );

  const totalCertificates = processedCertificates.length;

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused || totalCertificates <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === totalCertificates - 1 ? 0 : prevIndex + 1
      );
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isPaused, totalCertificates, autoScrollInterval]);

  const goToNext = () => {
    setCurrentIndex(currentIndex === totalCertificates - 1 ? 0 : currentIndex + 1);
  };

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? totalCertificates - 1 : currentIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (totalCertificates === 0) return null;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Certificate Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedCertificates.map((cert, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % totalCertificates;
          const isPrev = index === (currentIndex - 1 + totalCertificates) % totalCertificates;
          
          // Show current + next 2 certificates on larger screens
          const isVisible = isActive || isNext || isPrev;
          
          return (
            <div 
              key={index}
              className={`
                transition-all duration-500 ease-in-out transform
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}
                ${isActive ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900' : ''}
                bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg
              `}
            >
              <div className="flex items-start space-x-4">
                <div className={`
                  flex-shrink-0 p-2 rounded-lg transition-colors duration-300
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30' 
                    : 'bg-slate-100 dark:bg-slate-800'
                  }
                `}>
                  {cert.icon || <Award className={`h-6 w-6 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`} />}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                  }`}>
                    {cert.name}
                  </h3>
                  {cert.issuer && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Certified by {cert.issuer}
                    </p>
                  )}
                  {cert.date && (
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {cert.date}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      {totalCertificates > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700"
            aria-label="Next certificate"
          >
            <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {processedCertificates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? 'bg-blue-600 dark:bg-blue-400 scale-125' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }
                `}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-scroll Indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`} />
              <span>{isPaused ? 'Paused' : 'Auto-scrolling'}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CertificateCarousel;