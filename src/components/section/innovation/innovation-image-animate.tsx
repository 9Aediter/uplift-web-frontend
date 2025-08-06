"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";


interface InnovationImageAnimateProps {
  imageUrl: string;
}

export const InnovationImageAnimate: React.FC<InnovationImageAnimateProps> = ({ imageUrl }) => {
  return (
    <div className="relative w-full h-[100vh]">
      <div className="absolute inset-0 z-0"></div>
      <AnimatePresence initial={false}>
        <motion.div
          key={imageUrl} // Key ที่เปลี่ยนเมื่อรูปภาพเปลี่ยน
          initial={{ opacity: 0 }} // เริ่มต้นด้วย opacity 0
          animate={{ opacity: 0.3 }} // animate ไปที่ opacity 0.3
          exit={{ opacity: 0 }} // ออกด้วย opacity 0
          transition={{ duration: 1 }} // ระยะเวลา animation 1 วินาที
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${imageUrl}')`,
          }}
        ></motion.div>
      </AnimatePresence>
      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/0 to-black/60"></div> */}
    </div>
  );
};
