/**
 * events.ts — GDG On Campus IIE
 *
 * Data source for the Events section. This file serves as the initial
 * data layer. To connect a real backend/CMS later:
 *   1. Keep the `Event` interface unchanged
 *   2. Replace `SAMPLE_EVENTS` with a fetch() call in your page/component
 *   3. The Events component accepts `events: Event[]` as a prop — no refactor needed
 */

export type EventType = "workshop" | "hackathon" | "talk" | "community" | "study-jam";
export type EventStatus = "upcoming" | "past" | "featured";

export interface Event {
  id: string;
  title: string;
  date: string; // ISO 8601 date string
  endDate?: string;
  type: EventType;
  status: EventStatus;
  description: string;
  longDescription?: string;
  image?: string;
  location: string;
  registrationUrl?: string;
  recapUrl?: string;
  tags: string[];
  attendees?: number;
  speaker?: {
    name: string;
    title: string;
    photo?: string;
  };
}

export const SAMPLE_EVENTS: Event[] = [
  {
    id: "evt-001",
    title: "Google I/O Extended 2025 — IIE",
    date: "2025-06-15T10:00:00+05:30",
    endDate: "2025-06-15T18:00:00+05:30",
    type: "community",
    status: "past",
    description:
      "We watched Google I/O 2025 together, discussed the latest AI, Flutter, and Firebase announcements, and ran live demos.",
    location: "IIE Campus Auditorium",
    tags: ["Google I/O", "AI", "Flutter", "Firebase"],
    attendees: 180,
    recapUrl: "#",
    image: "/images/events/io-extended.jpg",
  },
  {
    id: "evt-002",
    title: "Android Dev Bootcamp — Jetpack Compose",
    date: "2025-07-20T09:00:00+05:30",
    endDate: "2025-07-21T17:00:00+05:30",
    type: "workshop",
    status: "past",
    description:
      "A two-day hands-on bootcamp covering modern Android development with Jetpack Compose, ViewModel, and Kotlin coroutines.",
    location: "Tech Lab 3, IIE",
    tags: ["Android", "Jetpack Compose", "Kotlin"],
    attendees: 60,
    recapUrl: "#",
    image: "/images/events/android-bootcamp.jpg",
  },
  {
    id: "evt-003",
    title: "GDG Solution Challenge 2025 — Info Session",
    date: "2025-08-05T14:00:00+05:30",
    type: "talk",
    status: "past",
    description:
      "Learn how to build solutions for the UN Sustainable Development Goals and submit to the global Google Solution Challenge.",
    location: "Online (Google Meet)",
    tags: ["Solution Challenge", "SDGs", "Hackathon"],
    attendees: 120,
    speaker: {
      name: "Priya Nair",
      title: "GDG Lead, IIE",
    },
    image: "/images/events/solution-challenge.jpg",
  },
  {
    id: "evt-004",
    title: "Flutter Study Jam — Season 4",
    date: "2025-09-20T10:00:00+05:30",
    endDate: "2025-10-20T17:00:00+05:30",
    type: "study-jam",
    status: "featured",
    description:
      "A month-long Flutter Study Jam with weekly sessions covering Dart fundamentals, widget trees, state management, and Firebase integration.",
    location: "Room B-201, IIE",
    registrationUrl: "#",
    tags: ["Flutter", "Dart", "Firebase", "Mobile"],
    image: "/images/events/flutter-study-jam.jpg",
  },
  {
    id: "evt-005",
    title: "GDG Hackathon 2025 — Build with AI",
    date: "2025-10-11T09:00:00+05:30",
    endDate: "2025-10-12T20:00:00+05:30",
    type: "hackathon",
    status: "upcoming",
    description:
      "48-hour hackathon challenging students to build innovative AI-powered solutions using Google Cloud, Vertex AI, and Gemini APIs.",
    location: "IIE Innovation Hub",
    registrationUrl: "#",
    tags: ["AI", "Gemini", "Google Cloud", "Hackathon"],
    image: "/images/events/hackathon.jpg",
  },
  {
    id: "evt-006",
    title: "Cloud & DevOps Workshop",
    date: "2025-11-08T10:00:00+05:30",
    type: "workshop",
    status: "upcoming",
    description:
      "Hands-on workshop covering Google Cloud fundamentals, containerization with Docker, Kubernetes, and CI/CD pipelines.",
    location: "Tech Lab 2, IIE",
    registrationUrl: "#",
    tags: ["Google Cloud", "DevOps", "Kubernetes", "Docker"],
    image: "/images/events/cloud-workshop.jpg",
  },
];

// Utility helpers for filtering — consumed by the Events section component
export const getEventsByStatus = (status: EventStatus): Event[] =>
  SAMPLE_EVENTS.filter((e) => e.status === status);

export const getEventsByType = (type: EventType): Event[] =>
  SAMPLE_EVENTS.filter((e) => e.type === type);

export const getFeaturedEvents = (): Event[] =>
  SAMPLE_EVENTS.filter((e) => e.status === "featured" || e.status === "upcoming");
