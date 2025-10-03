// Default Input System - Shadcn/UI Style (SSR Compatible)
import React, { forwardRef } from 'react'
import { InputSystem, BaseInputConfig, BaseInputProps, BaseTextareaProps, createInputComponent, createTextareaComponent } from '../core/BaseInput'

// Default Input Configuration
const defaultInputConfig: BaseInputConfig = {
  variants: {
    default: 'bg-transparent border-input',
    filled: 'bg-muted/50 border-input',
    ghost: 'border-transparent bg-transparent hover:bg-muted/50',
    underlined: 'border-0 border-b border-input bg-transparent rounded-none px-0'
  },
  sizes: {
    sm: 'h-8 px-3 py-1 text-sm',
    default: 'h-9 px-3 py-1 text-base md:text-sm',
    lg: 'h-10 px-4 py-2 text-base'
  },
  states: {
    default: 'text-foreground',
    focused: 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    error: 'border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 text-destructive',
    disabled: 'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    success: 'border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20'
  },
  defaultVariant: 'default',
  defaultSize: 'default',
  defaultState: 'default',
  baseStyles: 'flex w-full min-w-0 rounded-md border transition-[color,box-shadow] outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground shadow-xs dark:bg-input/30'
}

// Default Input System Class
export class DefaultInputSystem extends InputSystem {
  constructor() {
    super(defaultInputConfig)
  }

  createInputComponent() {
    return createInputComponent(this)
  }

  createTextareaComponent() {
    const textareaConfig: BaseInputConfig = {
      ...defaultInputConfig,
      baseStyles: 'flex field-sizing-content min-h-16 w-full rounded-md border transition-[color,box-shadow] outline-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground shadow-xs dark:bg-input/30 resize-none',
      sizes: {
        sm: 'min-h-12 px-3 py-2 text-sm',
        default: 'min-h-16 px-3 py-2 text-base md:text-sm', 
        lg: 'min-h-20 px-4 py-3 text-base'
      }
    }
    
    const textareaSystem = new DefaultInputSystem()
    textareaSystem['config'] = textareaConfig
    return createTextareaComponent(textareaSystem)
  }
}

// Default Input Types
export type DefaultInputVariant = 'default' | 'filled' | 'ghost' | 'underlined'
export type DefaultInputSize = 'sm' | 'default' | 'lg'
export type DefaultInputState = 'default' | 'focused' | 'error' | 'disabled' | 'success'

export interface DefaultInputProps extends BaseInputProps {
  variant?: DefaultInputVariant
  size?: DefaultInputSize
  state?: DefaultInputState
}

export interface DefaultTextareaProps extends BaseTextareaProps {
  variant?: DefaultInputVariant
  size?: DefaultInputSize
  state?: DefaultInputState
}

// Create Default Input and Textarea Components
const system = new DefaultInputSystem()

export const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  ({ className, variant, size, state, error, ...props }, ref) => {
    const appliedState = error ? 'error' : state
    const generatedClassName = system.generateClassName(variant, size, appliedState, className)
    
    return (
      <input
        className={generatedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
DefaultInput.displayName = 'DefaultInput'

export const DefaultTextarea = forwardRef<HTMLTextAreaElement, DefaultTextareaProps>(
  ({ className, variant, size, state, error, ...props }, ref) => {
    const appliedState = error ? 'error' : state
    const generatedClassName = system.generateClassName(variant, size, appliedState, className)
    
    return (
      <textarea
        className={generatedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
DefaultTextarea.displayName = 'DefaultTextarea'