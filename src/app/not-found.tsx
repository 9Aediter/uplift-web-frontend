"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => ({ default: mod.Player })), {
  ssr: false
})

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
}

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate background stars (stationary)
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 3 + 1,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    const particles: Particle[] = []
    const particleCount = 30 // Reduced from 100 to 30

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * -100 - 50, // Start from left edge off-screen
        y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)) * 0.3, // Top third
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 2 + 1, // Always positive (moving right)
        speedY: Math.random() * 1.5 + 0.5, // Always positive (moving down)
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
          Math.random() * 100 + 155
        )}, 255, ${Math.random() * 0.7 + 0.3})`,
      })
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(
        0,
        0,
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1)
      )

      particles.forEach((particle) => {
        // Move particles in shooting star direction (diagonal down-right)
        particle.x += particle.speedX * 2
        particle.y += particle.speedY * 2

        // Reset position when particle goes off screen (create shooting star effect)
        if (particle.x > canvas.width / (window.devicePixelRatio || 1) + 50 || 
            particle.y > canvas.height / (window.devicePixelRatio || 1) + 50) {
          particle.x = Math.random() * -100 - 50 // Start from left edge
          particle.y = Math.random() * (canvas.height / (window.devicePixelRatio || 1)) * 0.3 // Top third of screen
        }

        // Draw particle with trail effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Add trailing effect with transparency
        const gradient = ctx.createLinearGradient(
          particle.x - particle.speedX * 15, 
          particle.y - particle.speedY * 15,
          particle.x, 
          particle.y
        )
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(1, particle.color)
        
        ctx.beginPath()
        ctx.strokeStyle = gradient
        ctx.lineWidth = particle.size
        ctx.moveTo(particle.x - particle.speedX * 15, particle.y - particle.speedY * 15)
        ctx.lineTo(particle.x, particle.y)
        ctx.stroke()
      })

      // Remove connection lines for cleaner shooting star effect
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Stars (stationary) */}
      <div className="absolute inset-0 z-0">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.twinkleSpeed}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 z-5 pointer-events-none" />

      {/* White Cat Lottie Animation */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
        <Player
          autoplay
          loop
          src="/lottie/whitecat.json"
          style={{ height: '500px', width: '500px' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-30 text-center text-white space-y-8">
        {/* 404 Title with glow effect */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-white opacity-20 blur-lg">
            404
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-200">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            Looks like this page got lost in space. Make a wish on a shooting star and try again!
          </p>
        </div>

        {/* Liquid Glass Button */}
        <div className="pt-8">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            {/* Liquid glass background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 group-hover:from-blue-500/30 group-hover:to-purple-600/30 group-hover:border-white/30"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
            </div>
            
            {/* Button text */}
            <span className="relative z-10 flex items-center gap-2">
              ✨ Try Again
            </span>
          </Link>
        </div>

        
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}