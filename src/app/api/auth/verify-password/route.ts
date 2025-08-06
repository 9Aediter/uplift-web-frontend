import { NextRequest, NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const verifyPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = verifyPasswordSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return NextResponse.json({
        success: false,
        error: "User not found"
      }, { status: 404 })
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password)

    if (isPasswordValid) {
      return NextResponse.json({
        success: true,
        autoLogin: true,
        message: "Password verified! Logging you in...",
        loginCredentials: {
          email,
          password
        }
      })
    } else {
      return NextResponse.json({
        success: false,
        error: "Password is incorrect. User with this email already exists."
      }, { status: 400 })
    }

  } catch (error) {
    console.error("Password verification error:", error)
    
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