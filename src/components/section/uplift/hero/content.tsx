"use client";
import { Button } from "@/components/buttonsp";
import { RocketIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// Component for the floating tech elements
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

// Main content component
interface ContentProps {
    className?: string;
}

export const Content: React.FC<ContentProps> = ({ className }) => {
    return (
        <div className={cn("w-full h-full flex items-center relative", className)}>
            <div className="flex flex-col justify-center">

                {/* Badge */}
                <div className="w-fit mb-8 inline-flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/20">
                    <SparklesIcon className="h-4 w-4 text-cyan-400 mr-2" />
                    <span className="text-sm font-medium text-cyan-300">
                        Innovating the Future
                    </span>
                </div>

                {/* Main heading */}
                <motion.h1
                    className="text-5xl md:text-6xl lg:text-6xl font-bold mb-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    <motion.span
                        variants={{
                            hidden: { y: "100%", opacity: 0 },
                            visible: { y: "0%", opacity: 1 },
                        }}
                        className="inline-block"
                    >
                        Transforming
                    </motion.span>
                    <br className="md:hidden" />
                    <motion.span
                        variants={{
                            hidden: { y: "100%", opacity: 0 },
                            visible: { y: "0%", opacity: 1 },
                        }}
                        className="inline-block"
                    >
                        Ideas Into
                    </motion.span>
                    <br />
                    <motion.span
                        variants={{
                            hidden: { y: "100%", opacity: 0 },
                            visible: { y: "0%", opacity: 1 },
                        }}
                        className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent"
                    >
                        Revolutionary Solutions
                    </motion.span>
                </motion.h1>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                    We're not just another tech startup. We're building the Future.
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 justify-start">
                    <Button size="lg" variant="primary" className="flex px-6 py-6">
                        <RocketIcon className="w-5 h-5 mr-2" />
                        Launch Your Vision
                    </Button>
                    <Button variant="outline" size="lg" className="hidden md:flex px-6 py-6">
                        Explore Our Innovations
                    </Button>
                </div>

            </div>

            {/* Floating tech elements */}
            <FloatingTechElements />
        </div>
    );
};
