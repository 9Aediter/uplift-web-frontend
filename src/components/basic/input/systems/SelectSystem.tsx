// Select System - OOP Architecture for Select Components (SSR Compatible)
import React, { forwardRef } from 'react'
import { InputSystem, BaseInputConfig } from '../core/BaseInput'
import { cn } from '@/lib/utils'
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

// Select Configuration
const selectConfig: BaseInputConfig = {
  variants: {
    default: 'bg-transparent border-input hover:bg-muted/50',
    filled: 'bg-muted/50 border-input hover:bg-muted/70',
    ghost: 'border-transparent bg-transparent hover:bg-muted/50',
    outline: 'border-2 border-input bg-transparent hover:border-ring'
  },
  sizes: {
    sm: 'h-8 px-3 py-1 text-sm',
    default: 'h-9 px-3 py-2 text-sm',
    lg: 'h-10 px-4 py-2 text-base'
  },
  states: {
    default: 'text-foreground',
    focused: 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    error: 'border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
    disabled: 'disabled:cursor-not-allowed disabled:opacity-50',
    success: 'border-green-500 focus-visible:border-green-500'
  },
  defaultVariant: 'default',
  defaultSize: 'default',
  defaultState: 'default',
  baseStyles: 'flex w-fit items-center justify-between gap-2 rounded-md border whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-[placeholder]:text-muted-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground dark:bg-input/30'
}

// Select System Class
export class SelectSystem extends InputSystem {
  constructor() {
    super(selectConfig)
  }

  createInputComponent() {
    return SelectTrigger
  }

  createSelectComponent() {
    return Select
  }
}

// Select Types
export type SelectVariant = 'default' | 'filled' | 'ghost' | 'outline'
export type SelectSize = 'sm' | 'default' | 'lg'
export type SelectState = 'default' | 'focused' | 'error' | 'disabled' | 'success'

export interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {}

export interface SelectTriggerProps extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  variant?: SelectVariant
  size?: SelectSize
  state?: SelectState
  error?: string
}

export interface SelectContentProps extends React.ComponentProps<typeof SelectPrimitive.Content> {}
export interface SelectItemProps extends React.ComponentProps<typeof SelectPrimitive.Item> {}
export interface SelectLabelProps extends React.ComponentProps<typeof SelectPrimitive.Label> {}
export interface SelectSeparatorProps extends React.ComponentProps<typeof SelectPrimitive.Separator> {}

// Create system instance
const system = new SelectSystem()

// Select Root Component - TODO: Fix type issues
// export const Select = forwardRef<
//   React.ElementRef<typeof SelectPrimitive.Root>,
//   SelectProps
// >(({ ...props }, ref) => {
//   return <SelectPrimitive.Root data-slot="select" {...props} />
// })
// Select.displayName = 'Select'

// Temporary fallback
export const Select = SelectPrimitive.Root

// Select Group Component
export const SelectGroup = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Group>,
  React.ComponentProps<typeof SelectPrimitive.Group>
>(({ ...props }, ref) => {
  return <SelectPrimitive.Group data-slot="select-group" ref={ref} {...props} />
})
SelectGroup.displayName = 'SelectGroup'

// Select Value Component
export const SelectValue = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentProps<typeof SelectPrimitive.Value>
>(({ ...props }, ref) => {
  return <SelectPrimitive.Value data-slot="select-value" ref={ref} {...props} />
})
SelectValue.displayName = 'SelectValue'

// Select Trigger Component
export const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant = 'default', size = 'default', state = 'default', error, children, ...props }, ref) => {
  const appliedState = error ? 'error' : state
  const generatedClassName = system.generateClassName(variant, size, appliedState, className)

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        generatedClassName,
        '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4'
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = 'SelectTrigger'

// Select Content Component
export const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = 'SelectContent'

// Select Label Component
export const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
    {...props}
  />
))
SelectLabel.displayName = 'SelectLabel'

// Select Item Component
export const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = 'SelectItem'

// Select Separator Component
export const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
    {...props}
  />
))
SelectSeparator.displayName = 'SelectSeparator'

// Select Scroll Buttons
export const SelectScrollUpButton = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    data-slot="select-scroll-up-button"
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUpIcon className="size-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = 'SelectScrollUpButton'

export const SelectScrollDownButton = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    data-slot="select-scroll-down-button"
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDownIcon className="size-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = 'SelectScrollDownButton'