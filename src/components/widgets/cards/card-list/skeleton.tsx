import React from 'react'
import { ArrowRight, Calendar, User } from 'lucide-react'

export const CardListSkeleton: React.FC = () => {
  const mockArticles = [
    {
      title: "Software Trends 2024",
      description: "Latest trends shaping business",
      category: "Software Trends",
      author: "Tech Team",
      date: "Mar 15"
    },
    {
      title: "UX Design Impact", 
      description: "How design affects conversions",
      category: "UX/UI",
      author: "Design Team",
      date: "Mar 10"
    }
  ]

  return (
    <div className="bg-gradient-to-b from-gray-900/30 to-black p-4 rounded-lg">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Articles
          </span>
        </h3>
        <p className="text-xs text-muted-foreground">
          Latest insights and updates from our team
        </p>
      </div>

      {/* Articles Grid Preview */}
      <div className="grid grid-cols-2 gap-3 scale-75 origin-top">
        {mockArticles.map((article, index) => (
          <div
            key={index}
            className="bg-card border border-cyan-500/20 rounded-lg overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-16 bg-muted overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>
              {/* Category Badge */}
              <div className="absolute top-1 left-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <span className="text-[8px] font-medium text-white">
                  {article.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              <h4 className="text-xs font-bold mb-2 leading-tight line-clamp-2">
                {article.title}
              </h4>
              <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2">
                {article.description}
              </p>
              
              {/* Meta information */}
              <div className="flex items-center gap-2 text-[8px] text-muted-foreground mb-2">
                <div className="flex items-center gap-0.5">
                  <User className="h-2 w-2" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Calendar className="h-2 w-2" />
                  <span>{article.date}</span>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="flex justify-end">
                <button className="text-primary flex items-center text-[8px] font-medium">
                  Read More
                  <ArrowRight className="h-2 w-2 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* More articles indicator */}
      <div className="text-center mt-3">
        <div className="flex justify-center items-center gap-1">
          <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
          <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
          <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
        </div>
        <p className="text-[8px] text-muted-foreground mt-1">+ more articles</p>
      </div>
      
      {/* Widget Info */}
      <div className="text-center mt-4 pt-4 border-t border-muted">
        <p className="text-xs text-muted-foreground">
          Card List • Articles, blogs, or featured content
        </p>
      </div>
    </div>
  )
}