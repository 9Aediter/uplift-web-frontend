"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";

interface BentoGridClientProps {
  className?: string;
  children?: React.ReactNode;
}

interface BentoGridItemClientProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  bgColor?: string;
  onClick?: () => void;
}

export const BentoGridClient = ({ className, children }: BentoGridClientProps) => {
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:gap-6 md:auto-rows-[20rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItemClient = ({
  className,
  title,
  description,
  icon,
  image,
  bgColor,
  onClick,
}: BentoGridItemClientProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group/bento row-span-1 h-full w-full max-w-full list-none transition-all duration-300 ease-out overflow-hidden",
        onClick && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        className,
      )}
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        
        <div className={cn(
          "relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 transition-all duration-300",
          onClick && "cursor-pointer hover:scale-[1.01]",
          bgColor || "bg-white dark:bg-black dark:shadow-[0px_0px_27px_0px_#2D2D2D]"
        )}>
          {/* Background Image with gradient overlay */}
          {image && (
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image 
                src={image}
                alt={typeof title === 'string' ? title : 'Solution'} 
                fill
                className="object-cover rounded-xl w-full max-w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 rounded-xl"></div>
            </div>
          )}
          
          <div className="relative flex flex-1 flex-col justify-between gap-3 z-10">
            {/* Icon */}
            {icon && (
              <div className="w-fit rounded-lg border border-gray-600 dark:border-gray-400 p-2 bg-black/20 backdrop-blur-sm">
                <div className="text-white text-base">
                  {icon}
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="space-y-3">
              <h3 className="font-sans text-xl md:text-2xl font-semibold text-white">
                {title}
              </h3>
              <p className="font-sans text-sm md:text-base text-white/90 line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};