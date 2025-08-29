import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { browser } from '$app/environment';

// Firebase configuration from public env if provided (optional)
const firebaseConfig = {
  apiKey: (import.meta as any).env?.PUBLIC_FIREBASE_API_KEY || '',
  authDomain: (import.meta as any).env?.PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: (import.meta as any).env?.PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: (import.meta as any).env?.PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: (import.meta as any).env?.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: (import.meta as any).env?.PUBLIC_FIREBASE_APP_ID || ''
};

export const firebaseEnabled: boolean = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

// Initialize Firebase only when enabled and in the browser
let _app: FirebaseApp | null = null;
if (browser && firebaseEnabled) {
  try {
    _app = initializeApp(firebaseConfig);
  } catch (e) {
    console.warn('Firebase initialization skipped:', e);
    _app = null;
  }
}

// Initialize Firebase services conditionally
export const app = _app as any;
export const auth = _app ? getAuth(_app) : (null as any);
export const db = _app ? getFirestore(_app) : (null as any);
export const storage = _app ? getStorage(_app) : (null as any);
export const functions = _app ? getFunctions(_app) : (null as any);

// Initialize Auth Providers (client-only usage)
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Configure providers
googleProvider.addScope('profile');
googleProvider.addScope('email');
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Auth configuration (unused when Firebase is disabled)
export const authConfig = {
  sessionTimeout: 24 * 60 * 60 * 1000,
  rememberMeDuration: 30 * 24 * 60 * 60 * 1000,
  supportedProviders: ['google', 'facebook'] as const,
};

export default app;
