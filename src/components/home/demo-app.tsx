import React from 'react';
import { Section } from '@/components/ui/section';
import { FaMobile, FaCode, FaPalette, FaRocket } from 'react-icons/fa';
import { AnimateEffect } from '@/components/animate-effect';

export const DemoApp = () => {
  return (
    <Section className="bg-gradient-to-b from-background to-muted/30 min-h-screen">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Section */}
          <div className="order-2 lg:order-1 space-y-8">
            <AnimateEffect index={0}>
              <div className="space-y-6">
                <div className="w-fit mb-8 inline-flex items-center bg-primary/5 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
                  <FaMobile className="h-4 w-4 text-cyan-400 mr-2" />
                  <span className="text-sm font-medium text-cyan-300">Mobile Development</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Mobile Apps
                  </span>
                  <br />That Scale
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  สร้างแอปพลิเคชันมือถือที่ทันสมัย รองรับทั้ง iOS และ Android 
                  ด้วยเทคโนโลยีล่าสุดและการออกแบบที่เน้นผู้ใช้เป็นหลัก
                </p>
              </div>
            </AnimateEffect>

            <AnimateEffect index={1}>
              {/* Service Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <FaCode className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-2">Native Development</h3>
                    <p className="text-muted-foreground text-sm">พัฒนาด้วย React Native และ Flutter</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <FaPalette className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-2">UX/UI Design</h3>
                    <p className="text-muted-foreground text-sm">การออกแบบที่เน้นประสบการณ์ผู้ใช้</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <FaRocket className="text-purple-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-2">Performance</h3>
                    <p className="text-muted-foreground text-sm">เพิ่มประสิทธิภาพและความเร็ว</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <FaMobile className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-2">Cross Platform</h3>
                    <p className="text-muted-foreground text-sm">รองรับทุกแพลตฟอร์มในโค้ดเซ็ตเดียว</p>
                  </div>
                </div>
              </div>
            </AnimateEffect>

            <AnimateEffect index={2}>
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground">Mobile Apps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </AnimateEffect>
          </div>

          {/* Left Side - Smartphone Mockups */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative flex justify-center items-center">
              
              {/* Main Phone */}
              <div className="relative z-10">
                <div className="w-64 h-[500px] md:w-72 md:h-[550px] bg-black rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20" />
                    
                    {/* Screen Content */}
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 flex flex-col">
                      {/* Status Bar */}
                      <div className="h-12 flex items-center justify-between px-6 pt-6">
                        <span className="text-white text-sm font-medium">9:41</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-2 bg-white rounded-sm opacity-60" />
                          <div className="w-4 h-2 bg-white rounded-sm opacity-80" />
                          <div className="w-4 h-2 bg-white rounded-sm" />
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 flex items-center justify-center">
                          <FaMobile className="text-white text-2xl" />
                        </div>
                        <h3 className="text-white text-xl font-bold mb-2">Uplift App</h3>
                        <p className="text-white/80 text-sm mb-8">Built with modern technology</p>
                        
                        {/* Mock UI Elements */}
                        <div className="w-full space-y-3">
                          <div className="h-12 bg-white/20 rounded-xl" />
                          <div className="h-12 bg-white/20 rounded-xl" />
                          <div className="h-12 bg-white rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Phone (Left) */}
              <div className="absolute left-0 top-8 z-0 opacity-30 scale-90 rotate-12">
                <div className="w-56 h-[450px] bg-gray-800 rounded-[2.5rem] p-3">
                  <div className="w-full h-full bg-gray-100 rounded-[2rem] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500" />
                  </div>
                </div>
              </div>

              {/* Background Phone (Right) */}
              <div className="absolute right-0 top-12 z-0 opacity-30 scale-90 -rotate-12">
                <div className="w-56 h-[450px] bg-gray-800 rounded-[2.5rem] p-3">
                  <div className="w-full h-full bg-gray-100 rounded-[2rem] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-cyan-500" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-full opacity-60 animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/20 rounded-full opacity-40 animate-pulse delay-1000" />
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};