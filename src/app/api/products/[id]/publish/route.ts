import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ContentStatus } from '@prisma/client';

// POST /api/products/[id]/publish - Publish or unpublish product
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const { publish } = body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const updateData: any = {
      updatedBy: session.user.id
    };

    if (publish) {
      updateData.status = ContentStatus.PUBLISHED;
      updateData.isPublished = true;
      updateData.publishedAt = new Date();
      updateData.publishedBy = session.user.id;
    } else {
      updateData.status = ContentStatus.DRAFT;
      updateData.isPublished = false;
      updateData.publishedAt = null;
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        creator: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        publisher: {
          select: {
            id: true,
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
    });

    return NextResponse.json({
      product,
      message: publish ? 'Product published successfully' : 'Product unpublished successfully'
    });

  } catch (error) {
    console.error('Error publishing/unpublishing product:', error);
    return NextResponse.json(
      { error: 'Failed to update product status' },
      { status: 500 }
    );
  }
}