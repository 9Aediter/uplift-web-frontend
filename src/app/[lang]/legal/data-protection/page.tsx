import React from "react";
import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/footer/footer";
import { Shield, Lock, Server, FileCheck, AlertTriangle, Users } from 'lucide-react';

const getDataProtectionData = (locale: string) => {
    const isThaiLang = locale === 'th';

    return {
        title: isThaiLang ? 'การคุ้มครองข้อมูล | UPLIFT' : 'Data Protection | UPLIFT',
        description: isThaiLang
            ? 'มาตรการคุ้มครองข้อมูลและความปลอดภัยของบริษัท อัปพลิฟท์ เทคโนโลยี จำกัด'
            : 'Data protection and security measures of UPLIFT TECHNOLOGY CO., LTD.',
        lastUpdated: isThaiLang ? 'ปรับปรุงล่าสุด: 1 กันยายน 2025' : 'Last updated: September 1, 2025',
        intro: isThaiLang
            ? 'เราให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลและความปลอดภัยของข้อมูลอย่างสูงสุด ด้วยมาตรการและเทคโนโลยีที่ทันสมัย'
            : 'We prioritize personal data protection and information security with the highest standards, using modern measures and technology.',
        measures: [
            {
                icon: <Lock className="h-6 w-6" />,
                title: isThaiLang ? 'การเข้ารหัสข้อมูล' : 'Data Encryption',
                description: isThaiLang
                    ? 'ข้อมูลทั้งหมดถูกเข้ารหัสทั้งในการส่งผ่านและการจัดเก็บ ใช้มาตรฐาน AES-256 และ TLS 1.3'
                    : 'All data is encrypted both in transit and at rest, using AES-256 and TLS 1.3 standards',
                details: [
                    isThaiLang ? 'การเข้ารหัสขณะส่งผ่าน (HTTPS/TLS)' : 'Encryption in transit (HTTPS/TLS)',
                    isThaiLang ? 'การเข้ารหัสขณะจัดเก็บ (AES-256)' : 'Encryption at rest (AES-256)',
                    isThaiLang ? 'การจัดการคีย์อย่างปลอดภัย' : 'Secure key management'
                ]
            },
            {
                icon: <Server className="h-6 w-6" />,
                title: isThaiLang ? 'โครงสร้างพื้นฐานที่ปลอดภัย' : 'Secure Infrastructure',
                description: isThaiLang
                    ? 'เซิร์ฟเวอร์และระบบเครือข่ายทั้งหมดได้รับการป้องกันด้วยมาตรการความปลอดภัยระดับองค์กร'
                    : 'All servers and network systems are protected with enterprise-grade security measures',
                details: [
                    isThaiLang ? 'ไฟร์วอลล์และการตรวจจับการบุกรุก' : 'Firewall and intrusion detection',
                    isThaiLang ? 'การสำรองข้อมูลอัตโนมัติ' : 'Automated data backup',
                    isThaiLang ? 'การตรวจสอบและอัปเดตระบบ' : 'Regular system monitoring and updates'
                ]
            },
            {
                icon: <Users className="h-6 w-6" />,
                title: isThaiLang ? 'การควบคุมการเข้าถึง' : 'Access Control',
                description: isThaiLang
                    ? 'มีระบบควบคุมการเข้าถึงข้อมูลอย่างเข้มงวด เฉพาะบุคลากรที่ได้รับอนุญาตเท่านั้น'
                    : 'Strict access control systems ensure only authorized personnel can access data',
                details: [
                    isThaiLang ? 'การยืนยันตัวตนแบบหลายขั้นตอน' : 'Multi-factor authentication',
                    isThaiLang ? 'การกำหนดสิทธิ์ตามหน้าที่' : 'Role-based access control',
                    isThaiLang ? 'การบันทึกการเข้าถึงข้อมูล' : 'Access logging and monitoring'
                ]
            },
            {
                icon: <FileCheck className="h-6 w-6" />,
                title: isThaiLang ? 'การตรวจสอบและควบคุม' : 'Audit and Compliance',
                description: isThaiLang
                    ? 'การตรวจสอบความปลอดภัยเป็นประจำและการปฏิบัติตามกฎหมายคุ้มครองข้อมูล'
                    : 'Regular security audits and compliance with data protection regulations',
                details: [
                    isThaiLang ? 'การตรวจสอบความปลอดภัยรายปี' : 'Annual security assessments',
                    isThaiLang ? 'การปฏิบัติตาม PDPA' : 'PDPA compliance',
                    isThaiLang ? 'การรายงานเหตุการณ์ความปลอดภัย' : 'Security incident reporting'
                ]
            }
        ],
        incident: {
            title: isThaiLang ? 'การจัดการเหตุการณ์' : 'Incident Management',
            description: isThaiLang
                ? 'หากเกิดเหตุการณ์ที่เกี่ยวข้องกับข้อมูลส่วนบุคคล เราจะดำเนินการตามแผนการตอบสนองที่กำหนดไว้และแจ้งให้ผู้เกี่ยวข้องทราบทันที'
                : 'In case of any incident involving personal data, we will follow our established response plan and notify relevant parties immediately'
        }
    };
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dataProtectionData = getDataProtectionData(lang);

    return {
        title: dataProtectionData.title,
        description: dataProtectionData.description,
    };
}

const DataProtectionPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dataProtectionData = getDataProtectionData(lang);

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8">
                            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {lang === 'th' ? 'การคุ้มครองข้อมูล' : 'Data Protection'}
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                            {dataProtectionData.intro}
                        </p>

                        <div className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            {dataProtectionData.lastUpdated}
                        </div>
                    </div>
                </section>

                {/* Security Measures */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {dataProtectionData.measures.map((measure, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg">
                                            <div className="text-blue-600 dark:text-blue-400">
                                                {measure.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                                                {measure.title}
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                                {measure.description}
                                            </p>
                                            <div className="space-y-2">
                                                {measure.details.map((detail, idx) => (
                                                    <div key={idx} className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                                        <span>{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Incident Management */}
                        <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/50 dark:to-orange-950/50 rounded-xl p-8 border border-red-200 dark:border-red-800">
                            <div className="text-center">
                                <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                                    {dataProtectionData.incident.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                                    {dataProtectionData.incident.description}
                                </p>
                            </div>
                        </div>

                        {/* Standards and Certifications */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">
                                    {lang === 'th' ? 'มาตรฐาน ISO' : 'ISO Standards'}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {lang === 'th' ? 'ปฏิบัติตามมาตรฐานสากล' : 'Following international standards'}
                                </p>
                            </div>

                            <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                                    <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">
                                    {lang === 'th' ? 'กฎหมาย PDPA' : 'PDPA Compliance'}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {lang === 'th' ? 'ปฏิบัติตามกฎหมายไทย' : 'Compliant with Thai law'}
                                </p>
                            </div>

                            <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                                    <FileCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">
                                    {lang === 'th' ? 'การตรวจสอบ' : 'Regular Audits'}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {lang === 'th' ? 'ตรวจสอบความปลอดภัยสม่ำเสมอ' : 'Regular security assessments'}
                                </p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="mt-16 text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
                            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                                {lang === 'th' ? 'รายงานเหตุการณ์ความปลอดภัย' : 'Report Security Issues'}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                {lang === 'th'
                                    ? 'หากพบเหตุการณ์ที่อาจส่งผลต่อความปลอดภัยข้อมูล กรุณาติดต่อเราทันที'
                                    : 'If you discover any security issues that may affect data safety, please contact us immediately'
                                }
                            </p>
                            <div className="text-blue-600 dark:text-blue-400 font-medium">
                                security@uplifttechbiz.com
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default DataProtectionPage;