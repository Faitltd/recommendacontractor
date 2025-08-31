import { z } from 'zod';
import type { ZodSchema } from 'zod';

/**
 * Validate form data against a Zod schema
 */
export function validateFormData<T>(
  schema: ZodSchema<T>,
  formData: FormData | Record<string, any>
): { success: true; data: T } | { success: false; errors: Record<string, string[]> } {
  try {
    let data: Record<string, any>;
    
    if (formData instanceof FormData) {
      data = Object.fromEntries(formData.entries());
      
      // Handle arrays (e.g., checkboxes with same name)
      const arrays: Record<string, string[]> = {};
      for (const [key, value] of formData.entries()) {
        if (arrays[key]) {
          arrays[key].push(value as string);
        } else if (formData.getAll(key).length > 1) {
          arrays[key] = formData.getAll(key) as string[];
        }
      }
      
      // Merge arrays back into data
      Object.assign(data, arrays);
      
      // Convert numeric strings to numbers
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
          data[key] = Number(value);
        }
      }
      
      // Convert boolean strings to booleans
      for (const [key, value] of Object.entries(data)) {
        if (value === 'true') data[key] = true;
        if (value === 'false') data[key] = false;
      }
    } else {
      data = formData;
    }
    
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      
      for (const issue of error.issues) {
        const path = issue.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      }
      
      return { success: false, errors };
    }
    
    throw error;
  }
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: Record<string, string[]>): string {
  return Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join('; ');
}

/**
 * Get the first error message for a field
 */
export function getFieldError(errors: Record<string, string[]>, field: string): string | undefined {
  return errors[field]?.[0];
}

/**
 * Check if a field has validation errors
 */
export function hasFieldError(errors: Record<string, string[]>, field: string): boolean {
  return Boolean(errors[field]?.length);
}

/**
 * Sanitize HTML content to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate file upload
 */
export function validateFileUpload(
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): { valid: true } | { valid: false; error: string } {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = [],
    allowedExtensions = []
  } = options;
  
  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }
  
  // Check file type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type ${file.type} is not allowed` };
  }
  
  // Check file extension
  if (allowedExtensions.length > 0) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
      return { valid: false, error: `File extension .${extension} is not allowed` };
    }
  }
  
  return { valid: true };
}

/**
 * Validate image file specifically
 */
export function validateImageFile(file: File): { valid: true } | { valid: false; error: string } {
  return validateFileUpload(file, {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedExtensions: ['jpg', 'jpeg', 'png', 'webp']
  });
}

/**
 * Validate document file specifically
 */
export function validateDocumentFile(file: File): { valid: true } | { valid: false; error: string } {
  return validateFileUpload(file, {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    allowedExtensions: ['pdf', 'jpg', 'jpeg', 'png']
  });
}
