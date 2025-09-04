import React from 'react'
import Footer from '@/components/footer/footer'
import Nav from '@/components/nav/resnav'
import Hero from '@/components/section/innovation/hero'
import ProductsSection from '@/components/section/innovation/products-section'
import FinalCtaSection from '@/components/section/innovation/final-cta'
import dynamic from 'next/dynamic'

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