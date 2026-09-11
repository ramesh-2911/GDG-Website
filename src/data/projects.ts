/**
 * projects.ts — GDG On Campus IIE
 *
 * Data source for the Projects section. Add new projects by appending to
 * the PROJECTS array — the Projects component renders from this data automatically.
 */

export type ProjectCategory =
  | "ai-ml"
  | "web"
  | "mobile"
  | "cloud"
  | "open-source"
  | "hackathon";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  featured: boolean;
  year: number;
  award?: string; // e.g. "Google Solution Challenge Top 50"
  team?: string[]; // Member names who built it
}

export const PROJECTS: Project[] = [
  {
    id: "proj-001",
    title: "EduReach — Learning for All",
    description:
      "An AI-powered adaptive learning platform that personalizes content for students with limited internet access. Built using Flutter, Firebase, and Gemini AI. Reached Top 50 in Google Solution Challenge 2025.",
    category: "ai-ml",
    techStack: ["Flutter", "Firebase", "Gemini AI", "TensorFlow Lite"],
    image: "/images/projects/edureach.jpg",
    githubUrl: "https://github.com",
    demoUrl: "https://youtube.com",
    featured: true,
    year: 2025,
    award: "Google Solution Challenge — Global Top 50",
    team: ["Arjun Sharma", "Meera Krishnan", "Rahul Verma"],
  },
  {
    id: "proj-002",
    title: "CampusConnect",
    description:
      "A React web app that connects IIE students for study groups, project collaboration, and events. Features real-time chat via Firebase and Google OAuth authentication.",
    category: "web",
    techStack: ["React", "Firebase", "Google OAuth", "Node.js"],
    image: "/images/projects/campusconnect.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    year: 2025,
    team: ["Divya Pillai", "Karan Mehta"],
  },
  {
    id: "proj-003",
    title: "GreenTrack — Carbon Footprint Tracker",
    description:
      "An Android app that uses ML Kit to analyze daily habits and estimate carbon footprint. Provides AI-driven suggestions to reduce environmental impact.",
    category: "mobile",
    techStack: ["Android", "Kotlin", "ML Kit", "Google Maps SDK"],
    image: "/images/projects/greentrack.jpg",
    githubUrl: "https://github.com",
    featured: false,
    year: 2024,
    team: ["Karan Mehta", "Siddharth Joshi"],
  },
  {
    id: "proj-004",
    title: "CloudDeploy CLI",
    description:
      "An open-source command-line tool that simplifies deploying full-stack apps to Google Cloud Run. Auto-generates Dockerfiles, sets up Cloud SQL, and configures CI/CD with GitHub Actions.",
    category: "cloud",
    techStack: ["Python", "Google Cloud Run", "Docker", "GitHub Actions"],
    image: "/images/projects/clouddeploy.jpg",
    githubUrl: "https://github.com",
    featured: true,
    year: 2025,
    team: ["Siddharth Joshi", "Arjun Sharma"],
  },
  {
    id: "proj-005",
    title: "AccessKit — WCAG Testing Chrome Extension",
    description:
      "A Chrome extension that audits web pages for WCAG 2.1 AA accessibility issues in real-time, with guided fix suggestions and a developer-friendly report export.",
    category: "open-source",
    techStack: ["JavaScript", "Chrome Extensions API", "Axe Core"],
    image: "/images/projects/accesskit.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://chrome.google.com/webstore",
    featured: false,
    year: 2025,
    team: ["Lakshmi Nair", "Divya Pillai"],
  },
  {
    id: "proj-006",
    title: "HackBot — AI Hackathon Mentor",
    description:
      "A Gemini-powered Telegram bot that acts as a 24/7 technical mentor during hackathons. Answers coding questions, suggests architecture patterns, and reviews code snippets.",
    category: "ai-ml",
    techStack: ["Python", "Gemini API", "Telegram Bot API", "FastAPI"],
    image: "/images/projects/hackbot.jpg",
    githubUrl: "https://github.com",
    featured: false,
    year: 2024,
    team: ["Rahul Verma", "Ananya Reddy"],
  },
];

export const getFeaturedProjects = (): Project[] =>
  PROJECTS.filter((p) => p.featured);

export const getProjectsByCategory = (category: ProjectCategory): Project[] =>
  PROJECTS.filter((p) => p.category === category);
