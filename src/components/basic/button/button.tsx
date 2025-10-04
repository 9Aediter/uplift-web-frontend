// Main Button Component - SSR Compatible
import { ShadcnButton, type ShadcnButtonProps, type ShadcnButtonVariant, type ShadcnButtonSize } from './shadcn-button'
import { CustomButton, type CustomButtonProps, type CustomButtonVariant, type CustomButtonSize } from './custom-button'
import { NavbarButton, type NavbarButtonProps, type NavbarButtonVariant, type NavbarButtonSize } from './navbar-button'
import { SpecializedButton, ConsultButton, type SpecializedButtonProps, type SpecializedButtonVariant, type SpecializedButtonSize } from './specialized-button'

// Main Button Component (defaults to Shadcn system)
export const Button = ShadcnButton
export type ButtonProps = ShadcnButtonProps

// Export all button systems
export {
  // Shadcn System
  ShadcnButton,
  type ShadcnButtonProps,
  type ShadcnButtonVariant,
  type ShadcnButtonSize,

  // Custom System
  CustomButton,
  type CustomButtonProps,
  type CustomButtonVariant,
  type CustomButtonSize,

  // Navbar System
  NavbarButton,
  type NavbarButtonProps,
  type NavbarButtonVariant,
  type NavbarButtonSize,

  // Specialized System
  SpecializedButton,
  ConsultButton,
  type SpecializedButtonProps,
  type SpecializedButtonVariant,
  type SpecializedButtonSize,
}
