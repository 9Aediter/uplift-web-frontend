import React from "react";
import { Button } from "@/components/buttonsp";
import { RocketIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { AnimatedBadge, AnimatedHeading, AnimatedSubheading, AnimatedActionButtons } from "./animated-components";

interface BadgeProps { text: string; }
interface HeadingProps { part1: string; part2: string; gradient1: string; gradient2: string; }
interface SubheadingProps { text: string; }
interface ActionButtonsProps { launchText: string; exploreText: string; }

// SSR-safe components that use animated versions
export const Badge: React.FC<BadgeProps> = ({ text }) => (
    <AnimatedBadge text={text} />
);

export const Heading: React.FC<HeadingProps> = ({ part1, part2, gradient1, gradient2 }) => (
    <AnimatedHeading part1={part1} part2={part2} gradient1={gradient1} gradient2={gradient2} />
);

export const Subheading: React.FC<SubheadingProps> = ({ text }) => (
    <AnimatedSubheading text={text} />
);

export const ActionButtons: React.FC<ActionButtonsProps> = ({ launchText, exploreText }) => (
    <AnimatedActionButtons launchText={launchText} exploreText={exploreText} />
);

// Static versions for fallback (if needed)
export const StaticBadge: React.FC<BadgeProps> = ({ text }) => (
    <div className="w-fit mb-8 inline-flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/20">
        <SparklesIcon className="h-4 w-4 text-cyan-400 mr-2" />
        <span className="text-sm font-medium text-cyan-300">
            {text}
        </span>
    </div>
);

export const StaticHeading: React.FC<HeadingProps> = ({ part1, part2, gradient1, gradient2 }) => (
    <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-6">
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
    </h1>
);

export const StaticSubheading: React.FC<SubheadingProps> = ({ text }) => (
    <p className="text-xl md:text-2xl text-gray-300 mb-8">
        {text}
    </p>
);

export const StaticActionButtons: React.FC<ActionButtonsProps> = ({ launchText, exploreText }) => (
    <div className="flex flex-wrap gap-4 justify-start">
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
    </div>
);
