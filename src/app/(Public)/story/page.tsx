import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Nav from "@/components/nav/resnav";
import AboutSection from "@/components/section/story/me";
import Footer from "@/components/footer/footer";
import { headers } from 'next/headers';
import { Skills } from "@/components/section/story/tech";
import Image from "next/image";
import { FaRocket, FaLightbulb, FaBrain, FaCog, FaAward, FaUsers } from 'react-icons/fa';
import { Building2, Code, Award } from 'lucide-react';
import { personalData } from '@/data/personal-data';
import { getPageSEO, generatePageMetadata } from '@/lib/seo';
import type { Metadata } from "next";

// Import story data
import storyDataTh from '@/data/story/th.json';
import storyDataEn from '@/data/story/en.json';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const locale = headersList.get('x-next-locale') || 'en';
    const seoConfig = await getPageSEO('story');

    if (seoConfig) {
        const seoData = locale === 'th' ? seoConfig.th : seoConfig.en;
        const pagePath = locale === 'en' ? '/story' : '/th/story';
        return generatePageMetadata(seoData, locale, 'https://uplifttech.store', pagePath);
    }

    // Fallback metadata
    return {
        title: locale === 'th' ? 'เรื่องราวของเรา | UPLIFT TECHNOLOGY' : 'Our Story | UPLIFT TECHNOLOGY',
        description: locale === 'th'
            ? 'ค้นพบการเดินทางของ UPLIFT Technology Co., Ltd.'
            : 'Discover the journey of UPLIFT Technology Co., Ltd.'
    };
}

// Helper function to get story data based on locale
const getStoryData = (locale: string) => {
    const data = locale === 'th' ? storyDataTh : storyDataEn;

    // Update founder image with personalData if available
    const updatedFounders = data.founders.map((founder: any) => {
        if (founder.id === 1 && personalData?.profile) {
            return { ...founder, image: personalData.profile };
        }
        return founder;
    });

    return {
        ...data,
        founders: updatedFounders
    };
};

const StoryPage = async () => {
    const headersList = await headers();
    const locale = headersList.get('x-next-locale') || 'en';
    const storyData = getStoryData(locale);

    const data = storyData.timeline.map((item: any) => ({
        title: item.title,
        content: (
            <div>
                {/* Period Badge */}
                <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                    {item.period}
                </div>

                {/* Highlight */}
                <h3 className="text-lg font-bold text-foreground mb-3 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                    {item.highlight}
                </h3>

                {/* Description */}
                <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base dark:text-neutral-200 leading-relaxed">
                    {item.content}
                </p>

                {/* Image Section */}
                {item.image && (
                    <div className="mb-6">
                        <Image
                            src={item.image}
                            alt={item.imageAlt || `${item.title} image`}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300"
                        />
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                    {item.stats?.map((stat: any, index: number) => (
                        <div key={index} className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-center mb-2 text-blue-600 dark:text-blue-400">
                                {stat.icon === 'FaAward' && <FaAward className="w-4 h-4" />}
                                {stat.icon === 'FaBrain' && <FaBrain className="w-4 h-4" />}
                                {stat.icon === 'FaUsers' && <FaUsers className="w-4 h-4" />}
                                {stat.icon === 'FaCog' && <FaCog className="w-4 h-4" />}
                                {stat.icon === 'FaRocket' && <FaRocket className="w-4 h-4" />}
                                {stat.icon === 'FaLightbulb' && <FaLightbulb className="w-4 h-4" />}
                            </div>
                            <div className="text-lg font-bold text-foreground">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    }));

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-x-hidden">


                <Timeline data={data} />


                {/* Company Documents Section */}
                <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {locale === 'th' ? 'เอกสารประกอบการจดทะเบียนบริษัท' : 'Company Registration Documents'}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                                {locale === 'th'
                                    ? 'เอกสารและใบรับรองการจดทะเบียนอย่างเป็นทางการของบริษัท อัปพลิฟท์ เทคโนโลยี จำกัด'
                                    : 'Official registration documents and certifications of UPLIFT TECHNOLOGY CO., LTD.'
                                }
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Company Registration Certificate */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors group cursor-pointer">
                                <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <Building2 className="h-16 w-16 text-slate-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                                        <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">
                                            {locale === 'th' ? 'หนังสือรับรองบริษัท' : 'Company Certificate'}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {locale === 'th' ? 'ใบรับรองการจดทะเบียน' : 'Registration Certificate'}
                                        </p>
                                        <div className="mt-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs text-blue-600 dark:text-blue-400">
                                            {locale === 'th' ? 'พร้อมแสดง' : 'Available'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business License */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-green-400 dark:hover:border-green-500 transition-colors group cursor-pointer">
                                <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <Award className="h-16 w-16 text-slate-400 group-hover:text-green-500 mx-auto mb-4 transition-colors" />
                                        <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">
                                            {locale === 'th' ? 'ใบอนุญาตประกอบธุรกิจ' : 'Business License'}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {locale === 'th' ? 'ใบอนุญาตดำเนินกิจการ' : 'Operating License'}
                                        </p>
                                        <div className="mt-4 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-xs text-green-600 dark:text-green-400">
                                            {locale === 'th' ? 'พร้อมแสดง' : 'Available'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* VAT Registration */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 transition-colors group cursor-pointer">
                                <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <Code className="h-16 w-16 text-slate-400 group-hover:text-purple-500 mx-auto mb-4 transition-colors" />
                                        <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">
                                            {locale === 'th' ? 'ใบทะเบียนภาษี' : 'VAT Registration'}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {locale === 'th' ? 'ใบรับรองการจดทะเบียนภาษี' : 'Tax Registration Certificate'}
                                        </p>
                                        <div className="mt-4 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-xs text-purple-600 dark:text-purple-400">
                                            {locale === 'th' ? 'พร้อมแสดง' : 'Available'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {locale === 'th'
                                    ? 'ดูเอกสารฉบับเต็มได้ตามคำขอ - ติดต่อ uplifttechbiz@gmail.com'
                                    : 'Full documents available upon request - Contact uplifttechbiz@gmail.com'
                                }
                            </p>
                        </div>
                    </div>
                </section>

                <AboutSection founders={storyData.founders} />
                <Skills />

            </main>
            <Footer />
        </>
    );
};

export default StoryPage;