import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Nav from "@/components/nav/resnav";
import Me from "@/components/section/story/me";
import Footer from "@/components/footer/footer";
import StoryHero from "@/components/section/story/hero";
import { headers } from 'next/headers';
import { Skills } from "@/components/section/story/tech"

// Mock data for story content
const getStoryData = (locale: string) => {
    const isThaiLang = locale === 'th';
    
    return {
        title: isThaiLang ? 'เรื่องราวของเรา | UPLIFT' : 'Our Story | UPLIFT',
        description: isThaiLang 
            ? 'ค้นพบการเดินทางของ UPLIFT - จากวิสัยทัศน์ในการเปลี่ยนธุรกิจด้วยเทคโนโลยี สู่การเป็นบริษัทพัฒนาซอฟต์แวร์ตั้งโครงชั้นนำของประเทศไทย'
            : 'Discover the journey of UPLIFT - from a vision to transform businesses through technology to becoming Thailand\'s premier custom software development company.',
        hero: {
            title: isThaiLang 
                ? 'การเดินทางสู่ความเป็นเลิศทางดิจิทัล'
                : 'Our Journey to Digital Excellence',
            description: isThaiLang
                ? 'จากไอเดียเล็กๆ สู่การเสริมสร้างพลังให้ธุรกิจทั่วประเทศไทยด้วยโซลูชั่นเทคโนโลยีที่ทันสมัย'
                : 'From a small idea to empowering businesses across Thailand with cutting-edge technology solutions.'
        },
        timeline: [
            {
                title: '2024',
                content: isThaiLang
                    ? 'ขยายบริการไปสู่โซลูชั่นที่ขับเคลื่อนด้วย AI และการวิเคราะห์ข้อมูลขั้นสูง เปิดตัวแพลตฟอร์ม ERP ที่เป็นของเราเอง ซึ่งในปัจจุบันให้บริการแก่ธุรกิจกว่า 50+ รายทั่วประเทศไทย ได้รับการรับรอง SOC 2 และสร้างพันธมิตรกับผู้ให้บริการคลาวด์รายใหญ่'
                    : 'Expanded our services to include AI-powered solutions and advanced analytics. Launched our proprietary ERP platform that now serves over 50+ businesses across Thailand. Achieved SOC 2 compliance and established partnerships with major cloud providers.'
            },
            {
                title: isThaiLang ? 'ต้นปี 2023' : 'Early 2023',
                content: isThaiLang
                    ? 'กลายเป็นผู้ให้บริการโซลูชั่นหลักสำหรับ SME ในประเทศไทย พัฒนาระบบ POS ที่เป็นเอกลักษณ์ของเรา ซึ่งปฏิวัติการจำหน่ายสินค้าปลีกสำหรับธุรกิจท้องถิ่น จัดตั้งหน่วยพัฒนาแอปพลิเคชั่นมือถือโดยเฉพาะ'
                    : 'Became the go-to solution provider for SMEs in Thailand. Developed our signature POS system that revolutionized retail operations for local businesses. Established our dedicated mobile app development division.'
            },
            {
                title: '2022',
                content: isThaiLang
                    ? 'UPLIFT เกิดขึ้นจากวิสัยทัศน์ในการทำให้เทคโนโลยีระดับองค์กรสามารถเข้าถึงได้สำหรับธุรกิจทุกขนาด เริ่มต้นด้วยการพัฒนาเว็บแบบกำหนดเอง และขยายไปสู่โซลูชั่นดิจิทัลแบบครบวงจรอย่างรวดเร็ว'
                    : 'UPLIFT was born from a vision to democratize enterprise-level technology for businesses of all sizes. Started with custom web development and quickly expanded to comprehensive digital solutions.'
            }
        ]
    };
};

export async function generateMetadata() {
    const headersList = await headers();
    const locale = headersList.get('x-next-locale') || 'en';
    const storyData = getStoryData(locale);

    return {
        title: storyData.title,
        description: storyData.description,
    };
}

const StoryPage = async () => {
    const headersList = await headers();
    const locale = headersList.get('x-next-locale') || 'en';
    const storyData = getStoryData(locale);

    const data = storyData.timeline.map((item: any) => ({
        title: item.title,
        content: (
            <div>
                <p className="mb-8 text-sm font-normal text-neutral-800 md:text-base dark:text-neutral-200 leading-relaxed">
                    {item.content}
                </p>
                {/* Modern Tech Stack Showcase */}
                {item.title === "2024" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white text-center">
                            <div className="text-2xl font-bold">50+</div>
                            <div className="text-sm opacity-90">{locale === 'th' ? 'ลูกค้า' : 'Clients'}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-4 text-white text-center">
                            <div className="text-2xl font-bold">AI</div>
                            <div className="text-sm opacity-90">{locale === 'th' ? 'โซลูชั่น' : 'Solutions'}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-4 text-white text-center">
                            <div className="text-2xl font-bold">SOC 2</div>
                            <div className="text-sm opacity-90">{locale === 'th' ? 'รับรอง' : 'Certified'}</div>
                        </div>
                    </div>
                )}
                {(item.title === "Early 2023" || item.title === "ต้นปี 2023") && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg p-4 text-white text-center">
                            <div className="text-2xl font-bold">POS</div>
                            <div className="text-sm opacity-90">{locale === 'th' ? 'ระบบ' : 'System'}</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-4 text-white text-center">
                            <div className="text-2xl font-bold">15+</div>
                            <div className="text-sm opacity-90">{locale === 'th' ? 'ทีมงาน' : 'Team Members'}</div>
                        </div>
                        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg p-4 text-white text-center">
                            <div className="text-2xl font-bold">SME</div>
                            <div className="text-sm opacity-90">{locale === 'th' ? 'ผู้นำ' : 'Leader'}</div>
                        </div>
                    </div>
                )}
                {item.title === "2022" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-4 text-white text-center">
                            <div className="text-2xl font-bold">🚀</div>
                            <div className="text-sm opacity-90">{locale === 'th' ? 'เริ่มต้น' : 'Founded'}</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-4 text-white text-center">
                            <div className="text-2xl font-bold">Web</div>
                            <div className="text-sm opacity-90">{locale === 'th' ? 'พัฒนา' : 'Development'}</div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg p-4 text-white text-center">
                            <div className="text-2xl font-bold">💡</div>
                            <div className="text-sm opacity-90">{locale === 'th' ? 'วิสัยทัศน์' : 'Vision'}</div>
                        </div>
                    </div>
                )}
            </div>
        ),
    }));

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-clip">
                <StoryHero 
                    title={storyData.hero.title}
                    description={storyData.hero.description}
                />
                <div id="story-content">
                    <Timeline data={data} />
                </div>
                <Me />
                <Skills />

            </main>
            <Footer />
        </>
    );
};

export default StoryPage;
