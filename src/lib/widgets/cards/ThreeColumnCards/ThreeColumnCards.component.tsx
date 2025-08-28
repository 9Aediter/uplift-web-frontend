import React from 'react'
import { 
  Monitor, Smartphone, Globe, ShoppingCart, Database, 
  Settings, Users, BarChart3, Code, Palette, Shield, Zap 
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

interface ThreeColumnCardsItem {
  title: string
  description: string
  icon: string
  color: string
  link?: string
}

interface ThreeColumnCardsComponentProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  items?: ThreeColumnCardsItem[]
  showAnimations?: boolean
  context?: RenderContext
}

// Icon mapping
const iconMap = {
  monitor: Monitor,
  smartphone: Smartphone,
  globe: Globe,
  'shopping-cart': ShoppingCart,
  database: Database,
  settings: Settings,
  users: Users,
  chart: BarChart3,
  code: Code,
  palette: Palette,
  shield: Shield,
  zap: Zap
}

// Color mapping
const colorMap = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  red: 'from-red-500 to-red-600',
  yellow: 'from-yellow-500 to-yellow-600',
  pink: 'from-pink-500 to-pink-600',
  indigo: 'from-indigo-500 to-indigo-600',
  teal: 'from-teal-500 to-teal-600'
}

export const ThreeColumnCardsComponent: React.FC<ThreeColumnCardsComponentProps> = ({
  title = "Our Services",
  subtitle = "Complete business solutions tailored to your needs",
  backgroundColor = "bg-gradient-to-b from-background to-black",
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
        staggerChildren: 0.2
      }
    }
  } : undefined

  const cardVariants = showAnimations ? {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  } : undefined

  const renderCard = (item: ThreeColumnCardsItem, index: number) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Monitor
    const gradientColor = colorMap[item.color as keyof typeof colorMap] || colorMap.blue
    
    const cardContent = (
      <MotionCard
        key={index}
        className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full flex flex-col"
        variants={cardVariants}
        whileHover={showAnimations ? { scale: 1.02 } : {}}
      >
        {/* Icon */}
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradientColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            {item.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {item.description}
          </p>
        </div>

        {/* Optional link indicator */}
        {item.link && (
          <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            Learn More
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
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
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.slice(0, 3).map((item, index) => renderCard(item, index))}
        </MotionWrapper>

        {/* Show message if no items */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No services configured yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}