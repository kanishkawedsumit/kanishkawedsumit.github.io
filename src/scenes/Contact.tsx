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
        background: '#f6f1e6',
        padding: '2.35rem 1.25rem',
      }}
    >
      <div style={{ maxWidth: '510px', margin: '0 auto' }}>
        <h2 id="contact-title" style={{ margin: 0, color: '#6b1a2a', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 6vw, 2.25rem)', fontWeight: 600, textAlign: 'center' }}>
          Contact Information
        </h2>
        <p style={{ margin: '.3rem auto 1.35rem', color: '#70464e', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', lineHeight: 1.5, textAlign: 'center' }}>
          For any assistance, please contact us on WhatsApp.
        </p>
        <div style={{ borderTop: '1px solid #d7b568', borderBottom: '1px solid #d7b568' }}>
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
                  minHeight: '62px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '.7rem .1rem',
                  textAlign: 'left',
                  textDecoration: 'none',
                  color: '#4a0f1c',
                  borderBottom: index < config.contacts.length - 1 ? '1px solid #e5d4a7' : 'none',
                }}
              >
                <span>
                  <strong style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 600 }}>{contact.name}</strong>
                  <span style={{ display: 'block', marginTop: '.08rem', color: '#70464e', fontSize: '.94rem', letterSpacing: '.015em' }}>{contact.phone}</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', color: '#8c6119', fontSize: '.78rem', fontWeight: 700, letterSpacing: '.045em', textTransform: 'uppercase' }}>
                  <WhatsAppMark /> WhatsApp
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
