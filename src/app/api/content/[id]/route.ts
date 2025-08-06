import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateContentSchema = z.object({
  fields: z.array(z.object({
    id: z.string().optional(),
    key: z.string(),
    label: z.string(),
    type: z.enum(["SHORT", "LONG"]),
    value: z.string(),
    order: z.number().default(0)
  })),
  buttons: z.array(z.object({
    id: z.string().optional(),
    label: z.string(),
    text: z.string(),
    url: z.string(),
    order: z.number().default(0)
  })).optional()
})

// GET - Fetch single content by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const content = await prisma.content.findUnique({
      where: { id: params.id },
      include: {
        fields: {
          orderBy: { order: "asc" }
        },
        buttons: {
          orderBy: { order: "asc" }
        },
        creator: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        updater: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    })

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Check permissions for unpublished content
    if (content.status !== "PUBLISHED") {
      const session = await getServerSession(authOptions)
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const userRoles = await prisma.userRole.findMany({
        where: {
          userId: session.user.id,
          isActive: true
        }
      })

      const hasAdminRole = userRoles.some(role => 
        role.role === "ADMIN" || role.role === "SUPER_ADMIN"
      )

      if (!hasAdminRole) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    return NextResponse.json({ data: content })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PATCH - Update content fields and buttons
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check admin role
    const userRoles = await prisma.userRole.findMany({
      where: {
        userId: session.user.id,
        isActive: true
      }
    })

    const hasAdminRole = userRoles.some(role => 
      role.role === "ADMIN" || role.role === "SUPER_ADMIN"
    )

    if (!hasAdminRole) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = updateContentSchema.parse(body)

    // Get current content
    const currentContent = await prisma.content.findUnique({
      where: { id: params.id },
      include: {
        fields: true,
        buttons: true
      }
    })

    if (!currentContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Update content within a transaction
    const updatedContent = await prisma.$transaction(async (tx) => {
      // Delete existing fields and buttons
      await tx.contentField.deleteMany({
        where: { contentId: params.id }
      })
      
      await tx.contentButton.deleteMany({
        where: { contentId: params.id }
      })

      // Create new fields and buttons
      const content = await tx.content.update({
        where: { id: params.id },
        data: {
          updatedBy: session.user.id,
          status: "DRAFT", // Reset to draft when content is updated
          fields: {
            create: validatedData.fields.map(field => ({
              key: field.key,
              label: field.label,
              type: field.type,
              value: field.value,
              order: field.order
            }))
          },
          buttons: validatedData.buttons ? {
            create: validatedData.buttons.map(button => ({
              label: button.label,
              text: button.text,
              url: button.url,
              order: button.order
            }))
          } : undefined
        },
        include: {
          fields: {
            orderBy: { order: "asc" }
          },
          buttons: {
            orderBy: { order: "asc" }
          }
        }
      })

      return content
    })

    // Log the update
    await prisma.contentHistory.create({
      data: {
        contentId: params.id,
        action: "updated",
        userId: session.user.id,
        changes: {
          fieldsUpdated: validatedData.fields.length,
          buttonsUpdated: validatedData.buttons?.length || 0
        }
      }
    })

    return NextResponse.json({ data: updatedContent })
  } catch (error) {
    console.error("Error updating content:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE - Delete content
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check admin role
    const userRoles = await prisma.userRole.findMany({
      where: {
        userId: session.user.id,
        isActive: true
      }
    })

    const hasAdminRole = userRoles.some(role => 
      role.role === "ADMIN" || role.role === "SUPER_ADMIN"
    )

    if (!hasAdminRole) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const content = await prisma.content.findUnique({
      where: { id: params.id }
    })

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Delete the content (cascade will handle fields and buttons)
    await prisma.content.delete({
      where: { id: params.id }
    })

    // Log the deletion
    await prisma.contentHistory.create({
      data: {
        contentId: params.id,
        action: "deleted",
        userId: session.user.id,
        changes: {
          deletedContent: {
            pageSlug: content.pageSlug,
            sectionType: content.sectionType,
            language: content.language
          }
        }
      }
    })

    return NextResponse.json({ message: "Content deleted successfully" })
  } catch (error) {
    console.error("Error deleting content:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}