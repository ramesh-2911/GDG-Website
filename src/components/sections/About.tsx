/**
 * About.tsx — GDG On Campus IIE
 * Mission, pillars, and GDG explanation section.
 */

import styles from "./About.module.css";

const PILLARS = [
  {
    id: "build",
    color: "var(--google-blue)",
    bgColor: "var(--blue-50)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    ),
    title: "Build",
    description:
      "Hands-on workshops, hackathons, and project sprints where you go from idea to shipped product. We build real things with real Google technologies.",
  },
  {
    id: "learn",
    color: "var(--google-green)",
    bgColor: "var(--green-50)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 3L1 9l4 2.18V15l7 4 7-4v-3.82L23 9 12 3zm6 8.99l-2 1.09V17l-4 2.29L8 17v-3.92l-2-1.09V11l6-3.27 6 3.27-2 .99z"/>
      </svg>
    ),
    title: "Learn",
    description:
      "Study Jams, tech talks, and learning paths covering Flutter, Firebase, Android, Google Cloud, Machine Learning, and more. Grow from beginner to builder.",
  },
  {
    id: "connect",
    color: "var(--google-red)",
    bgColor: "var(--red-50)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    title: "Connect",
    description:
      "Join a global network of 1M+ GDG members. Network with fellow developers, mentors, Googlers, and industry professionals who share your passion for tech.",
  },
  {
    id: "grow",
    color: "var(--google-yellow)",
    bgColor: "var(--yellow-50)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"/>
      </svg>
    ),
    title: "Grow",
    description:
      "From your first line of code to launching a product — GDG supports every stage. Access Google certifications, Solution Challenge opportunities, and career growth paths.",
  },
];

const FACTS = [
  {
    icon: "🌍",
    value: "100+ Countries",
    desc: "GDG chapters worldwide",
  },
  {
    icon: "👨‍💻",
    value: "1M+ Members",
    desc: "Global developer community",
  },
  {
    icon: "🎓",
    value: "3000+ Campuses",
    desc: "University chapters globally",
  },
  {
    icon: "🏆",
    value: "Solution Challenge",
    desc: "Annual global competition",
  },
];

export default function About() {
  return (
    <section className={`section section-alt ${styles.about}`} id="about" aria-labelledby="about-heading">
      <div className="container">
        {/* Section header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>About Us</div>
          <h2 id="about-heading" className={styles.heading}>
            What is{" "}
            <span style={{ color: "var(--google-blue)" }}>G</span>
            <span style={{ color: "var(--google-red)" }}>D</span>
            <span style={{ color: "var(--google-yellow)" }}>G</span>
            <span style={{ color: "var(--google-green)" }}> On Campus</span>
            ?
          </h2>
          <p className={styles.subheading}>
            Google Developer Groups On Campus (formerly GDSC) is a Google Developers program for 
            university students interested in growing their knowledge of Google developer technologies 
            — and through these technologies, positively impact their local communities.
          </p>
        </div>

        {/* Mission statement */}
        <div className={styles.missionCard}>
          <div className={styles.missionIcon} aria-hidden="true">💡</div>
          <div className={styles.missionContent}>
            <h3 className={styles.missionTitle}>Our Mission</h3>
            <p className={styles.missionText}>
              To cultivate a vibrant community of student developers at IIE — empowering them with 
              knowledge, skills, and connections to build technology solutions that create real-world impact. 
              We believe every student has the potential to change the world, and we're here to 
              provide the tools and community to make it happen.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className={styles.pillarsGrid} role="list">
          {PILLARS.map(({ id, color, bgColor, icon, title, description }) => (
            <div
              key={id}
              className={`card ${styles.pillarCard}`}
              role="listitem"
              id={`pillar-${id}`}
            >
              <div
                className={styles.pillarIcon}
                style={{ background: bgColor, color }}
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className={styles.pillarTitle} style={{ color }}>
                {title}
              </h3>
              <p className={styles.pillarDesc}>{description}</p>
              <div
                className={styles.pillarAccent}
                style={{ background: color }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* GDG Global Facts */}
        <div className={styles.factsSection}>
          <h3 className={styles.factsSectionTitle}>Part of Something Bigger</h3>
          <div className={styles.factsGrid} role="list">
            {FACTS.map(({ icon, value, desc }) => (
              <div className={styles.factCard} key={value} role="listitem">
                <span className={styles.factIcon} aria-hidden="true">{icon}</span>
                <strong className={styles.factValue}>{value}</strong>
                <span className={styles.factDesc}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
