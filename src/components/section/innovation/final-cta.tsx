import React from 'react'
import { Section } from '@/components/ui/section'

const FinalCtaSection = () => {
    return (
        <Section className="lg:h-[50vh] flex items-center bg-gradient-to-b from-black to-gray-900/30">
            <div className="px-8 max-w-7xl mx-auto py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Ready to Transform Your Business?
                    </span>
                </h2>
                <p className="text-xl text-gray-300 mb-10">
                    ค้นพบว่าโซลูชันของเราจะช่วยยกระดับธุรกิจของคุณได้อย่างไร
                    พูดคุยกับทีมผู้เชี่ยวชาญของเราเพื่อรับคำแนะนำที่เหมาะกับความต้องการของคุณ
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-400 hover:to-blue-400 transition-colors">
                        Request Demo
                    </button>
                    <button className="px-8 py-3 rounded-full bg-transparent border border-cyan-500 text-cyan-400 font-medium hover:bg-cyan-950/30 transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
        </Section>
    )
}

export default FinalCtaSection