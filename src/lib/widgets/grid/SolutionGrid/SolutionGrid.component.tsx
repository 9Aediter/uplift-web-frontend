'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { BentoGridClient as BentoGrid, BentoGridItemClient as BentoGridItem } from '@/components/gridcard/bento-grid-client'
import { AnimateEffect } from '@/components/animate-effect'

interface SolutionItem {
  id: number
  title: string
  description: string
  icon: string
  image: string
  bgColor: string
  className?: string
  clickAction?: 'modal' | 'link' | 'none'
}

interface SolutionGridComponentProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  className?: string
  items?: SolutionItem[]
  gridLayout?: 'bento' | 'uniform' | 'masonry'
  columns?: number
  gap?: number
  context?: any
}

// Animated Solution Card Component
const AnimatedSolutionCard = ({ item, index }: { 
  item: SolutionItem
  index: number
}) => {
  const handleClick = () => {
    if (item.clickAction === 'modal') {
      // Widget only pushes/alerts to modal component - separate concern
      console.log(`🚀 [SOLUTION GRID] Opening modal for: ${item.title}`)
      // Future: dispatch event or call modal service
      alert(`Modal for: ${item.title}`)
    }
  }

  return (
    <div className={`h-full w-full ${item.className || ''}`}>
      <AnimateEffect index={index} delay={0.1 * index}>
        <div onClick={handleClick}>
          <BentoGridItem
            title={item.title}
            description={item.description}
            icon={<span>{item.icon}</span>}
            image={item.image}
            bgColor={item.bgColor}
            className="h-full cursor-pointer hover:scale-105 transition-all duration-300"
          />
        </div>
      </AnimateEffect>
    </div>
  )
}

export const SolutionGridComponent: React.FC<SolutionGridComponentProps> = ({
  title = 'Solutions & Expertise',
  subtitle = 'ออกแบบและพัฒนาระบบสารสนเทศขนาดใหญ่สำหรับธุรกิจในหลากหลายอุตสาหกรรม',
  backgroundColor = 'bg-gradient-to-b from-background to-muted/30',
  className = '',
  items = []
}) => {
  if (!items || items.length === 0) {
    return (
      <Section className={`py-20 ${backgroundColor} ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">No solution items to display</p>
          </div>
        </div>
      </Section>
    )
  }


  return (
    <Section className={`py-20 ${backgroundColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section with Animation */}
        {(title || subtitle) && (
          <AnimateEffect index={0}>
            <div className="text-center mb-24">
              {title && (
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          </AnimateEffect>
        )}

        {/* Grid Container */}
        <BentoGrid className="max-w-7xl mx-auto">
          {items.map((item, index) => (
            <AnimatedSolutionCard 
              key={item.id || index} 
              item={item} 
              index={index + 2} 
            />
          ))}
        </BentoGrid>
      </div>
    </Section>
  )
}