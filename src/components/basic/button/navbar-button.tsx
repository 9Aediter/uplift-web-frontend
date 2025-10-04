// Functional Navbar Button - SSR Compatible
import React, { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type NavbarButtonVariant = 'primary' | 'secondary' | 'dark' | 'gradient' | 'ghost'
export type NavbarButtonSize = 'default' | 'sm' | 'lg'

export interface NavbarButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: NavbarButtonVariant
  size?: NavbarButtonSize
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}

const baseStyles = "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center"

const variantStyles: Record<NavbarButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:bg-primary/90",
  secondary: "bg-transparent text-foreground shadow-none",
  dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
  gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  ghost: "text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
}

const sizeStyles: Record<NavbarButtonSize, string> = {
  default: "px-4 py-2",
  sm: "px-3 py-1.5 text-sm",
  lg: "px-6 py-3 text-base"
}

export const NavbarButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, NavbarButtonProps>(
  ({ className, variant = 'primary', size = 'default', href, children, onClick, ...props }, ref) => {
    const classes = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    )

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    )
  }
)

NavbarButton.displayName = 'NavbarButton'
