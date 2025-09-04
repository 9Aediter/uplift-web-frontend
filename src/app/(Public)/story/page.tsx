import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Nav from "@/components/nav/resnav";
import AboutSection from "@/components/section/story/me";
import Footer from "@/components/footer/footer";
import StoryHero from "@/components/section/story/hero";
import { headers } from 'next/headers';
import { Skills } from "@/components/section/story/tech";
import Image from "next/image";
import { FaRocket, FaLightbulb, FaBrain, FaCog, FaAward, FaUsers } from 'react-icons/fa';
import { Building2, Code, Award } from 'lucide-react';
import { personalData } from '@/data/personal-data';
import { getPageSEO, generatePageMetadata } from '@/lib/seo';
import type { Metadata } from "next";

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

// Company data for story content
const getStoryData = (locale: string) => {
    const isThaiLang = locale === 'th';
    
    return {
        hero: {
            title: isThaiLang 
                ? 'UPLIFT TECHNOLOGY'
                : 'UPLIFT TECHNOLOGY',
            subtitle: isThaiLang
                ? 'Transforming Ideas into Revolutionary Solutions'
                : 'Transforming Ideas into Revolutionary Solutions',
            description: isThaiLang
                ? 'Software House สาย Startup Culture ที่เข้าใจธุรกิจเชิงลึก พร้อมผสานประสบการณ์จริงจากโปรเจกต์ ERP, WMS, POS และระบบ Custom SaaS'
                : 'A startup-culture software house with deep business understanding, combining real experience from ERP, WMS, POS, and Custom SaaS projects.'
        },
        companyInfo: {
            registrationDate: isThaiLang ? '25 สิงหาคม 2568' : 'August 25, 2568',
            location: isThaiLang ? 'จังหวัดชลบุรี' : 'Chonburi Province',
            capital: isThaiLang ? '1,000,000 บาท' : '1,000,000 THB',
            founder: isThaiLang ? 'คุณอานนท์ สุพัฒน์ผล' : 'Anon Suphatphon'
        },
        founders: [
            {
                id: 1,
                name: isThaiLang ? 'อานนท์ สุพัฒน์ผล' : 'Anon Suphatphon',
                title: isThaiLang 
                    ? 'ผู้ก่อตั้งและผู้ถือหุ้นใหญ่'
                    : 'Founder & Major Shareholder',
                role: isThaiLang 
                    ? 'หัวหน้าวิศวกรและกลยุทธ์ธุรกิจ'
                    : 'Chief Technology & Strategy Officer',
                description: isThaiLang
                    ? 'วิศวกรและนักธุรกิจรุ่นใหม่ที่เติบโตจากการทำงานฟรีแลนซ์รับงานระบบ ERP, POS และ Booking Platform จนขยายเป็นบริษัทเต็มรูปแบบ มีประสบการณ์ในการออกแบบระบบสำหรับธุรกิจหลากหลายประเภท'
                    : 'A young engineer and entrepreneur who grew from freelancing on ERP, POS, and Booking Platform projects to establishing a full-scale company. Experienced in designing systems for various business types.',
                expertise: isThaiLang 
                    ? ['System Architecture', 'Full-Stack Development', 'Business Analysis', 'Project Management']
                    : ['System Architecture', 'Full-Stack Development', 'Business Analysis', 'Project Management'],
                vision: isThaiLang
                    ? 'จุดเริ่มต้นของ Uplift เกิดจากการที่ผู้ก่อตั้ง ต้องการสร้าง Software House ที่ไม่ใช่แค่ทำตามสเปก แต่เข้าใจธุรกิจจริง และสามารถช่วยลูกค้าออกแบบ Solution ที่ยกระดับธุรกิจได้จริง'
                    : 'Uplift\'s origin stems from the founder\'s desire to create a Software House that doesn\'t just follow specs, but truly understands business and helps clients design solutions that genuinely elevate their operations.',
                image: personalData?.profile || '/images/team/founder-1.jpg'
            },
            {
                id: 2,
                name: isThaiLang ? 'สมชาย เทคโนโลยี' : 'Somchai Technology',
                title: isThaiLang 
                    ? 'ผู้ร่วมก่อตั้งและหัวหน้าเทคนิค'
                    : 'Co-Founder & Head of Engineering',
                role: isThaiLang 
                    ? 'หัวหน้าพัฒนาระบบและ DevOps'
                    : 'Lead Developer & DevOps Engineer',
                description: isThaiLang
                    ? 'ผู้เชี่ยวชาญด้านการพัฒนาระบบและ Cloud Infrastructure ด้วยประสบการณ์กว่า 5 ปีในการสร้างระบบขนาดใหญ่ เชี่ยวชาญเรื่อง Microservices, Kubernetes และ CI/CD Pipeline'
                    : 'System development and Cloud Infrastructure expert with over 5 years of experience building large-scale systems. Specializes in Microservices, Kubernetes, and CI/CD Pipeline.',
                expertise: isThaiLang 
                    ? ['Cloud Architecture', 'DevOps Engineering', 'Microservices', 'Database Design']
                    : ['Cloud Architecture', 'DevOps Engineering', 'Microservices', 'Database Design'],
                vision: isThaiLang
                    ? 'เชื่อว่าเทคโนโลยีที่ดีต้องมาพร้อมกับความเสถียรและความปลอดภัย การสร้างระบบที่ scale ได้และ maintainable คือกุญแจสำคัญในการสร้างธุรกิจที่ยั่งยืน'
                    : 'Believes that great technology must come with stability and security. Building scalable and maintainable systems is the key to creating sustainable businesses.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format'
            }
        ],
        timeline: [
            {
                title: '2568 (2025)',
                period: isThaiLang ? 'ปัจจุบัน' : 'Present',
                content: isThaiLang
                    ? 'จดทะเบียนบริษัท อัปพลิฟท์ เทคโนโลยี จำกัด อย่างเป็นทางการ ด้วยทุนจดทะเบียน 1 ล้านบาท ตั้งอยู่ที่จังหวัดชลบุรี ขยายบริการไปสู่ AI-powered solutions, Cloud Infrastructure และ Advanced Analytics เปิดตัว Custom ERP Platform ที่รองรับ Multi-tenant และ Multi-language พร้อมระบบ Security ระดับองค์กร'
                    : 'Officially incorporated UPLIFT TECHNOLOGY CO., LTD. with registered capital of 1 million THB located in Chonburi Province. Expanded services to AI-powered solutions, Cloud Infrastructure, and Advanced Analytics. Launched Custom ERP Platform supporting Multi-tenant and Multi-language with enterprise-grade security.',
                highlight: isThaiLang 
                    ? 'บริษัทที่จดทะเบียนอย่างถูกต้อง'
                    : 'Officially Registered Company',
                image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/general/cb9ec9f5-7a66-406a-a0ca-a3c264b02b65.png',
                imageAlt: isThaiLang ? 'ป้ายบริษัท UPLIFT TECHNOLOGY' : 'UPLIFT TECHNOLOGY Company Sign',
                stats: [
                    { value: '1M', label: isThaiLang ? 'ทุนจดทะเบียน' : 'Registered Capital', icon: <FaAward className="w-4 h-4" /> },
                    { value: 'AI', label: isThaiLang ? 'โซลูชัน' : 'Solutions', icon: <FaBrain className="w-4 h-4" /> },
                    { value: '50+', label: isThaiLang ? 'ลูกค้า' : 'Clients', icon: <FaUsers className="w-4 h-4" /> }
                ]
            },
            {
                title: '2567 (2024)',
                period: isThaiLang ? 'ขยายตัว' : 'Expansion',
                content: isThaiLang
                    ? 'ปีแห่งการขยายตัวครั้งใหญ่ พัฒนาระบบ Laundry & Logistics Tracking ด้วย RFID, Barcode และ IoT Integration ที่ใช้งานจริงในเครือข่ายร้านซักรีดทั่วประเทศกว่า 100+ สาขา สร้างระบบ WMS (Warehouse Management) สำหรับโรงงานและคลังสินค้าขนาดใหญ่ รวมถึง Transport Management System ที่เชื่อมต่อกับระบบ Automation และ GPS Tracking'
                    : 'The year of major expansion. Developed comprehensive Laundry & Logistics Tracking systems with RFID, Barcode, and IoT Integration deployed across 100+ laundry branches nationwide. Built advanced WMS (Warehouse Management) for large-scale factories and warehouses, including Transport Management System integrated with Automation and GPS Tracking.',
                highlight: isThaiLang 
                    ? 'IoT & Automation Integration'
                    : 'IoT & Automation Integration',
                image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755080060582-s7qvzu2t2rh-view-laundromat-room-with-washing-machines.jpg',
                imageAlt: isThaiLang ? 'ระบบ Laundry Management' : 'Laundry Management System',
                stats: [
                    { value: '100+', label: isThaiLang ? 'สาขาซักรีด' : 'Laundry Branches', icon: <FaCog className="w-4 h-4" /> },
                    { value: 'IoT', label: isThaiLang ? 'ระบบติดตาม' : 'Tracking Systems', icon: <FaBrain className="w-4 h-4" /> },
                    { value: 'RFID', label: isThaiLang ? 'เทคโนโลยี' : 'Technology', icon: <FaCog className="w-4 h-4" /> }
                ]
            },
            {
                title: '2566 (2023)',
                period: isThaiLang ? 'ผู้นำ SME' : 'SME Leader',
                content: isThaiLang
                    ? 'ปีที่กลายเป็นผู้ให้บริการโซลูชันหลักสำหรับ SME ในประเทศไทย พัฒนาระบบ POS ที่เป็นเอกลักษณ์ รองรับการขายหน้าร้านและออนไลน์พร้อมกัน สร้างระบบ Gym Management ที่ครบวงจรสำหรับศูนย์ออกกำลังกาย รวมถึง Hotel Booking System ระดับ 5 ดาวด้วย Dynamic Pricing Engine ที่เพิ่ม RevPAR ได้จริง'
                    : 'The year we became the leading solution provider for SMEs in Thailand. Developed our signature POS system supporting both in-store and online sales simultaneously. Created comprehensive Gym Management system for fitness centers, including 5-star Hotel Booking System with Dynamic Pricing Engine that actually increases RevPAR.',
                highlight: isThaiLang 
                    ? 'ผู้นำโซลูชัน SME ในประเทศไทย'
                    : 'Thailand\'s Leading SME Solution Provider',
                image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081413583-r9a2lsfqpts-cashier-seller-operating-payment-process-with-pos-terminal-credit-card-cropped-shot-closeup-hands-shopping-purchase-concept.jpg',
                imageAlt: isThaiLang ? 'ระบบ POS และการชำระเงิน' : 'POS System and Payment Processing',
                stats: [
                    { value: 'POS', label: isThaiLang ? 'ระบบขาย' : 'Sales System', icon: <FaCog className="w-4 h-4" /> },
                    { value: '5★', label: isThaiLang ? 'โรงแรม' : 'Hotels', icon: <FaAward className="w-4 h-4" /> },
                    { value: 'SME', label: isThaiLang ? 'ผู้นำ' : 'Leader', icon: <FaUsers className="w-4 h-4" /> }
                ]
            },
            {
                title: '2565 (2022)',
                period: isThaiLang ? 'การก่อตั้ง' : 'Foundation',
                content: isThaiLang
                    ? 'จุดเริ่มต้นของความฝัน คุณอานนท์ สุพัฒน์ผล วิศวกรและนักธุรกิจรุ่นใหม่ เริ่มต้น UPLIFT จากการทำงานฟรีแลนซ์พัฒนาระบบ ERP, POS และ Booking Platform ด้วยวิสัยทัศน์ที่แตกต่าง: สร้าง Software House ที่ไม่ใช่แค่ทำตามสเปก แต่เข้าใจธุรกิจเชิงลึก และช่วยลูกค้าออกแบบ Solution ที่ยกระดับธุรกิจได้จริง'
                    : 'The beginning of a dream. Anon Suphatphon, a young engineer and entrepreneur, founded UPLIFT from freelance work developing ERP, POS, and Booking Platform systems with a different vision: to create a Software House that doesn\'t just follow specs, but deeply understands business and helps clients design solutions that genuinely elevate their operations.',
                highlight: isThaiLang 
                    ? 'จุดเริ่มต้นจากวิสัยทัศน์ที่แตกต่าง'
                    : 'Born from a Different Vision',
                image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format',
                imageAlt: isThaiLang ? 'การเริ่มต้นธุรกิจเทคโนโลยี' : 'Technology Business Foundation',
                stats: [
                    { value: 'START', label: isThaiLang ? 'เริ่มต้น' : 'Founded', icon: <FaRocket className="w-4 h-4" /> },
                    { value: 'ERP', label: isThaiLang ? 'ระบบแรก' : 'First System', icon: <FaCog className="w-4 h-4" /> },
                    { value: 'VISION', label: isThaiLang ? 'วิสัยทัศน์' : 'Vision', icon: <FaLightbulb className="w-4 h-4" /> }
                ]
            }
        ]
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
                    {item.stats.map((stat: any, index: number) => (
                        <div key={index} className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-center mb-2 text-blue-600 dark:text-blue-400">
                                {stat.icon}
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
                <StoryHero 
                    title={storyData.hero.title}
                    subtitle={storyData.hero.subtitle}
                />
                <div id="story-content">
                    <Timeline data={data} />
                </div>
                
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
