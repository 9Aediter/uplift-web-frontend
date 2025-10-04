import React from "react";
import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/layout/footer/footer";
import { Shield, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const getTermsData = (locale: string) => {
    const isThaiLang = locale === 'th';

    return {
        title: isThaiLang ? 'ข้อกำหนดการใช้บริการ | UPLIFT' : 'Terms of Service | UPLIFT',
        description: isThaiLang
            ? 'ข้อกำหนดและเงื่อนไขการใช้บริการของบริษัท อัปพลิฟท์ เทคโนโลยี จำกัด'
            : 'Terms and conditions for using UPLIFT TECHNOLOGY CO., LTD. services',
        lastUpdated: isThaiLang ? 'ปรับปรุงล่าสุด: 1 กันยายน 2025' : 'Last updated: September 1, 2025',
        sections: [
            {
                title: isThaiLang ? '1. การยอมรับข้อกำหนด' : '1. Acceptance of Terms',
                content: isThaiLang
                    ? 'การใช้บริการของเราถือว่าคุณยอมรับข้อกำหนดและเงื่อนไขทั้งหมดนี้ หากคุณไม่ยอมรับข้อกำหนดใดๆ กรุณาหยุดการใช้บริการทันที'
                    : 'By using our services, you agree to be bound by these terms and conditions. If you do not agree to any of these terms, please discontinue use of our services immediately.'
            },
            {
                title: isThaiLang ? '2. บริการที่เราให้' : '2. Our Services',
                content: isThaiLang
                    ? 'บริษัท อัปพลิฟท์ เทคโนโลยี จำกัด ให้บริการพัฒนาซอฟต์แวร์ ระบบ ERP, POS, และโซลูชันเทคโนโลยีสารสนเทศต่างๆ เราสงวนสิทธิ์ในการปรับปรุงหรือเปลี่ยนแปลงบริการได้ตลอดเวลา'
                    : 'UPLIFT TECHNOLOGY CO., LTD. provides software development services, ERP systems, POS solutions, and various IT technology solutions. We reserve the right to modify or change our services at any time.'
            },
            {
                title: isThaiLang ? '3. ข้อมูลและความเป็นส่วนตัว' : '3. Data and Privacy',
                content: isThaiLang
                    ? 'เราให้ความสำคัญกับความเป็นส่วนตัวของข้อมูลลูกค้า ข้อมูลที่คุณให้เราจะถูกใช้เพื่อการให้บริการและพัฒนาผลิตภัณฑ์ เราจะไม่เปิดเผยข้อมูลให้บุคคลที่สามโดยไม่ได้รับความยินยอมจากคุณ'
                    : 'We value customer data privacy. Information you provide will be used for service delivery and product development. We will not disclose information to third parties without your consent.'
            },
            {
                title: isThaiLang ? '4. ทรัพย์สินทางปัญญา' : '4. Intellectual Property',
                content: isThaiLang
                    ? 'ซอฟต์แวร์ เอกสาร และเนื้อหาทั้งหมดที่เราสร้างขึ้นเป็นทรัพย์สินทางปัญญาของบริษัท ลูกค้าจะได้รับสิทธิ์ในการใช้งานตามที่กำหนดในสัญญา แต่ไม่มีสิทธิ์ในการคัดลอก แจกจ่าย หรือดัดแปลงโดยไม่ได้รับอนุญาต'
                    : 'All software, documentation, and content we create are our intellectual property. Customers receive usage rights as defined in contracts, but do not have rights to copy, distribute, or modify without permission.'
            },
            {
                title: isThaiLang ? '5. ขีดจำกัดความรับผิดชอบ' : '5. Limitation of Liability',
                content: isThaiLang
                    ? 'บริษัทจะไม่รับผิดชอบต่อความเสียหายทางอ้อม ความสูญเสียทางธุรกิจ หรือความเสียหายใดๆ ที่เกิดจากการใช้บริการของเรา เว้นแต่เป็นความเสียหายที่เกิดจากความประมาทเลินเล่ออย่างร้ายแรงของบริษัท'
                    : 'The company shall not be liable for indirect damages, business losses, or any damages arising from use of our services, except for damages caused by gross negligence of the company.'
            },
            {
                title: isThaiLang ? '6. การยกเลิกบริการ' : '6. Service Termination',
                content: isThaiLang
                    ? 'ลูกค้าสามารถยกเลิกบริการได้ตามเงื่อนไขที่กำหนดในสัญญา บริษัทสงวนสิทธิ์ในการยกเลิกบริการหากลูกค้าผิดสัญญาหรือใช้บริการในทางที่ไม่เหมาะสม'
                    : 'Customers may cancel services according to contract terms. The company reserves the right to terminate services if customers breach contracts or misuse services.'
            },
            {
                title: isThaiLang ? '7. กฎหมายที่ใช้บังคับ' : '7. Governing Law',
                content: isThaiLang
                    ? 'ข้อกำหนดนี้อยู่ภายใต้กฎหมายไทย หากมีข้อพิพาทใดๆ จะระงับข้อพิพาทโดยการเจรจาเป็นลำดับแรก หากไม่สามารถระงับได้จะดำเนินการตามกระบวนการทางกฎหมายไทย'
                    : 'These terms are governed by Thai law. Any disputes will first be resolved through negotiation. If unresolvable, they will proceed through Thai legal processes.'
            }
        ]
    };
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const termsData = getTermsData(lang);

    return {
        title: termsData.title,
        description: termsData.description,
    };
}

const TermsPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const termsData = getTermsData(lang);

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8">
                            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {lang === 'th' ? 'ข้อกำหนดการใช้บริการ' : 'Terms of Service'}
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                            {lang === 'th'
                                ? 'ข้อกำหนดและเงื่อนไขการใช้บริการของ UPLIFT TECHNOLOGY CO., LTD.'
                                : 'Terms and conditions for using UPLIFT TECHNOLOGY CO., LTD. services'
                            }
                        </p>

                        <div className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {termsData.lastUpdated}
                        </div>
                    </div>
                </section>

                {/* Terms Content */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="space-y-12">
                            {termsData.sections.map((section, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mt-1" />
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
                        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
                            <div className="text-center">
                                <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                                    {lang === 'th' ? 'มีคำถามเกี่ยวกับข้อกำหนด?' : 'Questions About Terms?'}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    {lang === 'th'
                                        ? 'หากมีข้อสงสัยหรือต้องการคำอธิบายเพิ่มเติมเกี่ยวกับข้อกำหนดการใช้บริการ'
                                        : 'If you have questions or need clarification about our terms of service'
                                    }
                                </p>
                                <div className="text-blue-600 dark:text-blue-400 font-medium">
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

export default TermsPage;