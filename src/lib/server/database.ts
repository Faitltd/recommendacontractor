import { db } from './db.js';
import type { 
  User, 
  Contractor, 
  Review, 
  Category,
  SearchFilters,
  PaginatedResponse 
} from '$lib/types/index.js';

/**
 * User database operations
 */
export const userDb = {
  async findById(id: string) {
    return await db.user.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string) {
    return await db.user.findUnique({
      where: { email },
    });
  },

  async findByFacebookId(facebookId: string) {
    return await db.user.findUnique({
      where: { facebookId },
    });
  },

  async create(data: {
    email: string;
    name: string;
    facebookId?: string;
    avatar?: string;
  }) {
    return await db.user.create({
      data,
    });
  },

  async update(id: string, data: Partial<User>) {
    return await db.user.update({
      where: { id },
      data,
    });
  },
};

/**
 * Contractor database operations
 */
export const contractorDb = {
  async findById(id: string) {
    return await db.contractor.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        reviews: {
          include: {
            user: true,
            photos: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  },

  async findByEmail(email: string) {
    return await db.contractor.findUnique({
      where: { email },
    });
  },

  async search(filters: SearchFilters, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (filters.query) {
      where.OR = [
        { businessName: { contains: filters.query, mode: 'insensitive' } },
        { description: { contains: filters.query, mode: 'insensitive' } },
      ];
    }
    
    if (filters.category) {
      where.categories = {
        some: {
          category: {
            slug: filters.category,
          },
        },
      };
    }
    
    if (filters.minRating) {
      where.averageRating = {
        gte: filters.minRating,
      };
    }
    
    if (filters.minYearsInBusiness) {
      where.yearsInBusiness = {
        gte: filters.minYearsInBusiness,
      };
    }
    
    if (filters.verified !== undefined) {
      where.verified = filters.verified;
    }

    const [contractors, total] = await Promise.all([
      db.contractor.findMany({
        where,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
        orderBy: [
          { featuredUntil: { sort: 'desc', nulls: 'last' } },
          { averageRating: 'desc' },
          { totalReviews: 'desc' },
        ],
        skip,
        take: limit,
      }),
      db.contractor.count({ where }),
    ]);

    return {
      data: contractors,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async create(data: any) {
    return await db.contractor.create({
      data,
    });
  },

  async update(id: string, data: any) {
    return await db.contractor.update({
      where: { id },
      data,
    });
  },

  async updateRating(contractorId: string) {
    const reviews = await db.review.findMany({
      where: { contractorId },
      select: { overallRating: true },
    });

    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.overallRating, 0) / reviews.length
      : 0;

    return await db.contractor.update({
      where: { id: contractorId },
      data: {
        averageRating,
        totalReviews: reviews.length,
      },
    });
  },
};

/**
 * Review database operations
 */
export const reviewDb = {
  async findById(id: string) {
    return await db.review.findUnique({
      where: { id },
      include: {
        user: true,
        contractor: true,
        photos: true,
        documents: true,
      },
    });
  },

  async findByContractor(contractorId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [reviews, total] = await Promise.all([
      db.review.findMany({
        where: { contractorId },
        include: {
          user: true,
          photos: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      db.review.count({ where: { contractorId } }),
    ]);

    return {
      data: reviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async create(data: any) {
    const review = await db.review.create({
      data,
      include: {
        user: true,
        contractor: true,
      },
    });

    // Update contractor's average rating
    await contractorDb.updateRating(data.contractorId);

    return review;
  },

  async update(id: string, data: any) {
    return await db.review.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    const review = await db.review.findUnique({
      where: { id },
      select: { contractorId: true },
    });

    await db.review.delete({
      where: { id },
    });

    if (review) {
      await contractorDb.updateRating(review.contractorId);
    }
  },
};

/**
 * Category database operations
 */
export const categoryDb = {
  async findAll() {
    return await db.category.findMany({
      include: {
        children: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  },

  async findBySlug(slug: string) {
    return await db.category.findUnique({
      where: { slug },
      include: {
        children: true,
        parent: true,
      },
    });
  },

  async create(data: {
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
  }) {
    return await db.category.create({
      data,
    });
  },
};
