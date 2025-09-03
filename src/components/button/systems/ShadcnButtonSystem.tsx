// No "use client" - SSR-compatible
import { ButtonSystem, BaseButtonConfig, createButtonComponent, BaseButtonProps } from '../core/BaseButton'

// Shadcn Button System Configuration
const shadcnButtonConfig: BaseButtonConfig = {
  baseStyles: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  },
  sizes: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  },
  defaultVariant: "default",
  defaultSize: "default"
}

// Shadcn Button System Class
export class ShadcnButtonSystem extends ButtonSystem {
  constructor() {
    super(shadcnButtonConfig)
  }

  createComponent() {
    return createButtonComponent(this)
  }

  // Additional Shadcn-specific methods
  getDestructiveVariants(): string[] {
    return ['destructive']
  }

  getPrimaryVariants(): string[] {
    return ['default', 'destructive']
  }

  getSecondaryVariants(): string[] {
    return ['outline', 'secondary', 'ghost', 'link']
  }
}

// Export the system instance and component
export const shadcnButtonSystem = new ShadcnButtonSystem()
export const ShadcnButton = shadcnButtonSystem.createComponent()

// Type exports for better TypeScript support
export type ShadcnButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
export type ShadcnButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ShadcnButtonProps extends BaseButtonProps {
  variant?: ShadcnButtonVariant
  size?: ShadcnButtonSize
}