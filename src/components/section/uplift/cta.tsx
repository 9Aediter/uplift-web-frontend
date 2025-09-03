"use client";

import React, { useState } from "react";
import { FaRocket, FaArrowRight, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import "@/style/cta.css";

export function CalltoAction() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    // console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
        
        {/* Glowing tech lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-45 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-40 sm:w-64 md:w-80 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent -rotate-45 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 sm:w-48 md:w-64 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rotate-90 animate-pulse delay-2000"></div>
        </div>

        {/* Abstract geometric shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border border-blue-500 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 border border-purple-500 rounded-lg rotate-45 animate-bounce-slow"></div>
          <div className="absolute top-1/2 right-10 sm:right-20 md:right-40 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main CTA Card */}
        <motion.div 
          className="relative matte-black-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl shadow-black/20 mx-auto max-w-7xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Metallic sheen overlay */}
          <div className="absolute inset-0 dark:hidden pointer-events-none rounded-2xl sm:rounded-3xl metallic-sheen" />
          
          <div className="relative z-10 text-center space-y-6 sm:space-y-8">
            {/* Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white dark:text-gray-900 leading-tight px-2 sm:px-0">
                Build Your Next{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 dark:from-blue-600 dark:via-purple-600 dark:to-cyan-600 bg-clip-text text-transparent">
                  Big Thing
                </span>
                <br />
                with Uplift Technology
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 dark:text-gray-700 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                Custom software solutions, from concept to launch. Empower your business 
                with our cutting-edge technology and transform your ideas into reality.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <motion.button 
                className="w-full sm:w-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group min-w-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket className="text-gray-900 dark:text-white group-hover:animate-bounce flex-shrink-0" />
                <span className="truncate">Start Your Project</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </motion.button>

              <motion.button 
                className="w-full sm:w-auto border-2 border-neutral-600 dark:border-gray-700 text-white dark:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:border-white dark:hover:border-gray-900 hover:bg-white/10 dark:hover:bg-gray-900/10 transition-all duration-300 min-w-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="truncate">Get Free Consultation</span>
              </motion.button>
            </div>

            {/* Trust indicators */}
            <div className="pt-6 sm:pt-8 border-t border-neutral-700 dark:border-gray-300">
              <p className="text-sm text-neutral-400 dark:text-gray-600 mb-3 sm:mb-4 px-2 sm:px-0">Trusted by innovative companies worldwide</p>
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
                <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-neutral-500 dark:text-gray-500">STARTUP</div>
                <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-neutral-500 dark:text-gray-500">FINTECH</div>
                <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-neutral-500 dark:text-gray-500">ECOMMERCE</div>
                <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-neutral-500 dark:text-gray-500">HEALTHCARE</div>
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
    </section>
  );
}