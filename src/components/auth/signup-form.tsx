"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useModal } from "@/lib/modal-provider"
import { UserExistsModal } from "@/components/auth/user-exists-modal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialForm } from "@/components/auth/social-form"
import Link from "next/link"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false)
  const { openModal } = useModal()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)

    try {
      const data = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        if (result.autoLogin && result.loginCredentials) {
          // Auto login case
          toast.success(result.message)
          
          const signInResult = await signIn("credentials", {
            email: result.loginCredentials.email,
            password: result.loginCredentials.password,
            redirect: false,
          })

          if (signInResult?.ok) {
            router.push("/")
          } else {
            toast.error("Login failed. Please try again.")
          }
        } else {
          // Normal signup success
          toast.success(result.message || "Account created successfully!")
          router.push("/auth/signin")
        }
      } else if (result.showModal) {
        // Show modal for password verification
        openModal(
          "user-exists",
          <UserExistsModal 
            email={result.email || ""} 
            message={result.error || "Account exists with this email. Please verify your password to continue."} 
          />
        )
      } else {
        // Regular error
        toast.error(result.error || "Failed to create account")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="text-center py-4">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription className="text-sm text-balance">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-12">
        <form className={cn("flex flex-col gap-6", className)} action={handleSubmit} {...props}>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="firstName">First name</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  type="text" 
                  placeholder="John" 
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lastName">Last name</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  type="text" 
                  placeholder="Doe" 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="m@example.com" 
                required 
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <PasswordInput 
                id="password" 
                name="password"
                required 
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput 
                id="confirmPassword" 
                name="confirmPassword"
                required 
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" asChild className="flex-1" disabled={isLoading}>
                <Link href="/auth/signin">Sign in?</Link>
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
            <SocialForm />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}