/**
 * Projects.tsx — GDG On Campus IIE
 * Project showcase with category filters and tech stack tags.
 */

"use client";

import { useState, useMemo } from "react";
import { PROJECTS, type Project, type ProjectCategory } from "@/data/projects";
import styles from "./Projects.module.css";

interface ProjectsProps {
  projects?: Project[];
}

type FilterOption = "all" | ProjectCategory;

const FILTERS: { id: FilterOption; label: string; emoji: string }[] = [
  { id: "all",         label: "All",         emoji: "✨" },
  { id: "ai-ml",       label: "AI / ML",     emoji: "🤖" },
  { id: "web",         label: "Web",         emoji: "🌐" },
  { id: "mobile",      label: "Mobile",      emoji: "📱" },
  { id: "cloud",       label: "Cloud",       emoji: "☁️" },
  { id: "open-source", label: "Open Source", emoji: "🔓" },
  { id: "hackathon",   label: "Hackathon",   emoji: "⚡" },
];

const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  "ai-ml":      "var(--google-blue)",
  "web":        "var(--google-green)",
  "mobile":     "var(--google-red)",
  "cloud":      "var(--google-blue)",
  "open-source": "var(--google-yellow)",
  "hackathon":  "var(--google-red)",
};

function ProjectCard({ project }: { project: Project }) {
  const color = CATEGORY_COLORS[project.category];

  return (
    <article
      className={`card ${styles.projectCard} ${project.featured ? styles.featured : ""}`}
      id={`project-${project.id}`}
    >
      {/* Image placeholder */}
      <div
        className={styles.projectImage}
        style={{
          background: `linear-gradient(135deg, ${color}22, ${color}44)`,
          borderBottom: `3px solid ${color}`,
        }}
        aria-hidden="true"
      >
        <span className={styles.projectEmoji}>
          {project.category === "ai-ml"       ? "🤖" :
           project.category === "web"         ? "🌐" :
           project.category === "mobile"      ? "📱" :
           project.category === "cloud"       ? "☁️" :
           project.category === "open-source" ? "🔓" : "⚡"}
        </span>
        {project.featured && (
          <div className={styles.featuredBadge}>⭐ Featured</div>
        )}
        {project.award && (
          <div className={styles.awardBadge} title={project.award}>🏆</div>
        )}
      </div>

      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>

        {project.award && (
          <div className={styles.awardLabel}>
            <span>🏆</span> {project.award}
          </div>
        )}

        <p className={styles.projectDesc}>{project.description}</p>

        {/* Team */}
        {project.team && (
          <div className={styles.projectTeam}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <span>{project.team.slice(0, 2).join(", ")}{project.team.length > 2 ? ` +${project.team.length - 2}` : ""}</span>
          </div>
        )}

        {/* Tech stack */}
        <div className={styles.techStack} role="list" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <span key={tech} className={styles.techTag} role="listitem" style={{ borderColor: `${color}40`, color }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className={styles.projectLinks}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className={`btn btn-ghost btn-sm ${styles.linkBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              id={`github-${project.id}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className={`btn btn-primary btn-sm ${styles.linkBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              id={`live-${project.id}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
              </svg>
              Live Demo
            </a>
          )}
          {project.demoUrl && !project.liveUrl && (
            <a
              href={project.demoUrl}
              className={`btn btn-secondary btn-sm ${styles.linkBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              id={`demo-${project.id}`}
            >
              Watch Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ projects = PROJECTS }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section className={`section section-alt ${styles.projects}`} id="projects" aria-labelledby="projects-heading">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Projects</div>
          <h2 id="projects-heading" className={styles.heading}>
            What We've Built
          </h2>
          <p className={styles.subheading}>
            From Google Solution Challenge finalists to open-source tools used by developers worldwide — 
            here's what our community has created.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {FILTERS.map(({ id, label, emoji }) => (
            <button
              key={id}
              className={`${styles.filterBtn} ${activeFilter === id ? styles.activeFilter : ""}`}
              onClick={() => setActiveFilter(id)}
              id={`project-filter-${id}`}
              aria-pressed={activeFilter === id}
            >
              <span aria-hidden="true">{emoji}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredProjects.length > 0 ? (
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span>🚀</span>
            <p>No projects in this category yet — stay tuned!</p>
          </div>
        )}

        {/* CTA */}
        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Have a project idea?</h3>
            <p className={styles.ctaDesc}>
              Join GDG On Campus IIE and turn your idea into reality with mentorship, resources, and a supportive community.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary btn-lg" id="projects-join-btn">
            Build With Us
          </a>
        </div>
      </div>
    </section>
  );
}
