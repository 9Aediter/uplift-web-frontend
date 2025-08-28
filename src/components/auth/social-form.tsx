"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authApi } from "@/lib/api/auth"
import { Button } from "@/components/ui/button"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { FaLine } from "react-icons/fa6"

export function SocialForm() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleSocialSignIn = async (provider: 'google' | 'facebook' | 'line') => {
    setIsLoading(provider)
    
    try {
      // Redirect to OAuth provider via backend
      const oauthUrl = authApi.getOAuthUrl(provider)
      console.log(`🔗 Redirecting to ${provider} OAuth:`, oauthUrl)
      
      // Redirect to backend OAuth endpoint
      window.location.href = oauthUrl
    } catch (error) {
      console.error(`❌ ${provider} OAuth error:`, error)
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