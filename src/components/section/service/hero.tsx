import React from 'react'
export const HeroSection = () => {
  return (
    <section className="w-full bg-[#111111] pt-28 pb-20">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            บริการของเรา
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            เราให้บริการด้านเทคโนโลยีที่ครอบคลุมทุกความต้องการของธุรกิจคุณ
            ตั้งแต่การพัฒนาเว็บไซต์ ระบบ ERP แอปพลิเคชัน
            ไปจนถึงการวางระบบและการออกแบบ UX/UI
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-lg font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all">
            ดูบริการของเรา
          </button>
        </div>
      </div>
    </section>
  )
}
