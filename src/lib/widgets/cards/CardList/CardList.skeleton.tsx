import React from 'react'
import { Calendar, User } from 'lucide-react'

export const CardListSkeleton: React.FC = () => {
  return (
    <div className="bg-background p-4 rounded-lg relative overflow-hidden min-h-[600px]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Skeleton */}
        <div className="text-center mb-12 md:mb-16">
          <div className="space-y-4">
            <div className="h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mx-auto w-64"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mx-auto w-96"></div>
            </div>
          </div>
        </div>

        {/* List Items Skeleton - Horizontal Layout */}
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image Skeleton */}
                <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
                  {/* Category tag */}
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                    <div className="h-3 bg-blue-400 rounded w-16"></div>
                  </div>
                </div>

                {/* Content Skeleton */}
                <div className="flex-1 p-6">
                  <div className="space-y-4">
                    {/* Meta information */}
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </div>

                    {/* Read more link */}
                    <div className="flex items-center">
                      <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-20"></div>
                      <div className="w-4 h-4 ml-1 bg-blue-200 dark:bg-blue-800 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Widget Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-xs text-gray-400">
            Card List • Vertical list layout with detailed content
          </p>
        </div>
      </div>
    </div>
  )
}