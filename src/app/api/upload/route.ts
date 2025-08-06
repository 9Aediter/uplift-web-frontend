import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadFileToS3, generateFileKey, validateFile } from '@/lib/s3';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
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

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadType = formData.get('type') as string || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate file
    const validation = validateFile(buffer, file.name);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Generate unique file key
    const fileKey = generateFileKey(file.name, uploadType);

    // Upload to S3
    const uploadResult = await uploadFileToS3(
      buffer,
      fileKey,
      file.type
    );

    // Save image record to database
    const imageRecord = await prisma.image.create({
      data: {
        url: uploadResult.url,
        key: uploadResult.key,
        originalName: file.name,
        contentType: uploadResult.contentType,
        size: uploadResult.size,
        uploadType: uploadType,
        uploadedBy: session.user.id,
        usageCount: 0,
        isActive: true
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        id: imageRecord.id,
        url: uploadResult.url,
        key: uploadResult.key,
        size: uploadResult.size,
        contentType: uploadResult.contentType,
        originalName: file.name,
        uploadType: uploadType
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication and admin role
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

    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const imageId = searchParams.get('id');

    if (!key && !imageId) {
      return NextResponse.json(
        { error: 'File key or image ID is required' },
        { status: 400 }
      );
    }

    // Find image record
    const whereClause = key ? { key } : imageId ? { id: imageId } : undefined;
    
    if (!whereClause) {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      );
    }

    const imageRecord = await prisma.image.findFirst({
      where: whereClause
    });

    if (!imageRecord) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Check if image is still being used
    const usageCount = await prisma.product.count({
      where: {
        OR: [
          { coverImage: imageRecord.url },
          { images: { some: { id: imageRecord.id } } }
        ]
      }
    });

    if (usageCount > 0) {
      return NextResponse.json(
        { error: 'Image is still being used and cannot be deleted' },
        { status: 409 }
      );
    }

    // Delete from S3
    const { deleteFileFromS3 } = await import('@/lib/s3');
    await deleteFileFromS3(imageRecord.key);

    // Delete from database
    await prisma.image.delete({
      where: { id: imageRecord.id }
    });

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}