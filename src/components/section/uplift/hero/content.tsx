import React from "react";
import { Button } from "@/components/buttonsp";
import { RocketIcon, SparklesIcon } from "lucide-react";

export const Badge = () => (
    <div className="w-fit mb-8 inline-flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/20">
        <SparklesIcon className="h-4 w-4 text-cyan-400 mr-2" />
        <span className="text-sm font-medium text-cyan-300">
            Innovating the Future
        </span>
    </div>
);

export const Heading = () => (
    <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-6">
        <span className="inline-block">Transforming</span>
        <br className="md:hidden" />
        <span className="inline-block">Ideas Into</span>
        <br />
        <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
            Revolutionary Solutions
        </span>
    </h1>
);

export const Subheading = () => (
    <p className="text-xl md:text-2xl text-gray-300 mb-8">
        We're not just another tech startup. We're building the Future.
    </p>
);

export const ActionButtons = () => (
    <div className="flex flex-wrap gap-4 justify-start">
        <Button size="lg" variant="primary" className="flex px-6 py-6">
            <RocketIcon className="w-5 h-5 mr-2" />
            Launch Your Vision
        </Button>
        <Button variant="outline" size="lg" className="hidden md:flex px-6 py-6">
            Explore Our Innovations
        </Button>
    </div>
);
