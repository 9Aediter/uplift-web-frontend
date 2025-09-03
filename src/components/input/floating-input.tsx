'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, required, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    
    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (props.onChange) props.onChange(e);
    };

    const shouldFloatLabel = isFocused || hasValue || !!props.value;

    return (
      <div className="relative">
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "peer w-full px-4 pt-6 pb-2 bg-gray-800/30 border border-gray-600/50 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm",
              error && "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50",
              className
            )}
            placeholder=" "
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          <motion.label
            className={cn(
              "absolute left-3 px-1 text-gray-400 pointer-events-none transition-all duration-300 origin-left bg-gray-800/90 backdrop-blur-sm rounded",
              shouldFloatLabel
                ? "-top-2.5 text-sm text-cyan-400 bg-gray-800/90"
                : "top-1/2 -translate-y-1/2 text-base bg-transparent",
              error && shouldFloatLabel && "text-red-400"
            )}
            animate={{
              scale: shouldFloatLabel ? 0.9 : 1,
              color: shouldFloatLabel 
                ? (error ? '#f87171' : '#22d3ee') 
                : '#9ca3af'
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </motion.label>
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            <span className="w-1 h-1 bg-red-400 rounded-full" />
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, error, required, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    
    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value);
      if (props.onChange) props.onChange(e);
    };

    const shouldFloatLabel = isFocused || hasValue || !!props.value;

    return (
      <div className="relative">
        <div className="relative">
          <textarea
            ref={ref}
            className={cn(
              "peer w-full px-4 pt-6 pb-2 bg-gray-800/30 border border-gray-600/50 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm resize-none",
              error && "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50",
              className
            )}
            placeholder=" "
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          <motion.label
            className={cn(
              "absolute left-3 px-1 text-gray-400 pointer-events-none transition-all duration-300 origin-left bg-gray-800/90 backdrop-blur-sm rounded",
              shouldFloatLabel
                ? "-top-2.5 text-sm text-cyan-400 bg-gray-800/90"
                : "top-6 text-base bg-transparent",
              error && shouldFloatLabel && "text-red-400"
            )}
            animate={{
              scale: shouldFloatLabel ? 0.9 : 1,
              color: shouldFloatLabel 
                ? (error ? '#f87171' : '#22d3ee') 
                : '#9ca3af'
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </motion.label>
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            <span className="w-1 h-1 bg-red-400 rounded-full" />
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

// Floating Select Component
interface FloatingSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

export const FloatingSelect: React.FC<FloatingSelectProps> = ({
  label,
  value,
  onValueChange,
  children,
  error,
  required,
  placeholder = "Select an option",
  options = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const shouldFloatLabel = !!value || isOpen;

  return (
    <div className="relative">
      <div className="relative">
        <div 
          className={cn(
            "w-full px-4 pt-6 pb-2 bg-gray-800/30 border border-gray-600/50 rounded-xl text-white cursor-pointer transition-all duration-300 backdrop-blur-sm min-h-[3.5rem] flex items-end",
            error && "border-red-500/50",
            isOpen && "ring-2 ring-cyan-500/50 border-cyan-500/50"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {!shouldFloatLabel && (
            <span className="text-gray-400 pb-1">{placeholder}</span>
          )}
          {shouldFloatLabel && value && (
            <span className="text-white pb-1">
              {options.find(opt => opt.value === value)?.label || value}
            </span>
          )}
        </div>
        
        <motion.label
          className={cn(
            "absolute left-3 px-1 text-gray-400 pointer-events-none transition-all duration-300 origin-left bg-gray-800/90 backdrop-blur-sm rounded",
            shouldFloatLabel
              ? "-top-2.5 text-sm text-cyan-400 bg-gray-800/90"
              : "top-1/2 -translate-y-1/2 text-base bg-transparent",
            error && shouldFloatLabel && "text-red-400"
          )}
          animate={{
            scale: shouldFloatLabel ? 0.9 : 1,
            color: shouldFloatLabel 
              ? (error ? '#f87171' : '#22d3ee') 
              : '#9ca3af'
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </motion.label>

        {/* Dropdown Arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400"
          />
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-50 w-full mt-2 bg-gray-700 border border-gray-600 rounded-xl shadow-xl max-h-60 overflow-y-auto"
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const props = child.props as any;
              const value = props['data-value'];
              return (
                <div
                  key={value}
                  onClick={() => {
                    onValueChange(value);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-gray-600 cursor-pointer text-white transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                >
                  {props.children}
                </div>
              );
            }
            return child;
          })}
        </motion.div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-2 flex items-center gap-1"
        >
          <span className="w-1 h-1 bg-red-400 rounded-full" />
          {error}
        </motion.p>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};