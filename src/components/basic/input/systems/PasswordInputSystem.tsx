// Password Input System - Toggle Visibility Style (SSR Compatible)
import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { InputSystem, BaseInputConfig, BaseInputProps } from '../core/BaseInput'
import { DefaultInputSystem } from './DefaultInputSystem'
import { FloatingInputSystem } from './FloatingInputSystem'
import { Button } from '@/components/basic/button/button'
import { cn } from '@/lib/utils'

// Password Input System Class (uses existing input systems as base)
export class PasswordInputSystem extends InputSystem {
  private baseSystem: InputSystem

  constructor(baseSystem: InputSystem) {
    super(baseSystem['config']) // Access protected config
    this.baseSystem = baseSystem
  }

  createInputComponent() {
    return this.baseSystem === defaultInputSystem ? DefaultPasswordInput : FloatingPasswordInput
  }
}

// Password Input Types
export type PasswordInputVariant = 'default' | 'floating'
export type PasswordInputSize = 'sm' | 'default' | 'lg'

export interface PasswordInputProps extends BaseInputProps {
  variant?: PasswordInputVariant
  size?: PasswordInputSize
  label?: string // For floating variant
}

// Create system instances
const defaultInputSystem = new DefaultInputSystem()
const floatingInputSystem = new FloatingInputSystem()

// Default Password Input Component
export const DefaultPasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, size = 'default', variant, state, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const appliedState = error ? 'error' : state
    const generatedClassName = defaultInputSystem.generateClassName('default', size, appliedState, cn('pr-10', className))

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={generatedClassName}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    )
  }
)
DefaultPasswordInput.displayName = 'DefaultPasswordInput'

// Floating Password Input Component  
export const FloatingPasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label = "Password", size = 'default', variant, state, error, required, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
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
    const generatedClassName = floatingInputSystem.generateClassName('default', size, appliedState, cn('pr-12', className))

    return (
      <div className="relative">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={generatedClassName}
            placeholder=" "
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            ref={ref}
            {...props}
          />

          <label
            className={cn(
              "absolute left-3 px-1 text-gray-400 pointer-events-none transition-all duration-300 origin-left bg-gray-800/90 backdrop-blur-sm rounded",
              shouldFloatLabel
                ? "-top-2.5 text-sm text-cyan-400 bg-gray-800/90"
                : "top-1/2 -translate-y-1/2 text-base bg-transparent",
              error && shouldFloatLabel && "text-red-400"
            )}
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-300"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-400 rounded-full" />
            {error}
          </p>
        )}
      </div>
    )
  }
)
FloatingPasswordInput.displayName = 'FloatingPasswordInput'

// Main Password Input Component with variant switching
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ variant = 'default', ...props }, ref) => {
    if (variant === 'floating') {
      return <FloatingPasswordInput {...props} ref={ref} />
    }
    return <DefaultPasswordInput {...props} ref={ref} />
  }
)
PasswordInput.displayName = 'PasswordInput'