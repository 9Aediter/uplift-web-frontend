"use client";

import React from 'react';
import { motion } from 'motion/react';
import Globe from '@/components/section/uplift/globe';
import { GlobeWithStats } from '@/components/section/uplift/hero/hover-stats';

interface AnimatedGlobeProps {
  showGlobe?: boolean;
}

export const AnimatedGlobe: React.FC<AnimatedGlobeProps> = ({ showGlobe = true }) => {
  if (!showGlobe) return null;

  return (
    <div className="hidden w-full lg:block lg:w-1/2">
      <GlobeWithStats>
        <Globe />
      </GlobeWithStats>
    </div>
  );
};