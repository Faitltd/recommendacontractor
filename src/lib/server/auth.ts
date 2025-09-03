import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './db.js';
import { env } from '$env/dynamic/private';


// Lightweight diagnostics to help trace production configuration issues (no secrets logged)
const hasAuthSecret = !!(env.AUTH_SECRET || env.NEXTAUTH_SECRET);
const hasGoogleCreds = !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);
const publicAuthUrl = env.AUTH_URL || env.NEXTAUTH_URL || env.PUBLIC_APP_URL;

if (!hasAuthSecret) {
  console.error('Auth.js configuration: Missing AUTH_SECRET (or NEXTAUTH_SECRET)');
}
if (!publicAuthUrl) {
  console.warn('Auth.js configuration: Missing AUTH_URL/NEXTAUTH_URL/PUBLIC_APP_URL');
}
if (!hasGoogleCreds) {
  console.warn('Auth.js configuration: Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET');
}

// Explicitly configure only Google provider
const providers = [
  Google({
    clientId: env.GOOGLE_CLIENT_ID!,
    clientSecret: env.GOOGLE_CLIENT_SECRET!,
    authorization: {
      params: { scope: 'openid email profile' }
    }
  })
];

const useAdapter = env.AUTH_DISABLE_ADAPTER !== 'true';

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: useAdapter ? PrismaAdapter(db) : undefined,
  providers,
  // Prefer AUTH_SECRET, fall back to NEXTAUTH_SECRET if present
  secret: env.AUTH_SECRET || env.NEXTAUTH_SECRET,
  trustHost: true,
  logger: {
    error(code, metadata) {
      console.error('Auth.js error', code, metadata);
    },
    warn(code, metadata) {
      console.warn('Auth.js warn', code, metadata);
    },
    debug(code, metadata) {
      if (env.AUTH_DEBUG === 'true') console.log('Auth.js debug', code, metadata);
    }
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // @ts-expect-error augmenting session
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        // @ts-expect-error token augmentation
        token.accessToken = account.access_token;
      }
      return token;
    }
  },
  // Keep only a custom error page (no custom signIn to avoid redirect loop)
  pages: {
    error: '/auth-error'
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (!account) return;

      if (isNewUser && account.provider === 'google') {
        await db.user.update({
          where: { id: user.id },
          data: {
            googleId: account.providerAccountId,
            avatar: user.image,
            verified: true
          }
        });
      }
    }
  }
});
