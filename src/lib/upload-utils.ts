// File size threshold in bytes (10MB)
const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024;

// Video file types that should use presigned URL
const VIDEO_TYPES = [
  'video/mp4',
  'video/avi',
  'video/mov',
  'video/wmv',
  'video/flv',
  'video/webm',
  'video/mkv'
];

// Large file types that should use presigned URL
const LARGE_FILE_TYPES = [
  ...VIDEO_TYPES,
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'application/octet-stream'
];

export interface UploadConfig {
  usePresigned: boolean;
  reason: string;
}

/**
 * Determines whether to use presigned URL upload based on file characteristics
 */
export function shouldUsePresignedUpload(file: File): UploadConfig {
  // Check if file is a video
  if (VIDEO_TYPES.includes(file.type)) {
    return {
      usePresigned: true,
      reason: 'Video files use presigned upload for better performance'
    };
  }

  // Check if file type is in large file types
  if (LARGE_FILE_TYPES.includes(file.type)) {
    return {
      usePresigned: true,
      reason: 'Large file type detected, using presigned upload'
    };
  }

  // Check file size
  if (file.size > LARGE_FILE_THRESHOLD) {
    return {
      usePresigned: true,
      reason: `File size (${formatFileSize(file.size)}) exceeds threshold, using presigned upload`
    };
  }

  // Default to regular upload for images and small files
  return {
    usePresigned: false,
    reason: 'Small image file, using direct upload'
  };
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Check if file is a video
 */
export function isVideoFile(file: File): boolean {
  return VIDEO_TYPES.includes(file.type);
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Get upload endpoint based on upload config
 */
export function getUploadEndpoint(config: UploadConfig): string {
  return config.usePresigned ? '/api/upload/presigned' : '/api/upload';
}