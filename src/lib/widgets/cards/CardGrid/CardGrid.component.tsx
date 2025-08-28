import React from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { RenderContext } from '../../core/types'

// Safely import motion only on client side
let motion: any = null
if (typeof window !== 'undefined') {
  try {
    motion = require('framer-motion').motion
  } catch (e) {
    console.warn('Framer Motion not available')
  }
}

interface CardGridItem {
  title: string
  description: string
  image?: string
  link?: string
  category?: string
}

interface CardGridComponentProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  gridColumns?: string
  cardStyle?: string
  items?: CardGridItem[]
  showAnimations?: boolean
  context?: RenderContext
}

const gridColumnClasses = {
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  '6': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
}

const cardStyleClasses = {
  default: 'bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg',
  minimal: 'bg-transparent',
  elevated: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl',
  bordered: 'bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300'
}

export const CardGridComponent: React.FC<CardGridComponentProps> = ({
  title = "Our Portfolio",
  subtitle = "Recent projects and case studies",
  backgroundColor = "bg-background",
  gridColumns = '3',
  cardStyle = 'default',
  items = [],
  showAnimations = true,
  context
}) => {
  const isPreview = context?.isPreview || false
  const MotionWrapper = (showAnimations && motion) ? motion.div : 'div'
  const MotionCard = (showAnimations && motion) ? motion.div : 'div'

  const containerVariants = showAnimations ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } : undefined

  const cardVariants = showAnimations ? {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  } : undefined

  const gridClass = gridColumnClasses[gridColumns as keyof typeof gridColumnClasses] || gridColumnClasses['3']
  const cardClass = cardStyleClasses[cardStyle as keyof typeof cardStyleClasses] || cardStyleClasses.default

  const renderCard = (item: CardGridItem, index: number) => {
    const cardContent = (
      <MotionCard
        key={index}
        className={`group ${cardClass} transition-all duration-300 overflow-hidden hover:-translate-y-1`}
        variants={cardVariants}
        whileHover={showAnimations ? { scale: 1.02 } : {}}
      >
        {/* Image */}
        {item.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {item.category && (
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-xs text-white font-medium">{item.category}</span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Link indicator */}
          {item.link && (
            <div className="flex items-center mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              <span>View Details</span>
              <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </MotionCard>
    )

    // Wrap with link if provided
    if (item.link && !isPreview) {
      return (
        <a
          key={index}
          href={item.link}
          className="block h-full no-underline"
          target={item.link.startsWith('http') ? '_blank' : '_self'}
          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {cardContent}
        </a>
      )
    }

    return cardContent
  }

  return (
    <section className={`relative py-16 md:py-24 overflow-hidden ${backgroundColor}`}>
      {/* Background Effects */}
      {!isPreview && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <MotionWrapper 
            className="text-center mb-12 md:mb-16"
            initial={showAnimations ? { opacity: 0, y: -30 } : {}}
            animate={showAnimations ? { opacity: 1, y: 0 } : {}}
            transition={showAnimations ? { duration: 0.8 } : {}}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </MotionWrapper>
        )}

        {/* Card Grid */}
        <MotionWrapper
          className={`grid ${gridClass} gap-6 md:gap-8`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item, index) => renderCard(item, index))}
        </MotionWrapper>

        {/* Show message if no items */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No grid items configured yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}