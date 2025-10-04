// Main Button Component - SSR Compatible
import { ShadcnButton, ShadcnButtonProps } from './systems/ShadcnButtonSystem'
import { CustomButton, CustomButtonProps } from './systems/CustomButtonSystem'
import { NavbarButton, NavbarButtonProps } from './systems/NavbarButtonSystem'
import { SpecializedButton, SpecializedButtonProps, ConsultButton } from './systems/SpecializedButtonSystem'

// Main Button Component (defaults to Shadcn system)
export const Button = ShadcnButton
export type ButtonProps = ShadcnButtonProps

// Export all button systems
export {
  // Shadcn System
  ShadcnButton,
  type ShadcnButtonProps,
  
  // Custom System
  CustomButton,
  type CustomButtonProps,
  
  // Navbar System
  NavbarButton,
  type NavbarButtonProps,
  
  // Specialized System
  SpecializedButton,
  ConsultButton,
  type SpecializedButtonProps,
}

// Re-export types from systems
export type { 
  ShadcnButtonVariant, 
  ShadcnButtonSize 
} from './systems/ShadcnButtonSystem'

export type { 
  CustomButtonVariant, 
  CustomButtonSize 
} from './systems/CustomButtonSystem'

export type { 
  NavbarButtonVariant, 
  NavbarButtonSize 
} from './systems/NavbarButtonSystem'

export type { 
  SpecializedButtonVariant, 
  SpecializedButtonSize 
} from './systems/SpecializedButtonSystem'

// Button System Factory for dynamic usage
export { ButtonFactory } from './core/BaseButton'