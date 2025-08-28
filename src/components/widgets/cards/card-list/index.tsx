"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'

interface CardListProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  layout?: 'grid' | 'list'
  items?: Array<{
    title: string
    description: string
    category: string
    image: string
    link: string
    author?: string
    date?: string
    readTime?: string
  }>
}

export const CardList: React.FC<CardListProps> = ({
  title = "Featured Articles",
  subtitle = "Latest insights and updates from our team",
  backgroundColor = "bg-gradient-to-b from-gray-900/30 to-black",
  layout = 'grid',
  items = []
}) => {
  if (!items.length) {
    return (
      <div className={`${backgroundColor} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">No articles available</p>
        </div>
      </div>
    )
  }

  const getGlowColor = (index: number) => {
    const colors = ['cyan', 'magenta', 'blue', 'purple', 'green', 'yellow']
    return colors[index % colors.length]
  }

  const getGlowColorClass = (color: string) => {
    const glowMap: Record<string, string> = {
      cyan: 'hover:shadow-cyan-500/25 border-cyan-500/20',
      magenta: 'hover:shadow-pink-500/25 border-pink-500/20',
      blue: 'hover:shadow-blue-500/25 border-blue-500/20',
      purple: 'hover:shadow-purple-500/25 border-purple-500/20',
      green: 'hover:shadow-green-500/25 border-green-500/20',
      yellow: 'hover:shadow-yellow-500/25 border-yellow-500/20'
    }
    return glowMap[color] || glowMap.cyan
  }

  return (
    <section className={`${backgroundColor} py-16 md:py-24 flex justify-center items-center`}>
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-8 md:mb-16">
            {title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Articles Grid/List */}
        <div className={
          layout === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" 
            : "space-y-6"
        }>
          {items.map((article, index) => {
            const glowColor = getGlowColor(index)
            const glowClass = getGlowColorClass(glowColor)
            
            return (
              <Link href={article.link} key={index} className="group block">
                <div className={`
                  bg-card border rounded-lg overflow-hidden 
                  hover:transform hover:scale-[1.02] transition-all duration-300 
                  hover:shadow-lg ${glowClass}
                  ${layout === 'list' ? 'flex flex-col sm:flex-row' : ''}
                `}>
                  {/* Image */}
                  <div className={`
                    relative overflow-hidden bg-muted
                    ${layout === 'list' ? 'sm:w-64 sm:flex-shrink-0' : ''}
                  `}>
                    <img
                      src={article.image || 'https://via.placeholder.com/600x400?text=Article+Image'}
                      alt={article.title}
                      className={`
                        w-full object-cover group-hover:scale-105 transition-transform duration-300
                        ${layout === 'list' ? 'h-48 sm:h-full' : 'h-48 md:h-60'}
                      `}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-white">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${layout === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {article.description}
                    </p>
                    
                    {/* Meta information */}
                    {(article.author || article.date || article.readTime) && (
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        {article.author && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{article.author}</span>
                          </div>
                        )}
                        {article.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{article.date}</span>
                          </div>
                        )}
                        {article.readTime && (
                          <span>{article.readTime}</span>
                        )}
                      </div>
                    )}
                    
                    {/* Read More Button */}
                    <div className="flex justify-end">
                      <button className="text-primary flex items-center font-medium hover:text-primary/80 transition-colors group/button">
                        Read More 
                        <ArrowRight className="h-4 w-4 ml-1 group-hover/button:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}