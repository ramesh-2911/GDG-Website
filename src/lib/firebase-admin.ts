/**
 * firebase-admin.ts — GDG On Campus IIE
 *
 * Firebase Admin SDK initialization for server-side operations only.
 * This file MUST NOT be imported in client components.
 *
 * Used in:
 *   - app/api/contact/route.ts (Next.js API route)
 *
 * Setup:
 *   1. Generate a service account key from Firebase Console → Project Settings → Service accounts
 *   2. Stringify the JSON: JSON.stringify(serviceAccount)
 *   3. Set FIREBASE_ADMIN_SERVICE_ACCOUNT env var to that string
 */

import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";

let adminApp: App;

/**
 * Initialize or retrieve the Firebase Admin SDK app.
 * Singleton — safe to call multiple times.
 */
function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccountJson = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT;

  if (!serviceAccountJson) {
    throw new Error(
      "FIREBASE_ADMIN_SERVICE_ACCOUNT environment variable is not set. " +
        "See .env.local.example for setup instructions."
    );
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson);
    adminApp = initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    return adminApp;
  } catch (error) {
    throw new Error(
      `Failed to parse FIREBASE_ADMIN_SERVICE_ACCOUNT: ${
        error instanceof Error ? error.message : "Invalid JSON"
      }`
    );
  }
}

/**
 * Get the Admin Firestore instance for server-side reads/writes.
 */
export function getAdminDb() {
  return getAdminFirestore(getAdminApp());
}

export { getAdminApp };
