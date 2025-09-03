// Floating Input System - Animated Label Style (SSR Compatible)
import React, { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { InputSystem, BaseInputConfig, BaseInputProps, BaseTextareaProps } from '../core/BaseInput'
import { cn } from '@/lib/utils'

// Floating Input Configuration
const floatingInputConfig: BaseInputConfig = {
  variants: {
    default: 'bg-gray-800/30 border-gray-600/50 text-white backdrop-blur-sm',
    light: 'bg-white/10 border-gray-300/50 text-gray-900 backdrop-blur-sm',
    modal: 'bg-gray-700/30 border-gray-500/50 text-white backdrop-blur-sm',
    minimal: 'bg-transparent border-gray-400/30 text-current backdrop-blur-sm'
  },
  sizes: {
    sm: 'px-3 pt-5 pb-1.5 text-sm',
    default: 'px-4 pt-6 pb-2 text-base',
    lg: 'px-5 pt-7 pb-2.5 text-lg'
  },
  states: {
    default: 'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50',
    error: 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50',
    success: 'border-green-500/50 focus:ring-green-500/50 focus:border-green-500/50',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
  },
  defaultVariant: 'default',
  defaultSize: 'default',
  defaultState: 'default',
  baseStyles: 'peer w-full rounded-xl border transition-all duration-300 placeholder-transparent'
}

// Floating Input System Class
export class FloatingInputSystem extends InputSystem {
  constructor() {
    super(floatingInputConfig)
  }

  createInputComponent() {
    return FloatingInput
  }

  createTextareaComponent() {
    return FloatingTextarea
  }
}

// Floating Input Types
export type FloatingInputVariant = 'default' | 'light' | 'modal' | 'minimal'
export type FloatingInputSize = 'sm' | 'default' | 'lg'
export type FloatingInputState = 'default' | 'error' | 'success' | 'disabled'

export interface FloatingInputProps extends BaseInputProps {
  variant?: FloatingInputVariant
  size?: FloatingInputSize
  state?: FloatingInputState
  label: string
}

export interface FloatingTextareaProps extends BaseTextareaProps {
  variant?: FloatingInputVariant
  size?: FloatingInputSize
  state?: FloatingInputState
  label: string
}

// Create floating input system instance
const system = new FloatingInputSystem()

// Floating Input Component
export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, required, variant = 'default', size = 'default', state, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    
    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
      if (props.onBlur) props.onBlur(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value)
      if (props.onChange) props.onChange(e)
    }

    const shouldFloatLabel = isFocused || hasValue || !!props.value
    const appliedState = error ? 'error' : state
    const generatedClassName = system.generateClassName(variant, size, appliedState, className)
    
    // Get label styles based on variant
    const getLabelStyles = () => {
      const baseStyles = "absolute left-3 px-1 pointer-events-none transition-all duration-300 origin-left backdrop-blur-sm rounded"
      const variantStyles = {
        default: shouldFloatLabel 
          ? "-top-2.5 text-sm text-cyan-400 bg-gray-800/90" 
          : "top-1/2 -translate-y-1/2 text-base text-gray-400 bg-transparent",
        light: shouldFloatLabel 
          ? "-top-2.5 text-sm text-blue-600 bg-white/90" 
          : "top-1/2 -translate-y-1/2 text-base text-gray-600 bg-transparent",
        modal: shouldFloatLabel 
          ? "-top-2.5 text-sm text-blue-400 bg-gray-700/90" 
          : "top-1/2 -translate-y-1/2 text-base text-gray-400 bg-transparent",
        minimal: shouldFloatLabel 
          ? "-top-2.5 text-sm text-current bg-background/90" 
          : "top-1/2 -translate-y-1/2 text-base text-muted-foreground bg-transparent"
      }
      
      const errorStyles = error && shouldFloatLabel ? "text-red-400" : ""
      return cn(baseStyles, variantStyles[variant], errorStyles)
    }

    return (
      <div className="relative">
        <div className="relative">
          <input
            ref={ref}
            className={generatedClassName}
            placeholder=" "
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          <motion.label
            className={getLabelStyles()}
            animate={{
              scale: shouldFloatLabel ? 0.9 : 1,
              color: shouldFloatLabel 
                ? (error ? '#f87171' : variant === 'light' ? '#2563eb' : variant === 'modal' ? '#60a5fa' : '#22d3ee') 
                : variant === 'light' ? '#6b7280' : '#9ca3af'
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
    )
  }
)
FloatingInput.displayName = 'FloatingInput'

// Floating Textarea Component
export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, error, required, variant = 'default', size = 'default', state, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    
    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
      if (props.onBlur) props.onBlur(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value)
      if (props.onChange) props.onChange(e)
    }

    const shouldFloatLabel = isFocused || hasValue || !!props.value
    const appliedState = error ? 'error' : state
    
    // Textarea-specific config
    const textareaClassName = cn(
      'peer w-full rounded-xl border transition-all duration-300 placeholder-transparent resize-none',
      system.generateClassName(variant, size, appliedState, 'pt-6 pb-2 min-h-[120px]'),
      className
    )
    
    // Get label styles (same as input but with different top position)
    const getLabelStyles = () => {
      const baseStyles = "absolute left-3 px-1 pointer-events-none transition-all duration-300 origin-left backdrop-blur-sm rounded"
      const variantStyles = {
        default: shouldFloatLabel 
          ? "-top-2.5 text-sm text-cyan-400 bg-gray-800/90" 
          : "top-6 text-base text-gray-400 bg-transparent",
        light: shouldFloatLabel 
          ? "-top-2.5 text-sm text-blue-600 bg-white/90" 
          : "top-6 text-base text-gray-600 bg-transparent",
        modal: shouldFloatLabel 
          ? "-top-2.5 text-sm text-blue-400 bg-gray-700/90" 
          : "top-6 text-base text-gray-400 bg-transparent",
        minimal: shouldFloatLabel 
          ? "-top-2.5 text-sm text-current bg-background/90" 
          : "top-6 text-base text-muted-foreground bg-transparent"
      }
      
      const errorStyles = error && shouldFloatLabel ? "text-red-400" : ""
      return cn(baseStyles, variantStyles[variant], errorStyles)
    }

    return (
      <div className="relative">
        <div className="relative">
          <textarea
            ref={ref}
            className={textareaClassName}
            placeholder=" "
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          <motion.label
            className={getLabelStyles()}
            animate={{
              scale: shouldFloatLabel ? 0.9 : 1,
              color: shouldFloatLabel 
                ? (error ? '#f87171' : variant === 'light' ? '#2563eb' : variant === 'modal' ? '#60a5fa' : '#22d3ee') 
                : variant === 'light' ? '#6b7280' : '#9ca3af'
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
    )
  }
)
FloatingTextarea.displayName = 'FloatingTextarea'