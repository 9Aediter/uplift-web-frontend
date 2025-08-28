import React from 'react'
import Link from 'next/link'
import { CheckIcon, Monitor, Smartphone, Globe, ShoppingCart, Database, Settings, Users, BarChart3, Package, CreditCard, TrendingUp, Code, Cloud } from 'lucide-react'

const IconMap = {
  monitor: Monitor,
  smartphone: Smartphone, 
  globe: Globe,
  'shopping-cart': ShoppingCart,
  database: Database,
  settings: Settings,
  users: Users,
  'bar-chart': BarChart3,
  package: Package,
  'credit-card': CreditCard,
  'trending-up': TrendingUp,
  code: Code,
  cloud: Cloud
}

const getGradient = (color: string) => {
  const gradients: Record<string, string> = {
    blue: 'from-blue-500 to-cyan-400',
    green: 'from-green-500 to-emerald-400',
    purple: 'from-purple-500 to-violet-400',
    red: 'from-red-500 to-orange-400',
    yellow: 'from-yellow-500 to-orange-400',
    pink: 'from-pink-500 to-rose-400',
    indigo: 'from-indigo-500 to-blue-400',
    teal: 'from-teal-500 to-cyan-400'
  }
  return gradients[color] || gradients.blue
}

interface FeatureShowcaseProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  items?: Array<{
    title: string
    subtitle: string
    description: string
    image: string
    features: Array<{
      title: string
      description: string
      icon: string
    }>
    color: string
    link?: string
  }>
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title = "Our Products",
  subtitle = "Innovative solutions for your business",
  backgroundColor = "bg-gradient-to-b from-black to-gray-900",
  items = []
}) => {
  return (
    <div className={`${backgroundColor} py-16 md:py-24`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-16 px-8 max-w-4xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-300">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Feature Items */}
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        {items.map((item, index) => {
          const IconComponent = IconMap[item.features?.[0]?.icon as keyof typeof IconMap] || Monitor
          
          return (
            <div
              key={index}
              className={`flex flex-col px-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-lg overflow-hidden border border-gray-800">
                  <img
                    src={item.image || '/placeholder-product.png'}
                    alt={item.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-r ${getGradient(item.color)} flex items-center justify-center`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <div className="mb-4 inline-flex items-center px-4 py-1 rounded-full bg-gray-800/80 border border-gray-700">
                  <span
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${getGradient(item.color)} mr-2`}
                  ></span>
                  <span className="text-sm font-medium">{item.subtitle}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  <span
                    className={`bg-gradient-to-r ${getGradient(item.color)} bg-clip-text text-transparent`}
                  >
                    {item.title}
                  </span>
                </h3>
                
                <p className="text-lg text-gray-300 mb-8">
                  {item.description}
                </p>
                
                <div className="space-y-4 mb-8">
                  {item.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div
                        className={`p-1 rounded-full bg-gradient-to-r ${getGradient(item.color)} mr-3 mt-0.5`}
                      >
                        <CheckIcon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="text-gray-300 font-medium">{feature.title}</span>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {item.link && (
                  <Link
                    href={item.link}
                    className={`px-6 py-2 rounded-lg bg-gradient-to-r ${getGradient(item.color)} text-white font-medium hover:opacity-90 transition-opacity inline-block`}
                  >
                    Learn More
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}