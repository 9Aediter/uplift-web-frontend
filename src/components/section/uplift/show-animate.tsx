"use client";
import React, { useState } from 'react';
import { ExternalLinkIcon, CodeIcon, LayersIcon } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
}

interface ShowAnimateProps {
    projects: Project[];
}

export const ShowAnimate: React.FC<ShowAnimateProps> = ({ projects }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Viewer */}
            <div className="relative group">
                <div className="relative rounded-lg overflow-hidden border border-gray-800 bg-gray-900/50 aspect-video">
                    <img
                        src={projects[activeIndex].image}
                        alt={projects[activeIndex].title}
                        className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6">
                        <h3 className="text-2xl font-bold mb-2">
                            {projects[activeIndex].title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                            {projects[activeIndex].description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {projects[activeIndex].tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full bg-black/50 text-xs font-medium border border-gray-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12">
                        <div className="absolute top-0 right-0 w-8 h-1 bg-cyan-500"></div>
                        <div className="absolute top-0 right-0 w-1 h-8 bg-cyan-500"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 w-12 h-12">
                        <div className="absolute bottom-0 left-0 w-8 h-1 bg-cyan-500"></div>
                        <div className="absolute bottom-0 left-0 w-1 h-8 bg-cyan-500"></div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
                        <CodeIcon className="w-5 h-5 text-cyan-400" />
                    </div>
                </div>
            </div>
            {/* Project List */}
            <div className="space-y-4">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${activeIndex === index ? 'border-cyan-500 bg-gray-900/70' : 'border-gray-800 bg-gray-900/30 hover:bg-gray-900/50'}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <div className="flex items-center">
                            <div className="mr-4">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeIndex === index ? 'bg-cyan-500/20' : 'bg-gray-800'}`}
                                >
                                    <LayersIcon
                                        className={`w-5 h-5 ${activeIndex === index ? 'text-cyan-400' : 'text-gray-400'}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <h4
                                    className={`font-bold ${activeIndex === index ? 'text-white' : 'text-gray-300'}`}
                                >
                                    {project.title}
                                </h4>
                                <p className="text-sm text-gray-400">
                                    {project.tags.join(' • ')}
                                </p>
                            </div>
                            <div className="ml-auto">
                                <ExternalLinkIcon
                                    className={`w-4 h-4 ${activeIndex === index ? 'text-cyan-400' : 'text-gray-500'}`}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
