/**
 * firestore.ts — GDG On Campus IIE
 *
 * Firestore helper functions for client-side data operations.
 * All server-side Firestore operations use firebase-admin (see firebase-admin.ts).
 */

import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getFirestoreDb } from "./firebase";
import type { ContactFormData } from "./validations";

// ---------------------------------------------------------------------------
// Collection names — centralized to avoid typos
// ---------------------------------------------------------------------------
export const COLLECTIONS = {
  CONTACT_SUBMISSIONS: "contact_submissions",
} as const;

// ---------------------------------------------------------------------------
// Type definitions for Firestore documents
// ---------------------------------------------------------------------------
export interface ContactSubmissionDocument extends ContactFormData {
  submittedAt: Timestamp | ReturnType<typeof serverTimestamp>;
  status: "new" | "read" | "replied";
  userAgent?: string;
  ipAddress?: string; // Only set server-side via the API route
}

// ---------------------------------------------------------------------------
// Contact Form Submission
// ---------------------------------------------------------------------------

/**
 * Save a contact form submission to Firestore.
 *
 * @param data - Validated contact form data
 * @param metadata - Optional metadata (user agent, etc.)
 * @returns The Firestore document ID of the saved submission
 *
 * @example
 * const id = await saveContactSubmission({ name: 'Alice', email: '...', ... });
 */
export async function saveContactSubmission(
  data: ContactFormData,
  metadata?: { userAgent?: string }
): Promise<string> {
  try {
    const db = getFirestoreDb();
    const submissionsRef = collection(db, COLLECTIONS.CONTACT_SUBMISSIONS);

    const document: ContactSubmissionDocument = {
      ...data,
      submittedAt: serverTimestamp(),
      status: "new",
      userAgent: metadata?.userAgent ?? "unknown",
    };

    const docRef = await addDoc(submissionsRef, document);
    return docRef.id;
  } catch (error) {
    // Log for debugging, re-throw for caller to handle
    console.error("[Firestore] Failed to save contact submission:", error);
    throw new Error("Failed to save your message. Please try again.");
  }
}
