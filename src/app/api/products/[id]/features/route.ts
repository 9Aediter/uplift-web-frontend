import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/products/[id]/features - Get all features for a product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      select: { features: true }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Return features from JSON field
    return NextResponse.json(product.features || []);
  } catch (error) {
    console.error('Error fetching product features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product features' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/features - Add a new feature to JSON array
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id: productId } = await params;
    const body = await request.json();

    const { title, description, icon } = body;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Check if product exists and get current features
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { features: true }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Add new feature to existing features array
    const currentFeatures = Array.isArray(product.features) ? product.features : [];
    const newFeature = {
      title,
      description,
      icon: icon || 'default'
    };
    const updatedFeatures = [...currentFeatures, newFeature];

    // Update product with new features array
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { features: updatedFeatures },
      select: { features: true }
    });

    return NextResponse.json(newFeature, { status: 201 });
  } catch (error) {
    console.error('Error creating product feature:', error);
    return NextResponse.json(
      { error: 'Failed to create product feature' },
      { status: 500 }
    );
  }
}