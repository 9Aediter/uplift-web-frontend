"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

// Types
interface SummaryItem {
  icon?: React.ReactNode;
  text: string;
}

interface ButtonConfig {
  label: string;
  path?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface ReusableModalProps {
  // Core props
  trigger: React.ReactNode;
  title: string;
  
  // Optional content
  images?: string[];
  summary?: SummaryItem[];
  description?: string;
  
  // Buttons (can have multiple)
  buttons?: ButtonConfig[];
  
  // Styling
  triggerClassName?: string;
  modalClassName?: string;
  triggerAsDiv?: boolean;
}

// Main Reusable Modal Component
export function ReusableModal({
  trigger,
  title,
  images = [],
  summary = [],
  description,
  buttons = [],
  triggerClassName,
  modalClassName,
  triggerAsDiv = false
}: ReusableModalProps) {
  const router = useRouter();

  const handleButtonClick = (button: ButtonConfig) => {
    if (button.onClick) {
      button.onClick();
    } else if (button.path) {
      router.push(button.path);
    }
  };

  return (
    <Modal>
      <ModalTrigger className={triggerClassName} asDiv={triggerAsDiv}>
        {trigger}
      </ModalTrigger>
      
      <ModalBody className={modalClassName}>
        <ModalContent>
          {/* Title */}
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            {title}
          </h4>

          {/* Description */}
          {description && (
            <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6">
              {description}
            </p>
          )}

          {/* Images Gallery */}
          {images.length > 0 && (
            <div className="flex justify-center items-center mb-8">
              {images.map((image, idx) => (
                <motion.div
                  key={"image" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Image ${idx + 1}`}
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Summary Items */}
          {summary.length > 0 && (
            <div className="py-6 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              {summary.map((item, idx) => (
                <div key={idx} className="flex items-center justify-center">
                  {item.icon && (
                    <span className="mr-2 text-neutral-700 dark:text-neutral-300 h-4 w-4">
                      {item.icon}
                    </span>
                  )}
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ModalContent>

        {/* Footer with Buttons */}
        {buttons.length > 0 && (
          <ModalFooter className="gap-4">
            {buttons.map((button, idx) => (
              <button
                key={idx}
                onClick={() => handleButtonClick(button)}
                className={`px-4 py-2 rounded-md text-sm min-w-28 transition-colors ${
                  button.variant === 'primary'
                    ? 'bg-black text-white dark:bg-white dark:text-black border border-black hover:bg-gray-800 dark:hover:bg-gray-200'
                    : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {button.label}
              </button>
            ))}
          </ModalFooter>
        )}
      </ModalBody>
    </Modal>
  );
}

// Pre-built Common Icons (optional to use)
export const ModalIcons = {
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  
  Star: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  
  Heart: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  
  Code: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  )
};