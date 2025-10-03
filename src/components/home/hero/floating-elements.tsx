"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPrisma } from "react-icons/si";

const floatingIcons = [
  { icon: FaReact, color: "text-cyan-400", delay: 0 },
  { icon: SiTypescript, color: "text-blue-500", delay: 0.5 },
  { icon: SiNextdotjs, color: "text-white", delay: 1 },
  { icon: FaNodeJs, color: "text-green-500", delay: 1.5 },
  { icon: SiTailwindcss, color: "text-cyan-300", delay: 2 },
  { icon: FaPython, color: "text-yellow-400", delay: 2.5 },
  { icon: FaAws, color: "text-orange-400", delay: 3 },
  { icon: FaDocker, color: "text-blue-400", delay: 3.5 },
  { icon: SiPrisma, color: "text-indigo-400", delay: 4 },
  { icon: FaGitAlt, color: "text-red-400", delay: 4.5 },
];

export const FloatingElements = () => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    // ตั้งค่าขนาดเมื่อ component mount
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((item, index) => {
        const IconComponent = item.icon;
        const startX = 10 + Math.random() * 80;
        const startY = 10 + Math.random() * 80;
        
        return (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-30 hover:opacity-60 transition-opacity z-10`}
            initial={{
              x: dimensions.width * (startX / 100),
              y: dimensions.height * (startY / 100),
              scale: 0,
              rotate: 0,
            }}
            animate={{
              y: [
                dimensions.height * 0.2,
                dimensions.height * 0.8,
                dimensions.height * 0.3,
              ],
              x: [
                dimensions.width * 0.1,
                dimensions.width * 0.9,
                dimensions.width * 0.2,
              ],
              scale: [0, 1, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
            }}
          >
            <IconComponent size={40 + Math.random() * 32} />
          </motion.div>
        );
      })}

      {/* Floating code snippets */}
      {[
        "{ }", 
        "</>", 
        "npm i", 
        "git push",
        "const",
        "async",
        "=>",
        "API"
      ].map((text, index) => {
        const startX = 5 + Math.random() * 90;
        const startY = 5 + Math.random() * 90;
        
        return (
          <motion.div
            key={`text-${index}`}
            className="absolute text-gray-400/50 font-mono text-lg font-bold z-10"
            initial={{
              x: dimensions.width * (startX / 100),
              y: dimensions.height * (startY / 100),
              opacity: 0,
            }}
            animate={{
              y: [
                dimensions.height * 0.1,
                dimensions.height * 0.9,
              ],
              x: [
                dimensions.width * 0.05,
                dimensions.width * 0.95,
              ],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              delay: index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
            }}
          >
            {text}
          </motion.div>
        );
      })}

      {/* Geometric shapes */}
      {Array.from({ length: 5 }).map((_, index) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        return (
          <motion.div
            key={`shape-${index}`}
            className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full z-10"
            initial={{
              x: dimensions.width * (startX / 100),
              y: dimensions.height * (startY / 100),
              scale: 0,
            }}
            animate={{
              y: [
                dimensions.height * 0.2,
                dimensions.height * 0.8,
              ],
              x: [
                dimensions.width * 0.1,
                dimensions.width * 0.9,
              ],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              delay: index * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
            }}
          />
        );
      })}
    </div>
  );
};