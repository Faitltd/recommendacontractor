export interface UploadPreset {
  maxSize: number;
  allowedTypes: string[];
  path: string;
  dimensions?: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
  };
  optimize: boolean;
  generateThumbnail: boolean;
}

export interface FileMetadata {
  size: number;
  type: string;
  width?: number;
  height?: number;
  uploadedAt: Date;
  uploadedBy: string;
  originalName: string;
}

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string;
  metadata: FileMetadata;
  preset: string;
}

export interface UploadError {
  code: string;
  message: string;
  details?: any;
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface UploadState {
  status: UploadStatus;
  progress: number;
  error?: string;
  result?: UploadedFile;
}

// Client-side specific types
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
