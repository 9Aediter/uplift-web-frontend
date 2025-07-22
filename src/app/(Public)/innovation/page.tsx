import React from 'react'
import Footer from '@/components/footer/footer'
import Nav from '@/components/nav/resnav'
import Hero from '@/components/section/innovation/hero'
import ProductsSection from '@/components/section/innovation/products-section'
import FinalCtaSection from '@/components/section/innovation/final-cta'
import { Particles } from '@/components/section/uplift/hero/particles'

const Innovation = () => {
  return (
    <>

      <main className='w-full'>

        <Particles />
        <Hero />
        <ProductsSection />
        <FinalCtaSection />
      </main>

    </>
  )
}

export default Innovation