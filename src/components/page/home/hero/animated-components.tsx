"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/basic/button/button";
import { RocketIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { HeroStaggerAnimations } from "./stagger-animations";

interface BadgeProps { text: string; }
interface HeadingProps { title: string; titleGradient: string; }
interface SubheadingProps { text: string; }
interface ActionButtonsProps { launchText: string; exploreText: string; lang?: string; }

export const AnimatedBadge: React.FC<BadgeProps> = ({ text }) => (
    <motion.div
        variants={HeroStaggerAnimations.badge}
        initial="hidden"
        animate="visible"
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
        variants={HeroStaggerAnimations.heading}
        initial="hidden"
        animate="visible"
        className="text-3xl sm:text-4xl md:text-7xl lg:text-6xl xl:text-7xl font-semibold mb-8 leading-tight font-kanit max-w-[12ch]"
    >
        <div className="mb-4">
            <span className="inline-block text-foreground leading-tight">
                {title}
            </span>
        </div>
        <div>
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent leading-tight">
                {titleGradient}
            </span>
        </div>
    </motion.h1>
);

export const AnimatedSubheading: React.FC<SubheadingProps> = ({ text }) => (
    <motion.p
        variants={HeroStaggerAnimations.subheading}
        initial="hidden"
        animate="visible"
        className="text-lg md:text-xl text-muted-foreground mb-8 font-normal font-kanit max-w-[40ch]"
    >
        {text}
    </motion.p>
);

export const AnimatedActionButtons: React.FC<ActionButtonsProps> = ({ launchText, exploreText, lang = 'th' }) => (
    <motion.div
        variants={HeroStaggerAnimations.buttonsContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-4 justify-start"
    >
        {[
            <Link key="launch" href={`/${lang}/consult`}>
                <Button size="lg" variant="default" className="flex px-8 py-6 rounded-full min-w-[180px] justify-center" style={{ backgroundColor: '#0175BC' }}>
                    <RocketIcon className="w-5 h-5 mr-2" />
                    {launchText}
                </Button>
            </Link>,
            <Link key="explore" href={`/${lang}/innovation`}>
                <Button variant="outline" size="lg" className="hidden md:flex px-8 py-6 rounded-full border-2 min-w-[180px] justify-center" style={{ borderColor: '#0175BC', color: '#0175BC' }}>
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