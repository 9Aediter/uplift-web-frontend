import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/images - List all images with filtering
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const uploadType = searchParams.get('uploadType');
    const isActive = searchParams.get('isActive');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const search = searchParams.get('search');
    
    const where: any = {};

    // Add filters
    if (uploadType) {
      where.uploadType = uploadType;
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    if (search) {
      where.originalName = {
        contains: search,
        mode: 'insensitive'
      };
    }

    const queryOptions: any = {
      where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        uploader: {
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
        _count: {
          select: {
            products: true
          }
        }
      }
    };

    if (limit) {
      queryOptions.take = parseInt(limit);
    }

    if (offset) {
      queryOptions.skip = parseInt(offset);
    }

    const images = await prisma.image.findMany(queryOptions);
    
    // Get total count for pagination
    const totalCount = await prisma.image.count({ where });

    return NextResponse.json({
      images,
      totalCount,
      hasMore: limit ? images.length === parseInt(limit) : false
    });

  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// PATCH /api/images - Update image metadata
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const isAdmin = session.user.roles?.some(role => 
      role === 'ADMIN' || role === 'SUPER_ADMIN'
    );

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, isActive, uploadType } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    
    if (isActive !== undefined) updateData.isActive = isActive;
    if (uploadType !== undefined) updateData.uploadType = uploadType;

    const updatedImage = await prisma.image.update({
      where: { id },
      data: updateData,
      include: {
        uploader: {
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
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    return NextResponse.json(updatedImage);

  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}