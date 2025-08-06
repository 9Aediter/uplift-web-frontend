import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id]/sections/[sectionId]/cards - Get all cards for a section
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const { sectionId } = await params;

    const cards = await prisma.productCard.findMany({
      where: {
        sectionId
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Error fetching product cards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product cards' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/sections/[sectionId]/cards - Create a new card
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const { sectionId } = await params;
    const body = await request.json();

    const { title, description, icon, iconColor, order } = body;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Check if section exists
    const section = await prisma.productSection.findUnique({
      where: { id: sectionId }
    });

    if (!section) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      );
    }

    const card = await prisma.productCard.create({
      data: {
        sectionId,
        title,
        description,
        icon,
        iconColor,
        order: order || 0
      }
    });

    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    console.error('Error creating product card:', error);
    return NextResponse.json(
      { error: 'Failed to create product card' },
      { status: 500 }
    );
  }
}