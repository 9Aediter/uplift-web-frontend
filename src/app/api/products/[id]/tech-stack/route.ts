import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/products/[id]/tech-stack - Get tech stack section for a product
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    
    const techStackSection = await prisma.techStackSection.findUnique({
      where: {
        productId: id
      },
      include: {
        technologies: {
          include: {
            technology: true
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!techStackSection) {
      return NextResponse.json(
        { error: 'Tech stack section not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(techStackSection);
  } catch (error) {
    console.error('Error fetching tech stack section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tech stack section' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/tech-stack - Create tech stack section
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
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
    const { title, subtitle, technologies } = body;

    // Check if product exists
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Create tech stack section with technologies
    const techStackSection = await prisma.techStackSection.create({
      data: {
        productId: product.id,
        title: title || 'Technology Stack',
        subtitle: subtitle || 'Cutting-edge tools & technologies we use',
        technologies: {
          create: technologies.map((tech: any, index: number) => ({
            technologyId: tech.technologyId,
            order: tech.order || index
          }))
        }
      },
      include: {
        technologies: {
          include: {
            technology: true
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json(techStackSection);
  } catch (error) {
    console.error('Error creating tech stack section:', error);
    return NextResponse.json(
      { error: 'Failed to create tech stack section' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id]/tech-stack - Update tech stack section
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
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
    const { title, subtitle, technologies } = body;

    // Check if product exists
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update tech stack section
    const techStackSection = await prisma.techStackSection.upsert({
      where: {
        productId: product.id
      },
      update: {
        title: title || 'Technology Stack',
        subtitle: subtitle || 'Cutting-edge tools & technologies we use',
        technologies: {
          deleteMany: {}, // Remove all existing technologies
          create: technologies.map((tech: any, index: number) => ({
            technologyId: tech.technologyId,
            order: tech.order || index
          }))
        }
      },
      create: {
        productId: product.id,
        title: title || 'Technology Stack',
        subtitle: subtitle || 'Cutting-edge tools & technologies we use',
        technologies: {
          create: technologies.map((tech: any, index: number) => ({
            technologyId: tech.technologyId,
            order: tech.order || index
          }))
        }
      },
      include: {
        technologies: {
          include: {
            technology: true
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json(techStackSection);
  } catch (error) {
    console.error('Error updating tech stack section:', error);
    return NextResponse.json(
      { error: 'Failed to update tech stack section' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/tech-stack - Delete tech stack section
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
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

    await prisma.techStackSection.delete({
      where: {
        productId: id
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tech stack section:', error);
    return NextResponse.json(
      { error: 'Failed to delete tech stack section' },
      { status: 500 }
    );
  }
}