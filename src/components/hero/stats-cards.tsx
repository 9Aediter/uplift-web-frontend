"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { 
  FaMobileAlt, 
  FaUsers, 
  FaHandshake, 
  FaChartLine, 
  FaStar 
} from "react-icons/fa";
import { IconType } from "react-icons";

interface StatCard {
  id: string;
  title: string;
  value: number;
  suffix?: string;
  description: string;
  icon: IconType;
  color: string;
  bgGradient: string;
}

const statsData: StatCard[] = [
  {
    id: "apps",
    title: "Apps",
    value: 5,
    suffix: "+",
    description: "Delivered",
    icon: FaMobileAlt,
    color: "from-blue-500 to-cyan-500",
    bgGradient: "bg-gradient-to-br from-blue-500/5 to-cyan-500/5"
  },
  {
    id: "users",
    title: "Users",
    value: 50000,
    suffix: "+",
    description: "Active",
    icon: FaUsers,
    color: "from-purple-500 to-pink-500",
    bgGradient: "bg-gradient-to-br from-purple-500/5 to-pink-500/5"
  },
  {
    id: "clients",
    title: "Clients",
    value: 10,
    suffix: "+",
    description: "Trusted",
    icon: FaHandshake,
    color: "from-green-500 to-emerald-500",
    bgGradient: "bg-gradient-to-br from-green-500/5 to-emerald-500/5"
  },
  {
    id: "success",
    title: "Success",
    value: 100,
    suffix: "%",
    description: "Rate",
    icon: FaChartLine,
    color: "from-orange-500 to-red-500",
    bgGradient: "bg-gradient-to-br from-orange-500/5 to-red-500/5"
  },
  {
    id: "experience",
    title: "Years",
    value: 4,
    suffix: "+",
    description: "Experience",
    icon: FaStar,
    color: "from-yellow-500 to-amber-500",
    bgGradient: "bg-gradient-to-br from-yellow-500/5 to-amber-500/5"
  }
];

// Counter animation component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(latest);
      }
    });
    return () => controls.stop();
  }, [value]);

  const formattedValue = value >= 1000 
    ? Math.round(displayValue).toLocaleString()
    : Math.round(displayValue).toString();

  return (
    <span className="inline-flex items-baseline">
      <span>{formattedValue}</span>
      <span>{suffix}</span>
    </span>
  );
}

// Individual stat card component
function StatCard({ stat, index, showText = true }: { stat: StatCard; index: number; showText?: boolean }) {
  const ref = React.useRef(null);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: showText ? index * 0.05 : index * 0.1, 
        duration: 0.5,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={`
        relative overflow-hidden rounded-xl ${showText ? 'p-4' : 'p-6 w-32 h-32'}
        ${stat.bgGradient}
        border border-white/5 dark:border-white/10
        backdrop-blur-sm
        group cursor-pointer
      `}
    >
      {/* Animated gradient background */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0`}
        whileHover={{ opacity: 0.05 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glow effect on hover */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
      
      {/* Content */}
      <div className={`relative z-10 ${showText ? 'flex items-start gap-3' : 'flex flex-col items-center justify-center text-center h-full'}`}>
        {/* Icon */}
        <motion.div
          className="flex-shrink-0"
          animate={{ 
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={`${showText ? 'w-10 h-10 md:w-12 md:h-12' : 'w-12 h-12'} rounded-lg bg-gradient-to-br ${stat.color} p-3 flex items-center justify-center`}>
            <Icon className={`${showText ? 'w-5 h-5 md:w-6 md:h-6' : 'w-6 h-6'} text-white`} />
          </div>
        </motion.div>
        
        {showText ? (
          /* Text content for mobile/desktop */
          <div className="flex-1 min-w-0">
            <div className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate">
              {stat.title}
            </div>
            <div className="text-[9px] text-gray-500 dark:text-gray-400 truncate">
              {stat.description}
            </div>
          </div>
        ) : (
          /* Number only for tablet portrait */
          <div className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
        )}
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${stat.color} rounded-full opacity-30`}
            initial={{ 
              x: (i * 33) + 10, // Fixed positions instead of Math.random()
              y: 100
            }}
            animate={{ 
              y: -20,
              opacity: [0.3, 0.6, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function StatsCards() {
  return (
    <>
      {/* Mobile: Grid layout at bottom with text */}
      <div className="block md:hidden w-full max-w-7xl mx-auto px-4 grid grid-cols-2 gap-3">
        {statsData.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} showText={true} />
        ))}
      </div>
      
      {/* Tablet Portrait: Vertical column on right with icons only */}
      <div className="hidden md:flex lg:hidden absolute right-4 top-1/2 -translate-y-1/2 flex-col gap-2">
        {statsData.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} showText={false} />
        ))}
      </div>
      
      {/* Desktop: Horizontal grid at bottom with text */}
      <div className="hidden lg:grid grid-cols-5 w-full max-w-7xl mx-auto px-4 gap-4">
        {statsData.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} showText={true} />
        ))}
      </div>
    </>
  );
}