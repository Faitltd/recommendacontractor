import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  // This page is the sign-in UI; do not redirect.
  return {};
};
