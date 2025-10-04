import React from 'react'
import Nav from '@/components/basic/nav/resnav'
import Footer from '@/components/layout/footer/footer'
import { VisionHero } from '@/components/page/vision/hero'
import { CoreValues } from '@/components/page/vision/core'
import { BrandPersonality } from '@/components/page/vision/brand'
import { OurPathForward } from '@/components/page/vision/forward'

const VisionPage = () => {
  return (
    <>
      <Nav />
      <main className="w-full">
        <VisionHero />
        <CoreValues />
        <BrandPersonality />
        <OurPathForward />
      </main>
      <Footer />
    </>
  )
}

export default VisionPage
