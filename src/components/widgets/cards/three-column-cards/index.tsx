import React from 'react'
import Link from 'next/link'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/card'
import { AnimateEffect } from "@/components/animate-effect"
import * as LucideIcons from 'lucide-react'

// Icon mapping - reusable across widgets
const IconMap: Record<string, React.ComponentType<any>> = {
  // Common icons
  monitor: LucideIcons.Monitor,
  smartphone: LucideIcons.Smartphone,
  globe: LucideIcons.Globe,
  'shopping-cart': LucideIcons.ShoppingCart,
  database: LucideIcons.Database,
  settings: LucideIcons.Settings,
  users: LucideIcons.Users,
  chart: LucideIcons.BarChart3,
  code: LucideIcons.Code,
  palette: LucideIcons.Palette,
  shield: LucideIcons.Shield,
  zap: LucideIcons.Zap,
  // Add more as needed
}

// Color gradient mapping
const getGradient = (color: string) => {
  const gradients: Record<string, string> = {
    blue: 'from-blue-500 to-cyan-400',
    green: 'from-green-500 to-emerald-400',
    purple: 'from-purple-500 to-violet-400',
    red: 'from-red-500 to-rose-400',
    yellow: 'from-yellow-500 to-orange-400',
    pink: 'from-pink-500 to-rose-400',
    indigo: 'from-indigo-500 to-purple-400',
    teal: 'from-teal-500 to-cyan-400'
  }
  return gradients[color] || gradients.blue
}

export interface ThreeColumnCardsItem {
  title: string
  description: string
  icon: string
  color: string
  link?: string
}

export interface ThreeColumnCardsData {
  title: string
  subtitle?: string
  backgroundColor?: string
  items: ThreeColumnCardsItem[]
}

interface ThreeColumnCardsProps {
  data: ThreeColumnCardsData
  className?: string
}

export const ThreeColumnCards: React.FC<ThreeColumnCardsProps> = ({ 
  data, 
  className = "" 
}) => {
  const { title, subtitle, backgroundColor, items } = data

  return (
    <Section
      className={`h-full md:h-[100vh] flex justify-center items-center px-8 mx-auto ${backgroundColor || 'bg-gradient-to-b from-background to-black'} ${className}`}
    >
      <div className="flex flex-col max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 3).map((item, index) => {
            const IconComponent = IconMap[item.icon]
            
            const CardContent = (
              <AnimateEffect key={index} index={index}>
                <Card
                  className="p-6 group hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                  glowColor={item.color as any}
                >
                  <div className="mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGradient(item.color)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Circuit board pattern */}
                  <div className="w-full h-px bg-gray-800 mt-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-0 group-hover:w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-1000"></div>
                  </div>
                  <div className="w-full h-8 relative">
                    <div className="absolute top-0 left-1/4 h-full w-px bg-gray-800"></div>
                    <div className="absolute top-0 left-3/4 h-full w-px bg-gray-800"></div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gray-800"></div>
                  </div>
                </Card>
              </AnimateEffect>
            )

            // Wrap with Link if link is provided
            return item.link ? (
              <Link key={index} href={item.link}>
                {CardContent}
              </Link>
            ) : (
              <div key={index}>{CardContent}</div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}