import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { userQuerySchema, createUserSchema } from "@/lib/validations/user"
import { Role } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user.roles || session.user.roles.includes(Role.USER)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const query = userQuerySchema.parse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      search: searchParams.get("search"),
      role: searchParams.get("role"),
      status: searchParams.get("status"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
    })

    const skip = (query.page - 1) * query.limit

    const where = {
      ...(query.search && {
        OR: [
          { email: { contains: query.search, mode: "insensitive" as const } },
          { profile: { 
            OR: [
              { firstName: { contains: query.search, mode: "insensitive" as const } },
              { lastName: { contains: query.search, mode: "insensitive" as const } },
              { displayName: { contains: query.search, mode: "insensitive" as const } },
            ]
          }},
        ],
      }),
      ...(query.role && { 
        userRoles: {
          some: {
            role: query.role,
            isActive: true
          }
        }
      }),
      ...(query.status && { status: query.status }),
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          profile: true,
          userRoles: {
            where: { isActive: true }
          },
          _count: {
            select: {
              sessions: true,
              userRoles: true,
            }
          }
        },
        skip,
        take: query.limit,
        orderBy: { [query.sortBy]: query.sortOrder },
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({
      users,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        pages: Math.ceil(total / query.limit),
      },
    })
  } catch (error) {
    console.error("GET /api/users error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user.roles || !session.user.roles.includes(Role.SUPER_ADMIN)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = createUserSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      )
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        status: data.status,
        emailVerified: new Date(),
        ...(data.profile && {
          profile: {
            create: data.profile,
          },
        }),
        userRoles: {
          create: data.roles.map(role => ({
            role: role,
            isActive: true
          }))
        }
      },
      include: {
        profile: true,
        userRoles: {
          where: { isActive: true }
        },
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("POST /api/users error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}