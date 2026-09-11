/**
 * __tests__/validations.test.ts
 * Unit tests for contact form Zod schema validation.
 */

import { contactFormSchema } from "@/lib/validations";
import { ZodError } from "zod";

describe("contactFormSchema", () => {
  const validData = {
    name: "Alice Developer",
    email: "alice@example.com",
    subject: "General Inquiry",
    message: "This is a test message that is long enough to pass validation.",
  };

  // ── Valid cases ────────────────────────────────────────────────
  describe("valid data", () => {
    it("accepts valid complete form data", () => {
      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("normalizes email to lowercase", () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        email: "Alice@EXAMPLE.COM",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("alice@example.com");
      }
    });

    it("trims whitespace from name", () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        name: "  Alice Developer  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("Alice Developer");
      }
    });
  });

  // ── Name validation ────────────────────────────────────────────
  describe("name field", () => {
    it("rejects empty name", () => {
      const result = contactFormSchema.safeParse({ ...validData, name: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const nameErrors = result.error.flatten().fieldErrors.name;
        expect(nameErrors).toBeDefined();
        expect(nameErrors!.length).toBeGreaterThan(0);
      }
    });

    it("rejects name shorter than 2 characters", () => {
      const result = contactFormSchema.safeParse({ ...validData, name: "A" });
      expect(result.success).toBe(false);
    });

    it("rejects name longer than 100 characters", () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        name: "A".repeat(101),
      });
      expect(result.success).toBe(false);
    });

    it("accepts name with exactly 2 characters", () => {
      const result = contactFormSchema.safeParse({ ...validData, name: "Al" });
      expect(result.success).toBe(true);
    });
  });

  // ── Email validation ───────────────────────────────────────────
  describe("email field", () => {
    it("rejects invalid email format", () => {
      const invalidEmails = [
        "notanemail",
        "missing@",
        "@domain.com",
        "spaces in@email.com",
        "double@@domain.com",
      ];
      invalidEmails.forEach((email) => {
        const result = contactFormSchema.safeParse({ ...validData, email });
        expect(result.success).toBe(false);
      });
    });

    it("accepts valid email formats", () => {
      const validEmails = [
        "test@example.com",
        "user.name+tag@domain.co.uk",
        "user123@subdomain.example.org",
      ];
      validEmails.forEach((email) => {
        const result = contactFormSchema.safeParse({ ...validData, email });
        expect(result.success).toBe(true);
      });
    });

    it("rejects empty email", () => {
      const result = contactFormSchema.safeParse({ ...validData, email: "" });
      expect(result.success).toBe(false);
    });
  });

  // ── Subject validation ─────────────────────────────────────────
  describe("subject field", () => {
    it("rejects subject shorter than 4 characters", () => {
      const result = contactFormSchema.safeParse({ ...validData, subject: "Hi" });
      expect(result.success).toBe(false);
    });

    it("rejects subject longer than 200 characters", () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        subject: "S".repeat(201),
      });
      expect(result.success).toBe(false);
    });

    it("accepts subject with exactly 4 characters", () => {
      const result = contactFormSchema.safeParse({ ...validData, subject: "Test" });
      expect(result.success).toBe(true);
    });
  });

  // ── Message validation ─────────────────────────────────────────
  describe("message field", () => {
    it("rejects message shorter than 20 characters", () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        message: "Too short",
      });
      expect(result.success).toBe(false);
    });

    it("rejects message longer than 5000 characters", () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        message: "M".repeat(5001),
      });
      expect(result.success).toBe(false);
    });

    it("accepts message with exactly 20 characters", () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        message: "Exactly twenty chars",
      });
      expect(result.success).toBe(true);
    });
  });

  // ── Missing fields ─────────────────────────────────────────────
  describe("missing required fields", () => {
    it("rejects when all fields are missing", () => {
      const result = contactFormSchema.safeParse({});
      expect(result.success).toBe(false);
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        expect(fieldErrors.name).toBeDefined();
        expect(fieldErrors.email).toBeDefined();
        expect(fieldErrors.subject).toBeDefined();
        expect(fieldErrors.message).toBeDefined();
      }
    });
  });
});
