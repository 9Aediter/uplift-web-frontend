import React from 'react'
import Footer from '@/components/layout/footer/footer'
import Nav from '@/components/basic/nav/resnav'
import Hero from '@/components/page/innovation/hero'
import ProductsSection from '@/components/page/innovation/products-section'
import FinalCtaSection from '@/components/page/innovation/final-cta'

// Import from progressive loader
import { Particles } from "@/components/progressive-loader"

const Innovation = () => {
  return (
    <div className="w-full overflow-x-hidden max-w-full">
      <Nav />
      <main className='w-full overflow-x-hidden max-w-full'>
        <Particles />
        <Hero />
        <ProductsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}

export default Innovation