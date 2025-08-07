'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Users, Lightbulb } from 'lucide-react';

export function ConsultationHero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Sticky Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700' 
          : 'bg-transparent'
      }`}>
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-white text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Consultation
            </span>
          </h1>
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Desktop/Tablet Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
          <span className="block sm:inline">Free Technology</span>{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Consultation
          </span>
        </h1>
        
        {/* Description - hide on small mobile */}
        <p className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed hidden sm:block">
          Get expert advice tailored to your business needs. Schedule a free consultation 
          with our technology specialists and discover how we can transform your operations.
        </p>

        {/* Mobile simplified description */}
        <p className="text-base text-gray-300 mb-6 leading-relaxed sm:hidden">
          Get expert advice for your business needs.
        </p>
        
        {/* Details - Responsive */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 md:mb-12">
          {/* Desktop version with text */}
          <div className="hidden md:flex items-center gap-2 text-cyan-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Free 30-min consultation</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-cyan-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Expert technology advice</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-cyan-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Personalized solutions</span>
          </div>

          {/* Mobile version with icons only */}
          <div className="flex md:hidden items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2 text-cyan-400">
              <Clock className="h-6 w-6" />
              <span className="text-xs font-medium">30 min</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-cyan-400">
              <Users className="h-6 w-6" />
              <span className="text-xs font-medium">Expert</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-cyan-400">
              <Lightbulb className="h-6 w-6" />
              <span className="text-xs font-medium">Personal</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}