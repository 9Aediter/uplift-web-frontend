import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/admin/technologies - Get all technologies (including inactive)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const isAdmin = session.user.roles?.some((role: string) => 
      role === 'ADMIN' || role === 'SUPER_ADMIN'
    );

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const technologies = await prisma.technology.findMany({
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json(technologies);
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch technologies' },
      { status: 500 }
    );
  }
}

// POST /api/admin/technologies - Create new technology
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const isAdmin = session.user.roles?.some((role: string) => 
      role === 'ADMIN' || role === 'SUPER_ADMIN'
    );

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, slug, svgCode, category } = body;

    // Validate required fields
    if (!name || !slug || !svgCode) {
      return NextResponse.json(
        { error: 'Name, slug, and SVG code are required' },
        { status: 400 }
      );
    }

    // Check if technology with same name or slug already exists
    const existingTech = await prisma.technology.findFirst({
      where: {
        OR: [
          { name: name },
          { slug: slug }
        ]
      }
    });

    if (existingTech) {
      return NextResponse.json(
        { error: 'Technology with this name or slug already exists' },
        { status: 409 }
      );
    }

    const technology = await prisma.technology.create({
      data: {
        name,
        slug,
        svgCode,
        category: category || null,
        isActive: true,
      }
    });

    return NextResponse.json(technology);
  } catch (error) {
    console.error('Error creating technology:', error);
    return NextResponse.json(
      { error: 'Failed to create technology' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/technologies - Update technology
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const isAdmin = session.user.roles?.some((role: string) => 
      role === 'ADMIN' || role === 'SUPER_ADMIN'
    );

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, name, slug, svgCode, category } = body;

    // Validate required fields
    if (!id || !name || !slug || !svgCode) {
      return NextResponse.json(
        { error: 'ID, name, slug, and SVG code are required' },
        { status: 400 }
      );
    }

    // Check if technology exists
    const existingTech = await prisma.technology.findUnique({
      where: { id }
    });

    if (!existingTech) {
      return NextResponse.json(
        { error: 'Technology not found' },
        { status: 404 }
      );
    }

    // Check if another technology with same name or slug exists
    const conflictingTech = await prisma.technology.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [
              { name: name },
              { slug: slug }
            ]
          }
        ]
      }
    });

    if (conflictingTech) {
      return NextResponse.json(
        { error: 'Another technology with this name or slug already exists' },
        { status: 409 }
      );
    }

    const technology = await prisma.technology.update({
      where: { id },
      data: {
        name,
        slug,
        svgCode,
        category: category || null,
      }
    });

    return NextResponse.json(technology);
  } catch (error) {
    console.error('Error updating technology:', error);
    return NextResponse.json(
      { error: 'Failed to update technology' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/technologies - Delete technology
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const isAdmin = session.user.roles?.some((role: string) => 
      role === 'ADMIN' || role === 'SUPER_ADMIN'
    );

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Technology ID is required' },
        { status: 400 }
      );
    }

    // Check if technology is being used in any tech stack sections
    const usageCount = await prisma.techStackSectionTechnology.count({
      where: { technologyId: id }
    });

    if (usageCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete technology that is currently in use by products' },
        { status: 409 }
      );
    }

    await prisma.technology.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting technology:', error);
    return NextResponse.json(
      { error: 'Failed to delete technology' },
      { status: 500 }
    );
  }
}