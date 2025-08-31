<script lang="ts">
  import { browser } from '$app/environment';
  import StarRating from '$lib/components/StarRating.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  
  let { data } = $props();
  
  // Get contractor ID from URL params if available
  let contractorId = '';
  if (browser) {
    const urlParams = new URLSearchParams(window.location.search);
    contractorId = urlParams.get('contractor') || '';
  }
  
  // Form state
  let formData = $state({
    contractorId: contractorId,
    contractorName: '',
    title: '',
    content: '',
    overallRating: 0,
    qualityRating: 0,
    timelinessRating: 0,
    communicationRating: 0,
    pricingRating: 0,
    cleanlinessRating: 0,
    workCity: '',
    workDate: '',
    projectCost: '',
    wouldRecommend: true
  });
  
  let loading = $state(false);
  let submitted = $state(false);
  let errors = $state<Record<string, string>>({});
  
  // Mock contractors for search
  let contractors = [
    { id: '1', businessName: 'Denver Pro Plumbing' },
    { id: '2', businessName: 'Mile High Electric' },
    { id: '3', businessName: 'Rocky Mountain HVAC' }
  ];
  
  let showContractorSearch = $state(false);
  let contractorSearchQuery = $state('');
  
  const filteredContractors = $derived(() => {
    if (!contractorSearchQuery) return contractors;
    return contractors.filter(c => 
      c.businessName.toLowerCase().includes(contractorSearchQuery.toLowerCase())
    );
  });
  
  function selectContractor(contractor: { id: string; businessName: string }) {
    formData.contractorId = contractor.id;
    formData.contractorName = contractor.businessName;
    showContractorSearch = false;
    contractorSearchQuery = '';
  }
  
  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    
    if (!formData.contractorId) newErrors.contractor = 'Please select a contractor';
    if (!formData.title.trim()) newErrors.title = 'Review title is required';
    else if (formData.title.length < 10) newErrors.title = 'Title must be at least 10 characters';
    
    if (!formData.content.trim()) newErrors.content = 'Review content is required';
    else if (formData.content.length < 50) newErrors.content = 'Review must be at least 50 characters';
    
    if (formData.overallRating === 0) newErrors.overallRating = 'Overall rating is required';
    if (formData.qualityRating === 0) newErrors.qualityRating = 'Quality rating is required';
    if (formData.timelinessRating === 0) newErrors.timelinessRating = 'Timeliness rating is required';
    if (formData.communicationRating === 0) newErrors.communicationRating = 'Communication rating is required';
    if (formData.pricingRating === 0) newErrors.pricingRating = 'Pricing rating is required';
    if (formData.cleanlinessRating === 0) newErrors.cleanlinessRating = 'Cleanliness rating is required';
    
    if (!formData.workCity.trim()) newErrors.workCity = 'Work location is required';
    
    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }
  
  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!validateForm()) return;
    
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would submit to the server
      console.log('Review submitted:', formData);
      
      submitted = true;
    } catch (error) {
      console.error('Failed to submit review:', error);
      errors = { submit: 'Failed to submit review. Please try again.' };
    } finally {
      loading = false;
    }
  }
  
  // Load contractor name if ID is provided
  $effect(() => {
    if (contractorId && !formData.contractorName) {
      const contractor = contractors.find(c => c.id === contractorId);
      if (contractor) {
        formData.contractorName = contractor.businessName;
      }
    }
  });
</script>

<svelte:head>
  <title>Write a Review - Recommend a Contractor</title>
  <meta name="description" content="Share your experience with a contractor to help other Denver homeowners make informed decisions." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-white border-b border-gray-200">
  <div class="container-custom py-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        Write a Review
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Share your experience to help other homeowners make informed decisions. 
        Your honest feedback helps build trust in our contractor community.
      </p>
    </div>
  </div>
</section>

<!-- Review Form -->
<section class="section-padding">
  <div class="container-custom">
    <div class="max-w-3xl mx-auto">
      {#if submitted}
        <div class="card p-8 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Review Submitted!</h2>
          <p class="text-gray-600 mb-6">
            Thank you for sharing your experience. Your review will be published after verification, 
            typically within 24 hours.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/reviews" class="btn btn-primary">
              View All Reviews
            </a>
            <button 
              onclick={() => {
                submitted = false;
                formData = {
                  contractorId: '',
                  contractorName: '',
                  title: '',
                  content: '',
                  overallRating: 0,
                  qualityRating: 0,
                  timelinessRating: 0,
                  communicationRating: 0,
                  pricingRating: 0,
                  cleanlinessRating: 0,
                  workCity: '',
                  workDate: '',
                  projectCost: '',
                  wouldRecommend: true
                };
              }}
              class="btn btn-outline"
            >
              Write Another Review
            </button>
          </div>
        </div>
      {:else}
        <div class="card p-8">
          <form onsubmit={handleSubmit} class="space-y-8">
            <!-- Contractor Selection -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">
                Which contractor are you reviewing? *
              </h3>
              
              {#if formData.contractorName}
                <div class="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <span class="font-medium text-blue-900">{formData.contractorName}</span>
                  <button 
                    type="button"
                    onclick={() => {
                      formData.contractorId = '';
                      formData.contractorName = '';
                      showContractorSearch = true;
                    }}
                    class="text-blue-600 hover:text-blue-500 text-sm"
                  >
                    Change
                  </button>
                </div>
              {:else}
                <div class="relative">
                  <input
                    bind:value={contractorSearchQuery}
                    type="text"
                    class="input {errors.contractor ? 'border-red-500' : ''}"
                    placeholder="Search for a contractor..."
                    onfocus={() => showContractorSearch = true}
                  />
                  
                  {#if showContractorSearch && filteredContractors.length > 0}
                    <div class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {#each filteredContractors as contractor}
                        <button
                          type="button"
                          onclick={() => selectContractor(contractor)}
                          class="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          {contractor.businessName}
                        </button>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/if}
              
              {#if errors.contractor}
                <p class="text-red-600 text-sm mt-1">{errors.contractor}</p>
              {/if}
            </div>
            
            <!-- Review Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" for="review-title">
                Review Title *
              </label>
              <input
                id="review-title"
                bind:value={formData.title}
                type="text"
                class="input {errors.title ? 'border-red-500' : ''}"
                placeholder="Summarize your experience in a few words"
                maxlength="100"
              />
              <div class="flex justify-between mt-1">
                {#if errors.title}
                  <p class="text-red-600 text-sm">{errors.title}</p>
                {:else}
                  <div></div>
                {/if}
                <p class="text-gray-500 text-sm">{formData.title.length}/100</p>
              </div>
            </div>
            
            <!-- Overall Rating -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-4">
                Overall Rating *
              </h3>
              <div class="flex items-center space-x-4">
                <StarRating 
                  rating={formData.overallRating} 
                  size="lg" 
                  interactive={true}
                  showValue={false}
                  onRatingChange={(rating) => formData.overallRating = rating}
                />
                <span class="text-lg font-medium text-gray-900">
                  {formData.overallRating > 0 ? formData.overallRating.toFixed(1) : 'Select rating'}
                </span>
              </div>
              {#if errors.overallRating}
                <p class="text-red-600 text-sm mt-1">{errors.overallRating}</p>
              {/if}
            </div>
            
            <!-- Detailed Ratings -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Rate Different Aspects</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#each [
                  { key: 'qualityRating', label: 'Quality of Work' },
                  { key: 'timelinessRating', label: 'Timeliness' },
                  { key: 'communicationRating', label: 'Communication' },
                  { key: 'pricingRating', label: 'Pricing' },
                  { key: 'cleanlinessRating', label: 'Cleanliness' }
                ] as aspect}
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-2">
                      {aspect.label} *
                    </h4>
                    <div class="flex items-center space-x-3">
                      <StarRating 
                        rating={formData[aspect.key]} 
                        interactive={true}
                        showValue={false}
                        onRatingChange={(rating) => formData[aspect.key] = rating}
                      />
                      <span class="text-sm text-gray-600 min-w-[3rem]">
                        {formData[aspect.key] > 0 ? formData[aspect.key].toFixed(1) : '0.0'}
                      </span>
                    </div>
                    {#if errors[aspect.key]}
                      <p class="text-red-600 text-sm mt-1">{errors[aspect.key]}</p>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
            
            <!-- Review Content -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" for="review-content">
                Your Review *
              </label>
              <textarea
                id="review-content"
                bind:value={formData.content}
                rows="6"
                class="input {errors.content ? 'border-red-500' : ''}"
                placeholder="Share details about your experience, the quality of work, communication, timeliness, and any other relevant information..."
                maxlength="2000"
              ></textarea>
              <div class="flex justify-between mt-1">
                {#if errors.content}
                  <p class="text-red-600 text-sm">{errors.content}</p>
                {:else}
                  <div></div>
                {/if}
                <p class="text-gray-500 text-sm">{formData.content.length}/2000</p>
              </div>
            </div>
            
            <!-- Project Details -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Project Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="work-city">
                    Work Location *
                  </label>
                  <input
                    id="work-city"
                    bind:value={formData.workCity}
                    type="text"
                    class="input {errors.workCity ? 'border-red-500' : ''}"
                    placeholder="City"
                  />
                  {#if errors.workCity}
                    <p class="text-red-600 text-sm mt-1">{errors.workCity}</p>
                  {/if}
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="work-date">
                    Work Completion Date
                  </label>
                  <input
                    id="work-date"
                    bind:value={formData.workDate}
                    type="date"
                    class="input"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="project-cost">
                    Project Cost (Optional)
                  </label>
                  <input
                    id="project-cost"
                    bind:value={formData.projectCost}
                    type="number"
                    class="input"
                    placeholder="$"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            <!-- Recommendation -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-4">
                Would you recommend this contractor?
              </h3>
              <div class="flex space-x-6">
                <label class="flex items-center">
                  <input
                    bind:group={formData.wouldRecommend}
                    type="radio"
                    value={true}
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-gray-700">Yes, I would recommend</span>
                </label>
                <label class="flex items-center">
                  <input
                    bind:group={formData.wouldRecommend}
                    type="radio"
                    value={false}
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-gray-700">No, I would not recommend</span>
                </label>
              </div>
            </div>
            
            <!-- Submit Button -->
            <div class="pt-6 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row gap-4 justify-between">
                <div class="text-sm text-gray-600">
                  <p class="mb-1">By submitting this review, you confirm that:</p>
                  <ul class="list-disc list-inside space-y-1 text-xs">
                    <li>This review is based on your own experience</li>
                    <li>You are not affiliated with this contractor</li>
                    <li>The information provided is accurate and honest</li>
                  </ul>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  class="btn btn-primary flex-shrink-0"
                >
                  {#if loading}
                    <LoadingSpinner size="sm" color="white" />
                    <span class="ml-2">Submitting...</span>
                  {:else}
                    Submit Review
                  {/if}
                </button>
              </div>
              
              {#if errors.submit}
                <div class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p class="text-red-800">{errors.submit}</p>
                </div>
              {/if}
            </div>
          </form>
        </div>
      {/if}
    </div>
  </div>
</section>
