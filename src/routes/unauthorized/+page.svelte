<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Access Denied - Recommend a Contractor</title>
  <meta name="description" content="You don't have permission to access this page." />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow-professional sm:rounded-lg sm:px-10">
      <div class="text-center">
        <!-- Lock Icon -->
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Access Denied
        </h2>
        
        <p class="text-gray-600 mb-6">
          You don't have permission to access this page. This area is restricted to authorized users only.
        </p>

        {#if $page.data.session?.user}
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div class="flex">
              <svg class="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="ml-3">
                <p class="text-sm text-blue-800">
                  You are signed in as <strong>{$page.data.session?.user.name || $page.data.session?.user.email}</strong>.
                </p>
              </div>
            </div>
          </div>
        {/if}

        <div class="space-y-4">
          <button
            onclick={() => goto('/')}
            class="btn btn-primary w-full"
          >
            Go to Homepage
          </button>
          
          {#if $page.data.session?.user}
            <button
              onclick={() => goto('/profile')}
              class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Profile
            </button>
          {:else}
            <button
              onclick={() => goto('/auth/login')}
              class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Sign In
            </button>
          {/if}
        </div>

        <!-- Help Text -->
        <div class="mt-6 text-center">
          <p class="text-xs text-gray-500">
            Need help? 
            <a href="/contact" class="text-blue-600 hover:text-blue-500">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
