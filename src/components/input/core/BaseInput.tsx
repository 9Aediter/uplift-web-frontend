// Base Input System - OOP Architecture for Input Components (SSR Compatible)
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// Base Input Interface
export interface BaseInputConfig {
  variants: Record<string, string>
  sizes: Record<string, string>
  states: Record<string, string>
  defaultVariant: string
  defaultSize: string
  defaultState: string
  baseStyles: string
}

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: string
  size?: string
  state?: string
  label?: string
  error?: string
  children?: React.ReactNode
  className?: string
  required?: boolean
}

export interface BaseTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: string
  size?: string
  state?: string
  label?: string
  error?: string
  className?: string
  required?: boolean
}

// Base Input System Class
export abstract class InputSystem {
  protected config: BaseInputConfig

  constructor(config: BaseInputConfig) {
    this.config = config
  }

  // Generate className based on variant, size, and state
  generateClassName(variant?: string, size?: string, state?: string, additionalClasses?: string): string {
    const selectedVariant = variant || this.config.defaultVariant
    const selectedSize = size || this.config.defaultSize
    const selectedState = state || this.config.defaultState

    const variantStyles = this.config.variants[selectedVariant] || this.config.variants[this.config.defaultVariant]
    const sizeStyles = this.config.sizes[selectedSize] || this.config.sizes[this.config.defaultSize]
    const stateStyles = this.config.states[selectedState] || this.config.states[this.config.defaultState]

    return cn(
      this.config.baseStyles,
      variantStyles,
      sizeStyles,
      stateStyles,
      additionalClasses
    )
  }

  // Get available variants
  getVariants(): string[] {
    return Object.keys(this.config.variants)
  }

  // Get available sizes
  getSizes(): string[] {
    return Object.keys(this.config.sizes)
  }

  // Get available states
  getStates(): string[] {
    return Object.keys(this.config.states)
  }

  // Validate variant
  isValidVariant(variant: string): boolean {
    return this.config.variants.hasOwnProperty(variant)
  }

  // Validate size
  isValidSize(size: string): boolean {
    return this.config.sizes.hasOwnProperty(size)
  }

  // Validate state
  isValidState(state: string): boolean {
    return this.config.states.hasOwnProperty(state)
  }

  // Abstract method for creating the input component
  abstract createInputComponent(): any

  // Abstract method for creating textarea component (optional)
  createTextareaComponent?(): any
}

// Factory function to create input component from InputSystem
export function createInputComponent(inputSystem: InputSystem) {
  return forwardRef<HTMLInputElement, BaseInputProps>(
    ({ className, variant, size, state, error, ...props }, ref) => {
      const appliedState = error ? 'error' : state
      const generatedClassName = inputSystem.generateClassName(variant, size, appliedState, className)

      return (
        <input
          className={generatedClassName}
          ref={ref}
          {...props}
        />
      )
    }
  )
}

// Factory function to create textarea component from InputSystem
export function createTextareaComponent(inputSystem: InputSystem) {
  return forwardRef<HTMLTextAreaElement, BaseTextareaProps>(
    ({ className, variant, size, state, error, ...props }, ref) => {
      const appliedState = error ? 'error' : state
      const generatedClassName = inputSystem.generateClassName(variant, size, appliedState, className)

      return (
        <textarea
          className={generatedClassName}
          ref={ref}
          {...props}
        />
      )
    }
  )
}

// Input Factory Class
export class InputFactory {
  private static systems: Map<string, InputSystem> = new Map()

  static registerSystem(name: string, system: InputSystem): void {
    this.systems.set(name, system)
  }

  static getSystem(name: string): InputSystem | undefined {
    return this.systems.get(name)
  }

  static createInput(systemName: string): React.ForwardRefExoticComponent<BaseInputProps & React.RefAttributes<HTMLInputElement>> | null {
    const system = this.getSystem(systemName)
    if (!system) {
      console.error(`Input system "${systemName}" not found`)
      return null
    }
    return createInputComponent(system)
  }

  static createTextarea(systemName: string): React.ForwardRefExoticComponent<BaseTextareaProps & React.RefAttributes<HTMLTextAreaElement>> | null {
    const system = this.getSystem(systemName)
    if (!system) {
      console.error(`Input system "${systemName}" not found`)
      return null
    }
    return createTextareaComponent(system)
  }

  static getAllSystems(): string[] {
    return Array.from(this.systems.keys())
  }
}