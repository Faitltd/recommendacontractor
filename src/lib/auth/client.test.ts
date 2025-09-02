/** @jest-environment jsdom */
import { computeCallbackUrlFromLocation, startSocialLogin } from './client';

jest.mock('@auth/sveltekit/client', () => ({
  signIn: jest.fn().mockResolvedValue(undefined)
}));

import { signIn } from '@auth/sveltekit/client';

describe('auth client helper', () => {
  describe('computeCallbackUrlFromLocation', () => {
    const originalWindow = global.window;

    afterEach(() => {
      // restore jsdom window
      // @ts-ignore
      global.window = originalWindow;
      jest.restoreAllMocks();
    });

    it('returns default when window is undefined', () => {
      // simulate SSR
      // @ts-ignore
      delete (global as any).window;
      const url = computeCallbackUrlFromLocation('/');
      expect(url).toBe('/');
    });

    it('reads callbackUrl from window.location.search', () => {
      Object.defineProperty(window, 'location', {
        value: new URL('https://example.com/auth/signin?callbackUrl=%2Fprofile'),
        writable: true
      });
      const url = computeCallbackUrlFromLocation('/');
      expect(url).toBe('/profile');
    });

    it('falls back to default when callbackUrl missing', () => {
      Object.defineProperty(window, 'location', {
        value: new URL('https://example.com/auth/signin'),
        writable: true
      });
      const url = computeCallbackUrlFromLocation('/');
      expect(url).toBe('/');
    });
  });

  describe('startSocialLogin', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('calls signIn with provider and computed callbackUrl', async () => {
      Object.defineProperty(window, 'location', {
        value: new URL('https://example.com/auth/signin?callbackUrl=%2Fdashboard'),
        writable: true
      });
      await startSocialLogin('google');
      expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/dashboard' });
    });

    it('prefers explicit callbackUrl option', async () => {
      Object.defineProperty(window, 'location', {
        value: new URL('https://example.com/auth/signin?callbackUrl=%2Fdashboard'),
        writable: true
      });
      await startSocialLogin('facebook', { callbackUrl: '/override' });
      expect(signIn).toHaveBeenCalledWith('facebook', { callbackUrl: '/override' });
    });
  });
});

