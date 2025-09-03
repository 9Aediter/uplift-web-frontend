import React from "react";
import Nav from "@/components/nav/resnav";
import Footer from "@/components/footer/footer";
import { headers } from 'next/headers';
import { Cookie, Settings, BarChart3, Shield, Info } from 'lucide-react';

const getCookiesData = (locale: string) => {
    const isThaiLang = locale === 'th';
    
    return {
        title: isThaiLang ? 'นโยบายคุกกี้ | UPLIFT' : 'Cookie Policy | UPLIFT',
        description: isThaiLang 
            ? 'นโยบายการใช้คุกกี้ของบริษัท อัปพลิฟท์ เทคโนโลยี จำกัด'
            : 'Cookie policy of UPLIFT TECHNOLOGY CO., LTD.',
        lastUpdated: isThaiLang ? 'ปรับปรุงล่าสุด: 1 กันยายน 2025' : 'Last updated: September 1, 2025',
        intro: isThaiLang
            ? 'คุกกี้เป็นไฟล์ข้อมูลขนาดเล็กที่เว็บไซต์เก็บไว้ในอุปกรณ์ของคุณ เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานและให้บริการที่ดีที่สุด'
            : 'Cookies are small data files that websites store on your device. We use cookies to improve your user experience and provide the best service.',
        sections: [
            {
                icon: <Cookie className="h-6 w-6" />,
                title: isThaiLang ? 'คุกกี้ที่จำเป็น' : 'Essential Cookies',
                description: isThaiLang
                    ? 'คุกกี้เหล่านี้จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดได้'
                    : 'These cookies are essential for basic website functionality and cannot be disabled',
                examples: [
                    isThaiLang ? 'การจดจำการเข้าสู่ระบบ' : 'Login session management',
                    isThaiLang ? 'การรักษาความปลอดภัย' : 'Security measures',
                    isThaiLang ? 'การจดจำตะกร้าสินค้า' : 'Shopping cart memory'
                ]
            },
            {
                icon: <BarChart3 className="h-6 w-6" />,
                title: isThaiLang ? 'คุกกี้วิเคราะห์' : 'Analytics Cookies',
                description: isThaiLang
                    ? 'ช่วยให้เราเข้าใจการใช้งานเว็บไซต์เพื่อปรับปรุงประสบการณ์'
                    : 'Help us understand website usage to improve user experience',
                examples: [
                    isThaiLang ? 'จำนวนผู้เยี่ยมชม' : 'Visitor count',
                    isThaiLang ? 'หน้าที่ได้รับความนิยม' : 'Popular pages',
                    isThaiLang ? 'ระยะเวลาการใช้งาน' : 'Session duration'
                ]
            },
            {
                icon: <Settings className="h-6 w-6" />,
                title: isThaiLang ? 'คุกกี้การตั้งค่า' : 'Preference Cookies',
                description: isThaiLang
                    ? 'จดจำการตั้งค่าและความชอบของคุณ'
                    : 'Remember your settings and preferences',
                examples: [
                    isThaiLang ? 'ภาษาที่เลือก' : 'Language selection',
                    isThaiLang ? 'โหมดสีเข้ม/สว่าง' : 'Dark/Light mode',
                    isThaiLang ? 'การตั้งค่าการแสดงผล' : 'Display preferences'
                ]
            }
        ],
        control: {
            title: isThaiLang ? 'การควบคุมคุกกี้' : 'Cookie Control',
            content: isThaiLang
                ? 'คุณสามารถควบคุมและจัดการคุกกี้ได้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ อย่างไรก็ตาม การปิดคุกกี้บางประเภทอาจส่งผลต่อการทำงานของเว็บไซต์'
                : 'You can control and manage cookies through your browser settings. However, disabling certain cookies may affect website functionality.'
        }
    };
};

export async function generateMetadata() {
    const headersList = await headers();
    const locale = headersList.get('x-next-locale') || 'en';
    const cookiesData = getCookiesData(locale);

    return {
        title: cookiesData.title,
        description: cookiesData.description,
    };
}

const CookiesPage = async () => {
    const headersList = await headers();
    const locale = headersList.get('x-next-locale') || 'en';
    const cookiesData = getCookiesData(locale);

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-8">
                            <Cookie className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {locale === 'th' ? 'นโยบายคุกกี้' : 'Cookie Policy'}
                        </h1>
                        
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                            {cookiesData.intro}
                        </p>
                        
                        <div className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <Info className="h-4 w-4 mr-2" />
                            {cookiesData.lastUpdated}
                        </div>
                    </div>
                </section>

                {/* Cookie Types */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="space-y-8">
                            {cookiesData.sections.map((section, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg">
                                            <div className="text-orange-600 dark:text-orange-400">
                                                {section.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                                                {section.title}
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                                {section.description}
                                            </p>
                                            <div className="space-y-2">
                                                {section.examples.map((example, idx) => (
                                                    <div key={idx} className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                                                        <span>{example}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cookie Control */}
                        <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 rounded-xl p-8 border border-orange-200 dark:border-orange-800">
                            <div className="text-center">
                                <Settings className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                                    {cookiesData.control.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {cookiesData.control.content}
                                </p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="mt-8 text-center p-6 bg-white/50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-slate-600 dark:text-slate-300 mb-2">
                                {locale === 'th' 
                                    ? 'มีคำถามเกี่ยวกับการใช้คุกกี้?'
                                    : 'Questions about our use of cookies?'
                                }
                            </p>
                            <div className="text-orange-600 dark:text-orange-400 font-medium">
                                uplifttechbiz@gmail.com
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default CookiesPage;