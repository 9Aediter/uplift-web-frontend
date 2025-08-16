'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Zap, Code, Heart } from 'lucide-react';

interface StoryHeroProps {
  title: string;
  description: string;
}

const StoryHero: React.FC<StoryHeroProps> = ({ title, description }) => {
  const scrollToContent = () => {
    const element = document.querySelector('#story-content');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
    },
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        
        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 left-10 text-blue-400/30"
          animate={floatingAnimation}
        >
          <Code size={40} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-purple-400/30"
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 1
            }
          }}
        >
          <Zap size={35} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-indigo-400/30"
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 2
            }
          }}
        >
          <Sparkles size={30} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-pink-400/30"
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 3
            }
          }}
        >
          <Heart size={32} />
        </motion.div>

        {/* Animated Blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sparkles Animation */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20"
            animate={pulseAnimation}
          >
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Our Journey
            </span>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          variants={itemVariants}
        >
          <motion.span
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            style={{
              backgroundSize: '200% 100%',
            }}
          >
            {title}
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {/* CTA Section */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          variants={itemVariants}
        >
          {/* Stats Cards */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={containerVariants}
          >
            {[
              { number: '50+', label: 'Projects' },
              { number: '3+', label: 'Years' },
              { number: '100%', label: 'Passion' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[100px] border border-white/20 shadow-lg"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          onClick={scrollToContent}
          variants={itemVariants}
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
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default StoryHero;