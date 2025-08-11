"use client";
import React from "react";
import { motion } from "motion/react";

interface CarouselAnimateWrapperProps {
  children: React.ReactNode;
  index: number;
}

export const CarouselAnimateWrapper = ({ children, index }: CarouselAnimateWrapperProps) => {
  return (
    <motion.div
      viewport={{ once: true }}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.2 * index,
          ease: "easeOut",
        },
      }}
      className="rounded-3xl"
    >
      {children}
    </motion.div>
  );
};