/**
 * __tests__/firestore.test.ts
 * Unit tests for Firestore helper functions.
 * Firebase is mocked — no real Firebase project needed to run tests.
 */

// Mock Firebase modules before importing any code that uses them
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  serverTimestamp: jest.fn(() => ({ _type: "serverTimestamp" })),
}));

jest.mock("@/lib/firebase", () => ({
  getFirestoreDb: jest.fn(() => ({})),
}));

import { collection, addDoc } from "firebase/firestore";
import { saveContactSubmission } from "@/lib/firestore";
import type { ContactFormData } from "@/lib/validations";

const mockCollection = collection as jest.Mock;
const mockAddDoc = addDoc as jest.Mock;

const validContactData: ContactFormData = {
  name: "Test User",
  email: "test@example.com",
  subject: "Test Subject",
  message: "This is a test message for unit testing purposes.",
};

describe("saveContactSubmission", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves a contact submission and returns the document ID", async () => {
    const mockDocId = "mock-doc-id-12345";
    mockCollection.mockReturnValue("mock-collection-ref");
    mockAddDoc.mockResolvedValue({ id: mockDocId });

    const result = await saveContactSubmission(validContactData);

    expect(result).toBe(mockDocId);
    expect(mockAddDoc).toHaveBeenCalledTimes(1);
  });

  it("calls collection with the correct collection name", async () => {
    mockCollection.mockReturnValue("mock-collection-ref");
    mockAddDoc.mockResolvedValue({ id: "test-id" });

    await saveContactSubmission(validContactData);

    expect(mockCollection).toHaveBeenCalledWith(
      expect.anything(),
      "contact_submissions"
    );
  });

  it("includes the submitted form data in the document", async () => {
    mockCollection.mockReturnValue("mock-collection-ref");
    mockAddDoc.mockResolvedValue({ id: "test-id" });

    await saveContactSubmission(validContactData);

    const savedDoc = mockAddDoc.mock.calls[0][1];
    expect(savedDoc.name).toBe(validContactData.name);
    expect(savedDoc.email).toBe(validContactData.email);
    expect(savedDoc.subject).toBe(validContactData.subject);
    expect(savedDoc.message).toBe(validContactData.message);
  });

  it("sets status to 'new' by default", async () => {
    mockCollection.mockReturnValue("mock-collection-ref");
    mockAddDoc.mockResolvedValue({ id: "test-id" });

    await saveContactSubmission(validContactData);

    const savedDoc = mockAddDoc.mock.calls[0][1];
    expect(savedDoc.status).toBe("new");
  });

  it("includes serverTimestamp in the document", async () => {
    mockCollection.mockReturnValue("mock-collection-ref");
    mockAddDoc.mockResolvedValue({ id: "test-id" });

    await saveContactSubmission(validContactData);

    const savedDoc = mockAddDoc.mock.calls[0][1];
    expect(savedDoc.submittedAt).toBeDefined();
  });

  it("includes optional metadata when provided", async () => {
    mockCollection.mockReturnValue("mock-collection-ref");
    mockAddDoc.mockResolvedValue({ id: "test-id" });

    await saveContactSubmission(validContactData, { userAgent: "Mozilla/5.0" });

    const savedDoc = mockAddDoc.mock.calls[0][1];
    expect(savedDoc.userAgent).toBe("Mozilla/5.0");
  });

  it("throws a friendly error when Firestore write fails", async () => {
    mockCollection.mockReturnValue("mock-collection-ref");
    mockAddDoc.mockRejectedValue(new Error("Firestore unavailable"));

    await expect(saveContactSubmission(validContactData)).rejects.toThrow(
      "Failed to save your message. Please try again."
    );
  });
});
