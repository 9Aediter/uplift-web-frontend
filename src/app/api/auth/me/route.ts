import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
        userRoles: {
          where: { isActive: true },
          select: { role: true }
        },
        accounts: {
          select: {
            provider: true,
            providerAccountId: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userData = {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      status: user.status,
      lastLoginAt: user.lastLoginAt,
      roles: user.userRoles.map(ur => ur.role),
      profile: user.profile ? {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        displayName: user.profile.displayName,
        avatar: user.profile.avatar,
        phone: user.profile.phone,
        dateOfBirth: user.profile.dateOfBirth,
        address: user.profile.address,
        city: user.profile.city,
        country: user.profile.country,
        zipCode: user.profile.zipCode,
        bio: user.profile.bio,
      } : null,
      accounts: user.accounts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { profile } = body;

    if (!profile) {
      return NextResponse.json(
        { error: "Profile data is required" },
        { status: 400 }
      );
    }

    // Update or create user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        profile: {
          upsert: {
            create: {
              firstName: profile.firstName,
              lastName: profile.lastName,
              displayName: profile.displayName,
              phone: profile.phone,
              dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : null,
              address: profile.address,
              city: profile.city,
              country: profile.country,
              zipCode: profile.zipCode,
              bio: profile.bio,
            },
            update: {
              firstName: profile.firstName,
              lastName: profile.lastName,
              displayName: profile.displayName,
              phone: profile.phone,
              dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : null,
              address: profile.address,
              city: profile.city,
              country: profile.country,
              zipCode: profile.zipCode,
              bio: profile.bio,
            }
          }
        }
      },
      include: {
        profile: true,
        userRoles: {
          where: { isActive: true },
          select: { role: true }
        }
      }
    });

    const userData = {
      id: updatedUser.id,
      email: updatedUser.email,
      emailVerified: updatedUser.emailVerified,
      status: updatedUser.status,
      lastLoginAt: updatedUser.lastLoginAt,
      roles: updatedUser.userRoles.map(ur => ur.role),
      profile: updatedUser.profile,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}