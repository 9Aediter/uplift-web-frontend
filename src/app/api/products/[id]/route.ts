import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ContentStatus } from '@prisma/client';
import { extractKeyFromUrl, deleteFileFromS3 } from '@/lib/s3';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    const isAdmin = session?.user?.roles?.some((role: string) => 
      role === 'ADMIN' || role === 'SUPER_ADMIN'
    );

    const where: any = {
      OR: [
        { id: id },
        { slug: id } // Allow lookup by slug or ID
      ]
    };

    // If not admin, only show published products
    if (!isAdmin) {
      where.status = ContentStatus.PUBLISHED;
      where.isPublished = true;
    }

    const product = await prisma.product.findFirst({
      where,
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
        updater: {
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

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product
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
    
    const {
      title,
      subtitle,
      slug,
      description,
      features,
      coverImage,
      imageIds,
      imageGallery,
      caseStudy,
      color,
      icon,
      category,
      tags,
      price,
      status,
      clientCount
    } = body;

    // Check if product exists (allow lookup by slug or ID)
    const existingProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      },
      include: {
        images: {
          select: {
            id: true,
            url: true
          }
        }
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if slug conflicts with another product
    if (slug && slug !== existingProduct.slug) {
      const slugConflict = await prisma.product.findUnique({
        where: { slug }
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 409 }
        );
      }
    }

    const updateData: any = {
      updatedBy: session.user.id
    };

    // Handle image updates
    if (coverImage !== undefined || imageIds !== undefined) {
      // Handle cover image update
      if (coverImage !== undefined) {
        if (coverImage && typeof coverImage === 'string') {
          // Ensure cover image is saved to Image table
          const existingImage = await prisma.image.findFirst({
            where: { url: coverImage }
          });
          
          if (!existingImage) {
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
            await prisma.image.update({
              where: { id: existingImage.id },
              data: { usageCount: { increment: 1 } }
            });
          }
        }
        updateData.coverImage = coverImage;
      }

      // Handle image relations update
      if (imageIds !== undefined) {
        const validImageIds = Array.isArray(imageIds) ? imageIds.filter(id => typeof id === 'string') : [];
        
        // Get current image relations
        const currentImageIds = existingProduct.images?.map((img: any) => img.id) || [];
        
        // Update usage counts
        const imagesToRemove = currentImageIds.filter((id: string) => !validImageIds.includes(id));
        const imagesToAdd = validImageIds.filter((id: string) => !currentImageIds.includes(id));
        
        if (imagesToRemove.length > 0) {
          await prisma.image.updateMany({
            where: { id: { in: imagesToRemove } },
            data: { usageCount: { decrement: 1 } }
          });
        }
        
        if (imagesToAdd.length > 0) {
          await prisma.image.updateMany({
            where: { id: { in: imagesToAdd } },
            data: { usageCount: { increment: 1 } }
          });
        }
        
        updateData.images = {
          set: validImageIds.map(id => ({ id }))
        };
      }
    }

    // Only update provided fields
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (features !== undefined) {
      updateData.features = features;
      updateData.featureCount = features.length;
    }
    if (imageGallery !== undefined) updateData.imageGallery = imageGallery;
    if (caseStudy !== undefined) updateData.caseStudy = caseStudy;
    if (color !== undefined) updateData.color = color;
    if (icon !== undefined) updateData.icon = icon;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags;
    if (price !== undefined) updateData.price = price;
    if (clientCount !== undefined) updateData.clientCount = clientCount;
    
    // Handle status changes
    if (status !== undefined) {
      updateData.status = status;
      
      if (status === ContentStatus.PUBLISHED && !existingProduct.isPublished) {
        updateData.isPublished = true;
        updateData.publishedAt = new Date();
        updateData.publishedBy = session.user.id;
      } else if (status !== ContentStatus.PUBLISHED && existingProduct.isPublished) {
        updateData.isPublished = false;
        updateData.publishedAt = null;
      }
    }

    const product = await prisma.product.update({
      where: { id: existingProduct.id },
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
        updater: {
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

    return NextResponse.json(product);

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id] - Update product (alias for PUT)
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  return PUT(request, { params });
}

// DELETE /api/products/[id] - Delete product
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

    // Check if product exists (allow lookup by slug or ID)
    const existingProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id: existingProduct.id }
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}