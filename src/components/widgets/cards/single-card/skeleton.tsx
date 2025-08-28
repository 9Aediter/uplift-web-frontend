import React from 'react'
import { Rocket, ArrowRight } from 'lucide-react'

export const SingleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-4 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rotate-45"></div>
        <div className="absolute bottom-4 right-4 w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent -rotate-45"></div>
        <div className="absolute top-2 right-8 w-3 h-3 border border-blue-400 rounded-full"></div>
        <div className="absolute bottom-2 left-8 w-2 h-2 bg-cyan-400/30 rounded-full"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 bg-white rounded-xl p-6 mx-2">
        <div className="text-center space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              Build Your Next{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Big Thing
              </span>
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Custom software solutions, from concept to launch
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center justify-center space-x-1 group">
              <Rocket className="w-3 h-3 text-white" />
              <span>Start Your Project</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button className="border border-gray-300 text-gray-800 px-4 py-2 rounded-full text-xs font-semibold">
              Get Free Consultation
            </button>
          </div>

          {/* Trust indicators */}
          <div className="pt-3 border-t border-gray-200">
            <p className="text-[10px] text-gray-500 mb-2">Trusted by companies worldwide</p>
            <div className="flex justify-center items-center gap-3 opacity-60">
              <div className="text-[10px] font-bold text-gray-400">STARTUP</div>
              <div className="text-[10px] font-bold text-gray-400">FINTECH</div>
              <div className="text-[10px] font-bold text-gray-400">ECOMMERCE</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Widget Info */}
      <div className="text-center mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          Single CTA Card • Hero card with call-to-action
        </p>
      </div>
    </div>
  )
}