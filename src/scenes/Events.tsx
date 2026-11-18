import { useEffect, useRef } from 'react';
import { gsap } from '../lib/scroll';
import { getMapsUrl } from '../lib/maps';
import { asset } from '../lib/assets';

interface WeddingEvent {
  name: string;
  date: string;
  time?: string;
  venueName: string;
  address: string;
  mapsQuery: string;
}

interface EventsProps {
  config: {
    events: WeddingEvent[];
  };
}

/* ── Mehrab arch clip-path (pointed scalloped arch) ── */
export const ARCH_CLIP = `polygon(
  0% 100%, 0% 35%,
  2% 28%, 5% 22%, 10% 16%, 16% 11%,
  22% 7%, 30% 4%, 38% 2%, 44% 0.8%,
  50% 0%, 56% 0.8%, 62% 2%, 70% 4%,
  78% 7%, 84% 11%, 90% 16%, 95% 22%,
  98% 28%, 100% 35%, 100% 100%
)`;

/* ── Gold Floral Divider with lotus ── */
function GoldFloralDivider() {
  return (
    <div style={{ textAlign: 'center', padding: '1.55rem 0 .9rem' }}>
      <svg viewBox="0 0 330 48" width="min(80vw, 300px)" height="44" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
        <path d="M8 25H118M212 25H322" stroke="#d8ad54" strokeWidth="1.4" />
        <path d="M63 25c14-2 22-9 29-18M267 25c-14-2-22-9-29-18" stroke="#83925f" strokeWidth="1.1" fill="none" />
        <g fill="#db8d99"><ellipse cx="94" cy="8" rx="5" ry="8" transform="rotate(-28 94 8)"/><ellipse cx="105" cy="12" rx="5" ry="8" transform="rotate(26 105 12)"/><circle cx="100" cy="13" r="3" fill="#e8c47a"/></g>
        <g transform="translate(165 25)"><path d="M0-17C-8-7-15-4-17 2c7-3 12-3 17 2 5-5 10-5 17-2C15-4 8-7 0-17Z" fill="#d78993"/><path d="M0-11C-4-5-7-1-7 4c3-2 5-2 7 0 2-2 4-2 7 0 0-5-3-9-7-15Z" fill="#f1d48b"/><circle cy="3" r="3" fill="#c8963e"/></g>
        <g fill="#db8d99" transform="translate(130 0)"><ellipse cx="0" cy="8" rx="5" ry="8" transform="rotate(-28 0 8)"/><ellipse cx="11" cy="12" rx="5" ry="8" transform="rotate(26 11 12)"/><circle cx="6" cy="13" r="3" fill="#e8c47a"/></g>
        <g fill="#db8d99" transform="translate(225 0)"><ellipse cx="0" cy="8" rx="5" ry="8" transform="rotate(-28 0 8)"/><ellipse cx="11" cy="12" rx="5" ry="8" transform="rotate(26 11 12)"/><circle cx="6" cy="13" r="3" fill="#e8c47a"/></g>
      </svg>
    </div>
  );
}

/* ── Map Pin Icon ── */
function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a1f33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ── Scalloped Arch SVG overlay ── */
export function ArchOverlay() {
  return (
    <svg
      viewBox="0 0 300 120"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '120px',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      {/* Arch cutout — the visible area is the arch, outer is filled maroon */}
      <defs>
        <clipPath id="archClipSvg">
          <path d="M0,120 L0,70 Q0,0 150,0 Q300,0 300,70 L300,120 Z" />
        </clipPath>
      </defs>
      {/* Scalloped arch border */}
      <path
        d="M0,120 L0,70 Q0,0 150,0 Q300,0 300,70 L300,120"
        fill="none"
        stroke="#c8963e"
        strokeWidth="3"
      />
      {/* Small keystone decoration */}
      <circle cx="150" cy="10" r="6" fill="#c8963e" opacity="0.6" />
      <circle cx="150" cy="10" r="3" fill="#e8c47a" />
    </svg>
  );
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function CeremonyCrest({ name }: { name: string }) {
  const accent = name === 'Haldi' ? '#d7a33c' : name === 'Mehendi' ? '#668454' : '#8b3046';
  return (
    <svg viewBox="0 0 180 58" width="156" height="50" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <path d="M8 31 H58 M122 31 H172" stroke={accent} strokeWidth="1.2" opacity="0.65" />
      <path d="M30 31c9-12 18-11 25 0M150 31c-9-12-18-11-25 0" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.75" />
      <g fill={accent} opacity="0.9">
        <ellipse cx="90" cy="24" rx="8" ry="17" />
        <ellipse cx="90" cy="24" rx="8" ry="17" transform="rotate(45 90 24)" />
        <ellipse cx="90" cy="24" rx="8" ry="17" transform="rotate(-45 90 24)" />
        <circle cx="90" cy="24" r="5" fill="#f1d48b" />
        <circle cx="58" cy="31" r="3" /><circle cx="122" cy="31" r="3" />
      </g>
      <path d="M78 45 Q90 51 102 45" fill="none" stroke={accent} strokeWidth="1.3" opacity="0.7" />
    </svg>
  );
}

function ceremonyPanelPosition(name: string) {
  if (name === 'Haldi') return '0%';
  if (name === 'Mehendi') return '50%';
  return '100%';
}

/* ── Event Card ── */
function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <div
      className="event-card"
      style={{
        background: '#d3a54e',
        maskImage: `url('${asset('assets/mughal-gate-mask.svg')}')`,
        WebkitMaskImage: `url('${asset('assets/mughal-gate-mask.svg')}')`,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        overflow: 'hidden',
        width: '278px',
        height: '320px',
        margin: '0 auto',
        boxShadow: '0 8px 20px rgba(40,8,16,0.22)',
        position: 'relative',
        padding: '3px',
      }}
    >
      <div style={{
        background: '#fffaf0',
        maskImage: `url('${asset('assets/mughal-gate-mask.svg')}')`,
        WebkitMaskImage: `url('${asset('assets/mughal-gate-mask.svg')}')`,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        height: 'calc(100% - 6px)',
        width: 'calc(100% - 6px)',
        margin: '3px',
        position: 'relative',
        padding: '76px 18px 10px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          position: 'absolute',
          top: '31px', left: '12%', width: '76%', height: '104px',
          backgroundImage: `url('${asset('assets/event-ceremony-strip-cutout-v2.png')}')`,
          backgroundSize: '300% auto',
          backgroundPosition: `${ceremonyPanelPosition(event.name)} 50%`,
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }} />
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.45rem',
          fontWeight: 700,
          color: '#6b1a2a',
          textAlign: 'center',
          margin: '4.8rem 0 .4rem',
        }}>
          {event.name}
        </p>
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #d3a54e, transparent)',
          margin: '.2rem auto .75rem',
        }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '.6rem',
          marginBottom: '.7rem',
        }}>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '.98rem', fontWeight: 700, color: '#3a1a20', lineHeight: 1.1 }}>
              {event.venueName}
            </p>
            {event.address && (
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '.68rem', color: '#765f5d', lineHeight: 1.35, marginTop: '.18rem' }}>
                {event.address}
              </p>
            )}
          </div>
          <a
            href={getMapsUrl(event.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${event.venueName} in Google Maps`}
            title="Open in Google Maps"
            style={{ textDecoration: 'none', flexShrink: 0 }}
          >
            <span style={{
              width: '24px', height: '24px', flexShrink: 0, marginTop: '.05rem',
              display: 'grid', placeItems: 'center', borderRadius: '50%',
              border: '1px solid #d3a54e', background: '#fff7e4',
              boxShadow: '0 2px 5px rgba(107,26,42,0.12)',
            }}>
              <MapPinIcon />
            </span>
          </a>
        </div>
        <div style={{ marginTop: '.72rem', display: 'flex', justifyContent: event.time ? 'space-between' : 'center', alignItems: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '.76rem', fontWeight: 500, color: '#6b1a2a', lineHeight: 1.2, textAlign: event.time ? 'left' : 'center' }}>
            {formatDate(event.date)}
          </p>
          {event.time && (
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '.55rem', letterSpacing: '.04em', color: '#9a6a1e' }}>
              {event.time}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Events Component ── */
export default function Events({ config }: EventsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.event-card');
    if (cards.length === 0) return;

    // Animate cards rising in
    gsap.set(cards, { y: 80, opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        once: true,
      },
    });

    tl.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [config.events]);

  return (
    <section
      ref={sectionRef}
      className="scene"
      style={{
        background: '#7a1f33',
        backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(232,196,122,0.18), transparent 42%), radial-gradient(ellipse at 8% 74%, rgba(74,15,28,0.42), transparent 38%), radial-gradient(ellipse at 92% 74%, rgba(74,15,28,0.42), transparent 38%), url('${asset('assets/jaali-pattern.svg')}')`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto, auto, auto, 190px 190px',
        backgroundBlendMode: 'normal, normal, normal, overlay',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '1rem',
      }}
    >
      <style>{`
        .events-cards { display: flex; flex-direction: column; gap: 1.25rem; width: 100%; align-items: center; padding-bottom: 2rem; }
      `}</style>
      <GoldFloralDivider />

      <div style={{ textAlign: 'center', margin: '.25rem 0 1.65rem' }}>
        <h2 style={{
          display: 'inline-block',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.85rem',
          fontWeight: 700,
          fontStyle: 'italic',
          color: '#f6dfaa',
          textAlign: 'center',
          letterSpacing: '.02em',
          margin: 0,
          padding: '.32rem 3.3rem .48rem',
          border: '1px solid #d8ad54',
          outline: '1px solid rgba(246,223,170,.5)',
          outlineOffset: '5px',
          borderRadius: '8px',
          background: '#711c2e',
          boxShadow: '0 5px 13px rgba(35,5,13,.32)',
        }}>
          Ceremony
        </h2>
      </div>

      <div
        ref={cardsRef}
        className="events-cards"
      >
        {config.events.map((event, i) => (
          <EventCard
            key={i}
            event={event}
          />
        ))}
      </div>
    </section>
  );
}
