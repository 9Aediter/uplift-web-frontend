'use client'

import React from 'react'
import { FloatingInput, FloatingTextarea, FloatingSelect } from '@/components/ui/floating-input'
import { cn } from '@/lib/utils'

interface ModalFloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

interface ModalFloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  required?: boolean
}

interface ModalFloatingSelectProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  error?: string
  required?: boolean
  placeholder?: string
  options?: Array<{ value: string; label: string }>
}

/**
 * Modal-themed FloatingInput - สีขาว/เทาแทนสีเขียว/ฟ้า
 */
export const ModalFloatingInput = React.forwardRef<HTMLInputElement, ModalFloatingInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="modal-floating-input">
        <style jsx>{`
          .modal-floating-input input {
            background: rgba(255, 255, 255, 0.05) !important;
            border-color: rgba(156, 163, 175, 0.5) !important;
            color: rgb(55, 65, 81) !important;
          }
          
          .dark .modal-floating-input input {
            background: rgba(55, 65, 81, 0.3) !important;
            border-color: rgba(156, 163, 175, 0.5) !important;
            color: rgb(255, 255, 255) !important;
          }
          
          .modal-floating-input input:focus {
            ring-color: rgba(59, 130, 246, 0.5) !important;
            border-color: rgba(59, 130, 246, 0.5) !important;
          }
          
          .modal-floating-input label[data-floating="true"] {
            color: rgb(59, 130, 246) !important;
            background: rgb(255, 255, 255) !important;
          }
          
          .dark .modal-floating-input label[data-floating="true"] {
            color: rgb(96, 165, 250) !important;
            background: rgb(31, 41, 55) !important;
          }
        `}</style>
        <FloatingInput
          ref={ref}
          className={cn("bg-white/5 border-gray-400/50 text-gray-700 dark:bg-gray-700/30 dark:text-white focus:ring-blue-500/50 focus:border-blue-500/50", className)}
          {...props}
        />
      </div>
    )
  }
)

ModalFloatingInput.displayName = "ModalFloatingInput"

/**
 * Modal-themed FloatingTextarea
 */
export const ModalFloatingTextarea = React.forwardRef<HTMLTextAreaElement, ModalFloatingTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="modal-floating-textarea">
        <style jsx>{`
          .modal-floating-textarea textarea {
            background: rgba(255, 255, 255, 0.05) !important;
            border-color: rgba(156, 163, 175, 0.5) !important;
            color: rgb(55, 65, 81) !important;
          }
          
          .dark .modal-floating-textarea textarea {
            background: rgba(55, 65, 81, 0.3) !important;
            border-color: rgba(156, 163, 175, 0.5) !important;
            color: rgb(255, 255, 255) !important;
          }
          
          .modal-floating-textarea textarea:focus {
            ring-color: rgba(59, 130, 246, 0.5) !important;
            border-color: rgba(59, 130, 246, 0.5) !important;
          }
          
          .modal-floating-textarea label[data-floating="true"] {
            color: rgb(59, 130, 246) !important;
            background: rgb(255, 255, 255) !important;
          }
          
          .dark .modal-floating-textarea label[data-floating="true"] {
            color: rgb(96, 165, 250) !important;
            background: rgb(31, 41, 55) !important;
          }
        `}</style>
        <FloatingTextarea
          ref={ref}
          className={cn("bg-white/5 border-gray-400/50 text-gray-700 dark:bg-gray-700/30 dark:text-white focus:ring-blue-500/50 focus:border-blue-500/50", className)}
          {...props}
        />
      </div>
    )
  }
)

ModalFloatingTextarea.displayName = "ModalFloatingTextarea"

/**
 * Modal-themed FloatingSelect
 */
export const ModalFloatingSelect: React.FC<ModalFloatingSelectProps> = (props) => {
  return (
    <div className="modal-floating-select">
      <style jsx>{`
        .modal-floating-select > div > div:first-child {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(156, 163, 175, 0.5) !important;
          color: rgb(55, 65, 81) !important;
        }
        
        .dark .modal-floating-select > div > div:first-child {
          background: rgba(55, 65, 81, 0.3) !important;
          border-color: rgba(156, 163, 175, 0.5) !important;
          color: rgb(255, 255, 255) !important;
        }
        
        .modal-floating-select label[data-floating="true"] {
          color: rgb(59, 130, 246) !important;
          background: rgb(255, 255, 255) !important;
        }
        
        .dark .modal-floating-select label[data-floating="true"] {
          color: rgb(96, 165, 250) !important;
          background: rgb(31, 41, 55) !important;
        }
      `}</style>
      <FloatingSelect {...props} />
    </div>
  )
}