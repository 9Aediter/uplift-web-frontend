import React from 'react'
import { Section } from '@/components/ui/section'

const Hero = () => {
    const getGradient = (color: string) => {
        switch (color) {
            case 'cyan':
                return 'from-cyan-500 to-blue-500'
            case 'magenta':
                return 'from-fuchsia-500 to-pink-500'
            case 'blue':
                return 'from-blue-500 to-indigo-500'
            case 'lime':
                return 'from-lime-500 to-green-500'
            case 'amber':
                return 'from-amber-500 to-orange-500'
            default:
                return 'from-cyan-500 to-blue-500'
        }
    }
    return (
        <>
            {/* Hero Section */}
            <Section id='hero' className="h-[70vh] px-8 max-w-7xl mx-auto flex flex-col items-center justify-center">
                <div className="relative text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                            Innovating The Future of Business Software
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                        เราสร้างสรรค์ซอฟต์แวร์ที่ตอบโจทย์ธุรกิจในทุกอุตสาหกรรม
                        ตั้งแต่ร้านค้าหน้าร้านจนถึงโลจิสติกส์โรงงาน
                        พบกับนวัตกรรมทั้งหมดของเรา ที่ขับเคลื่อนธุรกิจให้เติบโตอย่างยั่งยืน
                    </p>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium px-8 py-3 rounded-full hover:from-cyan-400 hover:to-blue-400 transition-colors">
                        Explore Our Solutions ↓
                    </button>
                </div>
                {/* Abstract graphic */}
                <div className="relative mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        <div className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
                    </div>
                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {['cyan', 'blue', 'magenta', 'lime'].map((color, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${getGradient(color)} opacity-20 animate-pulse mb-3`}
                                ></div>
                                <div
                                    className={`w-16 h-1 bg-gradient-to-r ${getGradient(color)} opacity-30`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    )
}

export default Hero