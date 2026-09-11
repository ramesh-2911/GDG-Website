/**
 * team.ts — GDG On Campus IIE
 *
 * Team member data. To update the team:
 *   1. Add/remove objects from the TEAM_MEMBERS array
 *   2. Place member photos in /public/images/team/<id>.jpg
 *   3. No code changes required — the Team component auto-renders from this data
 *
 * Role hierarchy (used for display order):
 *   lead → co-lead → core → member
 */

export type TeamRole = "lead" | "co-lead" | "core" | "member";

export interface TeamMember {
  id: string;
  name: string;
  role: string; // Display title, e.g. "Chapter Lead"
  hierarchy: TeamRole; // Used to determine display order
  department?: string; // Academic department / year
  photo?: string; // Path under /public, e.g. "/images/team/alice.jpg"
  bio?: string; // Short 1–2 sentence bio
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "lead-001",
    name: "Arjun Sharma",
    role: "Chapter Lead",
    hierarchy: "lead",
    department: "Computer Science, Year 3",
    photo: "/images/team/lead.jpg",
    bio: "Passionate about cloud computing and developer communities. Google Cloud certified and hackathon enthusiast.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "colead-001",
    name: "Meera Krishnan",
    role: "Co-Lead & Events Head",
    hierarchy: "co-lead",
    department: "Information Technology, Year 3",
    photo: "/images/team/colead.jpg",
    bio: "Flutter developer and UI/UX enthusiast. Loves organizing hackathons and community events.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "core-001",
    name: "Rahul Verma",
    role: "Technical Lead",
    hierarchy: "core",
    department: "Computer Science, Year 2",
    photo: "/images/team/core1.jpg",
    bio: "Full-stack developer specializing in React and Node.js. Google Solution Challenge finalist.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "core-002",
    name: "Divya Pillai",
    role: "Design Lead",
    hierarchy: "core",
    department: "Information Systems, Year 3",
    photo: "/images/team/core2.jpg",
    bio: "Material Design advocate and Figma expert. Transforms ideas into beautiful, accessible interfaces.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "core-003",
    name: "Karan Mehta",
    role: "Android & ML Lead",
    hierarchy: "core",
    department: "AI & Data Science, Year 2",
    photo: "/images/team/core3.jpg",
    bio: "Android developer and ML enthusiast. Working on on-device AI with TensorFlow Lite and Gemini Nano.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "core-004",
    name: "Ananya Reddy",
    role: "Community Manager",
    hierarchy: "core",
    department: "Computer Science, Year 2",
    photo: "/images/team/core4.jpg",
    bio: "Community builder and content creator. Manages GDG socials and keeps our members engaged and inspired.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: "core-005",
    name: "Siddharth Joshi",
    role: "Cloud & DevOps Lead",
    hierarchy: "core",
    department: "Computer Engineering, Year 3",
    photo: "/images/team/core5.jpg",
    bio: "Google Cloud Champion and Kubernetes enthusiast. Helps members build scalable cloud-native applications.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "core-006",
    name: "Lakshmi Nair",
    role: "Web Technologies Lead",
    hierarchy: "core",
    department: "Information Technology, Year 2",
    photo: "/images/team/core6.jpg",
    bio: "Web performance nerd and open-source contributor. Champions accessibility and progressive web apps.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
];

// Sort by hierarchy order for consistent display
const HIERARCHY_ORDER: Record<TeamRole, number> = {
  lead: 0,
  "co-lead": 1,
  core: 2,
  member: 3,
};

export const getSortedTeam = (): TeamMember[] =>
  [...TEAM_MEMBERS].sort(
    (a, b) => HIERARCHY_ORDER[a.hierarchy] - HIERARCHY_ORDER[b.hierarchy]
  );

export const getLeadership = (): TeamMember[] =>
  TEAM_MEMBERS.filter((m) => m.hierarchy === "lead" || m.hierarchy === "co-lead");

export const getCoreTeam = (): TeamMember[] =>
  TEAM_MEMBERS.filter((m) => m.hierarchy === "core");
