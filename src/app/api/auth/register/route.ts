import { NextRequest, NextResponse } from "next/server"
import { hash, compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { cookies } from "next/headers"

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      if (existingUser.password) {
        const isPasswordMatch = await compare(validatedData.password, existingUser.password)
        
        if (isPasswordMatch) {
          // Password matches - this means user is trying to "register" but account exists
          // We should auto-login them
          return NextResponse.json({
            success: true,
            autoLogin: true,
            message: "Account already exists. Logging you in now!",
            loginCredentials: {
              email: validatedData.email,
              password: validatedData.password
            }
          })
        } else {
          // Password doesn't match
          return NextResponse.json({
            success: false,
            showModal: true,
            email: validatedData.email,
            error: "Account exists with this email. Please verify your password to continue."
          }, { status: 400 })
        }
      } else {
        // User exists but no password (social login only)
        return NextResponse.json({
          success: false,
          error: "This email is already registered with social login. Please use Google/Facebook to sign in."
        }, { status: 400 })
      }
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12)

    // Create user with profile and default USER role
    const newUser = await prisma.user.create({
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
      },
      include: {
        profile: true,
        userRoles: {
          where: { isActive: true }
        }
      }
    })

    // Registration successful - provide credentials for auto-login
    return NextResponse.json({
      success: true,
      autoLogin: true,
      message: "Account created successfully!",
      loginCredentials: {
        email: validatedData.email,
        password: validatedData.password
      },
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.profile?.displayName,
        roles: newUser.userRoles.map(r => r.role)
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Registration error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: "Validation error",
        details: error.issues
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: "Internal server error"
    }, { status: 500 })
  }
}