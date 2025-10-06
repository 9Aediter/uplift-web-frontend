'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Lightbulb, Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/basic/button/button';

const features = [
  {
    icon: Clock,
    title: "30 Minutes",
    description: "Free consultation call",
    color: "text-cyan-400"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Senior developers & consultants",
    color: "text-green-400"
  },
  {
    icon: Lightbulb,
    title: "Custom Solutions",
    description: "Tailored to your business",
    color: "text-purple-400"
  }
];

export function ConsultationHero() {
  const scrollToForm = () => {
    const formSection = document.querySelector('#consultation-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center bg-cyan-100 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/40 dark:border-cyan-500/20 mb-8"
        >
          <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mr-2" />
          <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
            Free Technology Consultation
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block">Transform Your</span>
          <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
            Business Ideas
          </span>
          <span className="block">Into Reality</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Get expert insights from senior technology consultants. Schedule a free 30-minute consultation
          to discuss your project and receive personalized recommendations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Free Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-900 dark:hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/70 dark:bg-gray-800/30 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-xl p-6 group hover:border-slate-300 dark:hover:border-gray-600/50 hover:bg-white dark:hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <IconComponent className={`h-8 w-8 ${feature.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-slate-900 dark:text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 pt-8 border-t border-slate-200 dark:border-gray-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-slate-600 dark:text-gray-400 text-sm mb-4">Trusted by 200+ companies worldwide</p>
          <div className="flex items-center justify-center gap-8 text-slate-500 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">500+ Projects Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm">4.9/5 Client Rating</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-sm">10+ Years Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}