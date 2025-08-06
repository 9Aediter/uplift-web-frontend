import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id]/sections/[sectionId]/cards/[cardId] - Get a specific card
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string; cardId: string }> }
) {
  try {
    const { cardId } = await params;

    const card = await prisma.productCard.findUnique({
      where: { id: cardId }
    });

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error('Error fetching product card:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product card' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id]/sections/[sectionId]/cards/[cardId] - Update a card
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string; cardId: string }> }
) {
  try {
    const { cardId } = await params;
    const body = await request.json();

    const { title, description, icon, iconColor, order } = body;

    // Check if card exists
    const existingCard = await prisma.productCard.findUnique({
      where: { id: cardId }
    });

    if (!existingCard) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    const card = await prisma.productCard.update({
      where: { id: cardId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(iconColor !== undefined && { iconColor }),
        ...(order !== undefined && { order })
      }
    });

    return NextResponse.json(card);
  } catch (error) {
    console.error('Error updating product card:', error);
    return NextResponse.json(
      { error: 'Failed to update product card' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/sections/[sectionId]/cards/[cardId] - Delete a card
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string; cardId: string }> }
) {
  try {
    const { cardId } = await params;

    // Check if card exists
    const existingCard = await prisma.productCard.findUnique({
      where: { id: cardId }
    });

    if (!existingCard) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    await prisma.productCard.delete({
      where: { id: cardId }
    });

    return NextResponse.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting product card:', error);
    return NextResponse.json(
      { error: 'Failed to delete product card' },
      { status: 500 }
    );
  }
}