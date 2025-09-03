'use client'

import React from 'react'
import { motion, useInView } from 'motion/react'

interface ProblemItem {
  id: number
  title: string
  description: string
  icon: string
  gradient: string
  impact: string
}

interface AnimatedTitleProps {
  title: string
}

interface AnimatedSubtitleProps {
  subtitle: string
}

interface AnimatedProblemCardProps {
  problem: ProblemItem
  index: number
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.h2
      ref={ref}
      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
        {title}
      </span>
    </motion.h2>
  )
}

export const AnimatedSubtitle: React.FC<AnimatedSubtitleProps> = ({ subtitle }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.p
      ref={ref}
      className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {subtitle}
    </motion.p>
  )
}

export const AnimatedProblemCard: React.FC<AnimatedProblemCardProps> = ({ problem, index }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Main Card */}
      <div className="relative h-80 bg-white/60 dark:bg-gray-900/80 backdrop-blur-sm border border-amber-200/30 dark:border-gray-700/50 rounded-2xl p-6 overflow-hidden hover:border-amber-300/50 dark:hover:border-gray-600/70 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
        {/* Background Gradient */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${problem.gradient}`}></div>
        {/* Icon Header */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${problem.gradient} shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="filter drop-shadow-sm">{problem.icon}</span>
          </motion.div>
          <motion.div
            className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${problem.gradient} text-white shadow-md`}
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : { scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          >
            {problem.impact}
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <motion.h3
            className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          >
            {problem.title}
          </motion.h3>
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
          >
            {problem.description}
          </motion.p>
        </div>

        {/* Gradient Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-r ${problem.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`} />
      </div>

      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${problem.gradient} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 rounded-2xl`} />
    </motion.div>
  )
}