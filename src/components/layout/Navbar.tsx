/**
 * Navbar.tsx — GDG On Campus IIE
 * Responsive sticky navigation with Google brand colors and smooth scroll.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Navbar.module.css";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track scroll position for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <nav className={`container ${styles.nav}`} aria-label="Main navigation">
        {/* Logo */}
        <a
          href="#"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="GDG On Campus IIE — Home"
        >
          <span className={styles.logoIcon} aria-hidden="true">
            <span className={styles.g} style={{ color: "var(--google-blue)" }}>G</span>
            <span className={styles.d} style={{ color: "var(--google-red)" }}>D</span>
            <span className={styles.g2} style={{ color: "var(--google-yellow)" }}>G</span>
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoTitle}>GDG On Campus</span>
            <span className={styles.logoSub}>IIE</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`${styles.navLink} ${activeSection === href ? styles.active : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(href);
                }}
                aria-current={activeSection === href ? "page" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className={`btn btn-primary ${styles.ctaBtn}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#contact");
          }}
          id="navbar-join-btn"
        >
          Join Us
        </a>

        {/* Mobile Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
        >
          <span className={`${styles.bar} ${isMenuOpen ? styles.bar1Open : ""}`} />
          <span className={`${styles.bar} ${isMenuOpen ? styles.bar2Open : ""}`} />
          <span className={`${styles.bar} ${isMenuOpen ? styles.bar3Open : ""}`} />
        </button>

        {/* Mobile Menu Backdrop */}
        <div
          className={`${styles.mobileBackdrop} ${isMenuOpen ? styles.mobileBackdropOpen : ""}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <ul role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.mobileNavLink} ${activeSection === href ? styles.mobileActive : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className={`btn btn-primary ${styles.mobileCta}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            tabIndex={isMenuOpen ? 0 : -1}
            id="mobile-join-btn"
          >
            Join Us
          </a>
        </div>
      </nav>
    </header>
  );
}
