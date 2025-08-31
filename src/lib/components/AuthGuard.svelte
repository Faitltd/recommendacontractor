<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { Snippet } from 'svelte';

  let {
    children,
    requireRole: requiredRole,
    redirectTo = '/auth/login',
    showLoading = true
  }: {
    children: Snippet;
    requireRole?: string;
    redirectTo?: string;
    showLoading?: boolean;
  } = $props();

  // Auth.js session from $page
  const isAuthed = $derived(!!$page.data.session?.user);

  // Redirect effects
  $effect(() => {
    if (!isAuthed) {
      const currentPath = $page.url.pathname;
      goto(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    // If a specific role is required, block for now until roles are implemented
    if (requiredRole) {
      goto('/unauthorized');
    }
  });
</script>

{#if isAuthed}
  {@render children()}
{:else}
  {#if showLoading}
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600">Loading...</p>
      </div>
    </div>
  {/if}
{/if}
