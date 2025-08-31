<script lang="ts">
  import { signIn } from '@auth/sveltekit/client';

  let loading = $state(false);
  let error = $state('');
  let provider = $state<'google' | 'facebook' | null>(null);

  async function handleSocialLogin(socialProvider: 'google' | 'facebook') {
    loading = true;
    provider = socialProvider;
    error = '';

    try {
      // After successful OAuth, Auth.js will redirect back to this page and session is set
      await signIn(socialProvider, { callbackUrl: '/' });
    } catch (err: any) {
      error = err?.message || 'Sign-in failed. Please try again.';
      loading = false;
      provider = null;
    }
  }
</script>

<svelte:head>
  <title>Create Account - Recommend a Contractor</title>
  <meta name="description" content="Create your account to review contractors, upload photos, and save favorites." />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="flex justify-center">
      <a href="/" class="flex items-center group">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <div class="text-xl font-bold text-gray-900">Recommend a Contractor</div>
      </a>
    </div>

    <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Create your account</h2>
    <p class="mt-2 text-center text-sm text-gray-600">Sign up with one click</p>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow-professional sm:rounded-lg sm:px-10">
      <div class="space-y-6">
        {#if error}
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="ml-3"><p class="text-sm text-red-800">{error}</p></div>
            </div>
          </div>
        {/if}

        <button onclick={() => handleSocialLogin('google')} disabled={loading} class="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {#if loading && provider === 'google'}
            <svg class="w-5 h-5 mr-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Signing in with Google...
          {:else}
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          {/if}
        </button>

        <button onclick={() => handleSocialLogin('facebook')} disabled={loading} class="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {#if loading && provider === 'facebook'}
            <svg class="w-5 h-5 mr-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Signing in with Facebook...
          {:else}
            <svg class="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Continue with Facebook
          {/if}
        </button>

        <p class="text-xs text-gray-500 text-center">By continuing, you agree to our <a class="text-blue-600 hover:underline" href="/terms">Terms</a> and <a class="text-blue-600 hover:underline" href="/privacy">Privacy Policy</a>.</p>
      </div>
    </div>
  </div>
</div>
