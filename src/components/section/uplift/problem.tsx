'use client';
import React from "react";
import { Section } from "@/components/ui/section";
import { AnimateEffect } from "@/components/animate-effect";
import { motion } from "framer-motion";

// interface ProblemItem {
//   id: number;
//   title: string;
//   description: string;
//   icon: string; // 3D icon emoji
//   gradient: string;
//   impact: string;
// }

// Mock data with business problems and 3D-style icons
const mockProblemData = {
  title: "Business Challenges",
  subtitle: "Common problems that slow down modern businesses and how technology can solve them",
  items: [
    {
      id: 1,
      title: "Slow Manual Processes",
      description: "Teams waste hours on repetitive tasks that could be automated, reducing productivity and increasing human error.",
      icon: "⚙️",
      gradient: "from-red-500 via-red-400 to-orange-500",
      impact: "85% Time Loss"
    },
    {
      id: 2,
      title: "Poor Data Insights", 
      description: "Critical business decisions are made with incomplete information due to scattered data and lack of analytics.",
      icon: "📊",
      gradient: "from-blue-500 via-blue-400 to-cyan-500",
      impact: "60% Bad Decisions"
    },
    {
      id: 3,
      title: "System Integration Issues",
      description: "Different software tools don't communicate well, creating data silos and workflow bottlenecks.",
      icon: "🔗",
      gradient: "from-purple-500 via-purple-400 to-pink-500",
      impact: "40% Efficiency Drop"
    },
    {
      id: 4,
      title: "Scalability Limitations",
      description: "Current systems can't handle business growth, leading to crashes, slowdowns, and lost opportunities.",
      icon: "🚀",
      gradient: "from-green-500 via-green-400 to-emerald-500", 
      impact: "30% Growth Blocked"
    }
  ]
};

const Problems = () => {
  const { title, subtitle, items } = mockProblemData;

  return (
    <Section id="problem" className="bg-black flex flex-col justify-center py-20">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
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
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((problem, index) => (
            <AnimateEffect key={problem.id} index={index}>
              <motion.div
                className="group relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Card */}
                <div className="relative h-80 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 overflow-hidden hover:border-gray-600/70 transition-all duration-300">
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
                      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-full px-4 py-2 group-hover:border-gray-500/70 transition-colors duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Impact:</span>
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
          ))}
        </div>
      </div>
    </Section>
  );
};

Problems.displayName = 'Problems';
export default Problems;

