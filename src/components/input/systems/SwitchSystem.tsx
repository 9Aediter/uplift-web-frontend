// Switch System - OOP Architecture for Switch Components (SSR Compatible)
import React, { forwardRef } from 'react'
import { InputSystem, BaseInputConfig } from '../core/BaseInput'
import { cn } from '@/lib/utils'
import * as SwitchPrimitives from "@radix-ui/react-switch"

// Switch Configuration
const switchConfig: BaseInputConfig = {
  variants: {
    default: 'bg-input data-[state=checked]:bg-primary',
    accent: 'bg-input data-[state=checked]:bg-accent',
    success: 'bg-input data-[state=checked]:bg-green-500',
    warning: 'bg-input data-[state=checked]:bg-yellow-500',
    destructive: 'bg-input data-[state=checked]:bg-destructive'
  },
  sizes: {
    sm: 'h-4 w-7',
    default: 'h-5 w-9',
    lg: 'h-6 w-11'
  },
  states: {
    default: 'border-2 border-transparent',
    focused: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    error: 'border-destructive',
    disabled: 'disabled:cursor-not-allowed disabled:opacity-50',
    success: 'border-green-500'
  },
  defaultVariant: 'default',
  defaultSize: 'default',
  defaultState: 'default',
  baseStyles: 'peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'
}

// Switch thumb configurations
const thumbSizes = {
  sm: 'h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0',
  default: 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
  lg: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
}

// Switch System Class
export class SwitchSystem extends InputSystem {
  constructor() {
    super(switchConfig)
  }

  createInputComponent() {
    return Switch
  }

  getThumbClassName(size: string = 'default'): string {
    const baseThumb = 'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform'
    const sizeThumb = thumbSizes[size as keyof typeof thumbSizes] || thumbSizes.default
    return cn(baseThumb, sizeThumb)
  }
}

// Switch Types
export type SwitchVariant = 'default' | 'accent' | 'success' | 'warning' | 'destructive'
export type SwitchSize = 'sm' | 'default' | 'lg'
export type SwitchState = 'default' | 'focused' | 'error' | 'disabled' | 'success'

export interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitives.Root> {
  variant?: SwitchVariant
  size?: SwitchSize
  state?: SwitchState
  error?: string
  label?: string
  description?: string
}

// Create system instance
const system = new SwitchSystem()

// Switch Component
export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant = 'default', size = 'default', state = 'default', error, ...props }, ref) => {
  const appliedState = error ? 'error' : state
  const generatedClassName = system.generateClassName(variant, size, appliedState, className)
  const thumbClassName = system.getThumbClassName(size)

  return (
    <SwitchPrimitives.Root
      className={generatedClassName}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={thumbClassName} />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = 'Switch'

// Switch with Label Component
export const SwitchWithLabel = forwardRef<
  React.ElementRef<typeof Switch>,
  SwitchProps
>(({ label, description, className, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-3">
      <Switch ref={ref} {...props} />
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
})
SwitchWithLabel.displayName = 'SwitchWithLabel'

// Controlled Switch Hook
export const useSwitch = (defaultValue: boolean = false) => {
  const [checked, setChecked] = React.useState(defaultValue)
  
  const toggle = React.useCallback(() => {
    setChecked(prev => !prev)
  }, [])

  const reset = React.useCallback(() => {
    setChecked(defaultValue)
  }, [defaultValue])

  return {
    checked,
    setChecked,
    toggle,
    reset,
    props: {
      checked,
      onCheckedChange: setChecked
    }
  }
}