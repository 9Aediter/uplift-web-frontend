"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authApi } from "@/lib/api/auth"
import { useAuthActions } from "@/lib/store/auth"
import { useModal } from "@/lib/providers/modal"
import { UserExistsModal } from "@/components/auth/user-exists-modal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/basic/button/button"
import { Input } from "@/components/basic/input/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PasswordInput } from "@/components/basic/input/password-input"
import { SocialForm } from "@/components/auth/social-form"
import Link from "next/link"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { openModal } = useModal()
  const router = useRouter()
  const { login } = useAuthActions()

  // Check if passwords match
  const passwordsMatch = password === confirmPassword && password.length > 0
  const canSubmit = passwordsMatch && !isLoading

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const formPassword = formData.get("password") as string

    // Combine first and last name for the name field
    const name = `${firstName} ${lastName}`.trim()

    // Prepare data according to backend API structure
    const data = {
      name,
      email,
      password: formPassword
    }

    console.log("🚀 Attempting to register user:", { email, name })
    console.log("📡 API call data:", data)

    try {
      console.log("📞 Calling authApi.register...")
      const response = await authApi.register(data)
      console.log("✅ Registration successful:", response.data)

      if (response.data?.user) {
        // Registration successful, store user (tokens are now in httpOnly cookies)
        login(response.data.user)
        toast.success("Account created successfully!")

        // Set success message for AuthSuccessHandler
        localStorage.setItem('auth_success_message', 'register_success')

        // Navigate without full page reload - auth state already updated
        router.push("/")
      }
    } catch (error: any) {
      console.error("❌ Registration error:", error)
      console.error("📍 Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })

      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.response?.status === 409) {
        // User already exists - show modal for verification
        openModal(
          "user-exists",
          <UserExistsModal
            email={email}
            message="Account exists with this email. Please verify your password to continue."
          />
        )
      } else {
        toast.error("An error occurred during signup")
      }
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" asChild className="flex-1" disabled={isLoading}>
                <Link href="/auth/signin">Sign in?</Link>
              </Button>
              <Button type="submit" className="flex-1" disabled={!canSubmit}>
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