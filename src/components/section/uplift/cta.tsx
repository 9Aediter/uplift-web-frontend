"use client";

import React, { useState } from "react";
import { FaRocket, FaArrowRight, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export function CalltoAction() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Glowing tech lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-45 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent -rotate-45 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rotate-90 animate-pulse delay-2000"></div>
        </div>

        {/* Abstract geometric shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-500 rounded-lg rotate-45 animate-bounce-slow"></div>
          <div className="absolute top-1/2 right-40 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Main CTA Card */}
        <motion.div 
          className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl shadow-blue-500/10 backdrop-blur-sm mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center space-y-8">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Build Your Next{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Big Thing
                </span>
                <br />
                with Uplift Technology
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Custom software solutions, from concept to launch. Empower your business 
                with our cutting-edge technology and transform your ideas into reality.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-3 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket className="text-white group-hover:animate-bounce" />
                <span>Start Your Project</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button 
                className="border-2 border-gray-300 text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-800 hover:bg-gray-50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Consultation
              </motion.button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by innovative companies worldwide</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-2xl font-bold text-gray-400">STARTUP</div>
                <div className="text-2xl font-bold text-gray-400">FINTECH</div>
                <div className="text-2xl font-bold text-gray-400">ECOMMERCE</div>
                <div className="text-2xl font-bold text-gray-400">HEALTHCARE</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Section */}
        {/* <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Get the latest insights on technology trends and software development.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

        </motion.div> */}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}