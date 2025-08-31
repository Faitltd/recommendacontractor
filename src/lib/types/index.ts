// User types
export interface User {
  id: string;
  email: string;
  name: string;
  facebookId?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Contractor types
export interface Contractor {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  website?: string;
  description?: string;
  yearsInBusiness: number;
  licenseNumber?: string;
  insuranceInfo?: string;
  serviceRadius: number; // in miles
  serviceAreas: string[]; // ZIP codes or city names
  categories: ContractorCategory[];
  verified: boolean;
  featuredUntil?: Date;
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

// Category types
export interface ContractorCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: ContractorCategory[];
}

// Review types
export interface Review {
  id: string;
  userId: string;
  contractorId: string;
  overallRating: number;
  qualityRating: number;
  timelinessRating: number;
  communicationRating: number;
  pricingRating: number;
  cleanlinessRating: number;
  title: string;
  content: string;
  workCity: string;
  workDate?: Date;
  projectCost?: number;
  wouldRecommend: boolean;
  photos: ReviewPhoto[];
  documents: ReviewDocument[];
  verified: boolean;
  helpful: number;
  notHelpful: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  contractor: Contractor;
}

// File types
export interface ReviewPhoto {
  id: string;
  reviewId: string;
  url: string;
  thumbnailUrl: string;
  caption?: string;
  order: number;
}

export interface ReviewDocument {
  id: string;
  reviewId: string;
  type: 'estimate' | 'invoice';
  url: string;
  filename: string;
  size: number;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  location?: string;
  radius?: number;
  minRating?: number;
  minYearsInBusiness?: number;
  verified?: boolean;
  featured?: boolean;
}

export interface SearchResult {
  contractors: Contractor[];
  total: number;
  page: number;
  limit: number;
}

// Advertisement types
export interface Advertisement {
  id: string;
  contractorId: string;
  type: 'featured_listing' | 'banner';
  title: string;
  description?: string;
  imageUrl?: string;
  targetUrl?: string;
  categories: string[];
  locations: string[];
  startDate: Date;
  endDate: Date;
  budget: number;
  impressions: number;
  clicks: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Dispute types
export interface ReviewDispute {
  id: string;
  reviewId: string;
  contractorId: string;
  reason: string;
  description: string;
  status: 'pending' | 'under_review' | 'resolved' | 'rejected';
  adminNotes?: string;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
