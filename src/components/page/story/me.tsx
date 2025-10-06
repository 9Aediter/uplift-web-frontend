'use client';

import { OptimizedImage } from "@/components/common/optimized-image";
import { FaLightbulb, FaCode, FaUsers, FaCog, FaChartLine } from 'react-icons/fa';
import { motion } from 'motion/react';

interface Founder {
  id: number;
  name: string;
  title: string;
  role: string;
  description: string;
  expertise: string[];
  vision: string;
  image: string;
}

interface AboutSectionProps {
  founders: Founder[];
}

function AboutSection({ founders }: AboutSectionProps) {
    const getExpertiseIcon = (expertise: string) => {
        switch (expertise.toLowerCase()) {
            case 'system architecture': return <FaCog className="w-4 h-4" />;
            case 'full-stack development': return <FaCode className="w-4 h-4" />;
            case 'business analysis': return <FaChartLine className="w-4 h-4" />;
            case 'project management': return <FaUsers className="w-4 h-4" />;
            default: return <FaCog className="w-4 h-4" />;
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Meet Our Team
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        The visionaries behind UPLIFT Technology's innovative solutions
                    </p>
                </motion.div>

                {/* Founders Grid */}
                <div className="grid gap-12 lg:gap-16">
                    {founders.map((founder, index) => (
                        <motion.div 
                            key={founder.id}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            {/* Profile Image */}
                            <div className={`flex justify-center ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <motion.div
                                    className="relative"
                                    whileHover={{ scale: 1.05, rotateY: 5 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ perspective: "1000px" }}
                                >
                                    {/* 3D Frame Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl transform ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'} shadow-2xl`} />
                                    <div className={`absolute inset-0 bg-gradient-to-tl from-white/20 to-transparent rounded-2xl transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`} />
                                    
                                    <div className="relative transform translate-x-2 translate-y-2">
                                        <OptimizedImage
                                            src={founder.image}
                                            width={380}
                                            height={380}
                                            alt={founder.name}
                                            className="rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl border-4 border-white dark:border-slate-100"
                                            fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&size=380&background=0175BC&color=fff`}
                                            timeout={10000}
                                        />
                                    </div>
                                    
                                    {/* Floating Badge */}
                                    <div className={`absolute -bottom-4 -right-4 bg-gradient-to-r ${index % 2 === 0 ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                                        {founder.title.split(' ')[0]}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className={`space-y-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                {/* Name & Title */}
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                            {founder.name}
                                        </span>
                                    </h3>
                                    <p className="text-lg font-medium text-orange-500 mb-1">
                                        {founder.title}
                                    </p>
                                    <p className="text-base text-slate-600 dark:text-slate-400">
                                        {founder.role}
                                    </p>
                                </div>
                        
                                {/* Description */}
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {founder.description}
                                </p>

                                {/* Expertise */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
                                        EXPERTISE
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {founder.expertise.map((skill, skillIndex) => (
                                            <div 
                                                key={skillIndex}
                                                className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-200/50 dark:border-slate-600/50"
                                            >
                                                <span className="text-blue-600 dark:text-blue-400">
                                                    {getExpertiseIcon(skill)}
                                                </span>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    {skill}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                        
                                {/* Vision Statement - แบบเดิมที่ชอบ */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border-l-4 border-blue-500">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                                        <FaLightbulb className="w-4 h-4" />
                                        Vision
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {founder.vision}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
