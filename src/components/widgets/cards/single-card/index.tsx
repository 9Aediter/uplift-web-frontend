"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, ArrowRight, Mail } from 'lucide-react'

interface SingleCardProps {
  title?: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  backgroundColor?: string
  trustIndicators?: string[]
  showAnimations?: boolean
}

export const SingleCard: React.FC<SingleCardProps> = ({
  title = "Build Your Next Big Thing",
  subtitle = "with Uplift Technology",
  description = "Custom software solutions, from concept to launch. Empower your business with our cutting-edge technology and transform your ideas into reality.",
  primaryButtonText = "Start Your Project",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Get Free Consultation",
  secondaryButtonLink = "/consultation",
  backgroundColor = "bg-black",
  trustIndicators = ["STARTUP", "FINTECH", "ECOMMERCE", "HEALTHCARE"],
  showAnimations = true
}) => {
  const MotionWrapper = showAnimations ? motion.div : 'div'
  const motionProps = showAnimations ? {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  } : {}

  return (
    <section className={`relative min-h-screen ${backgroundColor} overflow-hidden flex items-center justify-center py-16 md:py-24`}>
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Glowing tech lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-45 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-40 sm:w-64 md:w-80 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent -rotate-45 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 sm:w-48 md:w-64 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rotate-90 animate-pulse delay-2000"></div>
        </div>

        {/* Abstract geometric shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border border-blue-500 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 border border-purple-500 rounded-lg rotate-45 animate-bounce-slow"></div>
          <div className="absolute top-1/2 right-10 sm:right-20 md:right-40 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main CTA Card */}
        <MotionWrapper 
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl shadow-blue-500/10 backdrop-blur-sm mx-auto max-w-7xl"
          {...motionProps}
        >
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight px-2 sm:px-0">
                {title}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  {subtitle}
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <motion.a
                href={primaryButtonLink}
                className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group min-w-0 no-underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="text-white group-hover:animate-bounce flex-shrink-0" />
                <span className="truncate">{primaryButtonText}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </motion.a>

              <motion.a
                href={secondaryButtonLink}
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:border-gray-800 hover:bg-gray-50 transition-all duration-300 min-w-0 no-underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="truncate">{secondaryButtonText}</span>
              </motion.a>
            </div>

            {/* Trust indicators */}
            {trustIndicators && trustIndicators.length > 0 && (
              <div className="pt-6 sm:pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3 sm:mb-4 px-2 sm:px-0">Trusted by innovative companies worldwide</p>
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-60">
                  {trustIndicators.map((indicator, index) => (
                    <div key={index} className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-gray-400">
                      {indicator}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </MotionWrapper>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}