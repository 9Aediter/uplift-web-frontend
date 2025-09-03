"use client";

import React from 'react'
import { RenderContext } from '../../core/types'
import { AnimatedTitle, AnimatedSubtitle, AnimatedProblemCard } from '@/components/widgets/problems/problems-animated'

// Client-side component for admin preview - same output as SSR

interface ProblemItem {
  id: number
  title: string
  description: string
  icon: string
  gradient: string
  impact: string
}

interface ProblemsCardsComponentProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  items: ProblemItem[]
  context?: RenderContext
}

export const ProblemsCardsComponent: React.FC<ProblemsCardsComponentProps> = ({
  title,
  subtitle,
  backgroundColor = 'bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-black dark:via-black dark:to-black',
  items = []
}) => {
  return (
    <section 
      id="problems" 
      className={`${backgroundColor} flex flex-col justify-center py-16 md:py-20`}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header - Optional */}
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && <AnimatedTitle title={title} />}
            {subtitle && <AnimatedSubtitle subtitle={subtitle} />}
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((problem, index) => (
            <AnimatedProblemCard 
              key={problem.id} 
              problem={problem} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}