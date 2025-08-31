// Application constants

// Contractor categories with their display names and descriptions
export const CONTRACTOR_CATEGORIES = [
  {
    name: 'Plumbing',
    slug: 'plumbing',
    description: 'Plumbing installation, repair, and maintenance',
    icon: '🔧'
  },
  {
    name: 'Electrical',
    slug: 'electrical',
    description: 'Electrical installation, repair, and maintenance',
    icon: '⚡'
  },
  {
    name: 'HVAC',
    slug: 'hvac',
    description: 'Heating, ventilation, and air conditioning services',
    icon: '🌡️'
  },
  {
    name: 'Roofing',
    slug: 'roofing',
    description: 'Roof installation, repair, and maintenance',
    icon: '🏠'
  },
  {
    name: 'Painting',
    slug: 'painting',
    description: 'Interior and exterior painting services',
    icon: '🎨'
  },
  {
    name: 'Flooring',
    slug: 'flooring',
    description: 'Flooring installation and repair',
    icon: '🏗️'
  },
  {
    name: 'Carpentry',
    slug: 'carpentry',
    description: 'Custom carpentry and framing work',
    icon: '🔨'
  },
  {
    name: 'Drywall',
    slug: 'drywall',
    description: 'Drywall installation and repair',
    icon: '🧱'
  },
  {
    name: 'Kitchen Remodeling',
    slug: 'kitchen-remodeling',
    description: 'Complete kitchen renovation services',
    icon: '🍳'
  },
  {
    name: 'Bathroom Remodeling',
    slug: 'bathroom-remodeling',
    description: 'Complete bathroom renovation services',
    icon: '🛁'
  },
  {
    name: 'General Contracting',
    slug: 'general-contracting',
    description: 'Full-service general contracting',
    icon: '👷'
  },
  {
    name: 'Landscaping',
    slug: 'landscaping',
    description: 'Landscape design and maintenance',
    icon: '🌿'
  },
  {
    name: 'Concrete & Masonry',
    slug: 'concrete-masonry',
    description: 'Concrete and masonry work',
    icon: '🧱'
  },
  {
    name: 'Windows & Doors',
    slug: 'windows-doors',
    description: 'Window and door installation',
    icon: '🚪'
  },
  {
    name: 'Insulation',
    slug: 'insulation',
    description: 'Home insulation services',
    icon: '🏠'
  },
  {
    name: 'Siding',
    slug: 'siding',
    description: 'Exterior siding installation and repair',
    icon: '🏘️'
  },
  {
    name: 'Fencing',
    slug: 'fencing',
    description: 'Fence installation and repair',
    icon: '🚧'
  },
  {
    name: 'Pool Services',
    slug: 'pool-services',
    description: 'Pool installation and maintenance',
    icon: '🏊'
  },
  {
    name: 'Interior Design',
    slug: 'interior-design',
    description: 'Interior design and decoration',
    icon: '🎨'
  },
  {
    name: 'Architecture',
    slug: 'architecture',
    description: 'Architectural design services',
    icon: '📐'
  }
] as const;

// Rating categories for reviews
export const RATING_CATEGORIES = [
  { key: 'overall', label: 'Overall', description: 'Overall satisfaction with the work' },
  { key: 'quality', label: 'Quality', description: 'Quality of workmanship' },
  { key: 'timeliness', label: 'Timeliness', description: 'Completed work on time' },
  { key: 'communication', label: 'Communication', description: 'Clear and responsive communication' },
  { key: 'pricing', label: 'Pricing', description: 'Fair and transparent pricing' },
  { key: 'cleanliness', label: 'Cleanliness', description: 'Kept work area clean' }
] as const;

// File upload limits
export const FILE_LIMITS = {
  PHOTO: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_RESOLUTION: 2048,
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp']
  },
  DOCUMENT: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
    ALLOWED_EXTENSIONS: ['pdf', 'jpg', 'jpeg', 'png']
  }
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  REVIEWS_PER_PAGE: 10,
  CONTRACTORS_PER_PAGE: 20
} as const;

// Search defaults
export const SEARCH_DEFAULTS = {
  RADIUS: 25, // miles
  MIN_RATING: 1,
  MAX_RATING: 5
} as const;

// Advertisement types
export const AD_TYPES = {
  FEATURED_LISTING: {
    name: 'Featured Listing',
    description: 'Appear at the top of search results with highlighting',
    price: 99.99 // per month
  },
  BANNER: {
    name: 'Banner Ad',
    description: 'Display banner ads on category and search pages',
    price: 199.99 // per month
  }
} as const;

// Review dispute statuses
export const DISPUTE_STATUSES = {
  PENDING: { label: 'Pending', color: 'yellow' },
  UNDER_REVIEW: { label: 'Under Review', color: 'blue' },
  RESOLVED: { label: 'Resolved', color: 'green' },
  REJECTED: { label: 'Rejected', color: 'red' }
} as const;

// Document types
export const DOCUMENT_TYPES = {
  ESTIMATE: { label: 'Estimate', description: 'Project estimate or quote' },
  INVOICE: { label: 'Invoice', description: 'Final invoice or receipt' }
} as const;

// Denver area ZIP codes (for initial launch)
export const DENVER_ZIP_CODES = [
  '80202', '80203', '80204', '80205', '80206', '80207', '80208', '80209',
  '80210', '80211', '80212', '80214', '80215', '80216', '80218', '80219',
  '80220', '80221', '80222', '80223', '80224', '80225', '80226', '80227',
  '80228', '80229', '80230', '80231', '80232', '80233', '80234', '80235',
  '80236', '80237', '80238', '80239', '80246', '80247', '80248', '80249',
  '80264', '80290', '80293', '80294'
] as const;

// Common cities in Denver metro area
export const DENVER_METRO_CITIES = [
  'Denver', 'Aurora', 'Lakewood', 'Thornton', 'Arvada', 'Westminster',
  'Centennial', 'Boulder', 'Greeley', 'Longmont', 'Loveland', 'Broomfield',
  'Grand Junction', 'Pueblo', 'Fort Collins', 'Highlands Ranch',
  'Wheat Ridge', 'Englewood', 'Littleton', 'Northglenn'
] as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You must be signed in to perform this action.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size is too large. Please choose a smaller file.',
  INVALID_FILE_TYPE: 'Invalid file type. Please choose a supported file format.'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  REVIEW_CREATED: 'Your review has been submitted successfully!',
  REVIEW_UPDATED: 'Your review has been updated successfully!',
  PROFILE_UPDATED: 'Your profile has been updated successfully!',
  CONTRACTOR_REGISTERED: 'Your contractor profile has been registered successfully!',
  FILE_UPLOADED: 'File uploaded successfully!',
  DISPUTE_SUBMITTED: 'Your dispute has been submitted for review.'
} as const;
