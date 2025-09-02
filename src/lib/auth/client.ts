import { signIn } from '@auth/sveltekit/client';

export type SocialProvider = 'google' | 'facebook';

/**
 * Compute the callback URL from the current window location, falling back to the provided default.
 * This function is safe to call in browsers; it will return the default if window is unavailable.
 */
export function computeCallbackUrlFromLocation(defaultUrl: string = '/'): string {
  try {
    // In Svelte SSR, window is undefined. Guard to avoid ReferenceError.
    if (typeof window === 'undefined') return defaultUrl;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('callbackUrl') || defaultUrl;
  } catch {
    return defaultUrl;
  }
}

/**
 * Start social login using Auth.js signIn with a consistent callbackUrl behavior.
 */
export async function startSocialLogin(
  provider: SocialProvider,
  opts?: { callbackUrl?: string }
): Promise<void> {
  const callbackUrl = opts?.callbackUrl ?? computeCallbackUrlFromLocation('/');
  await signIn(provider, { callbackUrl });
}

