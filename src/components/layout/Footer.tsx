/**
 * Footer.tsx — GDG On Campus IIE
 * Full-featured footer with links, social media, and copyright.
 */

import styles from "./Footer.module.css";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
];

const FOOTER_LINKS = {
  "Quick Links": [
    { label: "About GDG", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Projects", href: "#projects" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Google Developers", href: "https://developers.google.com" },
    { label: "GDG Community", href: "https://developers.google.com/community/gdsc" },
    { label: "Google Cloud", href: "https://cloud.google.com" },
    { label: "Firebase", href: "https://firebase.google.com" },
    { label: "Flutter", href: "https://flutter.dev" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Google color bar */}
      <div className={styles.colorBar} aria-hidden="true">
        <span style={{ background: "var(--google-blue)" }} />
        <span style={{ background: "var(--google-red)" }} />
        <span style={{ background: "var(--google-yellow)" }} />
        <span style={{ background: "var(--google-green)" }} />
      </div>

      <div className={`container ${styles.footerContent}`}>
        {/* Brand column */}
        <div className={styles.brandCol}>
          <div className={styles.brandLogo}>
            <span style={{ color: "var(--google-blue)", fontWeight: 700, fontSize: "1.5rem" }}>G</span>
            <span style={{ color: "var(--google-red)", fontWeight: 700, fontSize: "1.5rem" }}>D</span>
            <span style={{ color: "var(--google-yellow)", fontWeight: 700, fontSize: "1.5rem" }}>G</span>
          </div>
          <p className={styles.brandName}>GDG On Campus IIE</p>
          <p className={styles.tagline}>
            Build. Learn. Connect.
          </p>
          <p className={styles.brandDesc}>
            A chapter of Google Developer Groups On Campus at the Institute of Integrated Engineering. 
            We build the next generation of developers, one event at a time.
          </p>
          {/* Social Links */}
          <div className={styles.socialLinks} role="list" aria-label="Social media links">
            {SOCIAL_LINKS.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`Follow us on ${name}`}
                role="listitem"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div className={styles.linkCol} key={title}>
            <h3 className={styles.colTitle}>{title}</h3>
            <ul role="list">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={styles.footerLink}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter / Contact CTA */}
        <div className={styles.ctaCol}>
          <h3 className={styles.colTitle}>Stay Updated</h3>
          <p className={styles.ctaDesc}>
            Get notified about upcoming events, workshops, and opportunities in our developer community.
          </p>
          <a href="#contact" className={`btn btn-primary ${styles.ctaButton}`}>
            Get In Touch
          </a>
          <div className={styles.location}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Institute of Integrated Engineering</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <p className={styles.copyright}>
            © {currentYear} GDG On Campus IIE. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            Google Developer Groups On Campus is an independent community and is not affiliated with Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
