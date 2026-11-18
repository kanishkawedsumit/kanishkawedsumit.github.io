import { useEffect, useRef } from 'react';
import { gsap } from '../lib/scroll';

interface FamilyScrollProps {
  config: {
    groom: string;
    bride: string;
    families: {
      groomSide: { lines: string[] };
      brideSide: { lines: string[] };
    };
  };
}

function Rod() {
  return <div aria-hidden="true" style={{ height: 20, width: 'calc(100% + 24px)', marginLeft: -12, position: 'relative', borderRadius: 99, background: 'linear-gradient(180deg, #ad4264 0%, #851c3f 40%, #631025 70%, #9d3154 100%)', boxShadow: '0 3px 7px rgba(43,7,14,.28), inset 0 1px 2px rgba(255,190,207,.35)' }}>
    <i style={{ position: 'absolute', left: -9, top: 1, height: 18, width: 18, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #fff4bd, #d19a34 47%, #815019 75%)', boxShadow: '0 1px 3px rgba(43,7,14,.35)' }} />
    <i style={{ position: 'absolute', right: -9, top: 1, height: 18, width: 18, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #fff4bd, #d19a34 47%, #815019 75%)', boxShadow: '0 1px 3px rgba(43,7,14,.35)' }} />
  </div>;
}

function Ornament() {
  return <svg viewBox="0 0 140 30" width="118" height="25" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}><path d="M2 16h43m50 0h43" stroke="#e8c47a" strokeWidth=".8" opacity=".75" /><path d="M70 4c-6 8-6 14 0 20 6-6 6-12 0-20Zm0 6c-10 5-12 11-9 14 5-2 8-6 9-14Zm0 0c10 5 12 11 9 14-5-2-8-6-9-14Z" fill="#efb9c3" stroke="#e8c47a" strokeWidth=".7" /></svg>;
}

export function InvitationScroll({ title, lines, variant = 'family' }: { title: string; lines: string[]; variant?: 'family' | 'note' | 'compact' }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !sheetRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: cardRef.current, start: 'top 76%', toggleActions: 'play none none reverse' } });
      timeline.fromTo(sheetRef.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power2.inOut' });
      timeline.fromTo(contentRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .55, ease: 'power3.out' }, .48);
    }, cardRef);
    return () => ctx.revert();
  }, []);

  const compact = variant === 'compact';
  const sheetHeight = compact ? 280 : 435;
  const contentHeight = compact ? 232 : 386;

  return <article ref={cardRef} style={{ width: 'min(87%, 380px)', margin: `0 auto ${compact ? '1.15rem' : '3.8rem'}`, filter: 'drop-shadow(0 10px 11px rgba(72,30,25,.2))' }}>
    <Rod />
    <div ref={sheetRef} style={{ position: 'relative', margin: '-2px 0', minHeight: sheetHeight, padding: compact ? '1rem 1.5rem' : '1.35rem 2rem 1.25rem', overflow: 'hidden', background: 'linear-gradient(90deg, #511024, #6f1830 14%, #6b162d 86%, #511024)', borderLeft: '1px solid #d7a64e', borderRight: '1px solid #d7a64e', boxShadow: 'inset 0 0 28px rgba(18,0,6,.28)', willChange: 'clip-path' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 8, borderLeft: '1px solid rgba(232,196,122,.65)', borderRight: '1px solid rgba(232,196,122,.65)', pointerEvents: 'none' }} />
      <div ref={contentRef} style={{ position: 'relative', minHeight: contentHeight, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', textAlign: 'center', visibility: 'hidden' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.13rem, 5.2vw, 1.48rem)', lineHeight: 1.1, margin: 0, color: '#f4d795' }}>{title}</h2>
        {lines.map((line, index) => {
          const isRelation = line === 'Daughter of' || line === 'Granddaughter of' || line === 'Son of' || line === 'Grandson of';
          const isAmpersand = line === '&';
          const isNoteLead = variant === 'note' && index === 0;
          return <p key={`${line}-${index}`} style={{ margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif", color: isNoteLead ? '#f4d795' : isRelation ? '#efdba8' : '#fff3d6', fontSize: isNoteLead ? '1.08rem' : variant === 'note' ? '.78rem' : compact ? '.84rem' : isRelation ? '.73rem' : isAmpersand ? '.98rem' : '.88rem', fontStyle: isNoteLead ? 'italic' : 'normal', fontWeight: isNoteLead ? 600 : isRelation ? 600 : isAmpersand ? 500 : 700, letterSpacing: isNoteLead ? '.01em' : isRelation ? '.035em' : '.012em', lineHeight: variant === 'note' ? 1.35 : 1.24 }}>{line}</p>;
        })}
        <Ornament />
      </div>
    </div>
    <Rod />
  </article>;
}

export default function FamilyScroll({ config }: FamilyScrollProps) {
  return <section className="scene" style={{ minHeight: 'auto', padding: '4rem 1.25rem 1rem', background: '#f6f1e6', position: 'relative' }}>
    <InvitationScroll title={`Kum. ${config.bride}`} lines={config.families.brideSide.lines} />
    <InvitationScroll title={`Chi. ${config.groom}`} lines={config.families.groomSide.lines} />
  </section>;
}
