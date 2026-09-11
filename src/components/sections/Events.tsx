/**
 * Events.tsx — GDG On Campus IIE
 * Filterable event card grid. Data-driven, API-ready.
 *
 * To connect a real backend:
 *   1. Fetch events server-side in page.tsx using your CMS/API
 *   2. Pass them as `events` prop — no component changes needed
 */

"use client";

import { useState, useMemo } from "react";
import { SAMPLE_EVENTS, type Event, type EventStatus, type EventType } from "@/data/events";
import styles from "./Events.module.css";

// Props interface — accepts external data or falls back to sample data
interface EventsProps {
  events?: Event[];
}

type FilterTab = "all" | EventStatus | EventType;

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Events" },
  { id: "upcoming", label: "Upcoming" },
  { id: "featured", label: "Featured" },
  { id: "past", label: "Past" },
];

const EVENT_TYPE_CONFIG: Record<
  EventType,
  { label: string; badgeClass: string }
> = {
  workshop:   { label: "Workshop",    badgeClass: "badge-blue"   },
  hackathon:  { label: "Hackathon",   badgeClass: "badge-red"    },
  talk:       { label: "Tech Talk",   badgeClass: "badge-green"  },
  community:  { label: "Community",   badgeClass: "badge-yellow" },
  "study-jam": { label: "Study Jam",  badgeClass: "badge-blue"   },
};

const STATUS_CONFIG: Record<EventStatus, { label: string; color: string }> = {
  upcoming: { label: "Upcoming", color: "var(--google-green)" },
  featured: { label: "Featured", color: "var(--google-blue)"  },
  past:     { label: "Past",     color: "var(--gray-600)"     },
};

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EventCard({ event }: { event: Event }) {
  const typeConfig = EVENT_TYPE_CONFIG[event.type];
  const statusConfig = STATUS_CONFIG[event.status];
  const isPast = event.status === "past";

  return (
    <article className={`card ${styles.eventCard} ${isPast ? styles.pastCard : ""}`} id={`event-${event.id}`}>
      {/* Card image area */}
      <div className={styles.cardImageArea}>
        <div
          className={styles.cardImagePlaceholder}
          style={{
            background: `linear-gradient(135deg, ${
              event.type === "hackathon"  ? "var(--google-red), #ff8a65" :
              event.type === "workshop"  ? "var(--google-blue), #64b5f6" :
              event.type === "talk"      ? "var(--google-green), #66bb6a" :
              event.type === "study-jam" ? "var(--google-blue), var(--google-green)" :
              "var(--google-yellow), var(--google-red)"
            })`,
          }}
          aria-hidden="true"
        >
          <span className={styles.cardImageIcon}>
            {event.type === "hackathon"  ? "⚡" :
             event.type === "workshop"   ? "🛠️" :
             event.type === "talk"       ? "🎤" :
             event.type === "study-jam"  ? "📚" : "🌐"}
          </span>
        </div>
        {/* Status pill */}
        <div
          className={styles.statusPill}
          style={{ background: statusConfig.color }}
          aria-label={`Status: ${statusConfig.label}`}
        >
          {statusConfig.label}
        </div>
      </div>

      {/* Card content */}
      <div className={styles.cardContent}>
        {/* Type + date */}
        <div className={styles.cardMeta}>
          <span className={`badge ${typeConfig.badgeClass}`}>
            {typeConfig.label}
          </span>
          <time
            dateTime={event.date}
            className={styles.cardDate}
          >
            {formatEventDate(event.date)}
          </time>
        </div>

        <h3 className={styles.cardTitle}>{event.title}</h3>
        <p className={styles.cardDesc}>{event.description}</p>

        {/* Location */}
        <div className={styles.cardLocation}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>{event.location}</span>
        </div>

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className={styles.cardTags} role="list" aria-label="Event tags">
            {event.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag} role="listitem">{tag}</span>
            ))}
            {event.tags.length > 3 && (
              <span className={styles.tag}>+{event.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Attendees (past) */}
        {event.attendees && (
          <div className={styles.attendees}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <span>{event.attendees} attended</span>
          </div>
        )}

        {/* CTA */}
        <div className={styles.cardCta}>
          {event.registrationUrl && !isPast && (
            <a
              href={event.registrationUrl}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              id={`register-${event.id}`}
            >
              Register Now
            </a>
          )}
          {event.recapUrl && isPast && (
            <a
              href={event.recapUrl}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              id={`recap-${event.id}`}
            >
              View Recap
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Events({ events = SAMPLE_EVENTS }: EventsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return events;
    return events.filter(
      (e) => e.status === activeFilter || e.type === activeFilter
    );
  }, [events, activeFilter]);

  return (
    <section className={`section ${styles.events}`} id="events" aria-labelledby="events-heading">
      <div className="container">
        {/* Section header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Events</div>
          <h2 id="events-heading" className={styles.heading}>
            Where Learning Happens
          </h2>
          <p className={styles.subheading}>
            From intensive workshops to community hackathons — we host events that challenge, 
            inspire, and connect student developers across IIE.
          </p>
        </div>

        {/* Filter tabs */}
        <div className={styles.filterTabs} role="tablist" aria-label="Filter events">
          {FILTER_TABS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeFilter === id}
              className={`${styles.filterTab} ${activeFilter === id ? styles.activeTab : ""}`}
              onClick={() => setActiveFilter(id)}
              id={`filter-${id}`}
            >
              {label}
              {id !== "all" && (
                <span className={styles.filterCount}>
                  {events.filter((e) => e.status === id || e.type === id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Events grid */}
        {filteredEvents.length > 0 ? (
          <div
            className={styles.eventsGrid}
            role="tabpanel"
            aria-label={`${activeFilter} events`}
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📅</span>
            <p>No events found for this filter.</p>
          </div>
        )}

        {/* View all CTA */}
        <div className={styles.viewAll}>
          <p className={styles.viewAllText}>
            Want to stay updated on all upcoming events?
          </p>
          <a href="#contact" className="btn btn-secondary" id="events-notify-btn">
            Get Notified
          </a>
        </div>
      </div>
    </section>
  );
}
