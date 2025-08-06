"use client"

import { Toaster } from "sonner"

export function SonnerProvider() {
  return (
    <Toaster
      position="top-center"
      expand={true}
      richColors={false}
      closeButton={true}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          color: 'white',
          fontWeight: '500',
        },
        classNames: {
          error: 'toast-error',
          success: 'toast-success',
          info: 'toast-info',
        },
      }}
    />
  )
}