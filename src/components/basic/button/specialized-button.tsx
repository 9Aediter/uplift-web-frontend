// Functional Specialized Button - SSR Compatible
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export type SpecializedButtonVariant = 'consult' | 'cta' | 'danger' | 'success'
export type SpecializedButtonSize = 'default' | 'sm' | 'lg'

export interface SpecializedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SpecializedButtonVariant
  size?: SpecializedButtonSize
  buttonText?: string // For backward compatibility with ConsultButton
  onCustomClick?: () => void // Custom click handler
}

const baseStyles = "rounded-lg font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap"

const variantStyles: Record<SpecializedButtonVariant, string> = {
  consult: "bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-600 hover:to-gray-500",
  cta: "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl",
  danger: "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700",
  success: "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600"
}

const sizeStyles: Record<SpecializedButtonSize, string> = {
  default: "px-6 py-3",
  sm: "px-4 py-2 text-sm",
  lg: "px-8 py-4 text-lg"
}

export const SpecializedButton = forwardRef<HTMLButtonElement, SpecializedButtonProps>(
  ({
    className,
    variant = 'consult',
    size = 'default',
    children,
    buttonText,
    onCustomClick,
    onClick,
    ...props
  }, ref) => {
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
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {content}
      </button>
    )
  }
)

SpecializedButton.displayName = 'SpecializedButton'

// Backward compatibility - ConsultButton alias
export const ConsultButton = forwardRef<HTMLButtonElement, SpecializedButtonProps>(
  (props, ref) => <SpecializedButton {...props} variant="consult" ref={ref} />
)

ConsultButton.displayName = 'ConsultButton'
