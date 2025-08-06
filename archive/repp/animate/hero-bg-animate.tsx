"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// interface HeroBgAnimateProps {
//   backgroundImageUrl: string;
// }

export const HeroBgAnimate: React.FC = () => {
  const mockImages = [
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1675&q=80",
    "https://picsum.photos/seed/picsum/1675/800", // เปลี่ยนขนาดให้เหมาะสม
    "https://picsum.photos/seed/picsum/1675/800?grayscale", // เปลี่ยนขนาดให้เหมาะสม
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mockImages.length);
    }, 5000); // สไลด์ทุก 5 วินาที

    return () => clearInterval(interval);
  }, [mockImages.length]);

  return (
    <>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex} // Key ที่เปลี่ยนเมื่อรูปภาพเปลี่ยน
          initial={{ opacity: 0 }} // เริ่มต้นด้วย opacity 0
          animate={{ opacity: 0.3 }} // animate ไปที่ opacity 0.3
          exit={{ opacity: 0 }} // ออกด้วย opacity 0
          transition={{ duration: 1 }} // ระยะเวลา animation 1 วินาที
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${mockImages[currentImageIndex]}')`,
          }}
        ></motion.div>
      </AnimatePresence>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/10 to-black/80"></div>

      {/* Indicators */}
      <div className="z-50 absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {mockImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'} transition-colors duration-300`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </>
  );
};
