<script lang="ts">
  import { goto } from '$app/navigation';
  import { authStore, isAuthenticated, user, userProfile } from '$lib/stores/auth';
  import type { UserRole } from '$lib/firebase/auth';
  import { signIn } from '@auth/sveltekit/client';

  let step = $state<'social' | 'role' | 'complete'>('social');
  let selectedRole = $state<UserRole | null>(null);
  let loading = $state(false);
  let error = $state('');
  let provider = $state<'google' | 'facebook' | null>(null);

  // Redirect if already authenticated with profile (using store)
  $effect(() => {
    if ($isAuthenticated && $userProfile?.role) {
      goto('/');
    }
  });

  async function handleSocialLogin(socialProvider: 'google' | 'facebook') {
    loading = true;
    provider = socialProvider;
    error = '';

    try {
      const callbackUrl = '/auth/register';
      await signIn(socialProvider, { callbackUrl });
      step = 'role';
    } catch (err: any) {
      error = err?.message || 'Sign-in failed. Please try again.';
      loading = false;
      provider = null;
    }
  }

  async function selectRole(role: UserRole) {
    if (!$user) {
      error = 'Please sign in first.';
      return;
    }

    selectedRole = role;
    loading = true;
    error = '';

    try {
      await authStore.createUserProfile(role);
      step = 'complete';
      setTimeout(() => { goto('/'); }, 2000);
    } catch (err: any) {
      error = err.message;
      loading = false;
    }
  }
</script>
