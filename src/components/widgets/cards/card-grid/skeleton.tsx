import React from 'react'

export const CardGridSkeleton: React.FC = () => {
  const mockItems = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "TypeScript", icon: "🔷", category: "Language" },
    { name: "Next.js", icon: "▲", category: "Framework" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
    { name: "Docker", icon: "🐳", category: "DevOps" },
    { name: "AWS", icon: "☁️", category: "Cloud" },
    { name: "GraphQL", icon: "◉", category: "API" }
  ]

  return (
    <div className="bg-background p-4 rounded-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Technology Stack
          </span>
        </h3>
        <p className="text-xs text-muted-foreground">
          Tools & technologies we use to build products
        </p>
      </div>

      {/* Grid Preview */}
      <div className="grid grid-cols-4 gap-2 scale-75 origin-top">
        {mockItems.slice(0, 8).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center transition-all duration-300 rounded-lg group relative hover:scale-105 cursor-pointer"
          >
            <div className="h-full w-full rounded-lg backdrop-blur-sm shadow-sm border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-300 bg-white/5 dark:bg-gray-800/5">
              <div className="flex flex-col items-center justify-center gap-1 p-2">
                <div className="h-4 flex items-center justify-center text-sm">
                  <span>{item.icon}</span>
                </div>
                <p className="text-[10px] font-medium text-center leading-tight">
                  {item.name}
                </p>
                <span className="text-[8px] text-muted-foreground bg-muted/50 px-1 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* More items indicator */}
      <div className="text-center mt-2">
        <div className="flex justify-center items-center gap-1">
          <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
          <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
          <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
        </div>
        <p className="text-[8px] text-muted-foreground mt-1">+ more technologies</p>
      </div>
      
      {/* Widget Info */}
      <div className="text-center mt-4 pt-4 border-t border-muted">
        <p className="text-xs text-muted-foreground">
          Card Grid • Technology stack, tools, or logos showcase
        </p>
      </div>
    </div>
  )
}