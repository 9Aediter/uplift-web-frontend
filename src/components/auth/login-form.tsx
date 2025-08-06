"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialForm } from "@/components/auth/social-form"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid email or password")
      } else if (result?.ok) {
        toast.success("Signed in successfully!")
        router.push("/")
      }
    } catch (error) {
      toast.error("An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="text-center py-4">
        <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
        <CardDescription className="text-sm text-balance">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-12">
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <PasswordInput 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" asChild className="flex-1" disabled={isLoading}>
                <Link href="/auth/signup">Sign up?</Link>
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </div>
            <SocialForm />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
