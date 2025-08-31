<script lang="ts">
  import StarRating from '$lib/components/StarRating.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import { formatDate, formatRelativeTime } from '$lib/utils/index.js';
  
  let { data } = $props();
  
  // Mock reviews data
  let reviews = $state([
    {
      id: '1',
      title: 'Excellent plumbing work!',
      content: 'John and his team did an amazing job fixing our kitchen sink and installing a new garbage disposal. Very professional and clean work. They arrived on time, explained everything clearly, and left the area spotless. Highly recommend!',
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
      notHelpful: 1,
      createdAt: new Date('2024-01-15'),
      user: {
        name: 'Sarah M.',
        avatar: null
      },
      contractor: {
        businessName: 'Denver Pro Plumbing',
        id: '1'
      },
      photos: [
        { url: '/api/placeholder/300/200', caption: 'New garbage disposal installation' },
        { url: '/api/placeholder/300/200', caption: 'Clean workspace after completion' }
      ]
    },
    {
      id: '2',
      title: 'Great electrical work',
      content: 'Sarah was very knowledgeable and installed new outlets in our home office. Fair pricing and quality work. She was punctual, professional, and took the time to explain the electrical code requirements.',
      overallRating: 4.5,
      qualityRating: 4.5,
      timelinessRating: 4.0,
      communicationRating: 5.0,
      pricingRating: 4.5,
      cleanlinessRating: 4.5,
      workCity: 'Denver',
      projectCost: 320,
      wouldRecommend: true,
      verified: true,
      helpful: 8,
      notHelpful: 0,
      createdAt: new Date('2024-01-10'),
      user: {
        name: 'Mike R.',
        avatar: null
      },
      contractor: {
        businessName: 'Mile High Electric',
        id: '2'
      },
      photos: []
    },
    {
      id: '3',
      title: 'HVAC system replacement',
      content: 'Mike and his crew replaced our entire HVAC system. The work was completed efficiently and the new system works perfectly. They were very professional throughout the process and cleaned up thoroughly.',
      overallRating: 4.8,
      qualityRating: 5.0,
      timelinessRating: 4.5,
      communicationRating: 4.5,
      pricingRating: 4.5,
      cleanlinessRating: 5.0,
      workCity: 'Lakewood',
      projectCost: 8500,
      wouldRecommend: true,
      verified: true,
      helpful: 15,
      notHelpful: 2,
      createdAt: new Date('2024-01-05'),
      user: {
        name: 'Jennifer L.',
        avatar: null
      },
      contractor: {
        businessName: 'Rocky Mountain HVAC',
        id: '3'
      },
      photos: [
        { url: '/api/placeholder/300/200', caption: 'New HVAC unit installation' }
      ]
    }
  ]);
  
  let sortBy = $state('newest');
  let filterBy = $state('all');
  
  const sortedReviews = $derived(() => {
    let filtered = reviews;
    
    // Apply filters
    if (filterBy === 'verified') {
      filtered = filtered.filter(review => review.verified);
    } else if (filterBy === 'photos') {
      filtered = filtered.filter(review => review.photos.length > 0);
    } else if (filterBy === 'high-rating') {
      filtered = filtered.filter(review => review.overallRating >= 4.5);
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest-rating':
          return b.overallRating - a.overallRating;
        case 'most-helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });
  });
  
  function markHelpful(reviewId: string) {
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
      review.helpful += 1;
    }
  }
  
  function markNotHelpful(reviewId: string) {
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
      review.notHelpful += 1;
    }
  }
</script>

<svelte:head>
  <title>Customer Reviews - Recommend a Contractor</title>
  <meta name="description" content="Read authentic reviews from Denver homeowners about their experiences with local contractors. Find trusted professionals based on real customer feedback." />
</svelte:head>

<!-- Page Header -->
<section class="bg-white border-b border-gray-200">
  <div class="container-custom py-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        Customer Reviews
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Read authentic reviews from Denver homeowners about their experiences with local contractors. 
        All reviews are verified to ensure authenticity and help you make informed decisions.
      </p>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="section-padding bg-gray-50">
  <div class="container-custom">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div class="card p-6">
        <div class="text-3xl font-bold text-blue-600 mb-2">5,247</div>
        <div class="text-gray-600">Total Reviews</div>
      </div>
      <div class="card p-6">
        <div class="text-3xl font-bold text-green-600 mb-2">4.8</div>
        <div class="text-gray-600">Average Rating</div>
      </div>
      <div class="card p-6">
        <div class="text-3xl font-bold text-purple-600 mb-2">98%</div>
        <div class="text-gray-600">Verified Reviews</div>
      </div>
      <div class="card p-6">
        <div class="text-3xl font-bold text-orange-600 mb-2">94%</div>
        <div class="text-gray-600">Would Recommend</div>
      </div>
    </div>
  </div>
</section>

<!-- Reviews Section -->
<section class="section-padding">
  <div class="container-custom">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <div class="card p-6 sticky top-24">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Filter Reviews</h3>
          
          <!-- Filter Options -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" for="reviews-filter-show">Show</label>
              <select id="reviews-filter-show" bind:value={filterBy} class="input">
                <option value="all">All Reviews</option>
                <option value="verified">Verified Only</option>
                <option value="photos">With Photos</option>
                <option value="high-rating">4.5+ Stars</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" for="reviews-filter-sort">Sort By</label>
              <select id="reviews-filter-sort" bind:value={sortBy} class="input">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest-rating">Highest Rating</option>
                <option value="most-helpful">Most Helpful</option>
              </select>
            </div>
          </div>
          
          <!-- Write Review CTA -->
          <div class="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">Share Your Experience</h4>
            <p class="text-sm text-gray-600 mb-4">Help other homeowners by reviewing your contractor.</p>
            <a href="/reviews/write" class="btn btn-primary w-full text-sm">
              Write a Review
            </a>
          </div>
        </div>
      </div>
      
      <!-- Reviews List -->
      <div class="lg:col-span-3">
        <div class="mb-6">
          <p class="text-gray-600">
            Showing {sortedReviews.length} reviews
          </p>
        </div>
        
        <div class="space-y-8">
          {#each sortedReviews as review}
            <div class="card p-6">
              <!-- Review Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {#if review.user.avatar}
                      <img src={review.user.avatar} alt={review.user.name} class="w-12 h-12 rounded-full" />
                    {:else}
                      <span class="text-gray-600 font-medium">
                        {review.user.name.charAt(0)}
                      </span>
                    {/if}
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
              
              <!-- Contractor Info -->
              <div class="mb-4">
                <a href="/contractors/{review.contractor.id}" class="text-blue-600 hover:text-blue-500 font-medium">
                  {review.contractor.businessName}
                </a>
                {#if review.projectCost}
                  <span class="text-gray-500 ml-2">• Project cost: ${review.projectCost.toLocaleString()}</span>
                {/if}
              </div>
              
              <!-- Review Content -->
              <div class="mb-4">
                <h5 class="font-semibold text-gray-900 mb-2">{review.title}</h5>
                <p class="text-gray-700 leading-relaxed">{review.content}</p>
              </div>
              
              <!-- Detailed Ratings -->
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div class="text-center">
                  <div class="text-sm text-gray-600 mb-1">Quality</div>
                  <div class="font-semibold">{review.qualityRating.toFixed(1)}</div>
                </div>
                <div class="text-center">
                  <div class="text-sm text-gray-600 mb-1">Timeliness</div>
                  <div class="font-semibold">{review.timelinessRating.toFixed(1)}</div>
                </div>
                <div class="text-center">
                  <div class="text-sm text-gray-600 mb-1">Communication</div>
                  <div class="font-semibold">{review.communicationRating.toFixed(1)}</div>
                </div>
                <div class="text-center">
                  <div class="text-sm text-gray-600 mb-1">Pricing</div>
                  <div class="font-semibold">{review.pricingRating.toFixed(1)}</div>
                </div>
                <div class="text-center">
                  <div class="text-sm text-gray-600 mb-1">Cleanliness</div>
                  <div class="font-semibold">{review.cleanlinessRating.toFixed(1)}</div>
                </div>
                <div class="text-center">
                  <div class="text-sm text-gray-600 mb-1">Recommend</div>
                  <div class="font-semibold">{review.wouldRecommend ? 'Yes' : 'No'}</div>
                </div>
              </div>
              
              <!-- Photos -->
              {#if review.photos.length > 0}
                <div class="mb-4">
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {#each review.photos as photo}
                      <div class="relative">
                        <img 
                          src={photo.url} 
                          alt={photo.caption}
                          class="w-full h-32 object-cover rounded-lg"
                        />
                        {#if photo.caption}
                          <p class="text-xs text-gray-600 mt-1">{photo.caption}</p>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
              
              <!-- Review Actions -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <div class="flex items-center space-x-4">
                  <button 
                    onclick={() => markHelpful(review.id)}
                    class="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                    </svg>
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button 
                    onclick={() => markNotHelpful(review.id)}
                    class="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path>
                    </svg>
                    <span>Not helpful ({review.notHelpful})</span>
                  </button>
                </div>
                <div class="text-sm text-gray-500">
                  {formatDate(review.createdAt)}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
