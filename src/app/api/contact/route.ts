/**
 * POST /api/contact — GDG On Campus IIE
 *
 * Handles contact form submissions:
 *   1. Validates request body against Zod schema
 *   2. Saves submission to Firestore (via Admin SDK)
 *   3. Optionally sends email notification via SendGrid
 *
 * Environment variables required:
 *   - FIREBASE_ADMIN_SERVICE_ACCOUNT (JSON string of service account)
 *   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *   - SENDGRID_API_KEY (optional — for email notifications)
 *   - CONTACT_EMAIL (recipient for notifications)
 */

import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, type ApiResponse } from "@/lib/validations";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { ZodError } from "zod";

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  // 1. Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request format." },
      { status: 400 }
    );
  }

  // 2. Validate with Zod
  let validatedData;
  try {
    validatedData = contactFormSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check your inputs.",
          fieldErrors,
        },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Validation error." },
      { status: 400 }
    );
  }

  // 3. Save to Firestore via Admin SDK
  let submissionId: string;
  try {
    const db = getAdminDb();
    const docRef = await db.collection("contact_submissions").add({
      ...validatedData,
      submittedAt: FieldValue.serverTimestamp(),
      status: "new",
      ipAddress: request.headers.get("x-forwarded-for") ?? "unknown",
      userAgent: request.headers.get("user-agent") ?? "unknown",
    });
    submissionId = docRef.id;
  } catch (error) {
    console.error("[API/contact] Firestore write failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save your message. Please try again later.",
      },
      { status: 500 }
    );
  }

  // 4. Optional: Send email via SendGrid
  // Uncomment and configure SENDGRID_API_KEY + CONTACT_EMAIL to enable
  /*
  if (process.env.SENDGRID_API_KEY && process.env.CONTACT_EMAIL) {
    try {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      await sgMail.send({
        to: process.env.CONTACT_EMAIL,
        from: "noreply@gdgiie.com",
        subject: `[GDG IIE Contact] ${validatedData.subject}`,
        text: `From: ${validatedData.name} <${validatedData.email}>\n\n${validatedData.message}`,
        html: `<strong>From:</strong> ${validatedData.name} &lt;${validatedData.email}&gt;<br/><br/>${validatedData.message}`,
      });
    } catch (emailError) {
      // Email failure is non-critical — submission is already saved
      console.error("[API/contact] Email send failed:", emailError);
    }
  }
  */

  // 5. Return success
  return NextResponse.json(
    {
      success: true,
      submissionId,
      message: "Thank you! Your message has been received. We'll get back to you soon.",
    },
    { status: 201 }
  );
}

// Reject non-POST methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
