import { clientUploadPresets } from './client-config';
import type { UploadResult, UploadProgress } from './types';

/**
 * Client-side file upload service
 * This service only handles browser-side operations and API calls
 * No server-side dependencies (like Google Cloud Storage) are imported here
 */
export class ClientFileUploadService {
  /**
   * Upload file to server via API endpoint
   */
  static async uploadFile(
    file: File,
    preset: keyof typeof clientUploadPresets,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    try {
      // Validate file on client-side first
      const config = clientUploadPresets[preset];
      const validation = await this.validateFile(file, config);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('preset', preset);

      const xhr = new XMLHttpRequest();

      return new Promise((resolve) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            onProgress({
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100),
            });
          }
        });

        xhr.addEventListener('load', () => {
          try {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } else {
              const errorResponse = JSON.parse(xhr.responseText);
              resolve({
                success: false,
                error: errorResponse.error || `Upload failed with status ${xhr.status}`
              });
            }
          } catch (error) {
            resolve({ success: false, error: 'Invalid response from server' });
          }
        });

        xhr.addEventListener('error', () => {
          resolve({ success: false, error: 'Network error during upload' });
        });

        xhr.addEventListener('timeout', () => {
          resolve({ success: false, error: 'Upload timeout' });
        });

        xhr.open('POST', '/api/upload');
        xhr.timeout = 300000; // 5 minutes timeout
        xhr.send(formData);
      });
    } catch (error) {
      console.error('Client upload error:', error);
      return { success: false, error: 'Upload failed' };
    }
  }

  /**
   * Validate file on client-side
   */
  static async validateFile(
    file: File,
    config: typeof clientUploadPresets[keyof typeof clientUploadPresets]
  ): Promise<{ valid: boolean; error?: string; dimensions?: { width: number; height: number } }> {
    // Check file type
    if (!config.allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type. Allowed types: ${config.allowedTypes.join(', ')}`,
      };
    }

    // Check file size
    if (file.size > config.maxSize) {
      const maxSizeMB = Math.round(config.maxSize / (1024 * 1024));
      return {
        valid: false,
        error: `File too large. Maximum size: ${maxSizeMB}MB`,
      };
    }

    // Check image dimensions if applicable
    if (config.dimensions && file.type.startsWith('image/')) {
      const dimensionCheck = await this.validateImageDimensions(
        file,
        config.dimensions.minWidth,
        config.dimensions.minHeight,
        config.dimensions.maxWidth,
        config.dimensions.maxHeight
      );

      if (!dimensionCheck.valid) {
        return { valid: false, error: dimensionCheck.error };
      }

      return {
        valid: true,
        dimensions: { width: dimensionCheck.width, height: dimensionCheck.height },
      };
    }

    return { valid: true };
  }

  /**
   * Validate image dimensions (client-side only)
   */
  static async validateImageDimensions(
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

  /**
   * Generate unique filename (client-side preview)
   */
  static generatePreviewFilename(originalName: string, preset: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop()?.toLowerCase() || '';
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');

    return `${preset}_${timestamp}_${random}_${cleanName}`;
  }

  /**
   * Get file extension from filename
   */
  static getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  /**
   * Format file size for display
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Check if file type is an image
   */
  static isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Create preview URL for image files
   */
  static createPreviewUrl(file: File): string | null {
    if (this.isImageFile(file)) {
      return URL.createObjectURL(file);
    }
    return null;
  }

  /**
   * Revoke preview URL to free memory
   */
  static revokePreviewUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}
