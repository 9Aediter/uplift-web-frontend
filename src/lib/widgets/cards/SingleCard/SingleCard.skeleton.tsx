import React from 'react'
import { Rocket, ArrowRight } from 'lucide-react'

export const SingleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg relative overflow-hidden min-h-[400px] flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-4 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rotate-45"></div>
        <div className="absolute bottom-4 right-4 w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent -rotate-45"></div>
        <div className="absolute top-2 right-8 w-3 h-3 border border-blue-400 rounded-full"></div>
        <div className="absolute bottom-2 left-8 w-2 h-2 bg-cyan-400/30 rounded-full"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 bg-white rounded-xl p-8 mx-4 w-full max-w-4xl">
        <div className="text-center space-y-6">
          {/* Title Skeleton */}
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto w-3/4"></div>
              <div className="h-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-lg mx-auto w-1/2"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-4/5"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-3/5"></div>
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-black text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-3 w-full sm:w-auto">
              <Rocket className="w-5 h-5 text-white" />
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="border-2 border-gray-300 text-gray-800 px-8 py-4 rounded-full font-semibold w-full sm:w-auto">
              <span>Get Free Consultation</span>
            </div>
          </div>

          {/* Trust indicators skeleton */}
          <div className="pt-6 border-t border-gray-200">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-48 mb-4"></div>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Widget Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-xs text-gray-400">
            Single CTA Card • Hero card with call-to-action
          </p>
        </div>
      </div>
    </div>
  )
}