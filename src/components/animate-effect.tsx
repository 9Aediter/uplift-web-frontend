"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimateEffectProps {
  children: React.ReactNode;
  index: number;
}

export const AnimateEffect: React.FC<AnimateEffectProps> = ({ children, index }) => {
  const controls = useAnimation();
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={index}
      initial="hidden"
      animate={controls}
      variants={variants}
      onViewportEnter={() => controls.start("visible")}
      onViewportLeave={() => controls.start("hidden")}
      viewport={{ amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
};
