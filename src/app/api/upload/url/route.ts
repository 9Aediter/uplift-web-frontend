import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadFileToS3 } from '@/lib/s3';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
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
    const { url, uploadType = 'general' } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Valid URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Download image from URL
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to download image from URL' },
        { status: 400 }
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return NextResponse.json(
        { error: 'URL does not point to a valid image' },
        { status: 400 }
      );
    }

    // Get file buffer
    const buffer = await response.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Get file extension from content type
    const ext = contentType.split('/')[1] || 'jpg';
    const fileName = `url-upload-${Date.now()}.${ext}`;

    // Upload to S3
    const s3Result = await uploadFileToS3(fileBuffer, fileName, contentType);

    // Save to database
    const image = await prisma.image.create({
      data: {
        url: s3Result.url,
        key: s3Result.key,
        originalName: fileName,
        contentType: contentType,
        size: fileBuffer.length,
        uploadType: uploadType,
        uploadedBy: session.user.id,
        usageCount: 0,
        isActive: true,
      },
    });

    return NextResponse.json({
      url: image.url,
      id: image.id,
      message: 'Image uploaded successfully from URL'
    });

  } catch (error) {
    console.error('Error uploading from URL:', error);
    return NextResponse.json(
      { error: 'Failed to upload image from URL' },
      { status: 500 }
    );
  }
}