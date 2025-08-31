<script lang="ts">
  import { browser } from '$app/environment';
  import Badge from '$lib/components/Badge.svelte';
  import StarRating from '$lib/components/StarRating.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import { formatDate, formatRelativeTime } from '$lib/utils/index.js';
  
  // Mock reviews data
  let reviews = $state([
    {
      id: '1',
      title: 'Excellent plumbing work!',
      content: 'John and his team did an amazing job fixing our kitchen sink and installing a new garbage disposal. Very professional and clean work. They arrived on time, explained everything clearly, and left the area spotless.',
      overallRating: 5.0,
      qualityRating: 5.0,
      timelinessRating: 4.5,
      communicationRating: 5.0,
      pricingRating: 4.5,
      cleanlinessRating: 5.0,
      workCity: 'Denver',
      projectCost: 450,
      wouldRecommend: true,
      status: 'published',
      flagged: false,
      flagReason: null,
      helpful: 12,
      notHelpful: 1,
      createdAt: new Date('2024-01-15'),
      user: {
        name: 'Sarah M.',
        email: 'sarah.m@email.com'
      },
      contractor: {
        businessName: 'Denver Pro Plumbing',
        id: '1'
      },
      moderationNotes: null
    },
    {
      id: '2',
      title: 'Terrible experience - avoid!',
      content: 'This contractor was unprofessional, showed up late, and did poor quality work. The job took twice as long as promised and cost more than quoted. Would not recommend.',
      overallRating: 1.0,
      qualityRating: 1.0,
      timelinessRating: 1.0,
      communicationRating: 2.0,
      pricingRating: 1.0,
      cleanlinessRating: 2.0,
      workCity: 'Denver',
      projectCost: 800,
      wouldRecommend: false,
      status: 'flagged',
      flagged: true,
      flagReason: 'Potentially fake review',
      helpful: 2,
      notHelpful: 8,
      createdAt: new Date('2024-01-18'),
      user: {
        name: 'Anonymous User',
        email: 'temp@email.com'
      },
      contractor: {
        businessName: 'Mile High Electric',
        id: '2'
      },
      moderationNotes: 'Review flagged by contractor - investigating authenticity'
    },
    {
      id: '3',
      title: 'Great HVAC service',
      content: 'Mike and his crew replaced our entire HVAC system. The work was completed efficiently and the new system works perfectly. They were very professional throughout the process.',
      overallRating: 4.8,
      qualityRating: 5.0,
      timelinessRating: 4.5,
      communicationRating: 4.5,
      pricingRating: 4.5,
      cleanlinessRating: 5.0,
      workCity: 'Lakewood',
      projectCost: 8500,
      wouldRecommend: true,
      status: 'pending',
      flagged: false,
      flagReason: null,
      helpful: 0,
      notHelpful: 0,
      createdAt: new Date('2024-01-20'),
      user: {
        name: 'Jennifer L.',
        email: 'jennifer.l@email.com'
      },
      contractor: {
        businessName: 'Rocky Mountain HVAC',
        id: '3'
      },
      moderationNotes: null
    }
  ]);
  
  let searchQuery = $state('');
  let statusFilter = $state('all');
  let ratingFilter = $state('all');
  let sortBy = $state('created_desc');
  let selectedReviews = $state<string[]>([]);
  let showModerationModal = $state(false);
  let moderationReview = $state<any>(null);
  let moderationAction = $state('');
  let moderationNotes = $state('');
  let loading = $state(false);
  
  // Get URL parameters
  if (browser) {
    const urlParams = new URLSearchParams(window.location.search);
    statusFilter = urlParams.get('status') || 'all';
    if (urlParams.get('flagged') === 'true') {
      statusFilter = 'flagged';
    }
  }
  
  const filteredReviews = $derived(() => {
    return reviews
      .filter(review => {
        // Search filter
        if (searchQuery && !review.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !review.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !review.contractor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !review.user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Status filter
        if (statusFilter !== 'all' && review.status !== statusFilter) {
          return false;
        }
        
        // Rating filter
        if (ratingFilter !== 'all') {
          const rating = parseFloat(ratingFilter);
          if (review.overallRating < rating) {
            return false;
          }
        }
        
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'created_desc':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'created_asc':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'rating_desc':
            return b.overallRating - a.overallRating;
          case 'rating_asc':
            return a.overallRating - b.overallRating;
          default:
            return 0;
        }
      });
  });
  
  function toggleReviewSelection(reviewId: string) {
    if (selectedReviews.includes(reviewId)) {
      selectedReviews = selectedReviews.filter(id => id !== reviewId);
    } else {
      selectedReviews = [...selectedReviews, reviewId];
    }
  }
  
  function selectAllReviews() {
    if (selectedReviews.length === filteredReviews.length) {
      selectedReviews = [];
    } else {
      selectedReviews = filteredReviews.map(r => r.id);
    }
  }
  
  function openModerationModal(review: any, action: string) {
    moderationReview = review;
    moderationAction = action;
    moderationNotes = review.moderationNotes || '';
    showModerationModal = true;
  }
  
  async function moderateReview() {
    if (!moderationReview) return;
    
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const review = reviews.find(r => r.id === moderationReview.id);
      if (review) {
        review.status = moderationAction;
        review.moderationNotes = moderationNotes;
        if (moderationAction === 'published') {
          review.flagged = false;
          review.flagReason = null;
        }
      }
      
      showModerationModal = false;
      moderationReview = null;
      moderationNotes = '';
    } catch (error) {
      console.error('Failed to moderate review:', error);
    } finally {
      loading = false;
    }
  }
  
  async function bulkAction(action: string) {
    if (selectedReviews.length === 0) return;
    
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      selectedReviews.forEach(reviewId => {
        const review = reviews.find(r => r.id === reviewId);
        if (review) {
          switch (action) {
            case 'approve':
              review.status = 'published';
              review.flagged = false;
              review.flagReason = null;
              break;
            case 'reject':
              review.status = 'rejected';
              break;
            case 'delete':
              reviews = reviews.filter(r => r.id !== reviewId);
              break;
          }
        }
      });
      
      selectedReviews = [];
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      loading = false;
    }
  }
  
  function getStatusColor(status: string) {
    switch (status) {
      case 'published': return 'success';
      case 'pending': return 'warning';
      case 'flagged': return 'error';
      case 'rejected': return 'error';
      default: return 'default';
    }
  }
</script>

<!-- Reviews Management -->
<div class="space-y-6">
  <!-- Header Actions -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div class="flex items-center space-x-4">
      <div class="relative">
        <input
          bind:value={searchQuery}
          type="text"
          placeholder="Search reviews..."
          class="input pl-10 w-64"
        />
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      
      <select bind:value={statusFilter} class="input w-auto">
        <option value="all">All Status</option>
        <option value="published">Published</option>
        <option value="pending">Pending</option>
        <option value="flagged">Flagged</option>
        <option value="rejected">Rejected</option>
      </select>
      
      <select bind:value={ratingFilter} class="input w-auto">
        <option value="all">All Ratings</option>
        <option value="4">4+ Stars</option>
        <option value="3">3+ Stars</option>
        <option value="2">2+ Stars</option>
        <option value="1">1+ Stars</option>
      </select>
      
      <select bind:value={sortBy} class="input w-auto">
        <option value="created_desc">Newest First</option>
        <option value="created_asc">Oldest First</option>
        <option value="rating_desc">Highest Rated</option>
        <option value="rating_asc">Lowest Rated</option>
      </select>
    </div>
    
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-600">
        {filteredReviews.length} reviews
      </span>
    </div>
  </div>
  
  <!-- Bulk Actions -->
  {#if selectedReviews.length > 0}
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-blue-900">
          {selectedReviews.length} review{selectedReviews.length === 1 ? '' : 's'} selected
        </span>
        <div class="flex items-center space-x-2">
          <button
            onclick={() => bulkAction('approve')}
            disabled={loading}
            class="btn btn-primary btn-sm"
          >
            Approve
          </button>
          <button
            onclick={() => bulkAction('reject')}
            disabled={loading}
            class="btn btn-secondary btn-sm"
          >
            Reject
          </button>
          <button
            onclick={() => bulkAction('delete')}
            disabled={loading}
            class="btn btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Reviews List -->
  <div class="space-y-4">
    <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <input
        type="checkbox"
        checked={selectedReviews.length === filteredReviews.length && filteredReviews.length > 0}
        onchange={selectAllReviews}
        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span class="text-sm font-medium text-gray-700">Select All</span>
    </div>
    
    {#each filteredReviews as review}
      <div class="card p-6 {review.flagged ? 'border-red-200 bg-red-50' : ''}">
        <div class="flex items-start space-x-4">
          <input
            type="checkbox"
            checked={selectedReviews.includes(review.id)}
            onchange={() => toggleReviewSelection(review.id)}
            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
          />
          
          <div class="flex-1">
            <!-- Review Header -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{review.title}</h3>
                  <Badge variant={getStatusColor(review.status)}>{review.status}</Badge>
                  {#if review.flagged}
                    <Badge variant="error">Flagged</Badge>
                  {/if}
                </div>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                  <span>By: {review.user.name}</span>
                  <span>•</span>
                  <span>For: {review.contractor.businessName}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(review.createdAt)}</span>
                </div>
              </div>
              <StarRating rating={review.overallRating} />
            </div>
            
            <!-- Review Content -->
            <p class="text-gray-700 mb-4">{review.content}</p>
            
            <!-- Review Details -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
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
            </div>
            
            <!-- Flag Reason -->
            {#if review.flagged && review.flagReason}
              <div class="bg-red-100 border border-red-200 rounded-lg p-3 mb-4">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <span class="text-sm font-medium text-red-800">Flag Reason:</span>
                  <span class="text-sm text-red-700">{review.flagReason}</span>
                </div>
              </div>
            {/if}
            
            <!-- Moderation Notes -->
            {#if review.moderationNotes}
              <div class="bg-blue-100 border border-blue-200 rounded-lg p-3 mb-4">
                <div class="flex items-start space-x-2">
                  <svg class="w-4 h-4 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <div>
                    <span class="text-sm font-medium text-blue-800">Moderation Notes:</span>
                    <p class="text-sm text-blue-700 mt-1">{review.moderationNotes}</p>
                  </div>
                </div>
              </div>
            {/if}
            
            <!-- Actions -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span>Helpful: {review.helpful}</span>
                <span>Not helpful: {review.notHelpful}</span>
                {#if review.projectCost}
                  <span>Project: ${review.projectCost.toLocaleString()}</span>
                {/if}
              </div>
              
              <div class="flex items-center space-x-2">
                {#if review.status === 'pending'}
                  <button
                    onclick={() => openModerationModal(review, 'published')}
                    class="btn btn-primary btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onclick={() => openModerationModal(review, 'rejected')}
                    class="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                {:else if review.status === 'flagged'}
                  <button
                    onclick={() => openModerationModal(review, 'published')}
                    class="btn btn-primary btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onclick={() => openModerationModal(review, 'rejected')}
                    class="btn btn-error btn-sm"
                  >
                    Remove
                  </button>
                {:else}
                  <button
                    onclick={() => openModerationModal(review, 'flagged')}
                    class="btn btn-secondary btn-sm"
                  >
                    Flag
                  </button>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- Moderation Modal -->
{#if showModerationModal && moderationReview}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Moderate Review
      </h3>
      
      <div class="space-y-4 mb-6">
        <div>
          <span class="block text-sm font-medium text-gray-700 mb-1">
            Review Title
          </span>
          <p class="text-sm text-gray-900">{moderationReview.title}</p>
        </div>
        
        <div>
          <span class="block text-sm font-medium text-gray-700 mb-1">
            Action
          </span>
          <p class="text-sm text-gray-900 capitalize">{moderationAction}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="moderation-notes">
            Moderation Notes
          </label>
          <textarea
            id="moderation-notes"
            bind:value={moderationNotes}
            rows="3"
            class="input"
            placeholder="Add notes about this moderation action..."
          ></textarea>
        </div>
      </div>
      
      <div class="flex space-x-3">
        <button
          onclick={moderateReview}
          disabled={loading}
          class="btn btn-primary flex-1"
        >
          {#if loading}
            <LoadingSpinner size="sm" color="white" />
            <span class="ml-2">Processing...</span>
          {:else}
            Confirm
          {/if}
        </button>
        <button
          onclick={() => {
            showModerationModal = false;
            moderationReview = null;
            moderationNotes = '';
          }}
          disabled={loading}
          class="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
