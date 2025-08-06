import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/technologies - Get all active technologies
export async function GET(request: NextRequest) {
  try {
    const technologies = await prisma.technology.findMany({
      where: {
        isActive: true
      },
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json(technologies);
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch technologies' },
      { status: 500 }
    );
  }
}