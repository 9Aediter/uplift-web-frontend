"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TestimonialsProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  autoplay?: boolean
  testimonials?: Array<{
    name: string
    designation: string
    quote: string
    image: string
    rating?: number
  }>
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  title = "What Our Clients Say",
  subtitle = "Hear from businesses that have transformed with our solutions",
  backgroundColor = "bg-background",
  autoplay = true,
  testimonials = []
}) => {
  const [active, setActive] = useState(0)

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const isActive = (index: number) => {
    return index === active
  }

  useEffect(() => {
    if (autoplay && testimonials.length > 1) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
  }, [autoplay, testimonials.length])

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }

  if (!testimonials.length) {
    return (
      <div className={`${backgroundColor} py-16 md:py-24`}>
        <div className="max-w-4xl mx-auto text-center px-8">
          <p className="text-muted-foreground">No testimonials available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${backgroundColor} py-16 md:py-24`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-16 px-8 max-w-4xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2 items-center">
          {/* Images */}
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.image}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between py-4">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {testimonials[active].designation}
              </p>
              
              {testimonials[active].rating && (
                <div className="flex mt-2 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 ${
                        i < (testimonials[active].rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </div>
                  ))}
                </div>
              )}
              
              <motion.p className="mt-8 text-lg text-muted-foreground">
                "{testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}"
              </motion.p>
            </motion.div>
            
            {/* Navigation */}
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                disabled={testimonials.length <= 1}
              >
                <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                disabled={testimonials.length <= 1}
              >
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive(index) ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}