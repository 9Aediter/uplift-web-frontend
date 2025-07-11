import React from 'react'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/card'
import {
    LightbulbIcon,
    HeartIcon,
    ZapIcon,
    SparklesIcon,
    UsersIcon,
    BrainIcon,
} from 'lucide-react'

export const CoreValues = () => {
    const coreValues = [
        {
            title: 'Innovation',
            description:
                'เราไม่หยุดนิ่งในการสร้างสรรค์สิ่งใหม่ และมองหาวิธีการแก้ปัญหาที่ดีกว่าเสมอ',
            icon: <LightbulbIcon className="h-6 w-6 text-amber-400" />,
            color: 'amber',
        },
        {
            title: 'Integrity',
            description:
                'เราดำเนินธุรกิจด้วยความซื่อสัตย์ โปร่งใส และรับผิดชอบต่อลูกค้าและสังคม',
            icon: <HeartIcon className="h-6 w-6 text-red-400" />,
            color: 'red',
        },
        {
            title: 'Impact',
            description:
                'เราสร้างผลกระทบเชิงบวกให้กับธุรกิจของลูกค้าและระบบนิเวศเทคโนโลยีโดยรวม',
            icon: <ZapIcon className="h-6 w-6 text-yellow-400" />,
            color: 'yellow',
        },
        {
            title: 'Excellence',
            description:
                'เรามุ่งมั่นสู่ความเป็นเลิศในทุกด้าน ตั้งแต่การพัฒนาโค้ดไปจนถึงการบริการลูกค้า',
            icon: <SparklesIcon className="h-6 w-6 text-purple-400" />,
            color: 'purple',
        },
        {
            title: 'Collaboration',
            description:
                'เราเชื่อในพลังของการทำงานร่วมกัน ทั้งภายในทีมและกับพาร์ทเนอร์',
            icon: <UsersIcon className="h-6 w-6 text-blue-400" />,
            color: 'blue',
        },
        {
            title: 'Human-Centered',
            description: 'เราออกแบบโซลูชันที่เข้าใจความต้องการของผู้ใช้อย่างแท้จริง',
            icon: <BrainIcon className="h-6 w-6 text-green-400" />,
            color: 'green',
        },
    ]
    return (
        <Section className="bg-gradient-to-b from-gray-900/30 to-black py-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Core Values
                    </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    หลักการสำคัญที่หล่อหลอมตัวตนและการทำงานของเรา
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {coreValues.map((value, index) => (
                    <Card
                        key={index}
                        className="p-6 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300"
                        glowColor={value.color as any}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                                {value.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                            <p className="text-gray-300">{value.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    )
}
