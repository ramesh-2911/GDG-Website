/**
 * Contact.tsx — GDG On Campus IIE
 * Contact form with Firebase integration, validation, and social links.
 */

"use client";

import { useContactForm } from "@/hooks/useContactForm";
import styles from "./Contact.module.css";

const CONTACT_INFO = [
  {
    id: "email",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: "Email",
    value: "gdg@iie.ac.in",
    href: "mailto:gdg@iie.ac.in",
  },
  {
    id: "location",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    label: "Location",
    value: "Institute of Integrated Engineering, India",
    href: null,
  },
  {
    id: "community",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    label: "Chapter",
    value: "Google Developer Groups On Campus",
    href: "https://developers.google.com/community/gdsc",
  },
];

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Event Collaboration",
  "Sponsorship",
  "Join the Team",
  "Project Collaboration",
  "Press / Media",
  "Other",
];

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className={styles.successState} role="alert" aria-live="polite">
      <div className={styles.successIcon} aria-hidden="true">✅</div>
      <h3 className={styles.successTitle}>Message Sent!</h3>
      <p className={styles.successDesc}>
        Thank you for reaching out! A member of the GDG IIE team will get back 
        to you within 1–2 business days.
      </p>
      <button className="btn btn-secondary" onClick={onReset} id="contact-reset-btn">
        Send Another Message
      </button>
    </div>
  );
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    status,
    serverError,
    onSubmit,
    reset,
  } = useContactForm();

  return (
    <section
      className={`section section-alt ${styles.contact}`}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Contact</div>
          <h2 id="contact-heading" className={styles.heading}>
            Get In Touch
          </h2>
          <p className={styles.subheading}>
            Whether you want to join our community, collaborate on a project, or just say hello — 
            we&apos;d love to hear from you.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {/* Left column — info */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Let&apos;s Connect</h3>
              <p className={styles.infoDesc}>
                The GDG On Campus IIE team is active and welcoming. 
                Whether you&apos;re a complete beginner or an experienced developer, 
                there&apos;s a place for you in our community.
              </p>

              <ul className={styles.contactList} role="list">
                {CONTACT_INFO.map(({ id, icon, label, value, href }) => (
                  <li key={id} className={styles.contactItem} role="listitem">
                    <div className={styles.contactIcon} aria-hidden="true">
                      {icon}
                    </div>
                    <div>
                      <span className={styles.contactLabel}>{label}</span>
                      {href ? (
                        <a
                          href={href}
                          className={styles.contactValue}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          id={`contact-info-${id}`}
                        >
                          {value}
                        </a>
                      ) : (
                        <span className={styles.contactValue}>{value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Quick join options */}
              <div className={styles.quickJoin}>
                <h4 className={styles.quickJoinTitle}>Quick Join</h4>
                <div className={styles.quickJoinBtns}>
                  <a
                    href="https://gdg.community.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-primary ${styles.joinBtn}`}
                    id="contact-gdg-btn"
                  >
                    Join on GDG Platform
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-secondary ${styles.joinBtn}`}
                    id="contact-linkedin-btn"
                  >
                    Follow on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div className={styles.formCol}>
            {status === "success" ? (
              <SuccessState onReset={reset} />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
                noValidate
                aria-label="Contact form"
              >
                <h3 className={styles.formTitle}>Send us a Message</h3>

                {/* Server error */}
                {serverError && (
                  <div className={styles.serverError} role="alert" aria-live="polite">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    {serverError}
                  </div>
                )}

                {/* Row: Name + Email */}
                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Full Name <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your full name"
                      autoComplete="name"
                      className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                      aria-required="true"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                    />
                    {errors.name && (
                      <span id="name-error" className={styles.errorMsg} role="alert">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Email Address <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                      aria-required="true"
                      aria-describedby={errors.email ? "email-error" : undefined}
                      {...register("email")}
                    />
                    {errors.email && (
                      <span id="email-error" className={styles.errorMsg} role="alert">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-subject" className={styles.label}>
                    Subject <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    className={`${styles.input} ${styles.select} ${errors.subject ? styles.inputError : ""}`}
                    aria-required="true"
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    {...register("subject")}
                  >
                    <option value="">Select a topic...</option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.subject && (
                    <span id="subject-error" className={styles.errorMsg} role="alert">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Message <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                    aria-required="true"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                  />
                  {errors.message && (
                    <span id="message-error" className={styles.errorMsg} role="alert">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                  disabled={isSubmitting || status === "loading"}
                  id="contact-submit-btn"
                  aria-disabled={isSubmitting || status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>

                <p className={styles.formNote}>
                  We typically reply within 1–2 business days. Your message is saved securely via Firebase.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
