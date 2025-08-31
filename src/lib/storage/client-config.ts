// Client-side only configuration for file uploads
// This file contains no server-side dependencies

export const clientUploadConfig = {
  // Maximum file sizes (in bytes)
  maxFileSizes: {
    profileImage: 5 * 1024 * 1024, // 5MB
    reviewPhoto: 10 * 1024 * 1024, // 10MB
    document: 20 * 1024 * 1024, // 20MB
  },
  // Allowed file types
  allowedTypes: {
    images: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    documents: ['application/pdf', 'image/jpeg', 'image/png'],
  },
  // Upload paths (for reference only, actual paths handled server-side)
  uploadPaths: {
    profileImages: 'profiles',
    reviewPhotos: 'reviews',
    verificationDocs: 'verification',
    contractorGallery: 'gallery',
  }
};

// Upload configuration presets (client-side only)
export const clientUploadPresets = {
  profileImage: {
    maxSize: clientUploadConfig.maxFileSizes.profileImage,
    allowedTypes: clientUploadConfig.allowedTypes.images,
    path: clientUploadConfig.uploadPaths.profileImages,
    dimensions: {
      minWidth: 150,
      minHeight: 150,
      maxWidth: 2000,
      maxHeight: 2000,
    },
    optimize: true,
    generateThumbnail: true,
  },
  reviewPhoto: {
    maxSize: clientUploadConfig.maxFileSizes.reviewPhoto,
    allowedTypes: clientUploadConfig.allowedTypes.images,
    path: clientUploadConfig.uploadPaths.reviewPhotos,
    dimensions: {
      maxWidth: 1920,
      maxHeight: 1080,
    },
    optimize: true,
    generateThumbnail: true,
  },
  verificationDocument: {
    maxSize: clientUploadConfig.maxFileSizes.document,
    allowedTypes: clientUploadConfig.allowedTypes.documents,
    path: clientUploadConfig.uploadPaths.verificationDocs,
    optimize: false,
    generateThumbnail: false,
  },
  contractorGallery: {
    maxSize: clientUploadConfig.maxFileSizes.reviewPhoto,
    allowedTypes: clientUploadConfig.allowedTypes.images,
    path: clientUploadConfig.uploadPaths.contractorGallery,
    dimensions: {
      maxWidth: 1920,
      maxHeight: 1080,
    },
    optimize: true,
    generateThumbnail: true,
  },
};

// File validation utilities (client-side only)
export const clientFileValidation = {
  /**
   * Validate file type
   */
  isValidType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  },

  /**
   * Validate file size
   */
  isValidSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
  },

  /**
   * Get file extension from filename
   */
  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  },

  /**
   * Format file size for display
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Check if file is an image
   */
  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  },

  /**
   * Get human-readable file type
   */
  getFileTypeLabel(file: File): string {
    const extension = this.getFileExtension(file.name).toUpperCase();
    
    if (this.isImageFile(file)) {
      return `${extension} Image`;
    } else if (file.type === 'application/pdf') {
      return 'PDF Document';
    } else {
      return `${extension} File`;
    }
  },

  /**
   * Generate preview filename (client-side only)
   */
  generatePreviewFilename(originalName: string, preset: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = this.getFileExtension(originalName);
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    return `${preset}_${timestamp}_${random}_${cleanName}`;
  }
};
