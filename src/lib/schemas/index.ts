import { z } from 'zod';

// User validation schemas
export const userCreateSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  facebookId: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const userUpdateSchema = userCreateSchema.partial();

// Contractor validation schemas
export const contractorCreateSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Invalid phone number'),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  yearsInBusiness: z.number().int().min(0, 'Years in business must be 0 or greater').max(100, 'Years in business must be less than 100'),
  licenseNumber: z.string().optional(),
  insuranceInfo: z.string().optional(),
  serviceRadius: z.number().int().min(1, 'Service radius must be at least 1 mile').max(100, 'Service radius must be less than 100 miles').default(25),
  serviceAreas: z.array(z.string()).min(1, 'At least one service area is required'),
  categoryIds: z.array(z.string()).min(1, 'At least one category is required'),
});

export const contractorUpdateSchema = contractorCreateSchema.partial();

// Review validation schemas
export const reviewCreateSchema = z.object({
  contractorId: z.string().cuid('Invalid contractor ID'),
  overallRating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  qualityRating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  timelinessRating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  communicationRating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  pricingRating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  cleanlinessRating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  title: z.string().min(10, 'Title must be at least 10 characters').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(50, 'Review must be at least 50 characters').max(2000, 'Review must be less than 2000 characters'),
  workCity: z.string().min(2, 'City is required'),
  workDate: z.date().optional(),
  projectCost: z.number().positive('Project cost must be positive').optional(),
  wouldRecommend: z.boolean().default(true),
});

export const reviewUpdateSchema = reviewCreateSchema.partial();

// Category validation schemas
export const categoryCreateSchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  parentId: z.string().cuid().optional(),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();

// Search and filter schemas
export const searchFiltersSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  radius: z.number().int().min(1).max(100).optional(),
  minRating: z.number().min(1).max(5).optional(),
  minYearsInBusiness: z.number().int().min(0).max(100).optional(),
  verified: z.boolean().optional(),
  featured: z.boolean().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

// Advertisement validation schemas
export const advertisementCreateSchema = z.object({
  contractorId: z.string().cuid('Invalid contractor ID'),
  type: z.enum(['FEATURED_LISTING', 'BANNER']),
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  imageUrl: z.string().url().optional(),
  targetUrl: z.string().url().optional(),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  locations: z.array(z.string()).min(1, 'At least one location is required'),
  startDate: z.date(),
  endDate: z.date(),
  budget: z.number().positive('Budget must be positive'),
});

export const advertisementUpdateSchema = advertisementCreateSchema.partial();

// Review dispute validation schemas
export const reviewDisputeCreateSchema = z.object({
  reviewId: z.string().cuid('Invalid review ID'),
  reason: z.string().min(10, 'Reason must be at least 10 characters').max(100, 'Reason must be less than 100 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(1000, 'Description must be less than 1000 characters'),
});

export const reviewDisputeUpdateSchema = z.object({
  status: z.enum(['PENDING', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED']),
  adminNotes: z.string().max(1000, 'Admin notes must be less than 1000 characters').optional(),
  resolution: z.string().max(1000, 'Resolution must be less than 1000 characters').optional(),
});

// File upload validation schemas
export const photoUploadSchema = z.object({
  file: z.instanceof(File),
  caption: z.string().max(200, 'Caption must be less than 200 characters').optional(),
});

export const documentUploadSchema = z.object({
  file: z.instanceof(File),
  type: z.enum(['ESTIMATE', 'INVOICE']),
});

// Form validation helpers
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type ContractorCreateInput = z.infer<typeof contractorCreateSchema>;
export type ContractorUpdateInput = z.infer<typeof contractorUpdateSchema>;
export type ReviewCreateInput = z.infer<typeof reviewCreateSchema>;
export type ReviewUpdateInput = z.infer<typeof reviewUpdateSchema>;
export type CategoryCreateInput = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;
export type SearchFiltersInput = z.infer<typeof searchFiltersSchema>;
export type AdvertisementCreateInput = z.infer<typeof advertisementCreateSchema>;
export type AdvertisementUpdateInput = z.infer<typeof advertisementUpdateSchema>;
export type ReviewDisputeCreateInput = z.infer<typeof reviewDisputeCreateSchema>;
export type ReviewDisputeUpdateInput = z.infer<typeof reviewDisputeUpdateSchema>;
export type PhotoUploadInput = z.infer<typeof photoUploadSchema>;
export type DocumentUploadInput = z.infer<typeof documentUploadSchema>;
