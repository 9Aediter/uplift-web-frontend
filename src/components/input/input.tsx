// Main Input Component - OOP Input System (SSR Compatible)
import React from 'react'
import { DefaultInput, DefaultTextarea } from './systems/DefaultInputSystem'
import { FloatingInput, FloatingTextarea } from './systems/FloatingInputSystem'
import { PasswordInput, DefaultPasswordInput, FloatingPasswordInput } from './systems/PasswordInputSystem'

// Main Input Component (defaults to Default system)
export const Input = DefaultInput
export type InputProps = React.ComponentProps<typeof DefaultInput>

// Export all input systems
export {
  // Default System
  DefaultInput,
  DefaultTextarea,
  
  // Floating System  
  FloatingInput,
  FloatingTextarea,
  
  // Password System
  PasswordInput,
  DefaultPasswordInput,
  FloatingPasswordInput,
}

// Re-export types from systems
export type { 
  DefaultInputVariant, 
  DefaultInputSize,
  DefaultInputState,
  DefaultInputProps,
  DefaultTextareaProps
} from './systems/DefaultInputSystem'

export type { 
  FloatingInputVariant, 
  FloatingInputSize,
  FloatingInputState,
  FloatingInputProps,
  FloatingTextareaProps
} from './systems/FloatingInputSystem'

export type { 
  PasswordInputVariant, 
  PasswordInputSize,
  PasswordInputProps
} from './systems/PasswordInputSystem'

// Input System Factory for dynamic usage
export { InputFactory } from './core/BaseInput'

// Main Textarea Component
export const Textarea = DefaultTextarea
export type TextareaProps = React.ComponentProps<typeof DefaultTextarea>