<script lang="ts">
  import { browser } from '$app/environment';
  import StarRating from '$lib/components/StarRating.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  
  let { data } = $props();
  
  // Search and filter state
  let searchQuery = $state('');
  let selectedCategory = $state('');
  let selectedLocation = $state('');
  let minRating = $state(0);
  let showVerifiedOnly = $state(false);
  let sortBy = $state('rating');
  let loading = $state(false);
  
  // Mock contractors data (will be replaced with real data from server)
  let contractors = $state([
    {
      id: '1',
      businessName: 'Denver Pro Plumbing',
      ownerName: 'John Smith',
      categories: [{ category: { name: 'Plumbing', slug: 'plumbing' } }],
      averageRating: 4.8,
      totalReviews: 127,
      yearsInBusiness: 15,
      serviceAreas: ['80202', '80203', '80204'],
      verified: true,
      featuredUntil: new Date('2024-12-31'),
      description: 'Professional plumbing services with 15+ years experience in Denver metro area.',
      phone: '(303) 555-0101'
    },
    {
      id: '2',
      businessName: 'Mile High Electric',
      ownerName: 'Sarah Johnson',
      categories: [{ category: { name: 'Electrical', slug: 'electrical' } }],
      averageRating: 4.6,
      totalReviews: 89,
      yearsInBusiness: 12,
      serviceAreas: ['80202', '80203', '80210'],
      verified: true,
      featuredUntil: null,
      description: 'Licensed electricians serving Denver and surrounding areas.',
      phone: '(303) 555-0102'
    },
    {
      id: '3',
      businessName: 'Rocky Mountain HVAC',
      ownerName: 'Mike Davis',
      categories: [{ category: { name: 'HVAC', slug: 'hvac' } }],
      averageRating: 4.7,
      totalReviews: 156,
      yearsInBusiness: 8,
      serviceAreas: ['80202', '80203', '80204', '80205'],
      verified: true,
      featuredUntil: null,
      description: 'Heating and cooling experts with emergency service available.',
      phone: '(303) 555-0103'
    }
  ]);
  
  // Get URL parameters on client side
  if (browser) {
    const urlParams = new URLSearchParams(window.location.search);
    searchQuery = urlParams.get('q') || '';
    selectedCategory = urlParams.get('category') || '';
    selectedLocation = urlParams.get('location') || '';
  }
  
  // Filter contractors based on search criteria
  const filteredContractors = $derived(() => {
    return contractors.filter(contractor => {
      // Search query filter
      if (searchQuery && !contractor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !contractor.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (selectedCategory && !contractor.categories.some(cat => 
        cat.category.slug === selectedCategory || cat.category.name.toLowerCase() === selectedCategory.toLowerCase())) {
        return false;
      }
      
      // Rating filter
      if (minRating > 0 && contractor.averageRating < minRating) {
        return false;
      }
      
      // Verified only filter
      if (showVerifiedOnly && !contractor.verified) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by featured first, then by selected criteria
      if (a.featuredUntil && !b.featuredUntil) return -1;
      if (!a.featuredUntil && b.featuredUntil) return 1;
      
      switch (sortBy) {
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'experience':
          return b.yearsInBusiness - a.yearsInBusiness;
        case 'name':
          return a.businessName.localeCompare(b.businessName);
        default:
          return 0;
      }
    });
  });
  
  function handleSearch() {
    loading = true;
    // Simulate API call
    setTimeout(() => {
      loading = false;
    }, 500);
  }
  
  function clearFilters() {
    searchQuery = '';
    selectedCategory = '';
    selectedLocation = '';
    minRating = 0;
    showVerifiedOnly = false;
    sortBy = 'rating';
  }
</script>

<svelte:head>
  <title>Find Contractors in Denver - Recommend a Contractor</title>
  <meta name="description" content="Find trusted, verified contractors in Denver. Read reviews, compare ratings, and connect with professionals for your home improvement projects." />
</svelte:head>

<!-- Page Header -->
<section class="bg-white border-b border-gray-200">
  <div class="container-custom py-8">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div class="mb-6 lg:mb-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Find Contractors in Denver
        </h1>
        <p class="text-gray-600">
          {filteredContractors.length} verified contractors ready to help with your project
        </p>
      </div>
      
      <!-- Quick Search -->
      <div class="flex-shrink-0">
        <div class="flex space-x-2">
          <input
            bind:value={searchQuery}
            type="text"
            placeholder="Search contractors..."
            class="input w-64"
            onkeydown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onclick={handleSearch} class="btn btn-primary" aria-label="Search">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Filters and Results -->
<section class="section-padding bg-gray-50">
  <div class="container-custom">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <div class="card p-6 sticky top-24">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Filters</h3>
            <button onclick={clearFilters} class="text-sm text-blue-600 hover:text-blue-500">
              Clear All
            </button>
          </div>
          
          <!-- Category Filter -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2" for="filter-category">Category</label>
            <select id="filter-category" bind:value={selectedCategory} class="input">
              <option value="">All Categories</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hvac">HVAC</option>
              <option value="roofing">Roofing</option>
              <option value="painting">Painting</option>
            </select>
          </div>
          
          <!-- Location Filter -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2" for="filter-location">Location</label>
            <input id="filter-location"
              bind:value={selectedLocation}
              type="text"
              placeholder="ZIP code or city"
              class="input"
            />
          </div>
          
          <!-- Rating Filter -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2" for="filter-min-rating">Minimum Rating</label>
            <select id="filter-min-rating" bind:value={minRating} class="input">
              <option value={0}>Any Rating</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
            </select>
          </div>
          
          <!-- Verified Only -->
          <div class="mb-6">
            <label class="flex items-center">
              <input
                bind:checked={showVerifiedOnly}
                type="checkbox"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700">Verified contractors only</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Results -->
      <div class="lg:col-span-3">
        <!-- Sort Options -->
        <div class="flex items-center justify-between mb-6">
          <p class="text-sm text-gray-600">
            Showing {filteredContractors.length} results
          </p>
          <select bind:value={sortBy} class="input w-auto">
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
            <option value="experience">Most Experience</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
        
        {#if loading}
          <div class="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Searching contractors..." />
          </div>
        {:else if filteredContractors.length === 0}
          <div class="text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No contractors found</h3>
            <p class="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
            <button onclick={clearFilters} class="btn btn-primary">Clear Filters</button>
          </div>
        {:else}
          <!-- Contractor Cards -->
          <div class="space-y-6">
            {#each filteredContractors as contractor}
              <div class="card p-6 hover:shadow-lg transition-shadow duration-200">
                <div class="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div class="flex-1">
                    <div class="flex items-start justify-between mb-3">
                      <div>
                        <div class="flex items-center space-x-3 mb-2">
                          <h3 class="text-xl font-semibold text-gray-900">
                            {contractor.businessName}
                          </h3>
                          {#if contractor.verified}
                            <Badge variant="verified">Verified</Badge>
                          {/if}
                          {#if contractor.featuredUntil}
                            <Badge variant="info">Featured</Badge>
                          {/if}
                        </div>
                        <p class="text-gray-600 text-sm mb-1">Owner: {contractor.ownerName}</p>
                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{contractor.yearsInBusiness} years in business</span>
                          <span>•</span>
                          <span>Serves {contractor.serviceAreas.length} areas</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex items-center space-x-4 mb-3">
                      <StarRating rating={contractor.averageRating} />
                      <span class="text-sm text-gray-600">
                        ({contractor.totalReviews} reviews)
                      </span>
                    </div>
                    
                    <p class="text-gray-700 mb-4">{contractor.description}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                      {#each contractor.categories as category}
                        <Badge variant="default">{category.category.name}</Badge>
                      {/each}
                    </div>
                  </div>
                  
                  <div class="flex flex-col space-y-2 md:ml-6 md:flex-shrink-0">
                    <a href="/contractors/{contractor.id}" class="btn btn-primary">
                      View Profile
                    </a>
                    <a href="tel:{contractor.phone}" class="btn btn-outline">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
