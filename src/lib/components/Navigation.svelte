<script lang="ts">
  import { signOut } from '@auth/sveltekit/client';

  let { currentPath = '', session } = $props<{
    currentPath?: string;
    session?: any;
  }>();

  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  async function handleSignOut() {
    try {
      await signOut();
      mobileMenuOpen = false;
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
</script>

<nav class="bg-white shadow-professional border-b border-gray-100 sticky top-0 z-50">
  <div class="container-custom">
    <div class="flex justify-between h-20">
      <div class="flex items-center">
        <a href="/" class="flex-shrink-0 flex items-center group">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div>
            <span class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              Recommend a Contractor
            </span>
            <div class="text-xs text-gray-500 font-medium">Denver's Trusted Network</div>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden lg:ml-10 lg:flex lg:space-x-8">
          <a
            href="/contractors"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
            class:text-blue-600={currentPath.startsWith('/contractors')}
            class:font-semibold={currentPath.startsWith('/contractors')}
          >
            Find Contractors
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  class:scale-x-100={currentPath.startsWith('/contractors')}></span>
          </a>
          <a
            href="/categories"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
            class:text-blue-600={currentPath.startsWith('/categories')}
            class:font-semibold={currentPath.startsWith('/categories')}
          >
            Services
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  class:scale-x-100={currentPath.startsWith('/categories')}></span>
          </a>
          <a
            href="/reviews"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
            class:text-blue-600={currentPath.startsWith('/reviews')}
            class:font-semibold={currentPath.startsWith('/reviews')}
          >
            Reviews
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  class:scale-x-100={currentPath.startsWith('/reviews')}></span>
          </a>
          <a
            href="/faq"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
            class:text-blue-600={currentPath.startsWith('/faq')}
            class:font-semibold={currentPath.startsWith('/faq')}
          >
            FAQ
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  class:scale-x-100={currentPath.startsWith('/faq')}></span>
          </a>
          <a
            href="/about"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
            class:text-blue-600={currentPath.startsWith('/about')}
            class:font-semibold={currentPath.startsWith('/about')}
          >
            About
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  class:scale-x-100={currentPath.startsWith('/about')}></span>
          </a>
        </div>
      </div>
      
      <!-- Desktop Auth Section -->
      <div class="hidden lg:flex lg:items-center lg:space-x-6">
        {#if session?.user}
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              {#if session.user.image}
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  class="h-10 w-10 rounded-full border-2 border-gray-200"
                />
              {:else}
                <div class="h-10 w-10 rounded-full bg-blue-100 border-2 border-gray-200 flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              {/if}
              <div>
                <div class="text-sm font-medium text-gray-900">
                  {session.user.name || 'User'}
                </div>
                <div class="text-xs text-gray-500">
                  Member
                </div>
              </div>
            </div>

            <!-- User Menu Dropdown -->
            <div class="relative">
              <a href="/profile" class="btn btn-outline btn-sm">
                Profile
              </a>
            </div>

            <button
              onclick={handleSignOut}
              class="btn btn-secondary btn-sm"
            >
              Sign Out
            </button>
          </div>
        {:else}
          <div class="flex items-center space-x-4">
            <a
              href="/auth/register"
              class="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              For Contractors
            </a>
            <a href="/auth/login" class="btn btn-primary btn-sm">
              Sign In
            </a>
          </div>
        {/if}
      </div>
      
      <!-- Mobile menu button -->
      <div class="md:hidden flex items-center">
        <button
          onclick={toggleMobileMenu}
          class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 p-2 rounded-md"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {#if mobileMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile menu -->
  {#if mobileMenuOpen}
    <div class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
        <a
          href="/contractors"
          class="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium rounded-lg transition-colors"
          class:text-blue-600={currentPath.startsWith('/contractors')}
          class:bg-blue-50={currentPath.startsWith('/contractors')}
        >
          Find Contractors
        </a>
        <a
          href="/categories"
          class="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium rounded-lg transition-colors"
          class:text-blue-600={currentPath.startsWith('/categories')}
          class:bg-blue-50={currentPath.startsWith('/categories')}
        >
          Services
        </a>
        <a
          href="/reviews"
          class="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium rounded-lg transition-colors"
          class:text-blue-600={currentPath.startsWith('/reviews')}
          class:bg-blue-50={currentPath.startsWith('/reviews')}
        >
          Reviews
        </a>
        <a
          href="/faq"
          class="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium rounded-lg transition-colors"
          class:text-blue-600={currentPath.startsWith('/faq')}
          class:bg-blue-50={currentPath.startsWith('/faq')}
        >
          FAQ
        </a>
        <a
          href="/about"
          class="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium rounded-lg transition-colors"
          class:text-blue-600={currentPath.startsWith('/about')}
          class:bg-blue-50={currentPath.startsWith('/about')}
        >
          About
        </a>

        <div class="border-t border-gray-200 pt-4 mt-4">
          {#if session?.user}
            <div class="px-3 py-2">
              <div class="flex items-center space-x-3 mb-4">
                {#if session.user.image}
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    class="h-10 w-10 rounded-full border-2 border-gray-200"
                  />
                {:else}
                  <div class="h-10 w-10 rounded-full bg-blue-100 border-2 border-gray-200 flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                {/if}
                <div>
                  <div class="text-base font-medium text-gray-800">
                    {session.user.name || 'User'}
                  </div>
                  <div class="text-sm text-gray-500">
                    Member
                  </div>
                </div>
              </div>

              <div class="space-y-2 mb-4">
                <a href="/profile" class="btn btn-outline w-full">
                  Profile
                </a>
              </div>

              <button
                onclick={handleSignOut}
                class="btn btn-secondary w-full"
              >
                Sign Out
              </button>
            </div>
          {:else}
            <div class="px-3 py-2 space-y-3">
              <a
                href="/auth/register"
                class="block text-base font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                For Contractors
              </a>
              <a href="/auth/login" class="btn btn-primary w-full">
                Sign In
              </a>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</nav>
