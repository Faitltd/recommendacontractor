import { browser } from '$app/environment';

// Google Cloud Storage configuration
export const storageConfig = {
  projectId: 'your-gcp-project-id',
  keyFilename: 'path/to/service-account-key.json', // For server-side only
  bucketName: 'recommend-contractor-uploads',
  // Public URL base for accessing uploaded files
  publicUrlBase: 'https://storage.googleapis.com/recommend-contractor-uploads',
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
  // Upload paths
  uploadPaths: {
    profileImages: 'profiles',
    reviewPhotos: 'reviews',
    verificationDocs: 'verification',
    contractorGallery: 'gallery',
  }
};

// Initialize Google Cloud Storage (server-side only)
let storage: any = null;

if (!browser) {
  (async () => {
    try {
      const { Storage } = await import('@google-cloud/storage');
      storage = new Storage({
        projectId: storageConfig.projectId,
        keyFilename: storageConfig.keyFilename,
      });
    } catch (error) {
      console.warn('Google Cloud Storage not configured:', error);
    }
  })();
}

export { storage };

// File validation utilities
export const fileValidation = {
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
   * Generate unique filename
   */
  generateUniqueFilename(originalName: string, userId: string, prefix?: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = this.getFileExtension(originalName);
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    if (prefix) {
      return `${prefix}_${userId}_${timestamp}_${random}_${cleanName}`;
    }
    return `${userId}_${timestamp}_${random}_${cleanName}`;
  },

  /**
   * Validate image dimensions (client-side)
   */
  async validateImageDimensions(
    file: File, 
    minWidth?: number, 
    minHeight?: number, 
    maxWidth?: number, 
    maxHeight?: number
  ): Promise<{ valid: boolean; width: number; height: number; error?: string }> {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        
        const { width, height } = img;
        let valid = true;
        let error = '';
        
        if (minWidth && width < minWidth) {
          valid = false;
          error = `Image width must be at least ${minWidth}px`;
        } else if (maxWidth && width > maxWidth) {
          valid = false;
          error = `Image width must be no more than ${maxWidth}px`;
        } else if (minHeight && height < minHeight) {
          valid = false;
          error = `Image height must be at least ${minHeight}px`;
        } else if (maxHeight && height > maxHeight) {
          valid = false;
          error = `Image height must be no more than ${maxHeight}px`;
        }
        
        resolve({ valid, width, height, error });
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({ valid: false, width: 0, height: 0, error: 'Invalid image file' });
      };
      
      img.src = url;
    });
  }
};

// Upload configuration presets
export const uploadPresets = {
  profileImage: {
    maxSize: storageConfig.maxFileSizes.profileImage,
    allowedTypes: storageConfig.allowedTypes.images,
    path: storageConfig.uploadPaths.profileImages,
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
    maxSize: storageConfig.maxFileSizes.reviewPhoto,
    allowedTypes: storageConfig.allowedTypes.images,
    path: storageConfig.uploadPaths.reviewPhotos,
    dimensions: {
      maxWidth: 1920,
      maxHeight: 1080,
    },
    optimize: true,
    generateThumbnail: true,
  },
  verificationDocument: {
    maxSize: storageConfig.maxFileSizes.document,
    allowedTypes: storageConfig.allowedTypes.documents,
    path: storageConfig.uploadPaths.verificationDocs,
    optimize: false,
    generateThumbnail: false,
  },
  contractorGallery: {
    maxSize: storageConfig.maxFileSizes.reviewPhoto,
    allowedTypes: storageConfig.allowedTypes.images,
    path: storageConfig.uploadPaths.contractorGallery,
    dimensions: {
      maxWidth: 1920,
      maxHeight: 1080,
    },
    optimize: true,
    generateThumbnail: true,
  },
};
