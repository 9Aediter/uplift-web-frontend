// Functional Custom Button - SSR Compatible
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export type CustomButtonVariant = 'primary' | 'secondary' | 'outline'
export type CustomButtonSize = 'sm' | 'md' | 'lg'

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CustomButtonVariant
  size?: CustomButtonSize
}

const baseStyles = "relative font-medium rounded-md inline-flex items-center justify-center transition-all duration-300 overflow-hidden group whitespace-nowrap gap-2"

const variantStyles: Record<CustomButtonVariant, string> = {
  primary: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 hover:from-cyan-600 hover:to-blue-600",
  secondary: "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 hover:from-fuchsia-600 hover:to-pink-600",
  outline: "border-2 border-cyan-500 text-cyan-600 bg-transparent hover:bg-cyan-50 hover:text-cyan-700 dark:hover:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-400 dark:hover:text-cyan-300"
}

const sizeStyles: Record<CustomButtonSize, string> = {
  sm: "h-8 px-3 py-1 text-sm",
  md: "h-10 px-4 py-2 text-base",
  lg: "h-12 px-6 py-3 text-lg"
}

export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

CustomButton.displayName = 'CustomButton'
