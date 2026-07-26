import { Link } from 'react-router-dom';

export default function Contact({ theme }) {
  const dk = theme === 'dark';

  const socials = [
    { name:'Instagram', handle:'@ciscovitb', href:'https://www.instagram.com/ciscovitb',
      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
      color:'rgba(131,58,180,0.15)' },
    { name:'LinkedIn', handle:'Cisco Community VITB', href:'https://www.linkedin.com/company/cisco-vit-bhopal?originalSubdomain=in',
      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
      color:'rgba(10,102,194,0.15)' },
    { name:'Email', handle:'cisco.vitb@vitbhopal.ac.in', href:'mailto:cisco.vitb@vitbhopal.ac.in',
      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      color:'rgba(74,58,186,0.15)' },
    { name:'Campus', handle:'VIT Bhopal, Sehore, MP', href:'https://maps.google.com/?q=VIT+Bhopal+University',
      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      color:'rgba(27,20,100,0.20)' },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <section className="page-hero sec-dark" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="sec-eyebrow">Contact</span>
          <h1 className="sec-title on-dk">Get in touch.</h1>
          <p className="sec-sub on-dk" style={{ margin: '12px auto 0' }}>
            For formal queries, use the feedback form. For everything else,
            reach us through the channels below.
          </p>
        </div>
      </section>

      {/* ── SOCIAL GRID ─────────────────────── */}
      <section className={dk ? 'sec-dark' : 'sec-light'}>
        <div className="container">
          <div className="sec-header">
            <span className="sec-eyebrow">Channels</span>
            <h2 className={`sec-title${dk ? ' on-dk' : ''}`}>Find us everywhere.</h2>
          </div>
          <div className="social-grid">
            {socials.map(s => (
              <a key={s.name} href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                className="social-card" style={{ '--accent-bg': s.color }}>
                <div className="soc-icon">{s.icon}</div>
                <h3 className="soc-name">{s.name}</h3>
                <p className="soc-handle">{s.handle}</p>
                <span className="soc-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFO STRIP ──────────────────────── */}
      <section className="sec-dark">
        <div className="container">
          <div className="info-strip">
            <div className="info-item">
              <span className="info-label">Club email</span>
              <span className="info-val"><a href="mailto:cisco.vitb@vitbhopal.ac.in">cisco.vitb@vitbhopal.ac.in</a></span>
            </div>
            <div className="info-div" />
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-val">VIT Bhopal University, Kothri Kalan, Sehore — 466114</span>
            </div>
            <div className="info-div" />
            <div className="info-item">
              <span className="info-label">Response time</span>
              <span className="info-val">Within 48 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────── */}
      <section className={dk ? 'sec-dark' : 'sec-light'}>
        <div className="container">
          <div className="cta-split">
            <div className="cta-text">
              <span className="sec-eyebrow">Formal queries</span>
              <h2 className={`sec-title${dk ? ' on-dk' : ''}`} style={{ marginBottom: 12 }}>
                Need a structured response?
              </h2>
              <p className={`sec-sub${dk ? ' on-dk' : ''}`} style={{ marginInline: 0 }}>
                Use our feedback form — submissions are tagged, routed, and
                responded to by the correct department lead.
              </p>
            </div>
            <Link to="/feedback" className="btn btn-primary" style={{ fontSize: 17, padding: '14px 32px' }}>Open Feedback Form</Link>
          </div>
        </div>
      </section>
    </>
  );
}
