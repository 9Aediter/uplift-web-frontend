import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Public API - only returns published content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageSlug = searchParams.get("pageSlug")
    const sectionType = searchParams.get("sectionType")
    const language = searchParams.get("language") || "en"

    const whereClause: any = {
      status: "PUBLISHED"
    }
    
    if (pageSlug) whereClause.pageSlug = pageSlug
    if (sectionType) whereClause.sectionType = sectionType
    if (language) whereClause.language = language

    const content = await prisma.content.findMany({
      where: whereClause,
      include: {
        fields: {
          orderBy: { order: "asc" }
        },
        buttons: {
          orderBy: { order: "asc" }
        }
      },
      orderBy: { publishedAt: "desc" }
    })

    return NextResponse.json({ data: content })
  } catch (error) {
    console.error("Error fetching public content:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}