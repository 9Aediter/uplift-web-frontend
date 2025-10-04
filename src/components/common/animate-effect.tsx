"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimateEffectProps {
  children: React.ReactNode;
  index: number;
  delay?: number;
}

export const AnimateEffect: React.FC<AnimateEffectProps> = ({ children, index, delay }) => {
  const controls = useAnimation();
  const [isMounted, setIsMounted] = React.useState(false);
  
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Ensure component is mounted before allowing animations
  useEffect(() => {
    setIsMounted(true);
    // Start visible animation with custom delay or index-based delay
    const delayMs = delay !== undefined ? delay * 1000 : index * 100;
    const timer = setTimeout(() => {
      if (controls && controls.start) {
        controls.start("visible");
      }
    }, delayMs);
    
    return () => clearTimeout(timer);
  }, [controls, index, delay]);

  const handleViewportEnter = () => {
    if (isMounted) {
      controls.start("visible");
    }
  };

  const handleViewportLeave = () => {
    if (isMounted) {
      controls.start("hidden");
    }
  };

  return (
    <motion.div
      key={index}
      initial="hidden"
      animate={controls}
      variants={variants}
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      viewport={{ amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};
