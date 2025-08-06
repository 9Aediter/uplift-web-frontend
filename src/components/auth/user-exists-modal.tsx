"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useModal } from "@/lib/modal-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"

interface UserExistsModalProps {
  email: string
  message: string
}

export function UserExistsModal({ email, message }: UserExistsModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { closeModal } = useModal()
  const router = useRouter()

  const handleClose = () => {
    closeModal("user-exists")
  }

  const handleVerify = async (formData: FormData) => {
    setIsLoading(true)

    try {
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }

      const response = await fetch("/api/auth/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success && result.autoLogin && result.loginCredentials) {
        toast.success(result.message)
        
        // Auto login with NextAuth using credentials from server
        const signInResult = await signIn("credentials", {
          email: result.loginCredentials.email,
          password: result.loginCredentials.password,
          redirect: false,
        })

        if (signInResult?.ok) {
          router.push("/")
          handleClose()
        } else {
          toast.error("Login failed. Please try again.")
        }
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      console.error("Verification error:", error)
      toast.error("An error occurred during verification")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseAnotherEmail = () => {
    handleClose()
    toast.info("Please use a different email address")
  }

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white/10 backdrop-blur-xl border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Account Already Exists</DialogTitle>
          <DialogDescription className="text-gray-300">
            {message}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="modal-email" className="text-white">Email</Label>
            <Input
              id="modal-email"
              type="email"
              value={email}
              disabled
              className="bg-white/5 border-white/20 text-white"
            />
          </div>
          
          <form action={handleVerify} className="space-y-4">
            <input type="hidden" name="email" value={email} />
            
            <div className="space-y-2">
              <Label htmlFor="modal-password" className="text-white">Your Password</Label>
              <PasswordInput
                id="modal-password"
                name="password"
                placeholder="Enter your password to continue"
                required
                disabled={isLoading}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            
            <div className="flex flex-col gap-2 pt-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleUseAnotherEmail}
                  disabled={isLoading}
                  className="flex-1 text-white hover:bg-white/10"
                >
                  Use Another Email
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}