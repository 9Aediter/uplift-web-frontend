"use client"

import { useEffect, useRef } from "react"
import { useAuth, useAuthActions } from "@/lib/store/auth"
import { toast } from "sonner"

export function AuthSuccessHandler() {
  const { user, status } = useAuth()
  const hasShownToast = useRef(false)
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    // Show success toast when user successfully logs in
    if (isAuthenticated && user && !hasShownToast.current) {
      // Check for auth success message in URL params or localStorage
      const urlParams = new URLSearchParams(window.location.search)
      const authStatus = urlParams.get('auth') || localStorage.getItem('auth_success_message')
      
      if (authStatus) {
        let message = ""
        switch (authStatus) {
          case "social_linked":
            message = "Link to Google success"
            break
          case "register_success":
            message = "Register success"
            break
          case "login_success":
            message = "Login success"
            break
          default:
            message = "Signed in successfully!"
        }
        
        toast.success(message)
        hasShownToast.current = true
        
        // Clean up
        localStorage.removeItem('auth_success_message')
        // Remove auth param from URL without page reload
        if (urlParams.has('auth')) {
          urlParams.delete('auth')
          const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '')
          window.history.replaceState({}, '', newUrl)
        }
      }
    }
  }, [isAuthenticated, user])

  return null // This component doesn't render anything
}