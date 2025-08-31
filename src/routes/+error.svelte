<script lang="ts">
  let { status = 500, error } = $props<{
    status?: number;
    error?: { message?: string };
  }>();

  const message = $derived(error?.message || 'An unexpected error occurred');
</script>

<svelte:head>
  <title>Error {status} - Recommend a Contractor</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center gradient-secondary py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-lg w-full text-center">
    <div class="card shadow-professional-lg p-12">
      <!-- Error Icon -->
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
        {#if status === 404}
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8a7.962 7.962 0 01-2 5.291z"></path>
          </svg>
        {:else}
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        {/if}
      </div>
      
      <!-- Error Content -->
      <div class="mb-8">
        <h1 class="text-6xl font-bold text-gray-900 mb-4">
          {status}
        </h1>
        
        {#if status === 404}
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p class="text-gray-600 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. 
            The page may have been moved, deleted, or you may have entered the wrong URL.
          </p>
        {:else if status === 500}
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Server Error
          </h2>
          <p class="text-gray-600 leading-relaxed">
            We're experiencing some technical difficulties. 
            Our team has been notified and is working to fix the issue.
          </p>
        {:else}
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Something went wrong
          </h2>
          <p class="text-gray-600 leading-relaxed">
            {message}
          </p>
        {/if}
      </div>
      
      <!-- Action Buttons -->
      <div class="space-y-4">
        <a href="/" class="btn btn-primary w-full">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Go Home
        </a>
        
        <button
          onclick={() => history.back()}
          class="btn btn-secondary w-full"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Go Back
        </button>
      </div>
      
      <!-- Help Section -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-4">
          Need help? Contact our support team
        </p>
        <a 
          href="/contact" 
          class="text-blue-600 hover:text-blue-500 font-medium text-sm"
        >
          Get Support
        </a>
      </div>
    </div>
  </div>
</div>
