import { storage, storageConfig, fileValidation, uploadPresets } from './config';
import type { UploadPreset } from './types';

export interface UploadResult {
  success: boolean;
  url?: string;
  thumbnailUrl?: string;
  filename?: string;
  error?: string;
  metadata?: {
    size: number;
    type: string;
    width?: number;
    height?: number;
  };
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export class FileUploadService {
  /**
   * Upload file to Google Cloud Storage (server-side)
   */
  static async uploadToStorage(
    file: File,
    userId: string,
    preset: keyof typeof uploadPresets,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    try {
      if (!storage) {
        throw new Error('Google Cloud Storage not configured');
      }

      const config = uploadPresets[preset];
      
      // Validate file
      const validation = await this.validateFile(file, config);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Generate unique filename
      const filename = fileValidation.generateUniqueFilename(
        file.name,
        userId,
        preset
      );

      const bucket = storage.bucket(storageConfig.bucketName);
      const fileRef = bucket.file(`${config.path}/${filename}`);

      // Convert File to Buffer (for server-side processing)
      const buffer = Buffer.from(await file.arrayBuffer());

      // Upload file
      const stream = fileRef.createWriteStream({
        metadata: {
          contentType: file.type,
          metadata: {
            uploadedBy: userId,
            originalName: file.name,
            preset: preset,
          },
        },
        resumable: false,
      });

      return new Promise((resolve) => {
        let uploaded = 0;
        
        stream.on('progress', (progress) => {
          uploaded = progress.bytesWritten;
          if (onProgress) {
            onProgress({
              loaded: uploaded,
              total: file.size,
              percentage: Math.round((uploaded / file.size) * 100),
            });
          }
        });

        stream.on('error', (error) => {
          console.error('Upload error:', error);
          resolve({ success: false, error: 'Upload failed' });
        });

        stream.on('finish', async () => {
          try {
            // Make file publicly readable
            await fileRef.makePublic();
            
            const publicUrl = `${storageConfig.publicUrlBase}/${config.path}/${filename}`;
            
            // Generate thumbnail if needed
            let thumbnailUrl: string | undefined;
            if (config.generateThumbnail && config.allowedTypes.includes(file.type)) {
              thumbnailUrl = await this.generateThumbnail(fileRef, filename, config.path);
            }

            resolve({
              success: true,
              url: publicUrl,
              thumbnailUrl,
              filename,
              metadata: {
                size: file.size,
                type: file.type,
                ...validation.dimensions,
              },
            });
          } catch (error) {
            console.error('Post-upload processing error:', error);
            resolve({ success: false, error: 'Upload processing failed' });
          }
        });

        stream.end(buffer);
      });
    } catch (error) {
      console.error('Upload service error:', error);
      return { success: false, error: 'Upload service error' };
    }
  }

  /**
   * Validate file against preset configuration
   */
  static async validateFile(
    file: File,
    config: UploadPreset
  ): Promise<{ valid: boolean; error?: string; dimensions?: { width: number; height: number } }> {
    // Check file type
    if (!fileValidation.isValidType(file, config.allowedTypes)) {
      return {
        valid: false,
        error: `Invalid file type. Allowed types: ${config.allowedTypes.join(', ')}`,
      };
    }

    // Check file size
    if (!fileValidation.isValidSize(file, config.maxSize)) {
      const maxSizeMB = Math.round(config.maxSize / (1024 * 1024));
      return {
        valid: false,
        error: `File too large. Maximum size: ${maxSizeMB}MB`,
      };
    }

    // Check image dimensions if applicable
    if (config.dimensions && config.allowedTypes.some(type => type.startsWith('image/'))) {
      const dimensionCheck = await fileValidation.validateImageDimensions(
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
   * Generate thumbnail (placeholder - would use Sharp in production)
   */
  static async generateThumbnail(
    fileRef: any,
    filename: string,
    path: string
  ): Promise<string> {
    // In production, this would use Sharp to generate thumbnails
    // For now, return the original URL with a thumbnail suffix
    const thumbnailFilename = filename.replace(/(\.[^.]+)$/, '_thumb$1');
    return `${storageConfig.publicUrlBase}/${path}/${thumbnailFilename}`;
  }

  /**
   * Delete file from storage
   */
  static async deleteFile(filePath: string): Promise<boolean> {
    try {
      if (!storage) {
        throw new Error('Google Cloud Storage not configured');
      }

      const bucket = storage.bucket(storageConfig.bucketName);
      await bucket.file(filePath).delete();
      return true;
    } catch (error) {
      console.error('Delete file error:', error);
      return false;
    }
  }

  /**
   * Get signed URL for temporary access (if needed)
   */
  static async getSignedUrl(filePath: string, expiresIn: number = 3600): Promise<string | null> {
    try {
      if (!storage) {
        throw new Error('Google Cloud Storage not configured');
      }

      const bucket = storage.bucket(storageConfig.bucketName);
      const [url] = await bucket.file(filePath).getSignedUrl({
        action: 'read',
        expires: Date.now() + expiresIn * 1000,
      });

      return url;
    } catch (error) {
      console.error('Get signed URL error:', error);
      return null;
    }
  }

  /**
   * Client-side file upload (using fetch to API endpoint)
   */
  static async uploadFile(
    file: File,
    preset: keyof typeof uploadPresets,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    try {
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
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            resolve({ success: false, error: 'Invalid response from server' });
          }
        });

        xhr.addEventListener('error', () => {
          resolve({ success: false, error: 'Upload failed' });
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      });
    } catch (error) {
      console.error('Client upload error:', error);
      return { success: false, error: 'Upload failed' };
    }
  }
}
