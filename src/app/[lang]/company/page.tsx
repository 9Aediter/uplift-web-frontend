import React from "react";
import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/layout/footer/footer";
import { Calendar, Building2, User, Code, Globe, Shield, Award, Target } from 'lucide-react';

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
                : 'Startup Culture Software House'
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

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const companyData = getCompanyData(lang);

    return {
        title: companyData.title,
        description: companyData.description,
    };
}

const CompanyPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const companyData = getCompanyData(lang);

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
                    <div className="max-w-6xl mx-auto px-4 text-center text-white">
                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                        >
                            {companyData.hero.title}
                        </h1>

                        <p
                            className="text-xl md:text-2xl lg:text-3xl font-medium opacity-90 mb-12"
                        >
                            {companyData.hero.subtitle}
                        </p>
                    </div>
                </section>

                {/* Company Registration Details */}
                <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {lang === 'th' ? 'ข้อมูลการจดทะเบียน' : 'Registration Details'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
                                <Calendar className="h-10 w-10 mb-4 text-blue-600" />
                                <h3 className="font-semibold text-lg mb-2">{lang === 'th' ? 'วันที่จดทะเบียน' : 'Registration Date'}</h3>
                                <p className="text-slate-600 dark:text-slate-300">{companyData.companyInfo.registrationDate}</p>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl p-8 border border-green-200 dark:border-green-800">
                                <Building2 className="h-10 w-10 mb-4 text-green-600" />
                                <h3 className="font-semibold text-lg mb-2">{lang === 'th' ? 'สถานที่ตั้ง' : 'Location'}</h3>
                                <p className="text-slate-600 dark:text-slate-300">{companyData.companyInfo.location}</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-xl p-8 border border-purple-200 dark:border-purple-800">
                                <Code className="h-10 w-10 mb-4 text-purple-600" />
                                <h3 className="font-semibold text-lg mb-2">{lang === 'th' ? 'ทุนจดทะเบียน' : 'Registered Capital'}</h3>
                                <p className="text-slate-600 dark:text-slate-300">{companyData.companyInfo.capital}</p>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-xl p-8 border border-orange-200 dark:border-orange-800">
                                <User className="h-10 w-10 mb-4 text-orange-600" />
                                <h3 className="font-semibold text-lg mb-2">{lang === 'th' ? 'ผู้ก่อตั้ง' : 'Founder'}</h3>
                                <p className="text-slate-600 dark:text-slate-300">{companyData.companyInfo.founder}</p>
                            </div>

                            <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 rounded-xl p-8 border border-teal-200 dark:border-teal-800">
                                <Globe className="h-10 w-10 mb-4 text-teal-600" />
                                <h3 className="font-semibold text-lg mb-2">{lang === 'th' ? 'เว็บไซต์' : 'Website'}</h3>
                                <p className="text-slate-600 dark:text-slate-300">{companyData.companyInfo.website}</p>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 rounded-xl p-8 border border-indigo-200 dark:border-indigo-800">
                                <Shield className="h-10 w-10 mb-4 text-indigo-600" />
                                <h3 className="font-semibold text-lg mb-2">{lang === 'th' ? 'ประเภทธุรกิจ' : 'Business Type'}</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">{companyData.companyInfo.businessType}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700"
                            >
                                <Target className="h-12 w-12 mb-6 text-blue-600" />
                                <h3 className="text-2xl font-bold mb-4 text-blue-600">{companyData.vision.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {companyData.vision.content}
                                </p>
                            </div>

                            <div
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700"
                            >
                                <Award className="h-12 w-12 mb-6 text-purple-600" />
                                <h3 className="text-2xl font-bold mb-4 text-purple-600">{companyData.mission.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {companyData.mission.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company Values */}
                <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {lang === 'th' ? 'คุณค่าหัวใจ' : 'Core Values'}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                                {lang === 'th'
                                    ? 'หลักการและค่านิยมที่ขับเคลื่อนการทำงานของเราในทุกโปรเจกต์'
                                    : 'Principles and values that drive our work in every project'
                                }
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {companyData.values.map((value, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
                                >
                                    <div className="text-blue-600 dark:text-blue-400 mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
                    <div className="max-w-4xl mx-auto px-4 text-center text-white">
                        <div
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                {lang === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                            </h2>
                            <p className="text-xl opacity-90 mb-8">
                                {lang === 'th'
                                    ? 'พร้อมรับฟังและพัฒนาโซลูชันที่เหมาะกับธุรกิจของคุณ'
                                    : 'Ready to listen and develop solutions tailored to your business'
                                }
                            </p>
                            <div className="inline-flex items-center space-x-6 text-lg">
                                <div className="flex items-center space-x-2">
                                    <Globe className="h-6 w-6" />
                                    <span>uplift.co.th</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default CompanyPage;