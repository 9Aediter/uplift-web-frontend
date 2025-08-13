"use client";

import React from "react";
import { motion } from "framer-motion";

interface StaggerWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Container animation สำหรับ stagger effect
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

// Item animation สำหรับแต่ละ element
const staggerItem = {
  hidden: { 
    y: 60, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
};

export const StaggerContainer: React.FC<StaggerWrapperProps> = ({ 
  children, 
  className = "",
  delay = 0 
}) => {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<StaggerWrapperProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      className={className}
      variants={staggerItem}
    >
      {children}
    </motion.div>
  );
};

// Preset animations สำหรับ Hero elements
export const HeroStaggerAnimations = {
  // Badge animation - เข้าจากซ้าย
  badge: {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay: 0.1
      }
    }
  },

  // Heading animation - scale up พร้อม fade
  heading: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 15,
        delay: 0.3
      }
    }
  },

  // Subheading animation - เข้าจากล่าง
  subheading: {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay: 0.5
      }
    }
  },

  // Buttons animation - เข้าทีละปุ่ม
  buttonsContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.7,
        staggerChildren: 0.15
      }
    }
  },

  buttonItem: {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25
      }
    }
  },

};


