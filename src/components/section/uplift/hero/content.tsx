import React from "react";
import { Button } from "@/components/button/button";
import { RocketIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { AnimatedBadge, AnimatedHeading, AnimatedSubheading, AnimatedActionButtons } from "./animated-components";

interface BadgeProps { text: string; }
interface HeadingProps { title: string; titleGradient: string; }
interface SubheadingProps { text: string; }
interface ActionButtonsProps { launchText: string; exploreText: string; }

// SSR-safe components that use animated versions
export const Badge: React.FC<BadgeProps> = ({ text }) => (
    <AnimatedBadge text={text} />
);

export const Heading: React.FC<HeadingProps> = ({ title, titleGradient }) => (
    <AnimatedHeading title={title} titleGradient={titleGradient} />
);

export const Subheading: React.FC<SubheadingProps> = ({ text }) => (
    <AnimatedSubheading text={text} />
);

export const ActionButtons: React.FC<ActionButtonsProps> = ({ launchText, exploreText }) => (
    <AnimatedActionButtons launchText={launchText} exploreText={exploreText} />
);

// Static versions for fallback (if needed)
export const StaticBadge: React.FC<BadgeProps> = ({ text }) => (
    <div className="w-fit mb-8 inline-flex items-center bg-primary/5 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 font-kanit">
        <SparklesIcon className="h-4 w-4 text-primary mr-2" />
        <span className="text-sm font-medium text-primary">
            {text}
        </span>
    </div>
);

export const StaticHeading: React.FC<HeadingProps> = ({ title, titleGradient }) => (
    <h1 className="text-7xl sm:text-7xl md:text-7xl lg:text-7xl xl:text-7xl font-semibold mb-8 leading-tight font-kanit lg:max-w-[12ch]">
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
    </h1>
);

export const StaticSubheading: React.FC<SubheadingProps> = ({ text }) => (
    <p className="text-lg md:text-xl text-muted-foreground mb-8 font-normal font-kanit max-w-[12ch]">
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
