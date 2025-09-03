<script lang="ts">
  import { browser } from '$app/environment';

  let error = '';

  if (browser) {
    const urlParams = new URLSearchParams(window.location.search);
    error = urlParams.get('error') || '';
  }

  function getErrorMessage(error: string) {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      case 'Default':
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  }
</script>

<svelte:head>
  <title>Authentication Error - Recommend a Contractor</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center gradient-secondary py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full">
    <div class="card shadow-professional-lg p-8">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          Authentication Error
        </h2>

        <p class="text-gray-600">
          {getErrorMessage(error)}
        </p>
      </div>

      <div class="space-y-4">
        <a
          href="/auth/login"
          class="btn btn-primary w-full"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Try Again
        </a>

        <a
          href="/"
          class="btn btn-secondary w-full"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Go Home
        </a>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-200 text-center">
        <p class="text-sm text-gray-500 mb-2">
          Need help with authentication?
        </p>
        <a
          href="/contact"
          class="text-blue-600 hover:text-blue-500 font-medium text-sm"
        >
          Contact Support
        </a>
      </div>
    </div>
  </div>
</div>
