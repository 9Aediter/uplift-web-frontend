import React from "react";
import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/footer/footer";
import { Shield, Eye, Lock, UserCheck, Database, FileText } from 'lucide-react';

const getPrivacyData = (locale: string) => {
    const isThaiLang = locale === 'th';

    return {
        title: isThaiLang ? 'นโยบายความเป็นส่วนตัว | UPLIFT' : 'Privacy Policy | UPLIFT',
        description: isThaiLang
            ? 'นโยบายการคุ้มครองข้อมูลส่วนบุคคลของบริษัท อัปพลิฟท์ เทคโนโลยี จำกัด'
            : 'Personal data protection policy of UPLIFT TECHNOLOGY CO., LTD.',
        lastUpdated: isThaiLang ? 'ปรับปรุงล่าสุด: 1 กันยายน 2025' : 'Last updated: September 1, 2025',
        sections: [
            {
                icon: <FileText className="h-6 w-6" />,
                title: isThaiLang ? 'ข้อมูลที่เราเก็บรวบรวม' : 'Information We Collect',
                content: isThaiLang
                    ? 'เราเก็บรวบรวมข้อมูลที่คุณให้โดยตรง เช่น ชื่อ อีเมล หมายเลขโทรศัพท์ รวมถึงข้อมูลการใช้งานเว็บไซต์ เพื่อให้บริการที่ดีที่สุดแก่คุณ'
                    : 'We collect information you provide directly, such as name, email, phone number, as well as website usage data to provide you with the best service.'
            },
            {
                icon: <Eye className="h-6 w-6" />,
                title: isThaiLang ? 'วิธีการใช้ข้อมูล' : 'How We Use Information',
                content: isThaiLang
                    ? 'ข้อมูลของคุณจะถูกใช้เพื่อการให้บริการ ติดต่อสื่อสาร ปรับปรุงผลิตภัณฑ์ และส่งข้อมูลที่เกี่ยวข้องกับบริการของเรา เราไม่ขายหรือเช่าข้อมูลของคุณให้บุคคลที่สาม'
                    : 'Your information is used for service delivery, communication, product improvement, and sending relevant service information. We do not sell or rent your information to third parties.'
            },
            {
                icon: <Lock className="h-6 w-6" />,
                title: isThaiLang ? 'การรักษาความปลอดภัย' : 'Security Measures',
                content: isThaiLang
                    ? 'เราใช้มาตรการความปลอดภัยทางเทคนิคและองค์กรที่เหมาะสม เช่น การเข้ารหัสข้อมูล การควบคุมการเข้าถึง และการสำรองข้อมูล เพื่อปกป้องข้อมูลส่วนบุคคลของคุณ'
                    : 'We implement appropriate technical and organizational security measures, such as data encryption, access control, and data backup, to protect your personal information.'
            },
            {
                icon: <UserCheck className="h-6 w-6" />,
                title: isThaiLang ? 'สิทธิของคุณ' : 'Your Rights',
                content: isThaiLang
                    ? 'คุณมีสิทธิ์ในการเข้าถึง แก้ไข ลบ หรือจำกัดการใช้งานข้อมูลส่วนบุคคลของคุณ รวมถึงสิทธิ์ในการโอนย้ายข้อมูล หากต้องการใช้สิทธิ์ใดๆ กรุณาติดต่อเรา'
                    : 'You have the right to access, correct, delete, or restrict the use of your personal data, including the right to data portability. Please contact us to exercise any of these rights.'
            },
            {
                icon: <Database className="h-6 w-6" />,
                title: isThaiLang ? 'การเก็บข้อมูล' : 'Data Retention',
                content: isThaiLang
                    ? 'เราจะเก็บข้อมูลส่วนบุคคลของคุณไว้เท่าที่จำเป็นเพื่อให้บริการ หรือตามที่กฎหมายกำหนด เมื่อหมดความจำเป็น เราจะลบหรือทำลายข้อมูลอย่างปลอดภัย'
                    : 'We retain your personal data only as long as necessary for service provision or as required by law. When no longer needed, we securely delete or destroy the data.'
            },
            {
                icon: <Shield className="h-6 w-6" />,
                title: isThaiLang ? 'การแก้ไขนโยบาย' : 'Policy Updates',
                content: isThaiLang
                    ? 'เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว การเปลี่ยนแปลงที่สำคัญเราจะแจ้งให้คุณทราบล่วงหน้าผ่านอีเมลหรือประกาศบนเว็บไซต์'
                    : 'We may update this privacy policy periodically. For significant changes, we will notify you in advance via email or website announcement.'
            }
        ]
    };
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const privacyData = getPrivacyData(lang);

    return {
        title: privacyData.title,
        description: privacyData.description,
    };
}

const PrivacyPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const privacyData = getPrivacyData(lang);

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-8">
                            <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            {lang === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                            {lang === 'th'
                                ? 'เราให้ความสำคัญกับความเป็นส่วนตัวและการคุ้มครองข้อมูลของคุณ'
                                : 'We value your privacy and are committed to protecting your personal data'
                            }
                        </p>

                        <div className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <Lock className="h-4 w-4 mr-2" />
                            {privacyData.lastUpdated}
                        </div>
                    </div>
                </section>

                {/* Privacy Content */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="space-y-8">
                            {privacyData.sections.map((section, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg">
                                            <div className="text-green-600 dark:text-green-400">
                                                {section.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                                                {section.title}
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Information */}
                        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 rounded-xl p-8 border border-green-200 dark:border-green-800">
                            <div className="text-center">
                                <UserCheck className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                                    {lang === 'th' ? 'ใช้สิทธิ์ของคุณ' : 'Exercise Your Rights'}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    {lang === 'th'
                                        ? 'หากต้องการใช้สิทธิ์เกี่ยวกับข้อมูลส่วนบุคคลหรือมีข้อสงสัยใดๆ'
                                        : 'To exercise your privacy rights or if you have any questions'
                                    }
                                </p>
                                <div className="text-green-600 dark:text-green-400 font-medium">
                                    uplifttechbiz@gmail.com
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

export default PrivacyPage;