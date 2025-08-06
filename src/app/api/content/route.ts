import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// Validation schemas
const createContentSchema = z.object({
  pageSlug: z.string().min(1),
  sectionType: z.enum(["HERO_SECTION", "PROBLEM_SECTION", "FEATURES_SECTION", "TESTIMONIALS", "FAQ"]),
  language: z.string().default("en"),
  fields: z.array(z.object({
    key: z.string(),
    label: z.string(),
    type: z.enum(["SHORT", "LONG"]),
    value: z.string(),
    order: z.number().default(0)
  })),
  buttons: z.array(z.object({
    label: z.string(),
    text: z.string(),
    url: z.string(),
    order: z.number().default(0)
  })).optional()
})

const updateStatusSchema = z.object({
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]),
  contentId: z.string()
})

// GET - Fetch content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageSlug = searchParams.get("pageSlug")
    const sectionType = searchParams.get("sectionType")
    const language = searchParams.get("language") || "en"
    const status = searchParams.get("status")
    const includeUnpublished = searchParams.get("includeUnpublished") === "true"

    // Check authentication for unpublished content
    if (includeUnpublished || (status && status !== "PUBLISHED")) {
      const session = await getServerSession(authOptions)
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      // Check if user has admin role
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

    const whereClause: any = {}
    
    if (pageSlug) whereClause.pageSlug = pageSlug
    if (sectionType) whereClause.sectionType = sectionType
    if (language) whereClause.language = language
    
    // If not including unpublished, only show published content
    if (!includeUnpublished) {
      whereClause.status = "PUBLISHED"
    } else if (status) {
      whereClause.status = status
    }

    const content = await prisma.content.findMany({
      where: whereClause,
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
      },
      orderBy: { updatedAt: "desc" }
    })

    return NextResponse.json({ data: content })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST - Create new content
export async function POST(request: NextRequest) {
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
    const validatedData = createContentSchema.parse(body)

    const content = await prisma.content.create({
      data: {
        pageSlug: validatedData.pageSlug,
        sectionType: validatedData.sectionType,
        language: validatedData.language,
        status: "DRAFT",
        createdBy: session.user.id,
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

    // Log the creation
    await prisma.contentHistory.create({
      data: {
        contentId: content.id,
        action: "created",
        userId: session.user.id,
        changes: {
          fields: validatedData.fields.length,
          buttons: validatedData.buttons?.length || 0
        }
      }
    })

    return NextResponse.json({ data: content }, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    
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

// PUT - Update content status (for workflow)
export async function PUT(request: NextRequest) {
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
    const { status, contentId } = updateStatusSchema.parse(body)

    const updateData: any = {
      status,
      updatedBy: session.user.id
    }

    if (status === "PUBLISHED") {
      updateData.publishedBy = session.user.id
      updateData.publishedAt = new Date()
    } else if (status === "REVIEW") {
      updateData.reviewedBy = session.user.id
    }

    // Handle publish workflow with transaction
    const content = await prisma.$transaction(async (tx) => {
      // If publishing, first archive any existing published content for the same page/section/language
      if (status === "PUBLISHED") {
        // Get the content being published to check its properties
        const contentToPublish = await tx.content.findUnique({
          where: { id: contentId },
          select: { pageSlug: true, sectionType: true, language: true }
        })

        if (contentToPublish) {
          // Archive existing published content with same page/section/language
          await tx.content.updateMany({
            where: {
              pageSlug: contentToPublish.pageSlug,
              sectionType: contentToPublish.sectionType,
              language: contentToPublish.language,
              status: "PUBLISHED",
              NOT: { id: contentId } // Don't archive the one we're about to publish
            },
            data: {
              status: "ARCHIVED",
              updatedBy: session.user.id
            }
          })
        }
      }

      // Now update the target content
      return await tx.content.update({
        where: { id: contentId },
        data: updateData,
        include: {
          fields: true,
          buttons: true
        }
      })
    })

    // Log the status change
    await prisma.contentHistory.create({
      data: {
        contentId: content.id,
        action: `status_changed_to_${status.toLowerCase()}`,
        userId: session.user.id,
        changes: {
          from: "previous_status",
          to: status
        }
      }
    })

    return NextResponse.json({ data: content })
  } catch (error) {
    console.error("Error updating content status:", error)
    
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