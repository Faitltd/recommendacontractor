import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from './lib/server/auth.js';

// Strip Client Hints headers to avoid Chrome restart loops on Auth.js endpoints
const stripClientHints: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    filterSerializedResponseHeaders(name) {
      return !/^(accept-ch|critical-ch|permissions-policy|sec-ch-|vary)$/i.test(name);
    }
  });

  // Hard delete any Client Hints headers that may have slipped through
  ['accept-ch', 'critical-ch', 'permissions-policy'].forEach((header) =>
    response.headers.delete(header)
  );

  // Remove sec-ch-* references from Vary header
  const vary = response.headers.get('vary');
  if (vary && /sec-ch-/i.test(vary)) {
    response.headers.delete('vary');
  }

  return response;
};

export const handle: Handle = sequence(stripClientHints, authHandle);
