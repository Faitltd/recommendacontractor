<script lang="ts">
  import { page } from '$app/stores';
  import AuthGuard from '$lib/components/AuthGuard.svelte';
  import { signOut } from '@auth/sveltekit/client';

  let { children } = $props();
  let sidebarOpen = $state(true);

  const currentPath = $derived($page.url.pathname);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
    },
    {
      name: 'Contractors',
      href: '/admin/contractors',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
    {
      name: 'Reviews',
      href: '/admin/reviews',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
    },
    {
      name: 'Disputes',
      href: '/admin/disputes',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z'
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    }
  ];
  
  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
</script>

<svelte:head>
  <title>Admin Dashboard - Recommend a Contractor</title>
</svelte:head>

<AuthGuard requireRole="admin">
<div class="min-h-screen bg-gray-50 flex">
  <!-- Sidebar -->
  <div class="flex-shrink-0">
    <div class="flex flex-col w-64 bg-white shadow-lg">
      <!-- Logo -->
      <div class="flex items-center justify-between h-16 px-6 bg-blue-600">
        <div class="flex items-center">
          <span class="text-xl font-bold text-white">Admin Panel</span>
        </div>
        <button
          onclick={() => sidebarOpen = !sidebarOpen}
          class="text-white hover:text-blue-200 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        {#each navigation as item}
          <a
            href={item.href}
            class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {
              currentPath === item.href 
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
            </svg>
            {item.name}
          </a>
        {/each}
      </nav>
      
      <!-- User Profile -->
      <div class="px-4 py-4 border-t border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-sm font-medium text-blue-600">
              {($page.data.session?.user?.name || 'Admin').split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {$page.data.session?.user?.name || 'Admin User'}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {'admin'}
            </p>
          </div>
          <button
            onclick={handleSignOut}
            class="text-gray-400 hover:text-gray-600"
            title="Logout"
            aria-label="Sign out"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Top Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center space-x-4">
          <button
            onclick={() => sidebarOpen = !sidebarOpen}
            class="text-gray-500 hover:text-gray-700 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 class="text-2xl font-semibold text-gray-900">
            {navigation.find(item => item.href === currentPath)?.name || 'Dashboard'}
          </h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="relative p-2 text-gray-400 hover:text-gray-600" aria-label="Notifications">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM11 17H6l5 5v-5zM12 3v12"></path>
            </svg>
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>
          
          <!-- Quick Actions -->
          <div class="flex items-center space-x-2">
            <a href="/contractors" target="_blank" class="btn btn-outline btn-sm">
              View Site
            </a>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Page Content -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-6">
        {@render children()}
      </div>
    </main>
  </div>
</div>

<style>
  /* Custom scrollbar for sidebar */
  nav::-webkit-scrollbar {
    width: 4px;
  }
  
  nav::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  nav::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }
  
  nav::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
</style>
</AuthGuard>
