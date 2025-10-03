// Checkbox System - OOP Architecture for Checkbox Components (SSR Compatible)
import React, { forwardRef } from 'react'
import { InputSystem, BaseInputConfig } from '../core/BaseInput'
import { cn } from '@/lib/utils'
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon, MinusIcon } from "lucide-react"

// Checkbox Configuration
const checkboxConfig: BaseInputConfig = {
  variants: {
    default: 'border-primary text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    secondary: 'border-secondary text-secondary-foreground data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground',
    accent: 'border-accent text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground',
    success: 'border-green-500 text-white data-[state=checked]:bg-green-500 data-[state=checked]:text-white',
    warning: 'border-yellow-500 text-white data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white',
    destructive: 'border-destructive text-destructive-foreground data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground'
  },
  sizes: {
    sm: 'h-3 w-3',
    default: 'h-4 w-4',
    lg: 'h-5 w-5'
  },
  states: {
    default: 'border-input bg-background shadow',
    focused: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    error: 'border-destructive data-[state=checked]:bg-destructive',
    disabled: 'disabled:cursor-not-allowed disabled:opacity-50',
    success: 'border-green-500 data-[state=checked]:bg-green-500'
  },
  defaultVariant: 'default',
  defaultSize: 'default',
  defaultState: 'default',
  baseStyles: 'peer shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
}

// Icon sizes for different checkbox sizes
const iconSizes = {
  sm: 'h-2.5 w-2.5',
  default: 'h-3 w-3',
  lg: 'h-4 w-4'
}

// Checkbox System Class
export class CheckboxSystem extends InputSystem {
  constructor() {
    super(checkboxConfig)
  }

  createInputComponent() {
    return Checkbox
  }

  getIconClassName(size: string = 'default'): string {
    return iconSizes[size as keyof typeof iconSizes] || iconSizes.default
  }
}

// Checkbox Types
export type CheckboxVariant = 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'
export type CheckboxSize = 'sm' | 'default' | 'lg'
export type CheckboxState = 'default' | 'focused' | 'error' | 'disabled' | 'success'

export interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  variant?: CheckboxVariant
  size?: CheckboxSize
  state?: CheckboxState
  error?: string
  label?: string
  description?: string
}

// Create system instance
const system = new CheckboxSystem()

// Checkbox Component
export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant = 'default', size = 'default', state = 'default', error, ...props }, ref) => {
  const appliedState = error ? 'error' : state
  const generatedClassName = system.generateClassName(variant, size, appliedState, className)
  const iconClassName = system.getIconClassName(size)

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={generatedClassName}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {props.checked === 'indeterminate' ? (
          <MinusIcon className={iconClassName} />
        ) : (
          <CheckIcon className={iconClassName} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = 'Checkbox'

// Checkbox with Label Component
export const CheckboxWithLabel = forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxProps
>(({ label, description, className, ...props }, ref) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox ref={ref} {...props} />
      <div className="grid gap-1.5 leading-none">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
})
CheckboxWithLabel.displayName = 'CheckboxWithLabel'

// Checkbox Group Component
export interface CheckboxGroupProps {
  value?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  variant?: CheckboxVariant
  size?: CheckboxSize
  className?: string
  children: React.ReactNode
}

export const CheckboxGroup = forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(({ value = [], onValueChange, disabled, variant, size, className, children }, ref) => {
  const handleCheckedChange = React.useCallback(
    (itemValue: string, checked: boolean) => {
      if (!onValueChange) return
      
      if (checked) {
        onValueChange([...value, itemValue])
      } else {
        onValueChange(value.filter(v => v !== itemValue))
      }
    },
    [value, onValueChange]
  )

  return (
    <div ref={ref} className={cn('space-y-2', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<CheckboxProps>(child)) {
          const childValue = child.props.value as string
          return React.cloneElement(child, {
            checked: value.includes(childValue),
            onCheckedChange: (checked: boolean) => handleCheckedChange(childValue, checked),
            disabled: disabled || child.props.disabled,
            variant: variant || child.props.variant,
            size: size || child.props.size,
          })
        }
        return child
      })}
    </div>
  )
})
CheckboxGroup.displayName = 'CheckboxGroup'

// Checkbox Group Item Component
export interface CheckboxGroupItemProps extends CheckboxProps {
  value: string
}

export const CheckboxGroupItem = forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxGroupItemProps
>(({ value, ...props }, ref) => {
  return <CheckboxWithLabel ref={ref} {...props} />
})
CheckboxGroupItem.displayName = 'CheckboxGroupItem'

// Controlled Checkbox Hook
export const useCheckbox = (defaultValue: boolean = false) => {
  const [checked, setChecked] = React.useState(defaultValue)
  
  const toggle = React.useCallback(() => {
    setChecked(prev => !prev)
  }, [])

  const reset = React.useCallback(() => {
    setChecked(defaultValue)
  }, [defaultValue])

  return {
    checked,
    setChecked,
    toggle,
    reset,
    props: {
      checked,
      onCheckedChange: setChecked
    }
  }
}

// Controlled Checkbox Group Hook
export const useCheckboxGroup = (defaultValue: string[] = []) => {
  const [value, setValue] = React.useState<string[]>(defaultValue)

  const addItem = React.useCallback((item: string) => {
    setValue(prev => prev.includes(item) ? prev : [...prev, item])
  }, [])

  const removeItem = React.useCallback((item: string) => {
    setValue(prev => prev.filter(v => v !== item))
  }, [])

  const toggleItem = React.useCallback((item: string) => {
    setValue(prev => 
      prev.includes(item) 
        ? prev.filter(v => v !== item)
        : [...prev, item]
    )
  }, [])

  const clear = React.useCallback(() => {
    setValue([])
  }, [])

  const reset = React.useCallback(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return {
    value,
    setValue,
    addItem,
    removeItem,
    toggleItem,
    clear,
    reset,
    props: {
      value,
      onValueChange: setValue
    }
  }
}