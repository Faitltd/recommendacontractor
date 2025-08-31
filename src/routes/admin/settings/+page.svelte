<script lang="ts">
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  
  // Mock settings data
  let settings = $state({
    general: {
      siteName: 'Recommend a Contractor',
      siteDescription: 'Denver\'s trusted platform for connecting homeowners with verified contractors',
      contactEmail: 'support@recomendacontractor.com',
      supportPhone: '(303) 555-0199',
      maintenanceMode: false,
      allowRegistrations: true
    },
    verification: {
      requireEmailVerification: true,
      requirePhoneVerification: false,
      autoApproveContractors: false,
      requireInsurance: true,
      requireLicense: true,
      verificationTimeout: 7 // days
    },
    reviews: {
      allowAnonymousReviews: false,
      requireVerifiedPurchase: true,
      autoPublishReviews: false,
      moderationRequired: true,
      allowPhotoUploads: true,
      maxPhotosPerReview: 5
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      newContractorAlerts: true,
      newReviewAlerts: true,
      disputeAlerts: true,
      systemAlerts: true
    },
    payments: {
      stripePublicKey: 'pk_test_...',
      stripeSecretKey: '••••••••••••••••',
      paypalClientId: 'AY...',
      paypalClientSecret: '••••••••••••••••',
      processingFee: 2.9,
      minimumPayout: 50
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30, // minutes
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireStrongPasswords: true,
      allowPasswordReset: true
    }
  });
  
  let activeTab = $state('general');
  let loading = $state(false);
  let saveMessage = $state('');
  
  const tabs = [
    { id: 'general', name: 'General', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'verification', name: 'Verification', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'reviews', name: 'Reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { id: 'notifications', name: 'Notifications', icon: 'M15 17h5l-5 5v-5zM11 17H6l5 5v-5zM12 3v12' },
    { id: 'payments', name: 'Payments', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'security', name: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
  ];
  
  async function saveSettings() {
    loading = true;
    saveMessage = '';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would save to the server
      console.log('Settings saved:', settings);
      
      saveMessage = 'Settings saved successfully!';
      setTimeout(() => saveMessage = '', 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      saveMessage = 'Failed to save settings. Please try again.';
    } finally {
      loading = false;
    }
  }
  
  function resetToDefaults() {
    if (confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      // Reset to default values
      settings = {
        general: {
          siteName: 'Recommend a Contractor',
          siteDescription: 'Denver\'s trusted platform for connecting homeowners with verified contractors',
          contactEmail: 'support@recomendacontractor.com',
          supportPhone: '(303) 555-0199',
          maintenanceMode: false,
          allowRegistrations: true
        },
        verification: {
          requireEmailVerification: true,
          requirePhoneVerification: false,
          autoApproveContractors: false,
          requireInsurance: true,
          requireLicense: true,
          verificationTimeout: 7
        },
        reviews: {
          allowAnonymousReviews: false,
          requireVerifiedPurchase: true,
          autoPublishReviews: false,
          moderationRequired: true,
          allowPhotoUploads: true,
          maxPhotosPerReview: 5
        },
        notifications: {
          emailNotifications: true,
          smsNotifications: false,
          newContractorAlerts: true,
          newReviewAlerts: true,
          disputeAlerts: true,
          systemAlerts: true
        },
        payments: {
          stripePublicKey: '',
          stripeSecretKey: '',
          paypalClientId: '',
          paypalClientSecret: '',
          processingFee: 2.9,
          minimumPayout: 50
        },
        security: {
          twoFactorAuth: true,
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          passwordMinLength: 8,
          requireStrongPasswords: true,
          allowPasswordReset: true
        }
      };
    }
  }
</script>

<!-- Settings Dashboard -->
<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-bold text-gray-900">System Settings</h2>
    <div class="flex items-center space-x-3">
      {#if saveMessage}
        <span class="text-sm {saveMessage.includes('success') ? 'text-green-600' : 'text-red-600'}">
          {saveMessage}
        </span>
      {/if}
      <button
        onclick={resetToDefaults}
        class="btn btn-secondary"
      >
        Reset to Defaults
      </button>
      <button
        onclick={saveSettings}
        disabled={loading}
        class="btn btn-primary"
      >
        {#if loading}
          <LoadingSpinner size="sm" color="white" />
          <span class="ml-2">Saving...</span>
        {:else}
          Save Changes
        {/if}
      </button>
    </div>
  </div>
  
  <!-- Tabs -->
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8">
      {#each tabs as tab}
        <button
          onclick={() => activeTab = tab.id}
          class="flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm {
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={tab.icon}></path>
          </svg>
          <span>{tab.name}</span>
        </button>
      {/each}
    </nav>
  </div>
  
  <!-- Tab Content -->
  <div class="card p-6">
    {#if activeTab === 'general'}
      <!-- General Settings -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900">General Settings</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="site-name">Site Name</label>
            <input id="site-name" bind:value={settings.general.siteName} type="text" class="input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="contact-email">Contact Email</label>
            <input id="contact-email" bind:value={settings.general.contactEmail} type="email" class="input" />
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2" for="site-description">Site Description</label>
            <textarea id="site-description" bind:value={settings.general.siteDescription} rows="3" class="input"></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="support-phone">Support Phone</label>
            <input id="support-phone" bind:value={settings.general.supportPhone} type="tel" class="input" />
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input id="maintenance-mode" bind:checked={settings.general.maintenanceMode} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label class="ml-2 text-sm text-gray-700" for="maintenance-mode">Enable maintenance mode</label>
          </div>
          
          <div class="flex items-center">
            <input id="allow-registrations" bind:checked={settings.general.allowRegistrations} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label class="ml-2 text-sm text-gray-700" for="allow-registrations">Allow new user registrations</label>
          </div>
        </div>
      </div>
      
    {:else if activeTab === 'verification'}
      <!-- Verification Settings -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900">Verification Settings</h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="require-email-verification">Require email verification</label>
              <p class="text-xs text-gray-500">Users must verify their email address</p>
            </div>
            <input id="require-email-verification" bind:checked={settings.verification.requireEmailVerification} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="require-phone-verification">Require phone verification</label>
              <p class="text-xs text-gray-500">Users must verify their phone number</p>
            </div>
            <input id="require-phone-verification" bind:checked={settings.verification.requirePhoneVerification} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="auto-approve-contractors">Auto-approve contractors</label>
              <p class="text-xs text-gray-500">Automatically approve contractor applications</p>
            </div>
            <input id="auto-approve-contractors" bind:checked={settings.verification.autoApproveContractors} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="require-insurance">Require insurance</label>
              <p class="text-xs text-gray-500">Contractors must provide insurance documentation</p>
            </div>
            <input id="require-insurance" bind:checked={settings.verification.requireInsurance} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="require-license">Require license</label>
              <p class="text-xs text-gray-500">Contractors must provide license information</p>
            </div>
            <input id="require-license" bind:checked={settings.verification.requireLicense} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="verification-timeout">Verification timeout (days)</label>
          <input id="verification-timeout" bind:value={settings.verification.verificationTimeout} type="number" min="1" max="30" class="input w-32" />
          <p class="text-xs text-gray-500 mt-1">How long contractors have to complete verification</p>
        </div>
      </div>
      
    {:else if activeTab === 'reviews'}
      <!-- Review Settings -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900">Review Settings</h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="allow-anonymous-reviews">Allow anonymous reviews</label>
              <p class="text-xs text-gray-500">Users can submit reviews without creating an account</p>
            </div>
            <input id="allow-anonymous-reviews" bind:checked={settings.reviews.allowAnonymousReviews} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="require-verified-purchase">Require verified purchase</label>
              <p class="text-xs text-gray-500">Only users who hired the contractor can review</p>
            </div>
            <input id="require-verified-purchase" bind:checked={settings.reviews.requireVerifiedPurchase} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="auto-publish-reviews">Auto-publish reviews</label>
              <p class="text-xs text-gray-500">Reviews are published immediately without moderation</p>
            </div>
            <input id="auto-publish-reviews" bind:checked={settings.reviews.autoPublishReviews} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="moderation-required">Moderation required</label>
              <p class="text-xs text-gray-500">All reviews must be approved before publishing</p>
            </div>
            <input id="moderation-required" bind:checked={settings.reviews.moderationRequired} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="allow-photo-uploads">Allow photo uploads</label>
              <p class="text-xs text-gray-500">Users can attach photos to their reviews</p>
            </div>
            <input id="allow-photo-uploads" bind:checked={settings.reviews.allowPhotoUploads} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="max-photos-per-review">Maximum photos per review</label>
          <input id="max-photos-per-review" bind:value={settings.reviews.maxPhotosPerReview} type="number" min="1" max="10" class="input w-32" />
        </div>
      </div>
      
    {:else if activeTab === 'notifications'}
      <!-- Notification Settings -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900">Notification Settings</h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="email-notifications">Email notifications</label>
              <p class="text-xs text-gray-500">Send notifications via email</p>
            </div>
            <input id="email-notifications" bind:checked={settings.notifications.emailNotifications} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="sms-notifications">SMS notifications</label>
              <p class="text-xs text-gray-500">Send notifications via SMS</p>
            </div>
            <input id="sms-notifications" bind:checked={settings.notifications.smsNotifications} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="new-contractor-alerts">New contractor alerts</label>
              <p class="text-xs text-gray-500">Notify when new contractors register</p>
            </div>
            <input id="new-contractor-alerts" bind:checked={settings.notifications.newContractorAlerts} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="new-review-alerts">New review alerts</label>
              <p class="text-xs text-gray-500">Notify when new reviews are submitted</p>
            </div>
            <input id="new-review-alerts" bind:checked={settings.notifications.newReviewAlerts} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="dispute-alerts">Dispute alerts</label>
              <p class="text-xs text-gray-500">Notify when disputes are opened</p>
            </div>
            <input id="dispute-alerts" bind:checked={settings.notifications.disputeAlerts} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="system-alerts">System alerts</label>
              <p class="text-xs text-gray-500">Notify about system issues and maintenance</p>
            </div>
            <input id="system-alerts" bind:checked={settings.notifications.systemAlerts} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
        </div>
      </div>
      
    {:else if activeTab === 'payments'}
      <!-- Payment Settings -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900">Payment Settings</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="stripe-public-key">Stripe Public Key</label>
            <input id="stripe-public-key" bind:value={settings.payments.stripePublicKey} type="text" class="input" placeholder="pk_..." />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="stripe-secret-key">Stripe Secret Key</label>
            <input id="stripe-secret-key" bind:value={settings.payments.stripeSecretKey} type="password" class="input" placeholder="sk_..." />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="paypal-client-id">PayPal Client ID</label>
            <input id="paypal-client-id" bind:value={settings.payments.paypalClientId} type="text" class="input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="paypal-client-secret">PayPal Client Secret</label>
            <input id="paypal-client-secret" bind:value={settings.payments.paypalClientSecret} type="password" class="input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="processing-fee">Processing Fee (%)</label>
            <input id="processing-fee" bind:value={settings.payments.processingFee} type="number" min="0" max="10" step="0.1" class="input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="minimum-payout">Minimum Payout ($)</label>
            <input id="minimum-payout" bind:value={settings.payments.minimumPayout} type="number" min="1" class="input" />
          </div>
        </div>
      </div>
      
    {:else if activeTab === 'security'}
      <!-- Security Settings -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900">Security Settings</h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="two-factor-auth">Two-factor authentication</label>
              <p class="text-xs text-gray-500">Require 2FA for admin accounts</p>
            </div>
            <input id="two-factor-auth" bind:checked={settings.security.twoFactorAuth} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="require-strong-passwords">Require strong passwords</label>
              <p class="text-xs text-gray-500">Enforce password complexity requirements</p>
            </div>
            <input id="require-strong-passwords" bind:checked={settings.security.requireStrongPasswords} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-gray-700" for="allow-password-reset">Allow password reset</label>
              <p class="text-xs text-gray-500">Users can reset passwords via email</p>
            </div>
            <input id="allow-password-reset" bind:checked={settings.security.allowPasswordReset} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="session-timeout">Session timeout (minutes)</label>
            <input id="session-timeout" bind:value={settings.security.sessionTimeout} type="number" min="5" max="480" class="input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="max-login-attempts">Max login attempts</label>
            <input id="max-login-attempts" bind:value={settings.security.maxLoginAttempts} type="number" min="3" max="10" class="input" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2" for="password-min-length">Password min length</label>
            <input id="password-min-length" bind:value={settings.security.passwordMinLength} type="number" min="6" max="20" class="input" />
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
