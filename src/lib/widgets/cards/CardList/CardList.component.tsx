import React from 'react'
import Image from 'next/image'
import { Calendar, User, Tag, ArrowRight } from 'lucide-react'
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

interface CardListItem {
  title: string
  description: string
  content?: string
  image?: string
  date?: string
  author?: string
  category?: string
  link?: string
}

interface CardListComponentProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  layout?: string
  showDate?: boolean
  items?: CardListItem[]
  showAnimations?: boolean
  context?: RenderContext
}

export const CardListComponent: React.FC<CardListComponentProps> = ({
  title = "Latest News",
  subtitle = "Stay updated with our recent articles and announcements",
  backgroundColor = "bg-background",
  layout = 'horizontal',
  showDate = true,
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
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  } : undefined

  const renderHorizontalCard = (item: CardListItem, index: number) => (
    <MotionCard
      key={index}
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
      variants={cardVariants}
      whileHover={showAnimations ? { y: -2 } : {}}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        {item.image && (
          <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 320px"
            />
            {item.category && (
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {item.category}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {/* Meta information */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              {showDate && item.date && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
              )}
              {item.author && (
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{item.author}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {item.description}
            </p>

            {/* Additional content */}
            {item.content && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.content}
              </p>
            )}

            {/* Read more link */}
            {item.link && (
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </div>
        </div>
      </div>
    </MotionCard>
  )

  const renderVerticalCard = (item: CardListItem, index: number) => (
    <MotionCard
      key={index}
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
      variants={cardVariants}
      whileHover={showAnimations ? { y: -2 } : {}}
    >
      {/* Image */}
      {item.image && (
        <div className="relative w-full h-48">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {item.category && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {item.category}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Meta information */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {showDate && item.date && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
            )}
            {item.author && (
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{item.author}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.description}
          </p>

          {/* Read more link */}
          {item.link && (
            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              <span>Read More</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </MotionCard>
  )

  const renderMinimalCard = (item: CardListItem, index: number) => (
    <MotionCard
      key={index}
      className="group py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
      variants={cardVariants}
    >
      <div className="space-y-3">
        {/* Meta and category */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {showDate && item.date && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
            )}
            {item.author && (
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{item.author}</span>
              </div>
            )}
          </div>
          {item.category && (
            <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 text-sm">
              <Tag className="w-4 h-4" />
              <span>{item.category}</span>
            </div>
          )}
        </div>

        {/* Title and description */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {item.description}
          </p>
        </div>

        {/* Read more link */}
        {item.link && (
          <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </MotionCard>
  )

  const renderCard = (item: CardListItem, index: number) => {
    const cardContent = layout === 'horizontal' ? renderHorizontalCard(item, index) :
                       layout === 'vertical' ? renderVerticalCard(item, index) :
                       renderMinimalCard(item, index)

    // Wrap with link if provided and not preview
    if (item.link && !isPreview) {
      return (
        <a
          key={index}
          href={item.link}
          className="block no-underline"
          target={item.link.startsWith('http') ? '_blank' : '_self'}
          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {cardContent}
        </a>
      )
    }

    return cardContent
  }

  const getGridClass = () => {
    if (layout === 'minimal') return 'space-y-0'
    if (layout === 'vertical') return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    return 'space-y-6'
  }

  return (
    <section className={`relative py-16 md:py-24 overflow-hidden ${backgroundColor}`}>
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

        {/* Card List */}
        <MotionWrapper
          className={getGridClass()}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item, index) => renderCard(item, index))}
        </MotionWrapper>

        {/* Show message if no items */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No list items configured yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}