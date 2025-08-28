import React from 'react'
import { Clock, TrendingUp, Users, Shield } from 'lucide-react'

export const FourColumnCardsSkeleton: React.FC = () => {
  return (
    <div className="bg-background p-4 rounded-lg relative overflow-hidden min-h-[400px]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/3 w-22 h-22 bg-green-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Skeleton */}
        <div className="text-center mb-12 md:mb-16">
          <div className="space-y-4">
            <div className="h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mx-auto w-80"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mx-auto w-96"></div>
            </div>
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="text-center p-6 rounded-lg">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="text-center p-6 rounded-lg">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-2/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="text-center p-6 rounded-lg">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-4/5"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="text-center p-6 rounded-lg">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-3/5"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Widget Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-xs text-gray-400">
            4-Column Cards • Problems/Features showcase
          </p>
        </div>
      </div>
    </div>
  )
}