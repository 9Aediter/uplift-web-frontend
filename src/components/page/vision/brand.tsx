import React from 'react'
import { Section } from '@/components/ui/section'
import { LayersIcon } from 'lucide-react'

export const BrandPersonality = () => {
    const brandPersonality = [
        {
            title: 'Professional',
            description: 'เราทำงานอย่างมืออาชีพ เชี่ยวชาญ และน่าเชื่อถือ',
        },
        {
            title: 'Bold',
            description: 'เรากล้าที่จะคิดต่าง และนำเสนอไอเดียที่ท้าทายสถานะเดิม',
        },
        {
            title: 'Futuristic',
            description: 'เรามองไปข้างหน้า และนำเทรนด์เทคโนโลยีล่าสุดมาปรับใช้',
        },
        {
            title: 'Friendly',
            description: 'เราเข้าถึงง่าย เป็นกันเอง และพร้อมช่วยเหลือลูกค้าเสมอ',
        },
    ]
    return (
        <Section className="bg-white dark:bg-black py-20">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-500 bg-clip-text text-transparent">
                            Brand Personality
                        </span>
                    </h2>
                    <p className="text-xl text-slate-700 dark:text-gray-300 max-w-2xl mx-auto">
                        บุคลิกภาพที่สะท้อนตัวตนของ Uplift ในทุกจุดสัมผัส
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {brandPersonality.map((trait, index) => (
                        <div
                            key={index}
                            className="bg-slate-50 dark:bg-gray-900/30 border border-slate-200 dark:border-gray-800 rounded-lg p-8 hover:bg-slate-100 dark:hover:bg-gray-900/50 transition-colors"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                                {trait.title}
                            </h3>
                            <p className="text-xl text-slate-700 dark:text-gray-300">{trait.description}</p>
                        </div>
                    ))}
                </div>

                {/* Design Philosophy */}
                <div className="mt-20">
                    <div className="flex items-center mb-8">
                        <LayersIcon className="h-8 w-8 text-cyan-600 dark:text-cyan-400 mr-4" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Design Philosophy
                        </h2>
                    </div>
                    <div className="bg-slate-50 dark:bg-gray-900/20 border border-slate-200 dark:border-gray-800 rounded-lg p-8">
                        <p className="text-xl text-slate-700 dark:text-gray-300 leading-relaxed">
                            เราเชื่อว่าซอฟต์แวร์ที่ดีไม่ได้มีแค่ฟังก์ชันที่ครบถ้วน
                            แต่ต้องมีดีไซน์ที่สวยงาม ใช้งานง่าย
                            และสร้างประสบการณ์ที่ดีให้กับผู้ใช้
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="border-l-4 border-cyan-500 pl-4">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    User-Centered
                                </h4>
                                <p className="text-slate-600 dark:text-gray-400">
                                    เข้าใจผู้ใช้อย่างลึกซึ้ง
                                    และออกแบบโดยคำนึงถึงความต้องการของพวกเขาเป็นหลัก
                                </p>
                            </div>
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    Minimalist & Clean
                                </h4>
                                <p className="text-slate-600 dark:text-gray-400">
                                    เรียบง่าย ไม่รกรุงรัง เน้นเฉพาะสิ่งที่จำเป็น
                                    แต่ยังคงความสวยงามและน่าใช้
                                </p>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    Future-Proof
                                </h4>
                                <p className="text-slate-600 dark:text-gray-400">
                                    ออกแบบให้ทันสมัยอยู่เสมอ รองรับการเปลี่ยนแปลง
                                    และขยายตัวได้ในอนาคต
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Section>
    )
}
