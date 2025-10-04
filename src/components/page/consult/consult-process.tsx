'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  MessageCircle,
  FileSearch,
  Lightbulb,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

const processSteps = [
  {
    step: 1,
    icon: Calendar,
    title: "Schedule Your Call",
    description: "Book a convenient time slot that works for your schedule. Choose from available time slots throughout the week.",
    duration: "2 minutes",
    color: "from-cyan-500 to-blue-500",
    iconColor: "text-cyan-400"
  },
  {
    step: 2,
    icon: MessageCircle,
    title: "Discovery Conversation",
    description: "We'll discuss your business goals, current challenges, and technology requirements in detail.",
    duration: "10-15 minutes",
    color: "from-purple-500 to-indigo-500",
    iconColor: "text-purple-400"
  },
  {
    step: 3,
    icon: FileSearch,
    title: "Solution Analysis",
    description: "Our experts analyze your needs and identify the best technology solutions for your specific situation.",
    duration: "10-15 minutes",
    color: "from-green-500 to-emerald-500",
    iconColor: "text-green-400"
  },
  {
    step: 4,
    icon: Lightbulb,
    title: "Action Plan & Next Steps",
    description: "Receive a personalized roadmap with clear next steps, timeline estimates, and investment recommendations.",
    duration: "5-10 minutes",
    color: "from-yellow-500 to-orange-500",
    iconColor: "text-yellow-400"
  }
];

const whatToExpect = [
  {
    icon: CheckCircle2,
    title: "Technology Assessment",
    description: "Comprehensive review of your current tech stack and infrastructure"
  },
  {
    icon: CheckCircle2,
    title: "Custom Recommendations",
    description: "Tailored solutions based on your budget, timeline, and business goals"
  },
  {
    icon: CheckCircle2,
    title: "Implementation Roadmap",
    description: "Clear step-by-step plan with milestones and delivery timelines"
  },
  {
    icon: CheckCircle2,
    title: "Cost Estimates",
    description: "Transparent pricing breakdown with no hidden fees or surprises"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
} as const;

export function ConsultProcess() {
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
          How Our{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Consultation Works
          </span>
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Our streamlined consultation process is designed to maximize value while respecting your time.
          {"Here's"} exactly what happens during your 30-minute session.
        </p>
      </motion.div>

      {/* Process Steps */}
      <motion.div 
        className="relative mb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Connection Line */}
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent hidden md:block" />
        
        {processSteps.map((step, index) => {
          const IconComponent = step.icon;
          const isLast = index === processSteps.length - 1;
          
          return (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className="relative flex items-start gap-6 mb-12 last:mb-0"
            >
              {/* Step Circle */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-white font-medium">
                  {step.step}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-2">
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 group hover:border-gray-600/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="h-4 w-4" />
                      {step.duration}
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Arrow */}
              {!isLast && (
                <div className="absolute right-0 top-8 transform translate-x-full hidden lg:block">
                  <ArrowRight className="h-6 w-6 text-gray-600" />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* What to Expect Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            {"What You'll Get From The"}{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Consultation
            </span>
          </h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whatToExpect.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-700/30 transition-colors duration-300"
                >
                  <IconComponent className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Call to Action */}
          <div className="text-center mt-10 pt-8 border-t border-gray-700/50">
            <p className="text-lg text-gray-300 mb-4">
              Ready to get started? The consultation is completely free with no obligations.
            </p>
            <div className="flex items-center justify-center gap-4 text-cyan-400">
              <Clock className="h-5 w-5" />
              <span className="font-medium">30 minutes • Free • No commitment</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}