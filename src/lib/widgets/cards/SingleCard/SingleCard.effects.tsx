"use client"

import { useEffect } from 'react'

/**
 * SingleCard Effects Component - Client-side animations only
 * Loaded dynamically after SSR to enhance the experience
 */
export function SingleCardEffects() {
  useEffect(() => {
    // Enhanced button hover effects with framer-motion-like behavior
    const primaryButton = document.querySelector('[data-animate="primary-button"]') as HTMLElement
    const secondaryButton = document.querySelector('[data-animate="secondary-button"]') as HTMLElement
    const trustIndicators = document.querySelector('[data-animate="trust-indicators"]') as HTMLElement

    // Primary button enhanced effects
    if (primaryButton) {
      const handleMouseEnter = () => {
        primaryButton.style.transform = 'scale(1.05)'
        primaryButton.style.transition = 'transform 0.2s ease-out'
      }
      
      const handleMouseLeave = () => {
        primaryButton.style.transform = 'scale(1)'
      }
      
      const handleMouseDown = () => {
        primaryButton.style.transform = 'scale(0.95)'
      }
      
      const handleMouseUp = () => {
        primaryButton.style.transform = 'scale(1.05)'
      }

      primaryButton.addEventListener('mouseenter', handleMouseEnter)
      primaryButton.addEventListener('mouseleave', handleMouseLeave)
      primaryButton.addEventListener('mousedown', handleMouseDown)
      primaryButton.addEventListener('mouseup', handleMouseUp)

      // Cleanup
      return () => {
        primaryButton.removeEventListener('mouseenter', handleMouseEnter)
        primaryButton.removeEventListener('mouseleave', handleMouseLeave)
        primaryButton.removeEventListener('mousedown', handleMouseDown)
        primaryButton.removeEventListener('mouseup', handleMouseUp)
      }
    }

    // Secondary button enhanced effects
    if (secondaryButton) {
      const handleMouseEnter = () => {
        secondaryButton.style.transform = 'scale(1.05)'
        secondaryButton.style.transition = 'transform 0.2s ease-out'
      }
      
      const handleMouseLeave = () => {
        secondaryButton.style.transform = 'scale(1)'
      }
      
      const handleMouseDown = () => {
        secondaryButton.style.transform = 'scale(0.95)'
      }
      
      const handleMouseUp = () => {
        secondaryButton.style.transform = 'scale(1.05)'
      }

      secondaryButton.addEventListener('mouseenter', handleMouseEnter)
      secondaryButton.addEventListener('mouseleave', handleMouseLeave)
      secondaryButton.addEventListener('mousedown', handleMouseDown)
      secondaryButton.addEventListener('mouseup', handleMouseUp)
    }

    // Trust indicators fade-in animation
    if (trustIndicators) {
      // Intersection Observer for scroll-triggered animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      }, { threshold: 0.1 })

      observer.observe(trustIndicators)

      // Add fade-in-up animation
      const style = document.createElement('style')
      style.textContent = `
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `
      document.head.appendChild(style)

      // Cleanup
      return () => {
        observer.disconnect()
        document.head.removeChild(style)
      }
    }

    // Enhanced geometric shape animations
    const geometricShapes = document.querySelectorAll('.absolute.opacity-10 > div')
    geometricShapes.forEach((shape, index) => {
      const element = shape as HTMLElement
      
      // Add random floating animation
      const randomDelay = Math.random() * 2
      const randomDuration = 3 + Math.random() * 2
      
      element.style.animation += `, float-${index} ${randomDuration}s ease-in-out infinite ${randomDelay}s`
    })

    // Add floating keyframes
    const floatingStyles = document.createElement('style')
    floatingStyles.textContent = `
      @keyframes float-0 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes float-1 {
        0%, 100% { transform: translateY(0px) rotate(45deg); }
        50% { transform: translateY(-15px) rotate(225deg); }
      }
      
      @keyframes float-2 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `
    document.head.appendChild(floatingStyles)

    // Cleanup function
    return () => {
      if (document.head.contains(floatingStyles)) {
        document.head.removeChild(floatingStyles)
      }
    }
  }, [])

  // This component doesn't render anything visible
  // It only adds client-side effects to existing SSR elements
  return null
}