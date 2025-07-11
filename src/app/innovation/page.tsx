import React from 'react'
import Footer from '@/components/section/uplift/footer'
import Nav from '@/components/nav/resnav'
import Hero from '@/components/section/innovation/hero'
import ProductsSection from '@/components/section/innovation/products-section'
import FinalCtaSection from '@/components/section/innovation/final-cta'
import { Particles } from '@/components/section/uplift/hero/particles'

const Innovation = () => {
  return (
    <>
      <Nav />
      <main className='w-full'>

        <div
          className="absolute inset-0 z-0 h-[100vh] w-full"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }}
        >
          <Particles />
        </div>
        <Hero />
        <ProductsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

export default Innovation