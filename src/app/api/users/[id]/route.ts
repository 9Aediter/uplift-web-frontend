import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { updateUserSchema } from "@/lib/validations/user"
import { Role } from "@prisma/client"

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve detailed information about a specific user (requires authentication)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     profile:
 *                       $ref: '#/components/schemas/UserProfile'
 *                     socialLogins:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           provider:
 *                             type: string
 *                           providerEmail:
 *                             type: string
 *                           providerName:
 *                             type: string
 *                           providerAvatar:
 *                             type: string
 *                           isActive:
 *                             type: boolean
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     _count:
 *                       type: object
 *                       properties:
 *                         sessions:
 *                           type: integer
 *                         socialLogins:
 *                           type: integer
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - can only access own profile or admin required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = params.id
    const isOwner = session.user.id === userId
    const isAdmin = session.user.roles && (session.user.roles.includes(Role.ADMIN) || session.user.roles.includes(Role.SUPER_ADMIN))

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        userRoles: {
          where: { isActive: true },
          select: {
            role: true,
            assignedAt: true,
          }
        },
        accounts: {
          select: {
            id: true,
            provider: true,
            type: true,
            createdAt: true,
          }
        },
        _count: {
          select: {
            sessions: true,
            userRoles: true,
          }
        }
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error(`GET /api/users/${params.id} error:`, error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user by ID
 *     description: Update user information (users can update own profile, admins can update any user)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *           example:
 *             email: "updated@example.com"
 *             profile:
 *               firstName: "Jane"
 *               lastName: "Smith"
 *               displayName: "Jane Smith"
 *               bio: "Updated bio"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     profile:
 *                       $ref: '#/components/schemas/UserProfile'
 *                     socialLogins:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = params.id
    const isOwner = session.user.id === userId
    const isAdmin = session.user.roles && (session.user.roles.includes(Role.ADMIN) || session.user.roles.includes(Role.SUPER_ADMIN))

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const data = updateUserSchema.parse(body)

    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: { id: userId },
        },
      })

      if (existingUser) {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 409 }
        )
      }
    }

    if (data.roles && !isAdmin) {
      return NextResponse.json(
        { error: "Only admins can change user roles" },
        { status: 403 }
      )
    }

    if (data.status && !isAdmin) {
      return NextResponse.json(
        { error: "Only admins can change user status" },
        { status: 403 }
      )
    }

    const updateData: any = {}
    
    if (data.email) updateData.email = data.email
    // Role updates will be handled separately via UserRole table
    if (data.status && isAdmin) updateData.status = data.status

    if (data.profile && Object.keys(data.profile).length > 0) {
      updateData.profile = {
        upsert: {
          create: data.profile,
          update: data.profile,
        },
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        profile: true,
        userRoles: {
          where: { isActive: true },
          select: {
            role: true,
            assignedAt: true,
          }
        },
        accounts: {
          select: {
            id: true,
            provider: true,
            type: true,
            createdAt: true,
          }
        },
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error(`PATCH /api/users/${params.id} error:`, error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Permanently delete a user account (requires SUPER_ADMIN role)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       400:
 *         description: Cannot delete own account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - requires SUPER_ADMIN role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user.roles || !session.user.roles.includes(Role.SUPER_ADMIN)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = params.id

    if (session.user.id === userId) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id: userId },
    })

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error(`DELETE /api/users/${params.id} error:`, error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}