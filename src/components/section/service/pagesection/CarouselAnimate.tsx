"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselItem {
  image: string;
  caption: string;
}

interface CarouselAnimateProps {
  carouselItems: CarouselItem[];
}

const CarouselAnimate: React.FC<CarouselAnimateProps> = ({ carouselItems }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!carouselItems?.length) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselItems?.length]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl">
      {/* Carousel items */}
      {carouselItems?.map((item, index) => (
        <div
          key={index}
          className={`transition-opacity duration-500 ${activeSlide === index ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
        >
          <div className="aspect-[16/9] relative">
            <Image
              src={item.image}
              alt={item.caption}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-xl font-medium text-white">
                {item.caption}
              </p>
            </div>
          </div>
        </div>
      ))}
      {/* Carousel controls */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        onClick={() =>
          setActiveSlide((prev) =>
            prev === 0 ? carouselItems.length - 1 : prev - 1,
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        onClick={() =>
          setActiveSlide((prev) =>
            prev === carouselItems.length - 1 ? 0 : prev + 1,
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems?.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${activeSlide === index ? 'bg-white' : 'bg-white/30'}`}
            onClick={() => setActiveSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselAnimate;
