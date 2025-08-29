import { writable, derived, type Readable } from 'svelte/store';
import { browser } from '$app/environment';
import type { User } from 'firebase/auth';
import { AuthService, type UserProfile, type UserRole, type SocialProvider } from '$lib/firebase/auth';
import { firebaseEnabled } from '$lib/firebase/config';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  initialized: boolean;
}

// Create the auth store
function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    profile: null,
    loading: true,
    initialized: false
  });

  let unsubscribe: (() => void) | null = null;

  return {
    subscribe,
    
    /**
     * Initialize the auth store and listen to auth state changes
     */
    init: () => {
      if (!browser || !firebaseEnabled) return;
      
      // Listen to Firebase auth state changes (only if Firebase is enabled)
      unsubscribe = AuthService.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in
          const profile = await AuthService.getUserProfile(user.uid);
          set({
            user,
            profile,
            loading: false,
            initialized: true
          });
        } else {
          // User is signed out
          set({
            user: null,
            profile: null,
            loading: false,
            initialized: true
          });
        }
      });
    },

    /**
     * Sign in with Google
     */
    signInWithGoogle: async (useRedirect = false) => {
      update(state => ({ ...state, loading: true }));

      try {
        const result = await AuthService.signInWithGoogle(useRedirect);
        return result;
      } catch (error: any) {
        if (error.message === 'REDIRECT_IN_PROGRESS') {
          // Don't update loading state for redirects
          return null;
        }
        update(state => ({ ...state, loading: false }));
        throw error;
      }
    },

    /**
     * Sign in with Facebook
     */
    signInWithFacebook: async (useRedirect = false) => {
      update(state => ({ ...state, loading: true }));

      try {
        const result = await AuthService.signInWithFacebook(useRedirect);
        return result;
      } catch (error: any) {
        if (error.message === 'REDIRECT_IN_PROGRESS') {
          // Don't update loading state for redirects
          return null;
        }
        update(state => ({ ...state, loading: false }));
        throw error;
      }
    },

    /**
     * Handle redirect result
     */
    handleRedirectResult: async () => {
      try {
        return await AuthService.handleRedirectResult();
      } catch (error) {
        update(state => ({ ...state, loading: false }));
        throw error;
      }
    },

    /**
     * Create user profile after social login
     */
    createUserProfile: async (role: UserRole) => {
      const currentState = get(authStore);
      if (!currentState.user) {
        throw new Error('No user is currently signed in.');
      }

      try {
        await AuthService.createUserProfile(currentState.user, role);
        // Refresh the profile data
        await authStore.refreshProfile();
      } catch (error) {
        throw error;
      }
    },

    /**
     * Sign out user
     */
    signOut: async () => {
      update(state => ({ ...state, loading: true }));
      
      try {
        await AuthService.signOut();
        // The onAuthStateChanged listener will update the store
      } catch (error) {
        update(state => ({ ...state, loading: false }));
        throw error;
      }
    },

    /**
     * Update user profile
     */
    updateProfile: async (updates: Partial<UserProfile>) => {
      const currentState = get(authStore);
      if (!currentState.user) {
        throw new Error('No user is currently signed in.');
      }

      await AuthService.updateUserProfile(currentState.user.uid, updates);
      
      // Update the store with new profile data
      const updatedProfile = await AuthService.getUserProfile(currentState.user.uid);
      update(state => ({
        ...state,
        profile: updatedProfile
      }));
    },

    /**
     * Delete user account
     */
    deleteAccount: async () => {
      await AuthService.deleteAccount();
      // The onAuthStateChanged listener will update the store
    },

    /**
     * Refresh user profile data
     */
    refreshProfile: async () => {
      const currentState = get(authStore);
      if (!currentState.user) return;

      const profile = await AuthService.getUserProfile(currentState.user.uid);
      update(state => ({
        ...state,
        profile
      }));
    },

    /**
     * Clean up listeners
     */
    destroy: () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    }
  };
}

// Helper function to get current store value
function get<T>(store: Readable<T>): T {
  let value: T;
  store.subscribe(v => value = v)();
  return value!;
}

// Create and export the auth store
export const authStore = createAuthStore();

// Derived stores for common use cases
export const user = derived(authStore, $auth => $auth.user);
export const userProfile = derived(authStore, $auth => $auth.profile);
export const isAuthenticated = derived(authStore, $auth => !!$auth.user && !!$auth.profile);
export const userRole = derived(authStore, $auth => $auth.profile?.role);
export const isAdmin = derived(authStore, $auth => $auth.profile?.role === 'admin');
export const isContractor = derived(authStore, $auth => $auth.profile?.role === 'contractor');
export const isHomeowner = derived(authStore, $auth => $auth.profile?.role === 'homeowner');
export const authLoading = derived(authStore, $auth => $auth.loading);
export const authInitialized = derived(authStore, $auth => $auth.initialized);
export const userProvider = derived(authStore, $auth => $auth.profile?.provider);

// Contractor-specific derived stores
export const contractorVerificationStatus = derived(
  authStore, 
  $auth => $auth.profile?.verificationStatus
);

export const isVerifiedContractor = derived(
  authStore, 
  $auth => $auth.profile?.role === 'contractor' && $auth.profile?.verificationStatus === 'verified'
);

// Auth guard helper
export const requireAuth = derived(
  [isAuthenticated, authInitialized],
  ([$isAuthenticated, $authInitialized]) => {
    if (!$authInitialized) return { allowed: false, reason: 'loading' };
    if (!$isAuthenticated) return { allowed: false, reason: 'not-authenticated' };
    return { allowed: true, reason: null };
  }
);

export const requireRole = (role: UserRole) => derived(
  [userRole, requireAuth],
  ([$userRole, $requireAuth]) => {
    if (!$requireAuth.allowed) return $requireAuth;
    if ($userRole !== role) return { allowed: false, reason: 'insufficient-permissions' };
    return { allowed: true, reason: null };
  }
);

export const requireAdmin = requireRole('admin');
export const requireContractor = requireRole('contractor');
