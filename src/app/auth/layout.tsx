"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
})


interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate background stars (stationary)
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 300; i++) {
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


  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"]
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ]

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-black relative overflow-hidden">
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

      {/* Left Panel - Auth Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10 relative z-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium text-white">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            UPLIFTTECH
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            {children}
          </div>
        </div>
      </div>

      {/* Right Panel - Globe */}
      <div className="relative hidden lg:block">
        <div className="flex flex-row items-center justify-center h-full relative w-full">
          <div className="max-w-6xl mx-auto w-full relative overflow-hidden h-full px-4">
            <div className="absolute w-full -bottom-20 h-full z-30">
              <World data={sampleArcs} globeConfig={globeConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}