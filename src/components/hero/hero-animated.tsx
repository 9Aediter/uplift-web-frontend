"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/button/button";
import { RocketIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

interface BadgeProps { text: string; }
interface HeadingProps { title: string; titleGradient: string; }
interface SubheadingProps { text: string; }
interface ActionButtonsProps { launchText: string; exploreText: string; }

export const AnimatedBadge: React.FC<BadgeProps> = ({ text }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-fit mb-8 inline-flex items-center bg-primary/5 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 font-kanit"
    >
        <SparklesIcon className="h-4 w-4 text-primary mr-2" />
        <span className="text-sm font-medium text-primary">
            {text}
        </span>
    </motion.div>
);

export const AnimatedHeading: React.FC<HeadingProps> = ({ title, titleGradient }) => (
    <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl sm:text-4xl md:text-7xl lg:text-6xl xl:text-7xl font-semibold mb-8 leading-tight font-kanit max-w-[12ch]"
    >
        <motion.div 
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <span className="inline-block text-foreground leading-tight">
                {title}
            </span>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent leading-tight">
                {titleGradient}
            </span>
        </motion.div>
    </motion.h1>
);

export const AnimatedSubheading: React.FC<SubheadingProps> = ({ text }) => (
    <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-lg md:text-xl text-muted-foreground mb-8 font-normal font-kanit max-w-[40ch]"
    >
        {text}
    </motion.p>
);

export const AnimatedActionButtons: React.FC<ActionButtonsProps> = ({ launchText, exploreText }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="flex flex-wrap gap-4 justify-start"
    >
        <Link href={"/consult"}>
            <Button size="lg" variant="primary" className="flex px-6 py-6">
                <RocketIcon className="w-5 h-5 mr-2" />
                {launchText}
            </Button>
        </Link>
        <Link href={"/innovation"}>
            <Button variant="outline" size="lg" className="hidden md:flex px-6 py-6">
                {exploreText}
            </Button>
        </Link>
    </motion.div>
);