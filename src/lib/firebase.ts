/**
 * firebase.ts — GDG On Campus IIE
 *
 * Firebase client SDK initialization (browser-safe).
 * Uses environment variables — see .env.local.example for required keys.
 *
 * IMPORTANT: All NEXT_PUBLIC_* variables are exposed to the browser.
 * Never put secret keys in NEXT_PUBLIC_ variables.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

// ---------------------------------------------------------------------------
// Firebase configuration — loaded from environment variables
// See .env.local.example for the full list of required variables
// ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional for Analytics
};

// ---------------------------------------------------------------------------
// Singleton initialization — prevents re-initialization during hot reload
// ---------------------------------------------------------------------------
let app: FirebaseApp;
let db: Firestore;
let analytics: Analytics | null = null;

/**
 * Initialize or return the existing Firebase app instance.
 * Safe to call multiple times.
 */
export function getFirebaseApp(): FirebaseApp {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  return app;
}

/**
 * Get the Firestore database instance.
 * Automatically initializes Firebase if not already done.
 */
export function getFirestoreDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

/**
 * Get Firebase Analytics (only in browser environments that support it).
 * Returns null in SSR or unsupported environments.
 */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  try {
    if (await isSupported()) {
      analytics = getAnalytics(getFirebaseApp());
      return analytics;
    }
  } catch (error) {
    console.warn("Firebase Analytics not supported:", error);
  }
  return null;
}

// Named exports for convenience
export { app, db };
