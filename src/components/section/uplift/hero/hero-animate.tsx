"use client";
import React from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

// Main Hero Animation Container
interface HeroAnimateProps {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const HeroAnimate: React.FC<HeroAnimateProps> = ({ children, containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col">
      {children}
    </motion.div>
  );
};

// Floating Tech Elements
const FloatingTechElements = () => (
    <div className="absolute right-10 md:right-20 bottom-20 hidden md:block z-21">
        <div className="w-64 h-64 border border-cyan-500/30 rounded-full animate-spin-slow opacity-30"></div>
        <div className="w-48 h-48 border border-blue-500/30 rounded-full animate-spin-reverse absolute top-8 left-8 opacity-30"></div>
        <div className="w-32 h-32 border border-fuchsia-500/30 rounded-full animate-pulse absolute top-16 left-16 opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-cyan-400 animate-ping"></div>
        </div>
    </div>
);

// Animated Content Wrapper
interface AnimatedContentProps {
    className?: string;
    badge: React.ReactNode;
    heading: React.ReactNode;
    subheading: React.ReactNode;
    buttons: React.ReactNode;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({ className, badge, heading, subheading, buttons }) => {
    const controls = useAnimation();
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className={cn("w-full h-full flex items-center relative", className)}>
            <motion.div
                initial="hidden"
                animate={controls}
                variants={variants}
                onViewportEnter={() => controls.start("visible")}
                onViewportLeave={() => controls.start("hidden")}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col justify-center">
                    <motion.div variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: "0%", opacity: 1 } }}>
                        {badge}
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}>
                        {heading}
                    </motion.div>
                    <motion.div variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: "0%", opacity: 1, transition: { delay: 0.6 } } }}>
                        {subheading}
                    </motion.div>
                    <motion.div variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: "0%", opacity: 1, transition: { delay: 0.8 } } }}>
                        {buttons}
                    </motion.div>
                </div>
            </motion.div>
            <FloatingTechElements />
        </div>
    );
};