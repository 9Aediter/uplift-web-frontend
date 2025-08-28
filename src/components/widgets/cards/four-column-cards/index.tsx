"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface FourColumnCardsProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  items?: Array<{
    title: string
    description: string
    icon: string
    gradient: string
    impact?: string
  }>
  showAnimations?: boolean
}

export const FourColumnCards: React.FC<FourColumnCardsProps> = ({
  title = "Business Challenges",
  subtitle = "Common problems that slow down modern businesses and how technology can solve them",
  backgroundColor = "bg-black",
  items = [],
  showAnimations = true
}) => {
  const MotionWrapper = showAnimations ? motion.div : 'div'
  const motionProps = showAnimations ? {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  } : {}

  const CardMotionWrapper = showAnimations ? motion.div : 'div'

  if (!items.length) {
    return (
      <div className={`${backgroundColor} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">No items available</p>
        </div>
      </div>
    )
  }

  return (
    <section className={`${backgroundColor} py-16 md:py-24`}>
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            <MotionWrapper {...motionProps}>
              {title && (
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h2>
              )}
              {subtitle && (
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {subtitle}
                </p>
              )}
            </MotionWrapper>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const cardMotionProps = showAnimations ? {
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: index * 0.1 },
              whileHover: { y: -10 },
              whileHoverTransition: { type: "spring", stiffness: 300, damping: 20 }
            } : {}

            return (
              <CardMotionWrapper
                key={index}
                className="group relative"
                {...cardMotionProps}
              >
                {/* Card */}
                <div className="relative h-80 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 overflow-hidden hover:border-gray-600/70 transition-all duration-300">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`}></div>
                  
                  {/* 3D Icon */}
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-600/50 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl filter drop-shadow-lg">{item.icon}</span>
                    </div>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-white text-xl font-bold leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {item.description}
                    </p>

                    {/* Impact Badge */}
                    {item.impact && (
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-full px-4 py-2 group-hover:border-gray-500/70 transition-colors duration-300">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Impact:</span>
                            <span className={`text-xs font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                              {item.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover effect background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                </div>
              </CardMotionWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}