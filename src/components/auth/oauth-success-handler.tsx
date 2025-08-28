"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthActions } from "@/lib/store/auth"
import { authApi } from "@/lib/api/auth"
import { toast } from "sonner"

export function OAuthSuccessHandler() {
  const router = useRouter()
  const { login, setStatus } = useAuthActions()

  useEffect(() => {
    const checkOAuthSuccess = async () => {
      // Check URL for OAuth success indicators
      const urlParams = new URLSearchParams(window.location.search)
      const authSuccess = urlParams.get('auth')
      const provider = urlParams.get('provider')
      
      // Check localStorage for OAuth success message
      const oauthSuccess = localStorage.getItem('oauth_success')
      
      if (authSuccess === 'success' || oauthSuccess) {
        try {
          setStatus('loading')
          
          // Backend should have set JWT tokens after OAuth callback
          // Call /auth/me to get user info and verify authentication
          const response = await authApi.me()
          
          console.log('🔍 OAuth /auth/me response:', response)
          console.log('🔍 User data:', response.data)
          
          if (response.data) {
            login(response.data)
            toast.success(`Successfully signed in with ${provider || 'social account'}!`)
            
            // Clean up URL and localStorage
            if (authSuccess) {
              urlParams.delete('auth')
              urlParams.delete('provider')
              const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '')
              window.history.replaceState({}, '', newUrl)
            }
            
            if (oauthSuccess) {
              localStorage.removeItem('oauth_success')
            }
          }
        } catch (error) {
          console.error('OAuth verification failed:', error)
          toast.error('Authentication failed. Please try again.')
          setStatus('unauthenticated')
        }
      }
    }

    checkOAuthSuccess()
  }, [login, setStatus, router])

  return null // This component doesn't render anything
}