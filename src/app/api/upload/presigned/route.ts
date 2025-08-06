import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generatePresignedUploadUrl, generateFileKey, validateFile } from '@/lib/s3';

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

    const body = await request.json();
    const { fileName, contentType, uploadType = 'general', fileSize } = body;

    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: 'fileName and contentType are required' },
        { status: 400 }
      );
    }

    // Validate file type and size
    const dummyBuffer = Buffer.alloc(fileSize || 1024); // Create dummy buffer for validation
    const validation = validateFile(dummyBuffer, fileName);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Generate unique file key
    const fileKey = generateFileKey(fileName, uploadType);

    // Generate presigned URL
    const presignedUrl = await generatePresignedUploadUrl(
      fileKey,
      contentType,
      3600 // 1 hour expiration
    );

    return NextResponse.json({
      success: true,
      data: {
        presignedUrl,
        key: fileKey,
        uploadUrl: `${process.env.CDN_URL}/${fileKey}`,
      }
    });

  } catch (error) {
    console.error('Presigned URL error:', error);
    return NextResponse.json(
      { error: 'Failed to generate presigned URL' },
      { status: 500 }
    );
  }
}