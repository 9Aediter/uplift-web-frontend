"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface InnovationImageAnimateProps {
  imageUrl: string;
}

export const InnovationImageAnimate: React.FC<InnovationImageAnimateProps> = ({ imageUrl }) => {
  return (
    <div className="relative w-full h-[100vh]">
      <div className="absolute inset-0 z-0" />
      <AnimatePresence initial={false}>
        <motion.div
          key={imageUrl}
          initial={{ opacity: 0, rotateY: -10 }}
          animate={{ opacity: 0.4, rotateY: 5 }}
          exit={{ opacity: 0, rotateY: -10 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(8deg) rotateY(5deg)',
          }}
          whileHover={{
            rotateY: 10,
            rotateX: 12,
            transition: { duration: 0.5 }
          }}
        ></motion.div>
      </AnimatePresence>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-transparent via-background/30 to-background/60" />
    </div>
  );
};