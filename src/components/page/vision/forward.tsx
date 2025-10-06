import React from 'react'
import { Section } from '@/components/ui/section'

export const OurPathForward = () => {
    return (
        <Section className="bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-gray-900/30 py-20">
            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                        Our Path Forward
                    </span>
                </h2>
                <p className="text-2xl text-slate-700 dark:text-gray-300 mb-12 leading-relaxed">
                    เรากำลังก้าวไปสู่การเป็นผู้นำด้านนวัตกรรมซอฟต์แวร์ระดับประเทศ
                    ด้วยโซลูชันที่ตอบโจทย์ความต้องการของธุรกิจในยุคดิจิทัล
                    และการสร้างผลกระทบเชิงบวกต่อทั้งลูกค้าและสังคมโดยรวม
                </p>
                <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-lg hover:shadow-xl transition-shadow">
                    Join Our Vision
                </div>
            </div>
        </Section>
    )
}
