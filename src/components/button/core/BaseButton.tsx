// No "use client" - This is a server-compatible module
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// Base Button Interface
export interface BaseButtonConfig {
  variants: Record<string, string>
  sizes: Record<string, string>
  defaultVariant: string
  defaultSize: string
  baseStyles: string
}

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string
  size?: string
  children?: React.ReactNode
  className?: string
  asChild?: boolean
}

// Base Button Class
export abstract class ButtonSystem {
  protected config: BaseButtonConfig

  constructor(config: BaseButtonConfig) {
    this.config = config
  }

  // Generate className based on variant and size
  generateClassName(variant?: string, size?: string, additionalClasses?: string): string {
    const selectedVariant = variant || this.config.defaultVariant
    const selectedSize = size || this.config.defaultSize

    const variantStyles = this.config.variants[selectedVariant] || this.config.variants[this.config.defaultVariant]
    const sizeStyles = this.config.sizes[selectedSize] || this.config.sizes[this.config.defaultSize]

    return cn(
      this.config.baseStyles,
      variantStyles,
      sizeStyles,
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

  // Validate variant
  isValidVariant(variant: string): boolean {
    return this.config.variants.hasOwnProperty(variant)
  }

  // Validate size
  isValidSize(size: string): boolean {
    return this.config.sizes.hasOwnProperty(size)
  }

  // Abstract method for creating the component
  abstract createComponent(): any
}

// Factory function to create button component from ButtonSystem
export function createButtonComponent(buttonSystem: ButtonSystem) {
  return forwardRef<HTMLButtonElement, BaseButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
      const generatedClassName = buttonSystem.generateClassName(variant, size, className)

      if (asChild && React.isValidElement(props.children)) {
        // Return children with applied classes (for compound components)
        const child = React.Children.only(props.children) as React.ReactElement<any>
        return React.cloneElement(child, {
          ...child.props,
          className: cn(child.props?.className, generatedClassName),
          ref
        })
      }

      return (
        <button
          className={generatedClassName}
          ref={ref}
          {...props}
        />
      )
    }
  )
}

// Button Factory Class
export class ButtonFactory {
  private static systems: Map<string, ButtonSystem> = new Map()

  static registerSystem(name: string, system: ButtonSystem): void {
    this.systems.set(name, system)
  }

  static getSystem(name: string): ButtonSystem | undefined {
    return this.systems.get(name)
  }

  static createButton(systemName: string): React.ForwardRefExoticComponent<BaseButtonProps & React.RefAttributes<HTMLButtonElement>> | null {
    const system = this.getSystem(systemName)
    if (!system) {
      console.error(`Button system "${systemName}" not found`)
      return null
    }
    return createButtonComponent(system)
  }

  static getAllSystems(): string[] {
    return Array.from(this.systems.keys())
  }
}