// No "use client" - SSR-compatible
import React, { forwardRef } from 'react'
import Link from 'next/link'
import { ButtonSystem, BaseButtonConfig, BaseButtonProps } from '../core/BaseButton'

// Navbar Button System Configuration
const navbarButtonConfig: BaseButtonConfig = {
  baseStyles: "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center",
  variants: {
    primary: "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:bg-primary/90",
    secondary: "bg-transparent text-foreground shadow-none",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
    ghost: "text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
  },
  sizes: {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-6 py-3 text-base"
  },
  defaultVariant: "primary",
  defaultSize: "default"
}

// Extended props for Navbar Button (supports both button and link)
export interface NavbarButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  href?: string
}

// Navbar Button System Class
export class NavbarButtonSystem extends ButtonSystem {
  constructor() {
    super(navbarButtonConfig)
  }

  createComponent() {
    return forwardRef<HTMLButtonElement | HTMLAnchorElement, NavbarButtonProps>(
      ({ className, variant, size, href, children, ...props }, ref) => {
        const generatedClassName = this.generateClassName(variant, size, className)

        if (href) {
          // Render as Link
          return (
            <Link 
              href={href} 
              className={generatedClassName}
              ref={ref as React.Ref<HTMLAnchorElement>}
              {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
              {children}
            </Link>
          )
        }

        // Render as Button
        return (
          <button
            className={generatedClassName}
            ref={ref as React.Ref<HTMLButtonElement>}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          >
            {children}
          </button>
        )
      }
    )
  }

  // Additional Navbar-specific methods
  getLinkVariants(): string[] {
    return ['primary', 'secondary', 'ghost']
  }

  getHighContrastVariants(): string[] {
    return ['primary', 'dark', 'gradient']
  }

  getShadowVariants(): string[] {
    return ['primary', 'dark']
  }
}

// Export the system instance and component
export const navbarButtonSystem = new NavbarButtonSystem()
export const NavbarButton = navbarButtonSystem.createComponent()

// Type exports
export type NavbarButtonVariant = 'primary' | 'secondary' | 'dark' | 'gradient' | 'ghost'
export type NavbarButtonSize = 'default' | 'sm' | 'lg'