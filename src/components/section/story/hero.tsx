'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Calendar, Building2, Users, Award, Globe } from 'lucide-react';
import { WavyBackground } from '@/components/wavy-background';

interface StoryHeroProps {
  title: string;
  subtitle?: string;
}

const StoryHero: React.FC<StoryHeroProps> = ({ title, subtitle }) => {
  const scrollToContent = () => {
    const element = document.querySelector('#story-content');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <WavyBackground >
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white">
            {title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.h2>
        )}

        {/* Summary Cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <Calendar className="h-8 w-8 text-white mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">2025</div>
            <div className="text-white/80 text-sm">Established</div>
          </motion.div>
          
          <motion.div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <Building2 className="h-8 w-8 text-white mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">100+</div>
            <div className="text-white/80 text-sm">Projects</div>
          </motion.div>
          
          <motion.div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <Users className="h-8 w-8 text-white mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-white/80 text-sm">Clients</div>
          </motion.div>
          
          <motion.div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <Globe className="h-8 w-8 text-white mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">7</div>
            <div className="text-white/80 text-sm">Technologies</div>
          </motion.div>
          
          <motion.div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
            <Award className="h-8 w-8 text-white mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-white/80 text-sm">Support</div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          className="text-white/60 hover:text-white transition-colors"
          onClick={scrollToContent}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.button>
      </div>
    </WavyBackground>
  );
};

export default StoryHero;