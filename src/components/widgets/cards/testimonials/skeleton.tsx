import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const TestimonialsSkeleton: React.FC = () => {
  return (
    <div className="bg-background p-4 rounded-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            What Our Clients Say
          </span>
        </h3>
        <p className="text-xs text-muted-foreground">
          Hear from businesses that have transformed with our solutions
        </p>
      </div>

      {/* Testimonial Preview */}
      <div className="grid grid-cols-2 gap-6 scale-75 origin-top">
        {/* Image Area */}
        <div className="relative h-32 w-full">
          <div className="absolute inset-0">
            <div className="h-full w-full rounded-2xl bg-gray-200 dark:bg-gray-800 overflow-hidden">
              {/* Simulated person photo */}
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gray-400"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-70">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 transform rotate-3 scale-95"></div>
          </div>
          <div className="absolute inset-0 opacity-50">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-pink-200 to-orange-200 dark:from-pink-800 dark:to-orange-800 transform -rotate-2 scale-90"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <h4 className="font-bold text-sm mb-1">Sarah Chen</h4>
            <p className="text-xs text-muted-foreground mb-2">Product Manager at TechFlow</p>
            
            {/* Rating */}
            <div className="flex mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-2 h-2 text-yellow-400 text-xs">★</div>
              ))}
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex gap-2 mt-4">
            <button className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-1 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-muted"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-muted"></div>
          </div>
        </div>
      </div>
      
      {/* Widget Info */}
      <div className="text-center mt-4 pt-4 border-t border-muted">
        <p className="text-xs text-muted-foreground">
          Testimonials Carousel • Animated client reviews
        </p>
      </div>
    </div>
  )
}