import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id]/sections - Get all sections for a product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const sections = await prisma.productSection.findMany({
      where: {
        productId: id
      },
      include: {
        cards: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching product sections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product sections' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/sections - Create a new section
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { sectionType, title, subtitle, order } = body;

    // Validate required fields
    if (!sectionType) {
      return NextResponse.json(
        { error: 'Section type is required' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if section already exists for this product
    const existingSection = await prisma.productSection.findFirst({
      where: {
        productId: id,
        sectionType
      }
    });

    if (existingSection) {
      return NextResponse.json(
        { error: 'Section with this type already exists for this product' },
        { status: 400 }
      );
    }

    const section = await prisma.productSection.create({
      data: {
        productId: id,
        sectionType,
        title,
        subtitle,
        order: order || 0
      },
      include: {
        cards: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error('Error creating product section:', error);
    return NextResponse.json(
      { error: 'Failed to create product section' },
      { status: 500 }
    );
  }
}