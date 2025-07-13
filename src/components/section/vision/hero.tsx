import React from 'react'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/card'
import { CardSpotlight } from "@/components/ui/card-spotlight";
import {
    LightbulbIcon,
    CompassIcon,
    HeartIcon,
    ZapIcon,
    LayersIcon,
    UsersIcon,
    RocketIcon,
    BrainIcon,
    SparklesIcon,
} from 'lucide-react'
export const VisionHero = () => {

    return (
        <>
            {/* Hero */}
            <Section className="inset-0 lg:h-[100vh] flex justify-between items-end mx-auto pt-28 md:pt-32 bg-gradient-to-b from-black to-gray-900/30">
                <div className="max-w-7xl mx-auto">
                    {/* Main */}
                    <div className="text-center mb-20">

                        {/* Vision */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-8">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Our Vision
                            </span>
                        </h1>
                        {/* Line */}
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto mb-8"></div>
                        {/* Describe */}
                        <div className="text-4xl md:text-5xl font-light text-white max-w-4xl mx-auto leading-tight">
                            เราสร้างเทคโนโลยี<br></br>เพื่อเปลี่ยนแปลงให้
                            <span className="text-cyan-400 font-normal">
                                {' '}
                                ธุรกิจขับเคลื่อนโลก
                            </span>
                        </div>
                    </div>
                    {/* Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                        {/* Our Mission */}
                        <CardSpotlight className="p-12 rounded-lg border border-gray-700 bg-gray-800/50">
                            <div className="flex items-center mb-8">
                                <div className="p-3 rounded-full bg-cyan-900/50 mr-4">
                                    <CompassIcon className="h-10 w-10 text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                            </div>
                            <ul className="space-y-4 text-xl text-gray-300 leading-relaxed">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center mt-1 mr-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    </div>
                                    <p>พัฒนาซอฟต์แวร์ที่สร้างการเปลี่ยนแปลงเชิงบวก</p>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center mt-1 mr-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    </div>
                                    <p>ช่วยให้องค์กรทำงานอย่างมีประสิทธิภาพและลดต้นทุน</p>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center mt-1 mr-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    </div>
                                    <p>เพิ่มศักยภาพในการแข่งขัน</p>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center mt-1 mr-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    </div>
                                    <p>เป็นพาร์ทเนอร์เทคโนโลยีที่เชื่อถือได้และเติบโตยั่งยืน</p>
                                </li>
                            </ul>
                        </CardSpotlight>
                        {/* Our Promise */}
                        <CardSpotlight className="p-12 rounded-lg border border-gray-700 bg-gray-800/50">
                            <div className="flex items-center mb-8">
                                <div className="p-3 rounded-full bg-cyan-900/50 mr-4">
                                    <RocketIcon className="h-10 w-10 text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Our Promise</h2>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center mt-1 mr-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    </div>
                                    <p className="text-xl text-gray-300">
                                        สร้างซอฟต์แวร์ที่ใช้งานง่ายและสวยงาม
                                    </p>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center mt-1 mr-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    </div>
                                    <p className="text-xl text-gray-300">
                                        ให้บริการเกินความคาดหวังด้วยทีมงานที่เข้าใจธุรกิจ
                                    </p>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center mt-1 mr-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    </div>
                                    <p className="text-xl text-gray-300">
                                        นำเทคโนโลยีล่าสุดมาสร้างความได้เปรียบทางธุรกิจ
                                    </p>
                                </li>
                            </ul>
                        </CardSpotlight>
                    </div>
                </div>
            </Section>
        </>
    )
}
