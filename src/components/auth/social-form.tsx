"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authApi } from "@/lib/api/auth"
import { Button } from "@/components/basic/button/button"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { FaLine } from "react-icons/fa6"
import { liffHelper } from "@/lib/integrations/liff"
import { useAuthActions } from "@/lib/store/auth"

export function SocialForm() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [isLiffReady, setIsLiffReady] = useState(false)
  const router = useRouter()
  const { login, setStatus, setError } = useAuthActions()

  // Initialize LIFF on component mount
  useEffect(() => {
    const initLiff = async () => {
      try {
        if (typeof window !== 'undefined') {
          const isLoggedIn = await liffHelper.init()
          setIsLiffReady(true)

          // Auto-authenticate if already logged in to LINE
          if (isLoggedIn) {
            await handleLiffAuth()
          }
        }
      } catch (error) {
        console.warn('LIFF initialization failed:', error)
        setIsLiffReady(true) // Still allow other social logins
      }
    }

    initLiff()
  }, [])

  // Handle LIFF authentication
  const handleLiffAuth = async () => {
    try {
      setStatus('loading')

      const authData = await liffHelper.getAuthData()
      if (!authData) {
        throw new Error('Failed to get LINE authentication data')
      }

      // Send to backend
      const response = await authApi.lineAuth(authData.accessToken, authData.profile)
      const { user, message } = response.data

      // Update auth store
      login(user)

      toast.success(message || 'Successfully signed in with LINE!')

      // Close LIFF if in LIFF browser
      if (liffHelper.isInClient()) {
        setTimeout(() => liffHelper.closeWindow(), 1000)
      } else {
        // Don't redirect if we're on a test page
        if (!window.location.pathname.includes('test-liff')) {
          router.push('/dashboard')
        }
      }

    } catch (error: any) {
      setError(error.message || 'LINE authentication failed')
      toast.error('LINE authentication failed. Please try again.')
      setStatus('unauthenticated')
    }
  }

  const handleSocialSignIn = async (provider: 'google' | 'facebook' | 'line') => {
    setIsLoading(provider)

    try {
      if (provider === 'line') {
        // Use LIFF for LINE authentication
        if (!isLiffReady) {
          toast.error('LINE authentication is not ready yet')
          setIsLoading(null)
          return
        }

        await liffHelper.login()
        // Authentication will continue in handleLiffAuth after login

      } else {
        // Use traditional OAuth for Google/Facebook
        const oauthUrl = authApi.getOAuthUrl(provider)
        window.location.href = oauthUrl
      }
    } catch (error: any) {
      toast.error(`An error occurred during ${provider} sign in`)
      setIsLoading(null)
    }
  }

  return (
    <>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12"
          onClick={() => handleSocialSignIn("google")}
          disabled={isLoading !== null}
        >
          {isLoading === "google" ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
          ) : (
            <FaGoogle className="h-5 w-5 text-red-500" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12"
          onClick={() => handleSocialSignIn("facebook")}
          disabled={isLoading !== null}
        >
          {isLoading === "facebook" ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          ) : (
            <FaFacebook className="h-5 w-5 text-blue-600" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12"
          onClick={() => handleSocialSignIn("line")}
          disabled={isLoading !== null}
        >
          {isLoading === "line" ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
          ) : (
            <FaLine className="h-5 w-5 text-green-500" />
          )}
        </Button>
      </div>
    </>
  )
}