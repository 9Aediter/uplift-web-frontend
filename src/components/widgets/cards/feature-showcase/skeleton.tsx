import React from 'react'
import { CheckIcon, Monitor, Smartphone } from 'lucide-react'

export const FeatureShowcaseSkeleton: React.FC = () => {
  const mockItems = [
    {
      title: "Smart ERP System",
      subtitle: "Enterprise Management", 
      description: "Complete business management solution",
      color: "blue",
      features: [
        { title: "Real-time Analytics", description: "Live insights" },
        { title: "Multi-user Access", description: "Role-based permissions" }
      ]
    },
    {
      title: "Modern POS Solution",
      subtitle: "Retail Technology",
      description: "Advanced point-of-sale system",
      color: "green", 
      features: [
        { title: "Inventory Management", description: "Stock tracking" },
        { title: "Payment Processing", description: "Multiple methods" }
      ]
    }
  ]

  const getGradient = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'from-blue-500 to-cyan-400',
      green: 'from-green-500 to-emerald-400'
    }
    return gradients[color] || gradients.blue
  }

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 p-4 rounded-lg text-white">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Our Products
          </span>
        </h3>
        <p className="text-xs text-gray-300">
          Innovative solutions for your business
        </p>
      </div>

      {/* Feature Items Preview */}
      <div className="space-y-6 scale-75 origin-top">
        {mockItems.map((item, index) => {
          const IconComponent = index === 0 ? Monitor : Smartphone
          
          return (
            <div
              key={index}
              className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-4 bg-gray-900/50 p-3 rounded-lg`}
            >
              {/* Mini Image */}
              <div className="w-16 h-12 bg-gray-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-gradient-to-r ${getGradient(item.color)} flex items-center justify-center`}
                >
                  <IconComponent className="h-2 w-2 text-white" />
                </div>
              </div>

              {/* Mini Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span
                    className={`w-1 h-1 rounded-full bg-gradient-to-r ${getGradient(item.color)}`}
                  ></span>
                  <span className="text-[10px] text-gray-400">{item.subtitle}</span>
                </div>
                
                <h4 className="text-xs font-bold mb-1">
                  <span
                    className={`bg-gradient-to-r ${getGradient(item.color)} bg-clip-text text-transparent`}
                  >
                    {item.title}
                  </span>
                </h4>
                
                <p className="text-[9px] text-gray-400 mb-2 line-clamp-1">
                  {item.description}
                </p>
                
                <div className="space-y-1">
                  {item.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${getGradient(item.color)} mr-1 flex items-center justify-center`}
                      >
                        <CheckIcon className="h-1 w-1 text-white" />
                      </div>
                      <span className="text-[8px] text-gray-400">{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Widget Info */}
      <div className="text-center mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          Feature Showcase • Alternating layout with features
        </p>
      </div>
    </div>
  )
}