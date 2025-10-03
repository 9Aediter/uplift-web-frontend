// No "use client" - SSR-compatible
import React, { forwardRef } from 'react'
import { ButtonSystem, BaseButtonConfig, BaseButtonProps } from '../core/BaseButton'

// Specialized Button System Configuration
const specializedButtonConfig: BaseButtonConfig = {
  baseStyles: "rounded-lg font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap",
  variants: {
    consult: "bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-600 hover:to-gray-500",
    cta: "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl",
    danger: "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700",
    success: "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600"
  },
  sizes: {
    default: "px-6 py-3",
    sm: "px-4 py-2 text-sm",
    lg: "px-8 py-4 text-lg"
  },
  defaultVariant: "consult",
  defaultSize: "default"
}

// Extended props for Specialized buttons
export interface SpecializedButtonProps extends BaseButtonProps {
  variant?: 'consult' | 'cta' | 'danger' | 'success'
  size?: 'default' | 'sm' | 'lg'
  buttonText?: string // For backward compatibility with ConsultButton
  onCustomClick?: () => void // Custom click handler
}

// Specialized Button System Class
export class SpecializedButtonSystem extends ButtonSystem {
  constructor() {
    super(specializedButtonConfig)
  }

  createComponent() {
    return forwardRef<HTMLButtonElement, SpecializedButtonProps>(
      ({ 
        className, 
        variant = 'consult', 
        size, 
        children, 
        buttonText, 
        onCustomClick,
        onClick,
        ...props 
      }, ref) => {
        const generatedClassName = this.generateClassName(variant, size, className)
        
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
          if (onCustomClick) {
            onCustomClick()
          } else if (onClick) {
            onClick(e)
          } else if (variant === 'consult') {
            // Default consult behavior
            window.location.href = '/consult'
          }
        }

        // Support both children and buttonText for backward compatibility
        const content = children || buttonText || 'Button'

        return (
          <button
            className={generatedClassName}
            ref={ref}
            onClick={handleClick}
            {...props}
          >
            {content}
          </button>
        )
      }
    )
  }

  // Additional Specialized-specific methods
  getGradientVariants(): string[] {
    return ['consult', 'cta', 'danger', 'success']
  }

  getActionVariants(): string[] {
    return ['cta', 'danger', 'success']
  }

  // Method to get variant purpose
  getVariantPurpose(variant: string): string {
    const purposes: Record<string, string> = {
      consult: 'Consultation and contact actions',
      cta: 'Primary call-to-action buttons',
      danger: 'Destructive actions that need confirmation',
      success: 'Positive confirmation actions'
    }
    return purposes[variant] || 'General purpose'
  }
}

// Export the system instance and component
export const specializedButtonSystem = new SpecializedButtonSystem()
export const SpecializedButton = specializedButtonSystem.createComponent()

// Backward compatibility - ConsultButton alias
export const ConsultButton = forwardRef<HTMLButtonElement, SpecializedButtonProps>(
  (props, ref) => <SpecializedButton {...props} variant="consult" ref={ref} />
)

// Type exports
export type SpecializedButtonVariant = 'consult' | 'cta' | 'danger' | 'success'
export type SpecializedButtonSize = 'default' | 'sm' | 'lg'