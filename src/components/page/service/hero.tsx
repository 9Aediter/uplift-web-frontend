'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  SparklesIcon,
  CloudIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  CommandLineIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline'
import { ArrowDownIcon } from '@heroicons/react/24/solid'
import '@/style/animations.css'

export const HeroSection = () => {
  const services = [
    { icon: CloudIcon, label: 'SaaS Solutions' },
    { icon: CodeBracketSquareIcon, label: 'Custom Development' },
    { icon: CpuChipIcon, label: 'AI Transformation' },
    { icon: CommandLineIcon, label: 'IT Resources' },
    { icon: CircleStackIcon, label: 'SDLC Services' },
    { icon: SparklesIcon, label: 'Consulting' }
  ]

  const scrollToServices = () => {
    const firstService = document.getElementById('it-resource-service')
    if (firstService) {
      firstService.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full bg-background dark:bg-[#111111] pt-28 pb-20 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-8"
            >
              <SparklesIcon className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                บริการหลักของ Uplift Tech
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                IT Solutions
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-foreground/80">
                ที่ตอบโจทย์ทุกธุรกิจ
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              จากทีม IT มืออาชีพ ไปจนถึงระบบ AI ที่ล้ำสมัย
              <br className="hidden md:block" />
              เราพร้อมเป็นพาร์ทเนอร์เทคโนโลยีที่จะพาธุรกิจคุณไปสู่ความสำเร็จ
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <button
                onClick={scrollToServices}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">สำรวจบริการทั้งหมด</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-foreground rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                ปรึกษาฟรี
              </button>
            </motion.div>

            {/* Service Icons Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-900 dark:group-hover:to-purple-900 transition-colors">
                    <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center">
                    {service.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center"
            >
              <button
                onClick={scrollToServices}
                className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-sm font-medium">ดูรายละเอียด</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowDownIcon className="w-5 h-5" />
                </motion.div>
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}