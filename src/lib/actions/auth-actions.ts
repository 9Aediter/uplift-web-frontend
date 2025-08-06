"use server"

import { hash, compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export async function signupAction(formData: FormData) {
  try {
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    }

    const validatedData = signupSchema.parse(data)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      // Check if the password matches
      if (existingUser.password) {
        const isPasswordMatch = await compare(validatedData.password, existingUser.password)
        
        if (isPasswordMatch) {
          // Password matches - auto login
          return {
            success: true,
            autoLogin: true,
            message: "Account already exists. Logging you in now!",
            loginCredentials: {
              email: validatedData.email,
              password: validatedData.password
            }
          }
        } else {
          // Password doesn't match - show modal for password verification
          return {
            success: false,
            showModal: true,
            email: validatedData.email,
            error: "Account exists with this email. Please verify your password to continue."
          }
        }
      } else {
        // User exists but no password (social login only)
        return {
          success: false,
          error: "This email is already registered with social login. Please use Google/Facebook to sign in."
        }
      }
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12)

    // Create user with profile and default USER role
    await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        emailVerified: new Date(),
        profile: {
          create: {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            displayName: `${validatedData.firstName} ${validatedData.lastName}`,
          }
        },
        userRoles: {
          create: {
            role: "USER",
            isActive: true
          }
        }
      }
    })

    // Return success with login instructions
    return {
      success: true,
      autoLogin: true,
      message: "Account created successfully!",
      loginCredentials: {
        email: validatedData.email,
        password: validatedData.password
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message
      }
    }

    console.error("Signup error:", error)
    return {
      success: false,
      error: "Internal server error"
    }
  }
}

export async function verifyPasswordAction(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required"
      }
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return {
        success: false,
        error: "User not found"
      }
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password)

    if (isPasswordValid) {
      return {
        success: true,
        autoLogin: true,
        message: "Password verified! Logging you in...",
        loginCredentials: {
          email,
          password
        }
      }
    } else {
      return {
        success: false,
        error: "Password is incorrect. User with this email already exists."
      }
    }
  } catch (error) {
    console.error("Password verification error:", error)
    return {
      success: false,
      error: "Internal server error"
    }
  }
}