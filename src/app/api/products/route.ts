import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ContentStatus } from '@prisma/client';
import { extractKeyFromUrl, deleteFileFromS3 } from '@/lib/s3';

// GET /api/products - List all products (with filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const language = searchParams.get('language') || 'en';
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    
    // Check if user is authenticated for draft content
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.roles?.some((role: string) => 
      role === 'ADMIN' || role === 'SUPER_ADMIN'
    );

    const where: any = {
      language: language
    };

    // If not admin, only show published products
    if (!isAdmin) {
      where.status = ContentStatus.PUBLISHED;
      where.isPublished = true;
    }

    // Add published filter if specified
    if (published !== null) {
      where.isPublished = published === 'true';
    }

    // Add category filter if specified
    if (category) {
      where.category = category;
    }

    const queryOptions: any = {
      where,
      orderBy: {
        updatedAt: 'desc'
      },
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
        images: {
          select: {
            id: true,
            url: true,
            originalName: true,
            contentType: true,
            size: true
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

    const products = await prisma.product.findMany(queryOptions);
    
    // Get total count for pagination
    const totalCount = await prisma.product.count({ where });

    return NextResponse.json({
      products,
      totalCount,
      hasMore: limit ? products.length === parseInt(limit) : false
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product
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
    
    const {
      title,
      subtitle,
      slug,
      description,
      features = [],
      coverImage,
      imageIds = [],
      imageGallery = [],
      caseStudy,
      color = 'blue',
      icon = 'MonitorIcon',
      category,
      tags = [],
      price,
      language = 'en',
      status = ContentStatus.DRAFT
    } = body;

    // Validate required fields
    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: 'Title, slug, and description are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      );
    }

    // Handle cover image - save to Image table if provided as URL
    let coverImageUrl = null;
    if (coverImage && typeof coverImage === 'string') {
      // If coverImage is provided as URL, ensure it's saved to Image table
      const existingImage = await prisma.image.findFirst({
        where: { url: coverImage }
      });
      
      if (!existingImage) {
        // Create image record if it doesn't exist
        const { extractKeyFromUrl } = await import('@/lib/s3');
        const key = extractKeyFromUrl(coverImage);
        if (key) {
          await prisma.image.create({
            data: {
              url: coverImage,
              key: key,
              originalName: 'cover-image',
              contentType: 'image/jpeg',
              size: 0,
              uploadType: 'product',
              uploadedBy: session.user.id,
              usageCount: 1,
              isActive: true
            }
          });
        }
      } else {
        // Update usage count
        await prisma.image.update({
          where: { id: existingImage.id },
          data: { usageCount: { increment: 1 } }
        });
      }
      
      coverImageUrl = coverImage;
    }

    // Validate image IDs from Image table
    const validImageIds = Array.isArray(imageIds) ? imageIds.filter(id => typeof id === 'string') : [];
    
    // Update usage count for connected images
    if (validImageIds.length > 0) {
      await prisma.image.updateMany({
        where: { id: { in: validImageIds } },
        data: { usageCount: { increment: 1 } }
      });
    }

    const product = await prisma.product.create({
      data: {
        title,
        subtitle,
        slug,
        description,
        features,
        coverImage: coverImageUrl,
        imageGallery,
        caseStudy,
        color,
        icon,
        category,
        tags,
        price,
        language,
        status,
        featureCount: features.length,
        createdBy: session.user.id,
        updatedBy: session.user.id,
        images: {
          connect: validImageIds.map(id => ({ id }))
        }
      },
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
        images: {
          select: {
            id: true,
            url: true,
            originalName: true,
            contentType: true,
            size: true
          }
        }
      }
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}