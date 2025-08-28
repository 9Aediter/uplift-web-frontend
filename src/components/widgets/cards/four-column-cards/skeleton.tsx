import React from 'react'

export const FourColumnCardsSkeleton: React.FC = () => {
  const mockItems = [
    {
      title: "Slow Processes",
      description: "Manual tasks reducing productivity",
      icon: "⚙️",
      gradient: "from-red-500 via-red-400 to-orange-500",
      impact: "85% Loss"
    },
    {
      title: "Data Issues", 
      description: "Scattered information affects decisions",
      icon: "📊",
      gradient: "from-blue-500 via-blue-400 to-cyan-500",
      impact: "60% Bad"
    },
    {
      title: "Integration",
      description: "Systems don't communicate well",
      icon: "🔗", 
      gradient: "from-purple-500 via-purple-400 to-pink-500",
      impact: "40% Drop"
    },
    {
      title: "Scalability",
      description: "Systems can't handle growth",
      icon: "🚀",
      gradient: "from-green-500 via-green-400 to-emerald-500", 
      impact: "30% Block"
    }
  ]

  return (
    <div className="bg-black p-4 rounded-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">
          <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Business Challenges
          </span>
        </h3>
        <p className="text-xs text-gray-300">
          Common problems that slow down businesses
        </p>
      </div>

      {/* 4 Column Cards Preview */}
      <div className="grid grid-cols-4 gap-2 scale-75 origin-top">
        {mockItems.map((item, index) => (
          <div key={index} className="group relative">
            {/* Mini Card */}
            <div className="relative h-24 bg-gray-900/80 border border-gray-700/50 rounded-lg p-2 overflow-hidden">
              {/* Gradient top line */}
              <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${item.gradient}`}></div>
              
              {/* Icon */}
              <div className="mb-2">
                <div className="w-4 h-4 bg-gray-800/80 rounded-md flex items-center justify-center border border-gray-600/50">
                  <span className="text-xs">{item.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h4 className="text-white text-[10px] font-bold leading-tight truncate">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-[8px] leading-tight line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Impact Badge */}
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-gray-800/60 border border-gray-600/50 rounded-full px-1 py-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[6px] text-gray-500">Impact:</span>
                    <span className={`text-[6px] font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                      {item.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Widget Info */}
      <div className="text-center mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          4-Column Cards • Problems, features, or benefits grid
        </p>
      </div>
    </div>
  )
}