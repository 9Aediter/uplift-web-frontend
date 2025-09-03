"use client";

import React from "react";

interface GlobeProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Globe: React.FC<GlobeProps> = ({ 
    className = "", 
    size = 'lg' 
}) => {
    const sizeClasses = {
        sm: "w-64 h-64",
        md: "w-80 h-80", 
        lg: "w-full h-full"
    };

    // Simple fallback globe for Storybook compatibility
    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-2">
                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-400/40 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-600/40 to-blue-600/40 border border-cyan-400/50 flex items-center justify-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                                    AI
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">Globe Component</div>
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1000" />
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-2000" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-3000" />
            </div>
        </div>
    );
};

export default Globe;
export { Globe };