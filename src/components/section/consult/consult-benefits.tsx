'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  Lightbulb, 
  Target, 
  Zap, 
  Shield,
  TrendingUp,
  CheckCircle2,
  Star
} from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: "30-Minute Free Consultation",
    description: "No commitment, no cost. Get valuable insights from our technology experts in just 30 minutes.",
    gradient: "from-cyan-500 to-blue-500",
    iconColor: "text-cyan-400"
  },
  {
    icon: Target,
    title: "Personalized Strategy",
    description: "Receive a customized technology roadmap tailored specifically to your business goals and requirements.",
    gradient: "from-purple-500 to-indigo-500", 
    iconColor: "text-purple-400"
  },
  {
    icon: Users,
    title: "Expert Team Access",
    description: "Connect with senior developers and technology consultants with 10+ years of industry experience.",
    gradient: "from-green-500 to-emerald-500",
    iconColor: "text-green-400"
  },
  {
    icon: Zap,
    title: "Rapid Implementation",
    description: "Get faster time-to-market with proven development methodologies and efficient project execution.",
    gradient: "from-yellow-500 to-orange-500",
    iconColor: "text-yellow-400"
  },
  {
    icon: Shield,
    title: "Risk-Free Assessment",
    description: "Identify potential challenges and roadblocks before they become costly problems in your project.",
    gradient: "from-red-500 to-pink-500",
    iconColor: "text-red-400"
  },
  {
    icon: TrendingUp,
    title: "ROI Optimization",
    description: "Maximize your technology investment with data-driven recommendations and best practices.",
    gradient: "from-blue-500 to-cyan-500",
    iconColor: "text-blue-400"
  }
];

const stats = [
  { icon: CheckCircle2, number: "500+", label: "Projects Completed", color: "text-cyan-400" },
  { icon: Users, number: "200+", label: "Happy Clients", color: "text-green-400" },
  { icon: Star, number: "4.9/5", label: "Client Rating", color: "text-yellow-400" },
  { icon: Clock, number: "3-5x", label: "Faster Delivery", color: "text-purple-400" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
} as const;

export function ConsultBenefits() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Why Choose Our{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Consultation
          </span>
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Get expert insights that can save you months of development time and thousands of dollars in potential mistakes. 
          Our consultation process is designed to deliver maximum value in minimum time.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center group hover:border-gray-600/50 transition-all duration-300"
            >
              <IconComponent className={`h-8 w-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Benefits Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`} />
              
              {/* Card */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 h-full group-hover:border-gray-600/50 transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${benefit.gradient} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}