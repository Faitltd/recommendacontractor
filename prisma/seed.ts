import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create contractor categories
  const categories = [
    { name: 'Plumbing', slug: 'plumbing', description: 'Plumbing installation, repair, and maintenance' },
    { name: 'Electrical', slug: 'electrical', description: 'Electrical installation, repair, and maintenance' },
    { name: 'HVAC', slug: 'hvac', description: 'Heating, ventilation, and air conditioning services' },
    { name: 'Roofing', slug: 'roofing', description: 'Roof installation, repair, and maintenance' },
    { name: 'Painting', slug: 'painting', description: 'Interior and exterior painting services' },
    { name: 'Flooring', slug: 'flooring', description: 'Flooring installation and repair' },
    { name: 'Carpentry', slug: 'carpentry', description: 'Custom carpentry and framing work' },
    { name: 'Drywall', slug: 'drywall', description: 'Drywall installation and repair' },
    { name: 'Kitchen Remodeling', slug: 'kitchen-remodeling', description: 'Complete kitchen renovation services' },
    { name: 'Bathroom Remodeling', slug: 'bathroom-remodeling', description: 'Complete bathroom renovation services' },
    { name: 'General Contracting', slug: 'general-contracting', description: 'Full-service general contracting' },
    { name: 'Landscaping', slug: 'landscaping', description: 'Landscape design and maintenance' },
    { name: 'Concrete & Masonry', slug: 'concrete-masonry', description: 'Concrete and masonry work' },
    { name: 'Windows & Doors', slug: 'windows-doors', description: 'Window and door installation' },
    { name: 'Insulation', slug: 'insulation', description: 'Home insulation services' },
    { name: 'Siding', slug: 'siding', description: 'Exterior siding installation and repair' },
    { name: 'Fencing', slug: 'fencing', description: 'Fence installation and repair' },
    { name: 'Pool Services', slug: 'pool-services', description: 'Pool installation and maintenance' },
    { name: 'Interior Design', slug: 'interior-design', description: 'Interior design and decoration' },
    { name: 'Architecture', slug: 'architecture', description: 'Architectural design services' },
  ];

  console.log('Creating categories...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  // Create sample contractors
  const contractors = [
    {
      businessName: 'Denver Pro Plumbing',
      ownerName: 'John Smith',
      email: 'john@denverproplumbing.com',
      phone: '(303) 555-0101',
      website: 'https://denverproplumbing.com',
      description: 'Professional plumbing services in Denver metro area with 15+ years experience.',
      yearsInBusiness: 15,
      licenseNumber: 'PL-2024-001',
      insuranceInfo: 'Fully insured and bonded',
      serviceRadius: 30,
      serviceAreas: ['80202', '80203', '80204', '80205', '80206'],
      verified: true,
      averageRating: 4.8,
      totalReviews: 127,
    },
    {
      businessName: 'Mile High Electric',
      ownerName: 'Sarah Johnson',
      email: 'sarah@milehighelectric.com',
      phone: '(303) 555-0102',
      website: 'https://milehighelectric.com',
      description: 'Licensed electricians serving Denver and surrounding areas.',
      yearsInBusiness: 12,
      licenseNumber: 'EL-2024-002',
      insuranceInfo: 'Licensed, bonded, and insured',
      serviceRadius: 25,
      serviceAreas: ['80202', '80203', '80204', '80210', '80211'],
      verified: true,
      averageRating: 4.6,
      totalReviews: 89,
    },
    {
      businessName: 'Rocky Mountain HVAC',
      ownerName: 'Mike Davis',
      email: 'mike@rockymountainhvac.com',
      phone: '(303) 555-0103',
      description: 'Heating and cooling experts with emergency service available.',
      yearsInBusiness: 8,
      licenseNumber: 'HVAC-2024-003',
      serviceRadius: 35,
      serviceAreas: ['80202', '80203', '80204', '80205', '80206', '80207'],
      verified: true,
      averageRating: 4.7,
      totalReviews: 156,
    },
  ];

  console.log('Creating contractors...');
  const createdContractors = [];
  for (const contractor of contractors) {
    const created = await prisma.contractor.upsert({
      where: { email: contractor.email },
      update: {},
      create: contractor,
    });
    createdContractors.push(created);
  }

  // Link contractors to categories
  console.log('Linking contractors to categories...');
  const plumbingCategory = await prisma.category.findUnique({ where: { slug: 'plumbing' } });
  const electricalCategory = await prisma.category.findUnique({ where: { slug: 'electrical' } });
  const hvacCategory = await prisma.category.findUnique({ where: { slug: 'hvac' } });

  if (plumbingCategory && electricalCategory && hvacCategory) {
    // Link Denver Pro Plumbing to plumbing category
    await prisma.contractorCategory.upsert({
      where: {
        contractorId_categoryId: {
          contractorId: createdContractors[0].id,
          categoryId: plumbingCategory.id,
        },
      },
      update: {},
      create: {
        contractorId: createdContractors[0].id,
        categoryId: plumbingCategory.id,
      },
    });

    // Link Mile High Electric to electrical category
    await prisma.contractorCategory.upsert({
      where: {
        contractorId_categoryId: {
          contractorId: createdContractors[1].id,
          categoryId: electricalCategory.id,
        },
      },
      update: {},
      create: {
        contractorId: createdContractors[1].id,
        categoryId: electricalCategory.id,
      },
    });

    // Link Rocky Mountain HVAC to HVAC category
    await prisma.contractorCategory.upsert({
      where: {
        contractorId_categoryId: {
          contractorId: createdContractors[2].id,
          categoryId: hvacCategory.id,
        },
      },
      update: {},
      create: {
        contractorId: createdContractors[2].id,
        categoryId: hvacCategory.id,
      },
    });
  }

  // Create a sample user
  console.log('Creating sample user...');
  const sampleUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      verified: true,
    },
  });

  // Create sample reviews
  console.log('Creating sample reviews...');
  const sampleReviews = [
    {
      userId: sampleUser.id,
      contractorId: createdContractors[0].id,
      overallRating: 5.0,
      qualityRating: 5.0,
      timelinessRating: 4.5,
      communicationRating: 5.0,
      pricingRating: 4.5,
      cleanlinessRating: 5.0,
      title: 'Excellent plumbing work!',
      content: 'John and his team did an amazing job fixing our kitchen sink and installing a new garbage disposal. Very professional and clean work.',
      workCity: 'Denver',
      projectCost: 450.00,
      wouldRecommend: true,
      verified: true,
    },
    {
      userId: sampleUser.id,
      contractorId: createdContractors[1].id,
      overallRating: 4.5,
      qualityRating: 4.5,
      timelinessRating: 4.0,
      communicationRating: 5.0,
      pricingRating: 4.5,
      cleanlinessRating: 4.5,
      title: 'Great electrical work',
      content: 'Sarah was very knowledgeable and installed new outlets in our home office. Fair pricing and quality work.',
      workCity: 'Denver',
      projectCost: 320.00,
      wouldRecommend: true,
      verified: true,
    },
  ];

  for (const review of sampleReviews) {
    // Check if review already exists
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: review.userId,
        contractorId: review.contractorId,
      },
    });

    if (!existingReview) {
      await prisma.review.create({
        data: review,
      });
    }
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
