"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/buttonsp";
import { RocketIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { HeroStaggerAnimations } from "./stagger-animations";

interface BadgeProps { text: string; }
interface HeadingProps { part1: string; part2: string; gradient1: string; gradient2: string; }
interface SubheadingProps { text: string; }
interface ActionButtonsProps { launchText: string; exploreText: string; }

export const AnimatedBadge: React.FC<BadgeProps> = ({ text }) => (
    <motion.div
        variants={HeroStaggerAnimations.badge}
        initial="hidden"
        animate="visible"
        className="w-fit mb-8 inline-flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/20"
    >
        <SparklesIcon className="h-4 w-4 text-cyan-400 mr-2" />
        <span className="text-sm font-medium text-cyan-300">
            {text}
        </span>
    </motion.div>
);

export const AnimatedHeading: React.FC<HeadingProps> = ({ part1, part2, gradient1, gradient2 }) => (
    <motion.h1
        variants={HeroStaggerAnimations.heading}
        initial="hidden"
        animate="visible" 
        className="text-5xl md:text-6xl lg:text-6xl font-bold mb-6"
    >
        <span className="inline-block my-2">{part1}</span>
        <br className="hidden md:block" />
        <span className="inline-block my-2">{part2}</span>
        <br />
        <span className="inline-block my-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
            {gradient1}
        </span>
        <br />
        <span className="inline-block my-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
            {gradient2}
        </span>
    </motion.h1>
);

export const AnimatedSubheading: React.FC<SubheadingProps> = ({ text }) => (
    <motion.p
        variants={HeroStaggerAnimations.subheading}
        initial="hidden"
        animate="visible"
        className="text-xl md:text-2xl text-gray-300 mb-8"
    >
        {text}
    </motion.p>
);

export const AnimatedActionButtons: React.FC<ActionButtonsProps> = ({ launchText, exploreText }) => (
    <motion.div
        variants={HeroStaggerAnimations.buttonsContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-4 justify-start"
    >
        {[
            <Link key="launch" href="">
                <Button size="lg" variant="primary" className="flex px-6 py-6">
                    <RocketIcon className="w-5 h-5 mr-2" />
                    {launchText}
                </Button>
            </Link>,
            <Link key="explore" href="/innovation">
                <Button variant="outline" size="lg" className="hidden md:flex px-6 py-6">
                    {exploreText}
                </Button>
            </Link>
        ].map((child, index) => (
            <motion.div
                key={index}
                variants={HeroStaggerAnimations.buttonItem}
            >
                {child}
            </motion.div>
        ))}
    </motion.div>
);