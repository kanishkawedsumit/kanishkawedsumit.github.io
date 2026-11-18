interface ContactProps {
  config: {
    contacts: { name: string; phone: string }[];
  };
}

function WhatsAppMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L4 20.4l1.3-4a8.4 8.4 0 1 1 15.2-4.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8.3c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .6l-.5.6c.5 1 1.2 1.7 2.2 2.2l.7-.5c.2-.1.4-.1.6 0l1.6.7c.3.1.4.3.4.5v.5c0 .3-.2.6-.5.7-.7.3-1.5.3-2.2 0-2.7-1-4.8-3.1-5.8-5.8-.3-.7-.3-1.5 0-2.2Z" fill="currentColor" />
    </svg>
  );
}

export default function Contact({ config }: ContactProps) {
  if (!config.contacts?.length) return null;

  return (
    <section
      className="scene"
      aria-labelledby="contact-title"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(232,196,122,.18), transparent 40%), #6b1a2a',
        padding: '3.5rem 1.25rem',
      }}
    >
      <div style={{ maxWidth: '510px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: '78px', height: '1px', margin: '0 auto 1rem', background: 'linear-gradient(90deg, transparent, #e8c47a, transparent)' }} />
        <h2 id="contact-title" style={{ margin: 0, color: '#fff1bf', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 7vw, 2.75rem)', fontWeight: 600 }}>
          Connect With Us
        </h2>
        <p style={{ margin: '.45rem auto 1.6rem', color: '#f8e8c5', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', lineHeight: 1.5 }}>
          For any assistance, please send us a WhatsApp message.
        </p>
        <div style={{ borderTop: '1px solid rgba(232,196,122,.58)', borderBottom: '1px solid rgba(232,196,122,.58)' }}>
          {config.contacts.map((contact, index) => {
            const digits = contact.phone.replace(/\D/g, '');
            return (
              <a
                key={contact.phone}
                href={`https://wa.me/${digits}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Message ${contact.name} on WhatsApp`}
                style={{
                  minHeight: '74px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1rem .25rem',
                  textAlign: 'left',
                  textDecoration: 'none',
                  color: '#fff7e8',
                  borderBottom: index < config.contacts.length - 1 ? '1px solid rgba(232,196,122,.34)' : 'none',
                }}
              >
                <span>
                  <strong style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.28rem', fontWeight: 600 }}>{contact.name}</strong>
                  <span style={{ display: 'block', marginTop: '.13rem', color: '#edcf81', fontSize: '.86rem', letterSpacing: '.04em' }}>{contact.phone}</span>
                </span>
                <span style={{ width: '42px', height: '42px', flex: '0 0 42px', display: 'grid', placeItems: 'center', color: '#6b1a2a', background: '#f6d77e', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,.2)' }}>
                  <WhatsAppMark />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
