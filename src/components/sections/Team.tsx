/**
 * Team.tsx — GDG On Campus IIE
 * Leadership and core team section. Data-driven from data/team.ts.
 */

import { getSortedTeam, getLeadership } from "@/data/team";
import type { TeamMember } from "@/data/team";
import styles from "./Team.module.css";

function SocialIcon({ type }: { type: "linkedin" | "github" | "twitter" }) {
  const icons = {
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  };
  return icons[type];
}

const AVATAR_COLORS = [
  ["var(--google-blue)", "var(--blue-50)"],
  ["var(--google-red)", "var(--red-50)"],
  ["var(--google-green)", "var(--green-50)"],
  ["var(--google-yellow)", "var(--yellow-50)"],
];

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [fgColor, bgColor] = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isLeadership = member.hierarchy === "lead" || member.hierarchy === "co-lead";

  return (
    <article
      className={`card ${styles.memberCard} ${isLeadership ? styles.leaderCard : ""}`}
      id={`member-${member.id}`}
    >
      {isLeadership && (
        <div className={styles.leaderBadge} aria-label="Leadership">
          <span>⭐</span> Leadership
        </div>
      )}

      {/* Avatar */}
      <div className={styles.avatarWrapper}>
        <div
          className={styles.avatar}
          style={{ background: bgColor, color: fgColor }}
          aria-hidden="true"
        >
          {initials}
        </div>
        {isLeadership && (
          <div
            className={styles.avatarRing}
            style={{ borderColor: fgColor }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Info */}
      <div className={styles.memberInfo}>
        <h3 className={styles.memberName}>{member.name}</h3>
        <p className={styles.memberRole} style={{ color: fgColor }}>
          {member.role}
        </p>
        {member.department && (
          <p className={styles.memberDept}>{member.department}</p>
        )}
        {member.bio && (
          <p className={styles.memberBio}>{member.bio}</p>
        )}
      </div>

      {/* Social links */}
      <div className={styles.socialLinks} role="list" aria-label={`${member.name}'s social links`}>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={`${member.name} on LinkedIn`}
            role="listitem"
          >
            <SocialIcon type="linkedin" />
          </a>
        )}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={`${member.name} on GitHub`}
            role="listitem"
          >
            <SocialIcon type="github" />
          </a>
        )}
        {member.twitter && (
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={`${member.name} on Twitter`}
            role="listitem"
          >
            <SocialIcon type="twitter" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Team() {
  const members = getSortedTeam();

  return (
    <section
      className={`section ${styles.team}`}
      id="team"
      aria-labelledby="team-heading"
    >
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Our Team</div>
          <h2 id="team-heading" className={styles.heading}>
            The People Behind GDG IIE
          </h2>
          <p className={styles.subheading}>
            Passionate student developers who volunteer their time to build a thriving 
            developer community at IIE. Driven by curiosity, collaboration, and a love for technology.
          </p>
        </div>

        {/* Team grid */}
        <div className={styles.teamGrid} role="list">
          {members.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* Join the team CTA */}
        <div className={styles.joinSection}>
          <div className={styles.joinContent}>
            <div className={styles.joinIcon} aria-hidden="true">🚀</div>
            <div>
              <h3 className={styles.joinTitle}>Want to Join the Core Team?</h3>
              <p className={styles.joinDesc}>
                We're always looking for passionate developers, designers, and community builders. 
                Applications open each semester.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="btn btn-primary btn-lg"
            id="team-apply-btn"
          >
            Apply to Join
          </a>
        </div>
      </div>
    </section>
  );
}
