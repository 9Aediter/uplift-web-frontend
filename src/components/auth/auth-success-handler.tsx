"use client"

import { useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

export function AuthSuccessHandler() {
  const { data: session, status } = useSession()
  const hasShownToast = useRef(false)

  useEffect(() => {
    // Show success toast when user successfully logs in with OAuth
    if (status === "authenticated" && session?.user?.authStatus && !hasShownToast.current) {
      const authStatus = session.user.authStatus
      
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
    }
  }, [status, session])

  return null // This component doesn't render anything
}