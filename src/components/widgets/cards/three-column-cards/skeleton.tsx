import React from 'react'
import { Card } from '@/components/card'
import { Monitor, Smartphone, Globe } from 'lucide-react'

export const ThreeColumnCardsSkeleton: React.FC = () => {
  const mockItems = [
    {
      title: "Service Title 1",
      description: "Brief description of your first service offering",
      icon: Monitor,
      color: "blue"
    },
    {
      title: "Service Title 2", 
      description: "Brief description of your second service offering",
      icon: Smartphone,
      color: "green"
    },
    {
      title: "Service Title 3",
      description: "Brief description of your third service offering", 
      icon: Globe,
      color: "purple"
    }
  ]

  const getGradient = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'from-blue-500 to-cyan-400',
      green: 'from-green-500 to-emerald-400', 
      purple: 'from-purple-500 to-violet-400'
    }
    return gradients[color] || gradients.blue
  }

  return (
    <div className="w-full bg-gradient-to-b from-background to-black p-8 rounded-lg">
      {/* Header Preview */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Section Title
          </span>
        </h3>
        <p className="text-gray-400 text-sm">
          Section subtitle or description
        </p>
      </div>

      {/* Cards Preview */}
      <div className="grid grid-cols-3 gap-4 scale-75 origin-top">
        {mockItems.map((item, index) => {
          const IconComponent = item.icon
          
          return (
            <Card
              key={index}
              className="p-4 group hover:shadow-lg transition-all duration-300"
              glowColor={item.color as any}
            >
              <div className="mb-3">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getGradient(item.color)} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-sm font-bold mb-1 group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2">
                  {item.description}
                </p>
              </div>
              
              {/* Circuit board pattern - simplified */}
              <div className="w-full h-px bg-gray-800 mt-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-0 group-hover:w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-500"></div>
              </div>
              <div className="w-full h-2 relative">
                <div className="absolute top-0 left-1/4 h-full w-px bg-gray-800"></div>
                <div className="absolute top-0 left-3/4 h-full w-px bg-gray-800"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gray-800"></div>
              </div>
            </Card>
          )
        })}
      </div>
      
      {/* Widget Info */}
      <div className="text-center mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          3-Column Cards • Perfect for services, features, or benefits
        </p>
      </div>
    </div>
  )
}