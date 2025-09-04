'use client';

import React, { useState } from 'react';
import { Section } from "@/components/ui/section";
import { motion } from "motion/react";
import { FaEnvelope, FaBell, FaRocket } from "react-icons/fa";

export const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        setEmail("");
    };

    return (
        <Section className="py-16 relative">
            <div className="max-w-4xl mx-auto">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rotate-45 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent -rotate-45 animate-pulse delay-1000"></div>
                </div>

                <motion.div 
                    className="relative bg-gradient-to-br from-card via-card/90 to-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Glow effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                    
                    <div className="relative z-10 text-center">
                        {/* Icon */}
                        <motion.div 
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-6 shadow-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <FaBell className="text-white text-xl" />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Stay Ahead with{" "}
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    Latest Insights
                                </span>
                            </h3>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                รับบทความ เทคนิค และเทรนด์ล่าสุดด้านเทคโนโลยีและการพัฒนาซอฟต์แวร์ 
                                ส่งตรงถึงอีเมลของคุณทุกเดือน
                            </p>
                        </motion.div>

                        {/* Newsletter Form */}
                        <motion.form 
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex-1 relative">
                                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            <motion.button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Subscribe</span>
                                <FaRocket className="group-hover:animate-bounce" />
                            </motion.button>
                        </motion.form>

                        {/* Trust indicators */}
                        <motion.div 
                            className="mt-8 pt-6 border-t border-border/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <p className="text-sm text-muted-foreground mb-4">
                                เข้าร่วมกับ <span className="font-semibold text-foreground">500+</span> developers และ entrepreneurs
                            </p>
                            <div className="flex justify-center items-center gap-6 text-sm font-medium text-muted-foreground">
                                <span>✓ Weekly Tech Insights</span>
                                <span>✓ Industry Updates</span>
                                <span>✓ No Spam</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};