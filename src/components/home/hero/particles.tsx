"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    const particles: Particle[] = [];
    const particleCount = 80;

    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particles.length = 0; // Clear existing particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: (Math.random() * canvas.width) / (window.devicePixelRatio || 1),
          y: (Math.random() * canvas.height) / (window.devicePixelRatio || 1),
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 1.2,
          speedY: (Math.random() - 0.5) * 1.2,
          opacity: Math.random() * 0.4 + 0.6,
        });
      }
    };

    setCanvasDimensions();
    initParticles();
    window.addEventListener("resize", setCanvasDimensions);

    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas completely each frame
      const isDark = resolvedTheme === 'dark';
      ctx.clearRect(
        0,
        0,
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1)
      );

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0)
          particle.x = canvas.width / (window.devicePixelRatio || 1);
        if (particle.x > canvas.width / (window.devicePixelRatio || 1))
          particle.x = 0;
        if (particle.y < 0)
          particle.y = canvas.height / (window.devicePixelRatio || 1);
        if (particle.y > canvas.height / (window.devicePixelRatio || 1))
          particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Theme-aware particle color
        if (isDark) {
          ctx.fillStyle = `rgba(120, 180, 255, ${particle.opacity})`;
        } else {
          ctx.fillStyle = `rgba(30, 80, 150, ${particle.opacity})`;
        }
        ctx.fill();
      });

      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) { // Increased connection distance to 150
            ctx.beginPath();
            
            // Theme-aware line color
            if (isDark) {
              ctx.strokeStyle = `rgba(120, 200, 255, ${
                0.15 * (1 - distance / 150)
              })`;
            } else {
              ctx.strokeStyle = `rgba(30, 80, 150, ${
                0.2 * (1 - distance / 150)
              })`;
            }
            
            ctx.lineWidth = 0.8;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [resolvedTheme]); // Re-run when theme changes

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};