/**
 * Hero.tsx — GDG On Campus IIE
 * Full-viewport hero with animated headline, floating accents, and CTAs.
 */

"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

const GOOGLE_COLORS = ["var(--google-blue)", "var(--google-red)", "var(--google-yellow)", "var(--google-green)"];

const STATS = [
  { value: "500+", label: "Community Members", color: "var(--google-blue)" },
  { value: "40+", label: "Events Hosted", color: "var(--google-green)" },
  { value: "15+", label: "Projects Built", color: "var(--google-red)" },
  { value: "3", label: "Years Running", color: "var(--google-yellow)" },
];

export default function Hero() {
  const orbRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} id="hero" aria-label="Hero section">
      {/* Animated background orbs */}
      <div className={styles.bgOrbs} aria-hidden="true" ref={orbRef}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={`${styles.orb} ${styles.orb4}`} />
      </div>

      {/* Grid pattern overlay */}
      <div className={styles.gridPattern} aria-hidden="true" />

      <div className="container">
        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={`${styles.badge} animate-fade-up`}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Google Developer Groups On Campus
          </div>

          {/* Headline */}
          <h1 className={`${styles.headline} animate-fade-up delay-100`}>
            <span className={styles.headlineLine1}>Where Developers</span>
            <span className={styles.headlineLine2}>
              <span className={styles.wordBuild} style={{ color: "var(--google-blue)" }}>Build</span>
              <span className={styles.dot} style={{ color: "var(--google-red)" }}>.</span>{" "}
              <span className={styles.wordLearn} style={{ color: "var(--google-green)" }}>Learn</span>
              <span className={styles.dot} style={{ color: "var(--google-yellow)" }}>.</span>{" "}
              <span className={styles.wordConnect} style={{ color: "var(--google-red)" }}>Connect</span>
              <span className={styles.dot} style={{ color: "var(--google-blue)" }}>.</span>
            </span>
          </h1>

          {/* Description */}
          <p className={`${styles.description} animate-fade-up delay-200`}>
            GDG On Campus IIE is a student-run community at the Institute of Integrated Engineering — 
            powered by Google. We host workshops, hackathons, and talks to help students 
            grow as developers and make an impact with technology.
          </p>

          {/* CTA Buttons */}
          <div className={`${styles.ctaGroup} animate-fade-up delay-300`}>
            <a
              href="#contact"
              className="btn btn-primary btn-lg"
              id="hero-join-btn"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("#contact");
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Join Our Community
            </a>
            <a
              href="#about"
              className="btn btn-secondary btn-lg"
              id="hero-learn-btn"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("#about");
              }}
            >
              Learn More
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className={`${styles.stats} animate-fade-up delay-400`} role="list">
            {STATS.map(({ value, label, color }, i) => (
              <div key={label} className={styles.statItem} role="listitem">
                {i > 0 && <div className={styles.statDivider} aria-hidden="true" />}
                <div className={styles.statValue} style={{ color }}>
                  {value}
                </div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className={`${styles.heroVisual} animate-scale-in delay-200`} aria-hidden="true">
          {/* Central GDG logo mark */}
          <div className={styles.logoMark}>
            <div className={styles.logoRing} />
            <div className={styles.logoRing2} />
            <div className={styles.logoLetters}>
              {["G", "D", "G"].map((letter, i) => (
                <span
                  key={i}
                  className={styles.logoLetter}
                  style={{ color: GOOGLE_COLORS[i], animationDelay: `${i * 0.15}s` }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Floating tech badges */}
          {[
            { label: "Flutter", color: "var(--google-blue)", top: "10%", left: "5%", delay: "0s" },
            { label: "Firebase", color: "var(--google-yellow)", top: "5%", right: "5%", delay: "0.5s" },
            { label: "Android", color: "var(--google-green)", bottom: "15%", left: "0%", delay: "1s" },
            { label: "Gemini AI", color: "var(--google-red)", bottom: "10%", right: "5%", delay: "0.75s" },
            { label: "Cloud", color: "var(--google-blue)", top: "45%", left: "-5%", delay: "0.25s" },
            { label: "Kotlin", color: "var(--google-red)", top: "50%", right: "-5%", delay: "1.25s" },
          ].map(({ label, color, ...pos }) => (
            <div
              key={label}
              className={styles.floatingBadge}
              style={{ ...pos, borderColor: color, color }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
