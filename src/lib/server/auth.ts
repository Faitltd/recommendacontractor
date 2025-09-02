import { SvelteKitAuth } from '@auth/sveltekit';
import Facebook from '@auth/sveltekit/providers/facebook';
import Google from '@auth/sveltekit/providers/google';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './db.js';
import { env } from '$env/dynamic/private';

// Configure providers conditionally to avoid build-time env requirements
const providers = [];

if (env.FACEBOOK_CLIENT_ID && env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    Facebook({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: { scope: 'email,public_profile' }
      }
    })
  );
}

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { scope: 'openid email profile' }
      }
    })
  );
}

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(db),
  providers,
  // Prefer AUTH_SECRET, fall back to NEXTAUTH_SECRET if present
  secret: env.AUTH_SECRET || env.NEXTAUTH_SECRET,
  trustHost: true,
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
    error: '/auth/error'
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (!account) return;

      if (isNewUser && account.provider === 'facebook') {
        await db.user.update({
          where: { id: user.id },
          data: {
            facebookId: account.providerAccountId,
            // @ts-expect-error optional chaining of FB profile picture
            avatar: profile?.picture?.data?.url || user.image,
            verified: true
          }
        });
      }

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
