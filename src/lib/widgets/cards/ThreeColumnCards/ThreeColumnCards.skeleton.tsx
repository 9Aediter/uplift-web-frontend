import React from 'react'
import { Monitor, Smartphone, Globe } from 'lucide-react'

export const ThreeColumnCardsSkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-background to-black p-4 rounded-lg relative overflow-hidden min-h-[500px]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Skeleton */}
        <div className="text-center mb-12 md:mb-16">
          <div className="space-y-4">
            <div className="h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mx-auto w-64"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mx-auto w-96"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mx-auto w-80"></div>
            </div>
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-6">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              </div>
            </div>

            {/* Link indicator */}
            <div className="flex items-center mt-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="w-4 h-4 ml-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-6">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>

            {/* Link indicator */}
            <div className="flex items-center mt-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="w-4 h-4 ml-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              </div>
            </div>

            {/* Link indicator */}
            <div className="flex items-center mt-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="w-4 h-4 ml-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Widget Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-xs text-gray-400">
            3-Column Cards • Services showcase with icons
          </p>
        </div>
      </div>
    </div>
  )
}