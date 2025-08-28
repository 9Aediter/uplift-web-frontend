import React from 'react'
import { 
  Clock, TrendingUp, Users, Shield, Zap, Target, 
  Heart, Star, CheckCircle, Lightbulb, Rocket, Award 
} from 'lucide-react'
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

interface FourColumnCardsItem {
  title: string
  description: string
  icon: string
  color: string
}

interface FourColumnCardsComponentProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  items?: FourColumnCardsItem[]
  showAnimations?: boolean
  context?: RenderContext
}

// Icon mapping
const iconMap = {
  clock: Clock,
  'trending-up': TrendingUp,
  users: Users,
  shield: Shield,
  zap: Zap,
  target: Target,
  heart: Heart,
  star: Star,
  'check-circle': CheckCircle,
  lightbulb: Lightbulb,
  rocket: Rocket,
  award: Award
}

// Color mapping
const colorMap = {
  red: 'from-red-500 to-red-600',
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  yellow: 'from-yellow-500 to-yellow-600',
  pink: 'from-pink-500 to-pink-600',
  indigo: 'from-indigo-500 to-indigo-600',
  orange: 'from-orange-500 to-orange-600'
}

export const FourColumnCardsComponent: React.FC<FourColumnCardsComponentProps> = ({
  title = "Common Business Problems",
  subtitle = "Problems we solve for modern businesses every day",
  backgroundColor = "bg-background",
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  } : undefined

  const renderCard = (item: FourColumnCardsItem, index: number) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Clock
    const gradientColor = colorMap[item.color as keyof typeof colorMap] || colorMap.red

    return (
      <MotionCard
        key={index}
        className="group text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        variants={cardVariants}
        whileHover={showAnimations ? { scale: 1.05 } : {}}
      >
        {/* Icon */}
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            {item.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.description}
          </p>
        </div>
      </MotionCard>
    )
  }

  return (
    <section className={`relative py-16 md:py-24 overflow-hidden ${backgroundColor}`}>
      {/* Background Effects */}
      {!isPreview && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 right-10 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-1/3 w-22 h-22 bg-green-500 rounded-full blur-2xl"></div>
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

        {/* Cards Grid */}
        <MotionWrapper
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.slice(0, 4).map((item, index) => renderCard(item, index))}
        </MotionWrapper>

        {/* Show message if no items */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No problems configured yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}