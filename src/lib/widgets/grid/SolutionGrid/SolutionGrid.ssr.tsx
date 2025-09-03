import React from 'react'
import { Section } from '@/components/ui/section'
import { BentoGridClient as BentoGrid, BentoGridItemClient as BentoGridItem } from '@/components/gridcard/bento-grid-client'

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

interface SolutionGridSSRProps {
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

export const SolutionGridSSR: React.FC<SolutionGridSSRProps> = ({
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
        {/* Header Section */}
        {(title || subtitle) && (
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
        )}

        {/* Grid Container */}
        <BentoGrid className="max-w-7xl mx-auto">
          {items.map((item, index) => (
            <div 
              key={item.id || index} 
              className={`h-full w-full ${item.className || ''}`}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                icon={<span>{item.icon}</span>}
                image={item.image}
                bgColor={item.bgColor}
              />
            </div>
          ))}
        </BentoGrid>
      </div>
    </Section>
  )
}