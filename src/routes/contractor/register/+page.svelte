<script lang="ts">
  import { CONTRACTOR_CATEGORIES } from '$lib/constants/index.js';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  
  let { data } = $props();
  
  // Form state
  let formData = $state({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    yearsInBusiness: 1,
    licenseNumber: '',
    insuranceInfo: '',
    serviceRadius: 25,
    serviceAreas: [''],
    categories: [] as string[]
  });
  
  let currentStep = $state(1);
  let loading = $state(false);
  let errors = $state<Record<string, string>>({});
  
  const totalSteps = 4;
  
  function addServiceArea() {
    formData.serviceAreas = [...formData.serviceAreas, ''];
  }
  
  function removeServiceArea(index: number) {
    formData.serviceAreas = formData.serviceAreas.filter((_, i) => i !== index);
  }
  
  function toggleCategory(categorySlug: string) {
    if (formData.categories.includes(categorySlug)) {
      formData.categories = formData.categories.filter(c => c !== categorySlug);
    } else {
      formData.categories = [...formData.categories, categorySlug];
    }
  }
  
  function validateStep(step: number): boolean {
    const stepErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.businessName.trim()) stepErrors.businessName = 'Business name is required';
        if (!formData.ownerName.trim()) stepErrors.ownerName = 'Owner name is required';
        if (!formData.email.trim()) stepErrors.email = 'Email is required';
        if (!formData.phone.trim()) stepErrors.phone = 'Phone number is required';
        break;
      case 2:
        if (!formData.description.trim()) stepErrors.description = 'Business description is required';
        if (formData.yearsInBusiness < 1) stepErrors.yearsInBusiness = 'Years in business must be at least 1';
        break;
      case 3:
        if (formData.categories.length === 0) stepErrors.categories = 'Please select at least one category';
        if (formData.serviceAreas.filter(area => area.trim()).length === 0) {
          stepErrors.serviceAreas = 'Please add at least one service area';
        }
        break;
    }
    
    errors = stepErrors;
    return Object.keys(stepErrors).length === 0;
  }
  
  function nextStep() {
    if (validateStep(currentStep)) {
      currentStep = Math.min(currentStep + 1, totalSteps);
    }
  }
  
  function prevStep() {
    currentStep = Math.max(currentStep - 1, 1);
  }
  
  async function submitForm() {
    if (!validateStep(currentStep)) return;
    
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would submit to the server
      console.log('Form submitted:', formData);
      
      // Redirect to success page
      window.location.href = '/contractor/register/success';
    } catch (error) {
      console.error('Registration failed:', error);
      errors = { submit: 'Registration failed. Please try again.' };
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Register Your Business - Recommend a Contractor</title>
  <meta name="description" content="Join Denver's trusted contractor network. Register your business to connect with homeowners and grow your customer base." />
</svelte:head>

<!-- Hero Section -->
<section class="gradient-primary text-white section-padding">
  <div class="container-custom text-center">
    <h1 class="text-4xl lg:text-5xl font-bold mb-6">
      Join Denver's Trusted Contractor Network
    </h1>
    <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
      Connect with homeowners looking for reliable contractors. 
      Build your reputation with verified reviews and grow your business.
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div class="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <div class="text-3xl mb-3">🏆</div>
        <h3 class="font-semibold mb-2">Build Your Reputation</h3>
        <p class="text-blue-200 text-sm">Get verified reviews from real customers</p>
      </div>
      <div class="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <div class="text-3xl mb-3">📈</div>
        <h3 class="font-semibold mb-2">Grow Your Business</h3>
        <p class="text-blue-200 text-sm">Connect with homeowners in your area</p>
      </div>
      <div class="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <div class="text-3xl mb-3">✅</div>
        <h3 class="font-semibold mb-2">Get Verified</h3>
        <p class="text-blue-200 text-sm">Stand out with our verification badge</p>
      </div>
    </div>
  </div>
</section>

<!-- Registration Form -->
<section class="section-padding">
  <div class="container-custom">
    <div class="max-w-3xl mx-auto">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span class="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style="width: {(currentStep / totalSteps) * 100}%"
          ></div>
        </div>
      </div>
      
      <div class="card p-8">
        {#if currentStep === 1}
          <!-- Step 1: Basic Information -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
            <p class="text-gray-600">Tell us about your business and how to contact you.</p>
          </div>
          
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="contractor-business-name">
                  Business Name *
                </label>
                <input id="contractor-business-name"
                  bind:value={formData.businessName}
                  type="text"
                  class="input {errors.businessName ? 'border-red-500' : ''}"
                  placeholder="Your Business Name"
                />
                {#if errors.businessName}
                  <p class="text-red-600 text-sm mt-1">{errors.businessName}</p>
                {/if}
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="contractor-owner-name">
                  Owner Name *
                </label>
                <input id="contractor-owner-name"
                  bind:value={formData.ownerName}
                  type="text"
                  class="input {errors.ownerName ? 'border-red-500' : ''}"
                  placeholder="Your Full Name"
                />
                {#if errors.ownerName}
                  <p class="text-red-600 text-sm mt-1">{errors.ownerName}</p>
                {/if}
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="contractor-email">
                  Email Address *
                </label>
                <input id="contractor-email"
                  bind:value={formData.email}
                  type="email"
                  class="input {errors.email ? 'border-red-500' : ''}"
                  placeholder="your@email.com"
                />
                {#if errors.email}
                  <p class="text-red-600 text-sm mt-1">{errors.email}</p>
                {/if}
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="contractor-phone">
                  Phone Number *
                </label>
                <input id="contractor-phone"
                  bind:value={formData.phone}
                  type="tel"
                  class="input {errors.phone ? 'border-red-500' : ''}"
                  placeholder="(303) 555-0123"
                />
                {#if errors.phone}
                  <p class="text-red-600 text-sm mt-1">{errors.phone}</p>
                {/if}
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" for="contractor-website">
                Website (Optional)
              </label>
              <input id="contractor-website"
                bind:value={formData.website}
                type="url"
                class="input"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
          
        {:else if currentStep === 2}
          <!-- Step 2: Business Details -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Business Details</h2>
            <p class="text-gray-600">Provide details about your business and experience.</p>
          </div>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" for="business-description">
                Business Description *
              </label>
              <textarea id="business-description"
                bind:value={formData.description}
                rows="4"
                class="input {errors.description ? 'border-red-500' : ''}"
                placeholder="Describe your business, services, and what makes you unique..."
              ></textarea>
              {#if errors.description}
                <p class="text-red-600 text-sm mt-1">{errors.description}</p>
              {/if}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="years-in-business">
                  Years in Business *
                </label>
                <input id="years-in-business"
                  bind:value={formData.yearsInBusiness}
                  type="number"
                  min="1"
                  max="100"
                  class="input {errors.yearsInBusiness ? 'border-red-500' : ''}"
                />
                {#if errors.yearsInBusiness}
                  <p class="text-red-600 text-sm mt-1">{errors.yearsInBusiness}</p>
                {/if}
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="service-radius">
                  Service Radius (miles)
                </label>
                <input id="service-radius"
                  bind:value={formData.serviceRadius}
                  type="number"
                  min="1"
                  max="100"
                  class="input"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="license-number">
                  License Number (Optional)
                </label>
                <input id="license-number"
                  bind:value={formData.licenseNumber}
                  type="text"
                  class="input"
                  placeholder="License #"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="insurance-info">
                  Insurance Information (Optional)
                </label>
                <input id="insurance-info"
                  bind:value={formData.insuranceInfo}
                  type="text"
                  class="input"
                  placeholder="Insurance details"
                />
              </div>
            </div>
          </div>
          
        {:else if currentStep === 3}
          <!-- Step 3: Services & Areas -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Services & Areas</h2>
            <p class="text-gray-600">Select your service categories and coverage areas.</p>
          </div>
          
          <div class="space-y-8">
            <!-- Categories -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-4" id="categories-label">
                Service Categories * (Select all that apply)
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                {#each CONTRACTOR_CATEGORIES as category}
                  <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 {formData.categories.includes(category.slug) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category.slug)}
                      onchange={() => toggleCategory(category.slug)}
                      class="sr-only"
                    />
                    <div class="flex items-center space-x-2">
                      <span class="text-lg">{category.icon}</span>
                      <span class="text-sm font-medium">{category.name}</span>
                    </div>
                  </label>
                {/each}
              </div>
              {#if errors.categories}
                <p class="text-red-600 text-sm mt-2">{errors.categories}</p>
              {/if}
            </div>
            
            <!-- Service Areas -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-4" id="service-areas-label">
                Service Areas * (ZIP codes or cities)
              </h3>
              <div class="space-y-3">
                {#each formData.serviceAreas as area, index}
                  <div class="flex space-x-2">
                    <input
                      bind:value={formData.serviceAreas[index]}
                      type="text"
                      class="input flex-1"
                      placeholder="80202 or Denver"
                    />
                    {#if formData.serviceAreas.length > 1}
                      <button
                        type="button"
                        onclick={() => removeServiceArea(index)}
                        class="btn btn-secondary px-3"
                      >
                        Remove
                      </button>
                    {/if}
                  </div>
                {/each}
              </div>
              <button
                type="button"
                onclick={addServiceArea}
                class="mt-3 text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                + Add Another Area
              </button>
              {#if errors.serviceAreas}
                <p class="text-red-600 text-sm mt-2">{errors.serviceAreas}</p>
              {/if}
            </div>
          </div>
          
        {:else if currentStep === 4}
          <!-- Step 4: Review & Submit -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
            <p class="text-gray-600">Please review your information before submitting.</p>
          </div>
          
          <div class="space-y-6">
            <div class="card p-6 bg-gray-50">
              <h3 class="font-semibold text-gray-900 mb-4">Registration Summary</h3>
              <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt class="font-medium text-gray-700">Business Name:</dt>
                  <dd class="text-gray-900">{formData.businessName}</dd>
                </div>
                <div>
                  <dt class="font-medium text-gray-700">Owner:</dt>
                  <dd class="text-gray-900">{formData.ownerName}</dd>
                </div>
                <div>
                  <dt class="font-medium text-gray-700">Email:</dt>
                  <dd class="text-gray-900">{formData.email}</dd>
                </div>
                <div>
                  <dt class="font-medium text-gray-700">Phone:</dt>
                  <dd class="text-gray-900">{formData.phone}</dd>
                </div>
                <div>
                  <dt class="font-medium text-gray-700">Years in Business:</dt>
                  <dd class="text-gray-900">{formData.yearsInBusiness}</dd>
                </div>
                <div>
                  <dt class="font-medium text-gray-700">Service Radius:</dt>
                  <dd class="text-gray-900">{formData.serviceRadius} miles</dd>
                </div>
                <div class="md:col-span-2">
                  <dt class="font-medium text-gray-700">Categories:</dt>
                  <dd class="text-gray-900">
                    {formData.categories.map(slug => 
                      CONTRACTOR_CATEGORIES.find(c => c.slug === slug)?.name
                    ).join(', ')}
                  </dd>
                </div>
                <div class="md:col-span-2">
                  <dt class="font-medium text-gray-700">Service Areas:</dt>
                  <dd class="text-gray-900">
                    {formData.serviceAreas.filter(area => area.trim()).join(', ')}
                  </dd>
                </div>
              </dl>
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="text-sm text-blue-800">
                  <p class="font-medium mb-1">What happens next?</p>
                  <ul class="list-disc list-inside space-y-1">
                    <li>We'll review your application within 2-3 business days</li>
                    <li>You'll receive an email with verification requirements</li>
                    <li>Once verified, your profile will go live on our platform</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {#if errors.submit}
              <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-800">{errors.submit}</p>
              </div>
            {/if}
          </div>
        {/if}
        
        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onclick={prevStep}
            disabled={currentStep === 1}
            class="btn btn-secondary {currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
          >
            Previous
          </button>
          
          {#if currentStep < totalSteps}
            <button onclick={nextStep} class="btn btn-primary">
              Next Step
            </button>
          {:else}
            <button onclick={submitForm} disabled={loading} class="btn btn-primary">
              {#if loading}
                <LoadingSpinner size="sm" color="white" />
                <span class="ml-2">Submitting...</span>
              {:else}
                Submit Application
              {/if}
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
