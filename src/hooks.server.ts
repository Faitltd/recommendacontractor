import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from './lib/server/auth.js';
import type { Handle } from '@sveltejs/kit';

// Custom handle function for additional server-side logic
const customHandle: Handle = async ({ event, resolve }) => {
  // Add any custom server-side logic here
  // For example, rate limiting, logging, etc.
  
  return resolve(event);
};

// Combine authentication handle with custom handle
export const handle = sequence(authHandle, customHandle);
