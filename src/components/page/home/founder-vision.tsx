'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Target, Zap, Shield, ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

interface FounderVisionProps {
  lang?: string;
}

export function FounderVision({ lang = 'th' }: FounderVisionProps) {

  const missions = [
    {
      icon: Target,
      text: "สร้างซอฟต์แวร์ที่ ใช้ได้จริง ไม่ใช่แค่พูดได้สวย",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      text: "สร้างวัฒนธรรมที่ ให้ค่าคนทำงานพอ ๆ กับลูกค้า",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      text: "สร้างมาตรฐานใหม่ให้วงการ ที่คุณภาพคือเรื่องปกติ ไม่ใช่เรื่องพิเศษ",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side - Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* AI-Inspired Neural Network Frame */}
            <div className="relative">
              {/* Animated Orbital Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-[120%] h-[120%] border-2 border-blue-500/20 dark:border-blue-500/10 rounded-full" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-[110%] h-[110%] border-2 border-purple-500/20 dark:border-purple-500/10 rounded-full border-dashed" />
              </motion.div>

              {/* Neural Network Nodes */}
              <div className="absolute top-1/4 left-0 w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" />
              <div className="absolute top-1/3 right-0 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/4 left-1/4 w-2.5 h-2.5 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-500/50 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full shadow-lg shadow-pink-500/50 animate-pulse" style={{ animationDelay: '1.5s' }} />

              {/* Hexagonal AI Frame */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 blur-2xl" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />

                {/* Main Image Container - Circular */}
                <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-full p-3 shadow-2xl">
                  <div className="relative h-[500px] w-[500px] md:h-[600px] md:w-[600px] rounded-full overflow-hidden border-4 border-white dark:border-slate-700">
                    <Image
                      src="https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/Anon.png"
                      alt="Founder - UPLIFT Technology"
                      fill
                      className="object-cover object-center scale-110"
                      sizes="(max-width: 1024px) 500px, 600px"
                      unoptimized
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* AI Spark Icon */}
              <div className="absolute -top-8 -right-8 p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-2xl shadow-blue-500/50 animate-pulse">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Headline */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold">
                  FOUNDER'S VISION
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Born from Frustration,
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">
                  Built with Purpose.
                </span>
              </motion.h2>
            </div>

            {/* Mission Points - Visual Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {missions.map((mission, index) => {
                const Icon = mission.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${mission.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 rounded-2xl transition-opacity duration-300 blur-xl`} />
                    <div className="relative p-6 bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col items-center text-center">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${mission.color} mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {mission.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              viewport={{ once: true }}
              className="pt-6 flex items-center gap-4"
            >
              <Link href={`/${lang}/service`}>
                <button className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                  <span>See Our Work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href={`/${lang}/teams`}>
                <button className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 text-slate-900 dark:text-white rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                  <Users className="w-4 h-4" />
                  <span>Our Team</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
