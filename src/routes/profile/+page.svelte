<script lang="ts">
  import AuthGuard from '$lib/components/AuthGuard.svelte';
  import ProfileImageUpload from '$lib/components/ProfileImageUpload.svelte';
  import { page } from '$app/stores';
  import type { UploadResult } from '$lib/storage/types';

  let editing = $state(false);
  let loading = $state(false);
  let message = $state('');
  let error = $state('');

  // Form fields from session
  let displayName = $state($page.data.session?.user?.name || '');
  let phone = $state('');
  let location = $state('');
  let profileImageUrl = $state($page.data.session?.user?.image || '');

  // Update when session changes
  $effect(() => {
    if ($page.data.session?.user) {
      displayName = $page.data.session.user.name || '';
      profileImageUrl = $page.data.session.user.image || '';
    }
  });

  function handleProfileImageUpload(result: UploadResult) {
    if (result.success && result.url) {
      profileImageUrl = result.url;
      message = 'Profile photo updated successfully! (not saved to server yet)';
      setTimeout(() => {
        message = '';
      }, 3000);
    }
  }

  function handleImageUploadError(errorMsg: string) {
    error = `Profile photo upload failed: ${errorMsg}`;
  }

  async function handleSave(event: Event) {
    event.preventDefault();

    if (!displayName.trim()) {
      error = 'Display name is required.';
      return;
    }

    loading = true;
    error = '';
    message = '';

    try {
      // No-op for now: backend profile updates not implemented
      message = 'Profile saved (preview only). Coming soon!';
      editing = false;

      setTimeout(() => {
        message = '';
      }, 3000);
    } catch (err: any) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function handleCancel() {
    // Reset form to current session values
    displayName = $page.data.session?.user?.name || '';
    editing = false;
    error = '';
  }
</script>

<svelte:head>
  <title>Profile - Recommend a Contractor</title>
  <meta name="description" content="Manage your profile settings and account information." />
</svelte:head>

<AuthGuard>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white shadow-professional rounded-lg mb-8">
        <div class="px-6 py-8">
          <div class="flex items-center space-x-6">
            <!-- Avatar -->
            <div class="flex-shrink-0">
              {#if $page.data.session?.user?.image}
                <img
                  src={$page.data.session.user.image}
                  alt={$page.data.session.user.name || 'User'}
                  class="h-20 w-20 rounded-full border-4 border-gray-200"
                />
              {:else}
                <div class="h-20 w-20 rounded-full bg-blue-100 border-4 border-gray-200 flex items-center justify-center">
                  <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              {/if}
            </div>

            <!-- User Info -->
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-gray-900">
                {$page.data.session?.user?.name || 'User'}
              </h1>
              <p class="text-gray-600 capitalize">
                Member
              </p>
              <div class="flex items-center mt-2">
                <div class="flex items-center text-green-600">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm">Social Login Verified</span>
                </div>
              </div>
            </div>
            
            <!-- Edit Button -->
            {#if !editing}
              <button
                onclick={() => editing = true}
                class="btn btn-primary"
              >
                Edit Profile
              </button>
            {/if}
          </div>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="bg-white shadow-professional rounded-lg">
        <div class="px-6 py-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
          
          <!-- Success Message -->
          {#if message}
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div class="flex">
                <svg class="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="ml-3">
                  <p class="text-sm text-green-800">{message}</p>
                </div>
              </div>
            </div>
          {/if}

          <!-- Error Message -->
          {#if error}
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div class="flex">
                <svg class="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="ml-3">
                  <p class="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          {/if}

          <!-- Profile Image Upload -->
          <div class="mb-8">
            <ProfileImageUpload
              currentImageUrl={profileImageUrl}
              size="lg"
              disabled={loading}
              onUpload={handleProfileImageUpload}
              onError={handleImageUploadError}
            />
          </div>

          <form class="space-y-6" onsubmit={handleSave}>
            <!-- Email (Read-only) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" for="profile-email">
                Email Address
              </label>
              <input id="profile-email"
                type="email"
                value={$page.data.session?.user?.email || ''}
                disabled
                class="input w-full bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p class="text-xs text-gray-500 mt-1">
                Email address cannot be changed. Contact support if you need to update it.
              </p>
            </div>

            <!-- Display Name -->
            <div>
              <label for="displayName" class="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="displayName"
                type="text"
                bind:value={displayName}
                disabled={!editing || loading}
                class="input w-full"
                placeholder="Enter your full name"
                required
              />
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                bind:value={phone}
                disabled={!editing || loading}
                class="input w-full"
                placeholder="Enter your phone number"
              />
            </div>

            <!-- Location -->
            <div>
              <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                id="location"
                type="text"
                bind:value={location}
                disabled={!editing || loading}
                class="input w-full"
                placeholder="Enter your city, state"
              />
            </div>

            <!-- Account Type (Read-only) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" for="account-type">
                Account Type
              </label>
              <input id="account-type"
                type="text"
                value={'Member'}
                disabled
                class="input w-full bg-gray-50 text-gray-500 cursor-not-allowed capitalize"
              />
            </div>

            <!-- Action Buttons -->
            {#if editing}
              <div class="flex space-x-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  class="btn btn-primary"
                >
                  {#if loading}
                    <svg class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Saving...
                  {:else}
                    Save Changes
                  {/if}
                </button>
                <button
                  type="button"
                  onclick={handleCancel}
                  disabled={loading}
                  class="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            {/if}
          </form>
        </div>
      </div>

      <!-- Account Information -->
      <div class="bg-white shadow-professional rounded-lg mt-8">
        <div class="px-6 py-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Account Information</h2>

          <div class="space-y-4">
            <!-- Provider Info -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 class="text-sm font-medium text-gray-900">Sign-in Method</h3>
                <p class="text-sm text-gray-600">
                  You're signed in with your social account
                </p>
              </div>
              <div class="flex items-center">
                <!-- Provider icon omitted until we store provider -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</AuthGuard>
