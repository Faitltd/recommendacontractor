<script lang="ts">
  import { CONTRACTOR_CATEGORIES } from '$lib/constants/index.js';
  
  // Group categories for better organization
  const categoryGroups = [
    {
      title: 'Essential Services',
      description: 'Core home maintenance and repair services',
      categories: CONTRACTOR_CATEGORIES.filter(cat => 
        ['plumbing', 'electrical', 'hvac', 'roofing'].includes(cat.slug)
      )
    },
    {
      title: 'Home Improvement',
      description: 'Renovation and upgrade services',
      categories: CONTRACTOR_CATEGORIES.filter(cat => 
        ['kitchen-remodeling', 'bathroom-remodeling', 'painting', 'flooring', 'windows-doors'].includes(cat.slug)
      )
    },
    {
      title: 'Construction & Repair',
      description: 'Building and structural work',
      categories: CONTRACTOR_CATEGORIES.filter(cat => 
        ['general-contracting', 'carpentry', 'drywall', 'concrete-masonry', 'siding'].includes(cat.slug)
      )
    },
    {
      title: 'Outdoor & Specialty',
      description: 'Exterior and specialized services',
      categories: CONTRACTOR_CATEGORIES.filter(cat => 
        ['landscaping', 'fencing', 'pool-services', 'insulation', 'interior-design', 'architecture'].includes(cat.slug)
      )
    }
  ];
  
  // Mock contractor counts per category
  const contractorCounts: Record<string, number> = {
    'plumbing': 45,
    'electrical': 38,
    'hvac': 32,
    'roofing': 28,
    'painting': 52,
    'flooring': 24,
    'carpentry': 19,
    'drywall': 16,
    'kitchen-remodeling': 22,
    'bathroom-remodeling': 18,
    'general-contracting': 35,
    'landscaping': 41,
    'concrete-masonry': 15,
    'windows-doors': 12,
    'insulation': 8,
    'siding': 11,
    'fencing': 14,
    'pool-services': 6,
    'interior-design': 9,
    'architecture': 4
  };
</script>

<svelte:head>
  <title>Contractor Services & Categories - Recommend a Contractor</title>
  <meta name="description" content="Browse all contractor services available in Denver. Find plumbers, electricians, HVAC technicians, roofers, and more trusted professionals." />
</svelte:head>

<!-- Hero Section -->
<section class="gradient-primary text-white section-padding">
  <div class="container-custom text-center">
    <h1 class="text-4xl lg:text-5xl font-bold mb-6">
      Professional Services in Denver
    </h1>
    <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
      Find trusted contractors for every home improvement and maintenance need. 
      All professionals are verified and highly rated by Denver homeowners.
    </p>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
      <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <div class="text-2xl font-bold text-white">200+</div>
        <div class="text-blue-200 text-sm">Verified Contractors</div>
      </div>
      <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <div class="text-2xl font-bold text-white">20</div>
        <div class="text-blue-200 text-sm">Service Categories</div>
      </div>
      <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <div class="text-2xl font-bold text-white">5,000+</div>
        <div class="text-blue-200 text-sm">Customer Reviews</div>
      </div>
      <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <div class="text-2xl font-bold text-white">4.8</div>
        <div class="text-blue-200 text-sm">Average Rating</div>
      </div>
    </div>
  </div>
</section>

<!-- Categories Section -->
<section class="section-padding">
  <div class="container-custom">
    {#each categoryGroups as group, groupIndex}
      <div class="mb-16 {groupIndex > 0 ? 'border-t border-gray-200 pt-16' : ''}">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            {group.title}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {group.description}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each group.categories as category}
            <a 
              href="/contractors?category={category.slug}"
              class="card card-hover p-6 group"
            >
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span class="text-2xl">{category.icon}</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p class="text-gray-600 text-sm mb-3">
                    {category.description}
                  </p>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-blue-600 font-medium">
                      {contractorCounts[category.slug] || 0} contractors
                    </span>
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- Popular Categories -->
<section class="section-padding bg-gray-50">
  <div class="container-custom">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        Most Popular Services
      </h2>
      <p class="text-xl text-gray-600">
        The services Denver homeowners request most frequently
      </p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each CONTRACTOR_CATEGORIES.slice(0, 8) as category}
        <a 
          href="/contractors?category={category.slug}"
          class="card card-hover p-4 text-center group"
        >
          <div class="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-200">
            {category.icon}
          </div>
          <h4 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm mb-1">
            {category.name}
          </h4>
          <p class="text-xs text-gray-500">
            {contractorCounts[category.slug] || 0} pros
          </p>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding bg-blue-600 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl font-bold mb-4">
      Can't Find What You're Looking For?
    </h2>
    <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
      We're constantly adding new contractors and services. 
      Contact us to request a specific service or get personalized recommendations.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/contact" class="btn btn-secondary">
        Contact Us
      </a>
      <a href="/contractors" class="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600">
        Browse All Contractors
      </a>
    </div>
  </div>
</section>
