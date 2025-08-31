<script lang="ts">
  import StarRating from '$lib/components/StarRating.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import { formatDate, formatRelativeTime } from '$lib/utils/index.js';
  
  let { data } = $props();

  // Get contractor ID from URL params
  // In a real app, this would be loaded from the server
  // For now, we'll use mock data
  
  // Mock contractor data (will be loaded from server)
  let contractor = $state({
    id: '1',
    businessName: 'Denver Pro Plumbing',
    ownerName: 'John Smith',
    email: 'john@denverproplumbing.com',
    phone: '(303) 555-0101',
    website: 'https://denverproplumbing.com',
    description: 'Professional plumbing services in Denver metro area with 15+ years experience. We specialize in residential and commercial plumbing, emergency repairs, and new installations. Licensed, bonded, and insured.',
    yearsInBusiness: 15,
    licenseNumber: 'PL-2024-001',
    insuranceInfo: 'Fully insured and bonded - $2M liability coverage',
    serviceRadius: 30,
    serviceAreas: ['80202', '80203', '80204', '80205', '80206'],
    verified: true,
    featuredUntil: new Date('2024-12-31'),
    averageRating: 4.8,
    totalReviews: 127,
    categories: [
      { category: { name: 'Plumbing', slug: 'plumbing' } },
      { category: { name: 'Emergency Repairs', slug: 'emergency-repairs' } }
    ],
    reviews: [
      {
        id: '1',
        title: 'Excellent plumbing work!',
        content: 'John and his team did an amazing job fixing our kitchen sink and installing a new garbage disposal. Very professional and clean work.',
        overallRating: 5.0,
        qualityRating: 5.0,
        timelinessRating: 4.5,
        communicationRating: 5.0,
        pricingRating: 4.5,
        cleanlinessRating: 5.0,
        workCity: 'Denver',
        projectCost: 450,
        wouldRecommend: true,
        verified: true,
        helpful: 12,
        createdAt: new Date('2024-01-15'),
        user: { name: 'Sarah M.' },
        photos: []
      },
      {
        id: '2',
        title: 'Quick emergency repair',
        content: 'Called John for an emergency pipe burst on Sunday. He came out within 2 hours and fixed the problem quickly. Fair pricing for emergency service.',
        overallRating: 4.5,
        qualityRating: 4.5,
        timelinessRating: 5.0,
        communicationRating: 4.0,
        pricingRating: 4.0,
        cleanlinessRating: 4.5,
        workCity: 'Lakewood',
        projectCost: 280,
        wouldRecommend: true,
        verified: true,
        helpful: 8,
        createdAt: new Date('2024-01-08'),
        user: { name: 'Mike R.' },
        photos: []
      }
    ]
  });
  
  let showAllReviews = $state(false);
  let contactClicked = $state(false);
  
  const displayedReviews = $derived(() => {
    return showAllReviews ? contractor.reviews : contractor.reviews.slice(0, 3);
  });
  
  function handleContactClick() {
    contactClicked = true;
    // In a real app, this would track the contact click for analytics
  }
  
  function calculateCategoryRating(category: string) {
    const categoryReviews = contractor.reviews.filter(review => 
      // In a real app, you'd filter by actual category
      true
    );
    
    if (categoryReviews.length === 0) return 0;
    
    const sum = categoryReviews.reduce((acc, review) => {
      switch (category) {
        case 'quality': return acc + review.qualityRating;
        case 'timeliness': return acc + review.timelinessRating;
        case 'communication': return acc + review.communicationRating;
        case 'pricing': return acc + review.pricingRating;
        case 'cleanliness': return acc + review.cleanlinessRating;
        default: return acc + review.overallRating;
      }
    }, 0);
    
    return sum / categoryReviews.length;
  }
</script>

<svelte:head>
  <title>{contractor.businessName} - Contractor Profile | Recommend a Contractor</title>
  <meta name="description" content="View {contractor.businessName}'s profile, reviews, and contact information. {contractor.description}" />
</svelte:head>

<!-- Contractor Header -->
<section class="bg-white border-b border-gray-200">
  <div class="container-custom py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Info -->
      <div class="lg:col-span-2">
        <div class="flex items-start justify-between mb-6">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <h1 class="text-3xl font-bold text-gray-900">
                {contractor.businessName}
              </h1>
              {#if contractor.verified}
                <Badge variant="verified">Verified</Badge>
              {/if}
              {#if contractor.featuredUntil}
                <Badge variant="info">Featured</Badge>
              {/if}
            </div>
            <p class="text-gray-600 mb-2">Owner: {contractor.ownerName}</p>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span>{contractor.yearsInBusiness} years in business</span>
              <span>•</span>
              <span>Serves {contractor.serviceAreas.length} areas</span>
              <span>•</span>
              <span>License: {contractor.licenseNumber}</span>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-6 mb-6">
          <div class="flex items-center space-x-2">
            <StarRating rating={contractor.averageRating} size="lg" />
            <span class="text-lg font-semibold text-gray-900">
              {contractor.averageRating.toFixed(1)}
            </span>
          </div>
          <span class="text-gray-600">
            ({contractor.totalReviews} reviews)
          </span>
        </div>
        
        <p class="text-gray-700 leading-relaxed mb-6">
          {contractor.description}
        </p>
        
        <div class="flex flex-wrap gap-2">
          {#each contractor.categories as category}
            <Badge variant="default">{category.category.name}</Badge>
          {/each}
        </div>
      </div>
      
      <!-- Contact Card -->
      <div class="lg:col-span-1">
        <div class="card p-6 sticky top-24">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          
          <div class="space-y-4 mb-6">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span class="text-gray-700">{contractor.phone}</span>
            </div>
            
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="text-gray-700">{contractor.email}</span>
            </div>
            
            {#if contractor.website}
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                </svg>
                <a href={contractor.website} target="_blank" class="text-blue-600 hover:text-blue-500">
                  Visit Website
                </a>
              </div>
            {/if}
          </div>
          
          <div class="space-y-3">
            <a 
              href="tel:{contractor.phone}" 
              onclick={handleContactClick}
              class="btn btn-primary w-full"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Call Now
            </a>
            
            <a 
              href="mailto:{contractor.email}" 
              onclick={handleContactClick}
              class="btn btn-outline w-full"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Send Email
            </a>
          </div>
          
          {#if contactClicked}
            <div class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-sm text-green-800">
                📞 Contact initiated! The contractor has been notified.
              </p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Rating Breakdown -->
<section class="section-padding bg-gray-50">
  <div class="container-custom">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">Rating Breakdown</h2>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {#each [
        { key: 'quality', label: 'Quality' },
        { key: 'timeliness', label: 'Timeliness' },
        { key: 'communication', label: 'Communication' },
        { key: 'pricing', label: 'Pricing' },
        { key: 'cleanliness', label: 'Cleanliness' },
        { key: 'overall', label: 'Overall' }
      ] as category}
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-blue-600 mb-2">
            {calculateCategoryRating(category.key).toFixed(1)}
          </div>
          <div class="text-sm text-gray-600">{category.label}</div>
          <div class="mt-2">
            <StarRating rating={calculateCategoryRating(category.key)} size="sm" showValue={false} />
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Reviews Section -->
<section class="section-padding">
  <div class="container-custom">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-gray-900">
        Customer Reviews ({contractor.totalReviews})
      </h2>
      <a href="/reviews/write?contractor={contractor.id}" class="btn btn-primary">
        Write a Review
      </a>
    </div>
    
    <div class="space-y-6">
      {#each displayedReviews as review}
        <div class="card p-6">
          <!-- Review Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span class="text-gray-600 font-medium">
                  {review.user.name.charAt(0)}
                </span>
              </div>
              <div>
                <div class="flex items-center space-x-2 mb-1">
                  <h4 class="font-semibold text-gray-900">{review.user.name}</h4>
                  {#if review.verified}
                    <Badge variant="verified">Verified</Badge>
                  {/if}
                </div>
                <p class="text-sm text-gray-500">
                  {formatRelativeTime(review.createdAt)} • {review.workCity}
                </p>
              </div>
            </div>
            <StarRating rating={review.overallRating} />
          </div>
          
          <!-- Review Content -->
          <div class="mb-4">
            <h5 class="font-semibold text-gray-900 mb-2">{review.title}</h5>
            <p class="text-gray-700">{review.content}</p>
          </div>
          
          <!-- Project Details -->
          {#if review.projectCost}
            <div class="text-sm text-gray-500 mb-4">
              Project cost: ${review.projectCost.toLocaleString()}
            </div>
          {/if}
          
          <!-- Helpful Actions -->
          <div class="flex items-center space-x-4 pt-4 border-t border-gray-200">
            <button class="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
              </svg>
              <span>Helpful ({review.helpful})</span>
            </button>
            <span class="text-sm text-gray-500">
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
      {/each}
    </div>
    
    {#if contractor.reviews.length > 3 && !showAllReviews}
      <div class="text-center mt-8">
        <button 
          onclick={() => showAllReviews = true}
          class="btn btn-outline"
        >
          Show All {contractor.totalReviews} Reviews
        </button>
      </div>
    {/if}
  </div>
</section>

<!-- Service Areas -->
<section class="section-padding bg-gray-50">
  <div class="container-custom">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">Service Areas</h2>
    
    <div class="card p-6">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {#each contractor.serviceAreas as area}
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="font-medium text-gray-900">{area}</div>
          </div>
        {/each}
      </div>
      
      <div class="mt-6 p-4 bg-blue-50 rounded-lg">
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <div>
            <h4 class="font-medium text-blue-900 mb-1">Service Radius</h4>
            <p class="text-sm text-blue-800">
              Serves within {contractor.serviceRadius} miles of Denver metro area. 
              Contact for availability in your specific location.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
