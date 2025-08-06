import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id]/sections/[sectionId] - Get a specific section
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const { sectionId } = await params;

    const section = await prisma.productSection.findUnique({
      where: { id: sectionId },
      include: {
        cards: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!section) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error fetching product section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product section' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id]/sections/[sectionId] - Update a section
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const { sectionId } = await params;
    const body = await request.json();

    const { title, subtitle, order } = body;

    // Check if section exists
    const existingSection = await prisma.productSection.findUnique({
      where: { id: sectionId }
    });

    if (!existingSection) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      );
    }

    const section = await prisma.productSection.update({
      where: { id: sectionId },
      data: {
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(order !== undefined && { order })
      },
      include: {
        cards: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating product section:', error);
    return NextResponse.json(
      { error: 'Failed to update product section' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/sections/[sectionId] - Delete a section
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    const { sectionId } = await params;

    // Check if section exists
    const existingSection = await prisma.productSection.findUnique({
      where: { id: sectionId }
    });

    if (!existingSection) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      );
    }

    await prisma.productSection.delete({
      where: { id: sectionId }
    });

    return NextResponse.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting product section:', error);
    return NextResponse.json(
      { error: 'Failed to delete product section' },
      { status: 500 }
    );
  }
}