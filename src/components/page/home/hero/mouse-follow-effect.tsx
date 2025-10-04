"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const MouseFollowEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "tween",
          duration: 0.02,
        }}
      >
        <div className="w-2 h-2 bg-cyan-400/80 rounded-full" />
      </motion.div>

      {/* Secondary glow */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "tween",
          duration: 0.05,
        }}
      >
        <div className="w-4 h-4 bg-blue-500/40 rounded-full blur-sm" />
      </motion.div>

      {/* Outer glow */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "tween",
          duration: 0.1,
        }}
      >
        <div className="w-10 h-10 bg-purple-500/20 rounded-full blur-lg" />
      </motion.div>
    </>
  );
};