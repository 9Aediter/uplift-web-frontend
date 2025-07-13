"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DemoAnimateProps {
  slides: { title: string; description: string; image: string; }[];
}

export const DemoAnimate: React.FC<DemoAnimateProps> = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden reveal">
      <div className="relative">
        {/* Carousel */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] to-transparent opacity-60 z-10"></div>
              <Image
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                width={800}
                height={500}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {slide.title}
                </h3>
                <p className="text-white/80">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full p-2 transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full p-2 transition-all duration-200"
        >
          <ChevronRight size={24} />
        </Button>
        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${index === activeSlide ? "bg-white scale-110" : "bg-white/50"}`}
            ></Button>
          ))}
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#1F1F1F] mb-2">
            Want to see more?
          </h3>
          <p className="text-gray-600">
            Schedule a personalized demo with our team
          </p>
        </div>
        <Button
          className="mt-4 md:mt-0"
        >
          Request Full Demo
        </Button>
      </div>
    </div>
  );
};
