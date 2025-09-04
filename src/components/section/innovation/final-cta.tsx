'use client'
import React from 'react'
import { Section } from '@/components/ui/section'
import { motion } from "motion/react"
import { FaRocket, FaCalendar, FaHeadset } from "react-icons/fa"
import { Sparkles } from 'lucide-react'

const FinalCtaSection = () => {
    return (
        <Section className="relative py-24 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
            
            {/* Animated elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <motion.div 
                    className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 border border-border/50 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Decorative top border */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                    
                    <div className="text-center space-y-8">
                        {/* Icon */}
                        <motion.div 
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg mx-auto"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                        >
                            <Sparkles className="text-white text-3xl" />
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                <span className="text-foreground">Transform Your Vision into</span>
                                <br />
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    Digital Reality
                                </span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                                ให้เราช่วยคุณสร้างโซลูชันที่ตอบโจทย์ธุรกิจ ด้วยเทคโนโลยีที่ทันสมัย
                                และทีมผู้เชี่ยวชาญที่พร้อมให้คำปรึกษาทุกขั้นตอน
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div 
                            className="flex flex-col sm:flex-row justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <motion.button 
                                className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaRocket className="group-hover:animate-bounce" />
                                <span>Start Your Project</span>
                            </motion.button>
                            
                            <motion.button 
                                className="px-8 py-4 rounded-full bg-transparent border-2 border-border text-foreground font-semibold text-lg hover:bg-muted/50 hover:border-cyan-500 transition-all flex items-center justify-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaCalendar />
                                <span>Schedule Demo</span>
                            </motion.button>
                        </motion.div>

                        {/* Features */}
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-500 mb-2">100+</div>
                                <p className="text-sm text-muted-foreground">Successful Projects</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
                                <p className="text-sm text-muted-foreground">Support Available</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-500 mb-2">5★</div>
                                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                            </div>
                        </motion.div>

                        {/* Support text */}
                        <motion.div 
                            className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <FaHeadset />
                            <span>Free consultation available • No credit card required</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </Section>
    )
}

export default FinalCtaSection