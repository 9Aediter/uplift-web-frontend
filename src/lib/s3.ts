import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_ACCESS_SECRET!,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET!;
const CDN_URL = process.env.CDN_URL!;

export interface UploadResult {
  url: string;
  key: string;
  size: number;
  contentType: string;
}

/**
 * Upload a file to S3
 */
export async function uploadFileToS3(
  file: Buffer,
  key: string,
  contentType: string
): Promise<UploadResult> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
      // Make the object publicly readable
      ACL: 'public-read',
    });

    await s3Client.send(command);

    const url = `${CDN_URL}/${key}`;

    return {
      url,
      key,
      size: file.length,
      contentType,
    };
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
}

/**
 * Delete a file from S3
 */
export async function deleteFileFromS3(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw new Error('Failed to delete file from S3');
  }
}

/**
 * Generate a presigned URL for direct upload from client
 */
export async function generatePresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      ACL: 'public-read',
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    });

    return presignedUrl;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw new Error('Failed to generate presigned URL');
  }
}

/**
 * Generate a presigned URL for downloading/viewing a file
 */
export async function generatePresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    });

    return presignedUrl;
  } catch (error) {
    console.error('Error generating presigned download URL:', error);
    throw new Error('Failed to generate presigned download URL');
  }
}

/**
 * Generate a unique file key for S3 storage
 */
export function generateFileKey(
  originalName: string,
  prefix: string = 'uploads'
): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  const sanitizedName = originalName
    .replace(/[^a-zA-Z0-9.-]/g, '')
    .toLowerCase();
  
  return `${prefix}/${timestamp}-${randomString}-${sanitizedName}`;
}

/**
 * Extract file key from S3 URL
 */
export function extractKeyFromUrl(url: string): string | null {
  try {
    const cdnUrl = CDN_URL;
    if (url.startsWith(cdnUrl)) {
      return url.replace(`${cdnUrl}/`, '');
    }
    
    // Handle direct S3 URLs
    const s3Pattern = new RegExp(`https://${BUCKET_NAME}\\.s3\\.[^/]+\\.amazonaws\\.com/(.+)`);
    const match = url.match(s3Pattern);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error extracting key from URL:', error);
    return null;
  }
}

/**
 * Validate file type and size
 */
export function validateFile(
  file: Buffer,
  fileName: string,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxSizeBytes: number = 10 * 1024 * 1024 // 10MB default
): { isValid: boolean; error?: string } {
  // Check file size
  if (file.length > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size exceeds maximum allowed size of ${maxSizeBytes / (1024 * 1024)}MB`,
    };
  }

  // Check file type by extension
  const extension = fileName.split('.').pop()?.toLowerCase();
  const mimeTypeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
  };

  const detectedMimeType = extension ? mimeTypeMap[extension] : null;
  
  if (!detectedMimeType || !allowedTypes.includes(detectedMimeType)) {
    return {
      isValid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  return { isValid: true };
}