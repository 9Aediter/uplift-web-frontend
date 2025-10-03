'use client';

import React from "react";
import { motion } from "framer-motion";
import { AnimateEffect } from "@/components/animate-effect";

interface AnimatedTitleProps {
  title: string;
}

interface AnimatedSubtitleProps {
  subtitle: string;
}

interface AnimatedProblemCardProps {
  problem: {
    id: number;
    title: string;
    description: string;
    icon: string;
    gradient: string;
    impact: string;
  };
  index: number;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title }) => (
  <motion.h2 
    className="text-4xl md:text-5xl font-bold mb-6"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
      {title}
    </span>
  </motion.h2>
);

export const AnimatedSubtitle: React.FC<AnimatedSubtitleProps> = ({ subtitle }) => (
  <motion.p 
    className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    {subtitle}
  </motion.p>
);

export const AnimatedProblemCard: React.FC<AnimatedProblemCardProps> = ({ problem, index }) => (
  <AnimateEffect index={index}>
    <motion.div
      className="group relative"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Card */}
      <div className="relative h-80 bg-white/60 dark:bg-gray-900/80 backdrop-blur-sm border border-amber-200/30 dark:border-gray-700/50 rounded-2xl p-6 overflow-hidden hover:border-amber-300/50 dark:hover:border-gray-600/70 transition-all duration-300 shadow-lg hover:shadow-xl">
        {/* Background Gradient */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${problem.gradient}`}></div>
        
        {/* 3D Icon */}
        <div className="mb-6 relative">
          <div className="w-16 h-16 bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800 backdrop-blur-sm rounded-xl flex items-center justify-center border border-amber-200/50 dark:border-gray-600/50 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <span className="text-3xl filter drop-shadow-lg">{problem.icon}</span>
          </div>
          {/* Glow effect */}
          <div className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-r ${problem.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}></div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className={`text-gray-900 dark:text-white text-xl font-bold leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:${problem.gradient} transition-all duration-300`}>
            {problem.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
            {problem.description}
          </p>

          {/* Impact Badge */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800/60 dark:to-gray-800/60 backdrop-blur-sm border border-amber-200/50 dark:border-gray-600/50 rounded-full px-4 py-2 group-hover:border-amber-300/70 dark:group-hover:border-gray-500/70 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-500">Impact:</span>
                <span className={`text-xs font-semibold bg-gradient-to-r ${problem.gradient} bg-clip-text text-transparent`}>
                  {problem.impact}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover effect background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${problem.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
      </div>
    </motion.div>
  </AnimateEffect>
);

// Static versions for SSR fallback
export const StaticTitle: React.FC<AnimatedTitleProps> = ({ title }) => (
  <h2 className="text-4xl md:text-5xl font-bold mb-6">
    <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
      {title}
    </span>
  </h2>
);

export const StaticSubtitle: React.FC<AnimatedSubtitleProps> = ({ subtitle }) => (
  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
    {subtitle}
  </p>
);

export const StaticProblemCard: React.FC<{ problem: AnimatedProblemCardProps['problem'] }> = ({ problem }) => (
  <div className="group relative">
    {/* Card */}
    <div className="relative h-80 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 overflow-hidden hover:border-border/70 transition-all duration-300">
      {/* Background Gradient */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${problem.gradient}`}></div>
      
      {/* 3D Icon */}
      <div className="mb-6 relative">
        <div className="w-16 h-16 bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-600/50 group-hover:scale-110 transition-transform duration-300">
          <span className="text-3xl filter drop-shadow-lg">{problem.icon}</span>
        </div>
        {/* Glow effect */}
        <div className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-r ${problem.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-white text-xl font-bold leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {problem.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {problem.description}
        </p>

        {/* Impact Badge */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-muted/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 group-hover:border-border/70 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Impact:</span>
              <span className={`text-xs font-semibold bg-gradient-to-r ${problem.gradient} bg-clip-text text-transparent`}>
                {problem.impact}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${problem.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
    </div>
  </div>
);