<script lang="ts">
  import { signIn } from '@auth/sveltekit/client';

  let loadingFacebook = $state(false);
  let loadingGoogle = $state(false);

  async function handleFacebookSignIn() {
    loadingFacebook = true;
    try {
      // Get callback URL from current URL params if available
      const urlParams = new URLSearchParams(window.location.search);
      const callbackUrl = urlParams.get('callbackUrl') || '/';

      await signIn('facebook', { callbackUrl });
    } catch (error) {
      console.error('Facebook sign in error:', error);
      loadingFacebook = false;
    }
  }

  async function handleGoogleSignIn() {
    loadingGoogle = true;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const callbackUrl = urlParams.get('callbackUrl') || '/';

      await signIn('google', { callbackUrl });
    } catch (error) {
      console.error('Google sign in error:', error);
      loadingGoogle = false;
    }
  }
</script>

<svelte:head>
  <title>Sign In - Recommend a Contractor</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center gradient-secondary py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full">
    <div class="card shadow-professional-lg p-8">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p class="text-gray-600">Sign in to access your account and connect with trusted contractors</p>
      </div>

      <div class="space-y-4">
        <button on:click={handleFacebookSignIn} disabled={loadingFacebook} class="btn btn-primary w-full btn-lg shadow-professional hover:shadow-professional-lg transition-all duration-200">
          {#if loadingFacebook}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          {:else}
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continue with Facebook
          {/if}
        </button>

        <button on:click={handleGoogleSignIn} disabled={loadingGoogle} class="btn btn-outline w-full btn-lg flex items-center justify-center">
          {#if loadingGoogle}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          {:else}
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.9 3.3 14.7 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 11.7S6.9 21 12 21c5.7 0 9.5-4 9.5-9.6 0-.6-.1-1-.1-1.4H12z" />
            </svg>
            Continue with Google
          {/if}
        </button>
      </div>

      <div class="relative mt-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Secure sign-in</span>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="text-sm text-blue-800">
            <p class="font-medium mb-1">Why Facebook?</p>
            <p>We use Facebook to verify your identity and prevent fake reviews, ensuring authentic feedback for our contractor community.</p>
          </div>
        </div>
      </div>

      <div class="text-center space-y-4 mt-6">
        <p class="text-xs text-gray-500">
          By signing in, you agree to our
          <a href="/terms" class="text-blue-600 hover:text-blue-500 font-medium">Terms of Service</a>
          and
          <a href="/privacy" class="text-blue-600 hover:text-blue-500 font-medium">Privacy Policy</a>
        </p>

        <div class="border-t border-gray-200 pt-4">
          <p class="text-sm text-gray-600 mb-2">Are you a contractor?</p>
          <a href="/contractor/register" class="btn btn-outline w-full">Register Your Business</a>
        </div>
      </div>
    </div>
  </div>
</div>
