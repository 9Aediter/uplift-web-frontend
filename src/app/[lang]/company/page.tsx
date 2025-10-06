'use client';

import React, { useState, useEffect } from "react";
import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/layout/footer/footer";
import { Calendar, Building2, User, Code, Globe, Shield, Award, Target, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const getCompanyData = (locale: string) => {
    const isThaiLang = locale === 'th';

    return {
        title: isThaiLang ? 'ข้อมูลบริษัท | UPLIFT' : 'Company | UPLIFT',
        description: isThaiLang
            ? 'ข้อมูลรายละเอียดของบริษัท อัปพลิฟท์ เทคโนโลยี จำกัด - Software House สาย Startup Culture ที่เปลี่ยนความคิดสร้างสรรค์ให้กลายเป็นโซลูชันเชิงนวัตกรรม'
            : 'Detailed information about UPLIFT TECHNOLOGY CO., LTD. - A startup-culture software house transforming ideas into revolutionary solutions.',
        hero: {
            title: 'UPLIFT TECHNOLOGY CO., LTD.',
            subtitle: isThaiLang
                ? 'Software House สาย Startup Culture'
                : 'Startup Culture Software House',
            description: isThaiLang
                ? 'เราไม่ใช่แค่ทีมพัฒนาซอฟต์แวร์ แต่เป็นพาร์ทเนอร์ที่เข้าใจธุรกิจและช่วยยกระดับองค์กรของคุณด้วยเทคโนโลยี'
                : 'We\'re not just a development team, but a partner who understands your business and elevates your organization with technology'
        },
        companyInfo: {
            registrationNumber: '0125568012345',
            registrationDate: isThaiLang ? '25 สิงหาคม 2568' : 'August 25, 2568',
            location: isThaiLang ? 'จังหวัดชลบุรี ประเทศไทย' : 'Chonburi Province, Thailand',
            capital: isThaiLang ? '1,000,000 บาท' : '1,000,000 THB',
            founder: isThaiLang ? 'คุณอานนท์ สุพัฒน์ผล' : 'Anon Suphatphon',
            businessType: isThaiLang ? 'บริการด้านเทคโนโลยีสารสนเทศและการสื่อสาร' : 'Information Technology and Communication Services',
            website: 'https://uplift.co.th'
        },
        vision: {
            title: isThaiLang ? 'วิสัยทัศน์' : 'Vision',
            content: isThaiLang
                ? 'เป็น Software House ชั้นนำที่ไม่เพียงแค่พัฒนาซอฟต์แวร์ แต่เป็นพาร์ทเนอร์ทางธุรกิจที่เข้าใจและช่วยยกระดับธุรกิจลูกค้าด้วยเทคโนโลยีที่เหมาะสม'
                : 'To be a leading Software House that doesn\'t just develop software, but serves as a business partner who understands and elevates client businesses with appropriate technology.'
        },
        mission: {
            title: isThaiLang ? 'พันธกิจ' : 'Mission',
            content: isThaiLang
                ? 'สร้างโซลูชันเทคโนโลยีที่ตอบโจทย์ธุรกิจจริง ด้วยการเข้าใจลูกค้าเชิงลึก ใช้เทคโนโลยีที่เหมาะสม และมุ่งเน้นผลลัพธ์ที่วัดผลได้'
                : 'Create technology solutions that truly address business needs through deep client understanding, appropriate technology use, and focus on measurable results.'
        },
        values: [
            {
                icon: <Target className="h-6 w-6" />,
                title: isThaiLang ? 'เข้าใจธุรกิจเชิงลึก' : 'Deep Business Understanding',
                description: isThaiLang
                    ? 'ไม่ใช่แค่ทำตามสเปก แต่เข้าใจปัญหาและโอกาสทางธุรกิจ'
                    : 'Not just following specs, but understanding business problems and opportunities'
            },
            {
                icon: <Code className="h-6 w-6" />,
                title: isThaiLang ? 'เทคโนโลยีที่เหมาะสม' : 'Appropriate Technology',
                description: isThaiLang
                    ? 'เลือกใช้เทคโนโลยีที่เหมาะกับปัญหา ไม่ใช่เทคโนโลยีที่ใหม่ที่สุด'
                    : 'Choosing technology that fits the problem, not the newest technology'
            },
            {
                icon: <Shield className="h-6 w-6" />,
                title: isThaiLang ? 'คุณภาพและความปลอดภัย' : 'Quality and Security',
                description: isThaiLang
                    ? 'ระบบที่เสถียร ปลอดภัย และสามารถขยายตัวได้'
                    : 'Stable, secure, and scalable systems'
            },
            {
                icon: <Award className="h-6 w-6" />,
                title: isThaiLang ? 'ผลลัพธ์ที่วัดผลได้' : 'Measurable Results',
                description: isThaiLang
                    ? 'มุ่งเน้นผลลัพธ์ที่เพิ่มประสิทธิภาพและผลกำไรให้ลูกค้า'
                    : 'Focus on results that improve efficiency and profitability for clients'
            }
        ]
    };
};

const CompanyPage = ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = React.use(params);
    const companyData = getCompanyData(lang);

    // Carousel state
    const [currentSlide, setCurrentSlide] = useState(0);

    const carouselImages = [
        {
            id: 1,
            src: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_02.png",
            alt: lang === 'th' ? "ป้ายบริษัท UPLIFT Technology" : "UPLIFT Technology Company Sign",
            title: lang === 'th' ? "ป้ายบริษัท" : "Company Sign"
        },
        {
            id: 6,
            src: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_06.png",
            alt: lang === 'th' ? "นามบัตรองค์กร" : "Corporate Business Card",
            title: lang === 'th' ? "นามบัตรองค์กร" : "Business Card"
        },
        {
            id: 9,
            src: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_09.png",
            alt: lang === 'th' ? "ปกสัญญา TOR" : "TOR Contract Cover",
            title: lang === 'th' ? "ปกสัญญา TOR" : "Contract Cover"
        }
    ];

    // Auto-play carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [carouselImages.length]);

    const registrationDetails = [
        {
            icon: <Calendar className="h-8 w-8" />,
            title: lang === 'th' ? 'วันที่จดทะเบียน' : 'Registration Date',
            value: companyData.companyInfo.registrationDate,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <Building2 className="h-8 w-8" />,
            title: lang === 'th' ? 'สถานที่ตั้ง' : 'Location',
            value: companyData.companyInfo.location,
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: <Code className="h-8 w-8" />,
            title: lang === 'th' ? 'ทุนจดทะเบียน' : 'Registered Capital',
            value: companyData.companyInfo.capital,
            gradient: 'from-orange-500 to-red-500'
        },
        {
            icon: <User className="h-8 w-8" />,
            title: lang === 'th' ? 'ผู้ก่อตั้ง' : 'Founder',
            value: companyData.companyInfo.founder,
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: <Globe className="h-8 w-8" />,
            title: lang === 'th' ? 'เว็บไซต์' : 'Website',
            value: companyData.companyInfo.website,
            gradient: 'from-cyan-500 to-blue-500'
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: lang === 'th' ? 'ประเภทธุรกิจ' : 'Business Type',
            value: companyData.companyInfo.businessType,
            gradient: 'from-indigo-500 to-purple-500'
        }
    ];

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-x-hidden">
                {/* Hero Section with Background Carousel */}
                <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
                    {/* Background Carousel */}
                    <div className="absolute inset-0">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={carouselImages[currentSlide].src}
                                    alt={carouselImages[currentSlide].alt}
                                    fill
                                    className="object-cover"
                                    priority={currentSlide === 0}
                                />
                                {/* Dark overlay for better text readability */}
                                <div className="absolute inset-0 bg-slate-900/70 dark:bg-slate-950/80" />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Top Glass Overlay for Navbar Visibility */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/80 via-white/50 to-transparent dark:from-slate-900/85 dark:via-slate-900/50 backdrop-blur-lg border-b border-white/30 dark:border-slate-700/60 shadow-lg" />

                    {/* Content */}
                    <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block mb-6"
                        >
                            <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {lang === 'th' ? 'บริษัทเทคโนโลยี' : 'Technology Company'}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                        >
                            {companyData.hero.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl font-medium text-blue-200 mb-4"
                        >
                            {companyData.hero.subtitle}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-12"
                        >
                            {companyData.hero.description}
                        </motion.p>

                        {/* Carousel Indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex justify-center gap-3"
                        >
                            {carouselImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className="group flex flex-col items-center gap-2"
                                    aria-label={`Go to slide ${index + 1}`}
                                >
                                    {/* Indicator dot */}
                                    <div className={`transition-all duration-300 rounded-full ${
                                        index === currentSlide
                                            ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-500'
                                            : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                                    }`} />

                                    {/* Label (shown on hover or when active) */}
                                    <span className={`text-xs transition-opacity duration-300 ${
                                        index === currentSlide
                                            ? 'opacity-100 text-white font-semibold'
                                            : 'opacity-0 group-hover:opacity-70 text-slate-300'
                                    }`}>
                                        {image.title}
                                    </span>
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Decorative blur elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                    </div>
                </section>

                {/* Company Registration Details */}
                <section className="py-24 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    {lang === 'th' ? 'ข้อมูลการจดทะเบียน' : 'Registration Details'}
                                </span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                {lang === 'th'
                                    ? 'รายละเอียดการจดทะเบียนบริษัทอย่างเป็นทางการ'
                                    : 'Official company registration information'
                                }
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {registrationDetails.map((detail, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="relative group"
                                >
                                    <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 h-full">
                                        {/* Icon with gradient background */}
                                        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${detail.gradient} mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                            <div className="text-white">
                                                {detail.icon}
                                            </div>
                                        </div>

                                        <h3 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white">
                                            {detail.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {detail.value}
                                        </p>

                                        {/* Hover glow effect */}
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${detail.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-10 border border-slate-200 dark:border-slate-700 h-full">
                                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 shadow-lg">
                                        <Target className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {companyData.vision.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                        {companyData.vision.content}
                                    </p>

                                    {/* Glow effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-10 border border-slate-200 dark:border-slate-700 h-full">
                                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-lg">
                                        <Award className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        {companyData.mission.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                        {companyData.mission.content}
                                    </p>

                                    {/* Glow effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Company Values */}
                <section className="py-24 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    {lang === 'th' ? 'คุณค่าหลักของเรา' : 'Our Core Values'}
                                </span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                                {lang === 'th'
                                    ? 'หลักการและค่านิยมที่ขับเคลื่อนการทำงานของเราในทุกโปรเจกต์'
                                    : 'Principles and values that drive our work in every project'
                                }
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {companyData.values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="relative group"
                                >
                                    <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 h-full">
                                        <div className="text-blue-600 dark:text-blue-400 mb-4 inline-flex p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 group-hover:scale-110 transition-transform duration-300">
                                            {value.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                                            {value.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {value.description}
                                        </p>

                                        {/* Hover glow */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                {lang === 'th' ? 'พร้อมเริ่มต้นโปรเจกต์ของคุณ?' : 'Ready to Start Your Project?'}
                            </h2>
                            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                                {lang === 'th'
                                    ? 'พร้อมรับฟังและพัฒนาโซลูชันที่เหมาะกับธุรกิจของคุณ'
                                    : 'Ready to listen and develop solutions tailored to your business'
                                }
                            </p>
                            <div className="inline-flex items-center space-x-3 text-lg bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                                <Globe className="h-6 w-6" />
                                <span className="font-medium">uplift.co.th</span>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default CompanyPage;
