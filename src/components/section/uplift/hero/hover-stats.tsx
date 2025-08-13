"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaProjectDiagram, FaClock, FaGlobe } from "react-icons/fa";

const stats = [
  {
    id: 1,
    icon: FaUsers,
    value: "50+",
    label: "Happy Clients",
    color: "from-blue-400 to-cyan-400",
    position: { top: "20%", left: "15%" }
  },
  {
    id: 2,
    icon: FaProjectDiagram,
    value: "200+",
    label: "Projects Completed",
    color: "from-green-400 to-emerald-400", 
    position: { top: "60%", left: "10%" }
  },
  {
    id: 3,
    icon: FaClock,
    value: "5+",
    label: "Years Experience",
    color: "from-purple-400 to-pink-400",
    position: { top: "30%", right: "20%" }
  },
  {
    id: 4,
    icon: FaGlobe,
    value: "10+",
    label: "Countries Served",
    color: "from-orange-400 to-red-400",
    position: { top: "70%", right: "15%" }
  }
];

interface HoverStatsProps {
  isGlobeHovered: boolean;
}

export const HoverStats: React.FC<HoverStatsProps> = ({ isGlobeHovered }) => {
  return (
    <AnimatePresence>
      {isGlobeHovered && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <motion.div
                key={stat.id}
                className="absolute"
                style={stat.position}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  y: 20
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0,
                  y: -20
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                {/* Stat Card */}
                <div className="bg-black/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 min-w-[140px] shadow-lg">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 rounded-xl blur-sm`}></div>
                  
                  <div className="relative flex items-center space-x-3">
                    {/* Icon */}
                    <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="text-white text-sm" />
                    </div>
                    
                    {/* Content */}
                    <div>
                      <div className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-gray-300 text-xs whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connecting line to globe */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  style={{
                    transformOrigin: "center",
                    transform: `rotate(${45 + index * 90}deg)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

// Wrapper component ให้ Globe
export const GlobeWithStats = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <HoverStats isGlobeHovered={isHovered} />
    </div>
  );
};