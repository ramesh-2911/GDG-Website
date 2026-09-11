/**
 * useContactForm.ts — GDG On Campus IIE
 *
 * Custom hook encapsulating all contact form logic:
 * - Form state management via react-hook-form
 * - Zod validation via @hookform/resolvers
 * - API submission with loading, success, and error states
 * - Automatic reset on success
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData, type ApiResponse } from "@/lib/validations";

export type FormStatus = "idle" | "loading" | "success" | "error";

export interface UseContactFormReturn {
  // react-hook-form
  register: ReturnType<typeof useForm<ContactFormData>>["register"];
  handleSubmit: ReturnType<typeof useForm<ContactFormData>>["handleSubmit"];
  formState: ReturnType<typeof useForm<ContactFormData>>["formState"];
  // Submission state
  status: FormStatus;
  serverError: string | null;
  submissionId: string | null;
  onSubmit: (data: ContactFormData) => Promise<void>;
  reset: () => void;
}

export function useContactForm(): UseContactFormReturn {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState,
    reset: resetForm,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur", // Validate on field blur for better UX
  });

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    setStatus("loading");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        setStatus("success");
        setSubmissionId(result.submissionId);
        resetForm();
      } else {
        setStatus("error");
        setServerError(result.error ?? "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setServerError(
        "Network error. Please check your connection and try again."
      );
      console.error("[Contact Form] Submission failed:", error);
    }
  };

  const reset = () => {
    setStatus("idle");
    setServerError(null);
    setSubmissionId(null);
    resetForm();
  };

  return {
    register,
    handleSubmit,
    formState,
    status,
    serverError,
    submissionId,
    onSubmit,
    reset,
  };
}
