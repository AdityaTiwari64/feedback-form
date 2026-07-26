export default function About({ theme }) {
  const dk = theme === 'dark';

  const wings = [
    { title:'Technical', desc:'Workshops, hackathons, and hands-on networking and cybersecurity projects.', icon:'code' },
    { title:'Events & Management', desc:'Plans and runs seminars, meetups, and guest lecture series year-round.', icon:'cal' },
    { title:'Creative & Design', desc:'Visual identity, branding, and creative content across all channels.', icon:'star' },
    { title:'Public Relations', desc:'Outreach, social presence, and collaborations with industry partners.', icon:'users' },
    { title:'Finance', desc:'Budgets, sponsorship acquisition, and transparent resource allocation.', icon:'coin' },
    { title:'General Membership', desc:'Onboarding, member support, and fostering a collaborative community.', icon:'heart' },
  ];

  const leadership = [
    { name:'Shubham', role:'President', dept:'Leadership', i:'SH' },
    { name:'Eesh Mishra', role:'Vice President', dept:'Leadership', i:'EM' },
    { name:'Siya Desai', role:'General Secretary', dept:'Leadership', i:'SD' },
    { name:'Priyam Prakash', role:'General Secretary', dept:'Leadership', i:'PP' },
    { name:'Aditya Tiwari', role:'Technical Lead', dept:'Technical', i:'AT' },
    { name:'Rudrika Trivedi', role:'PR Lead', dept:'Public Relations', i:'RT' },
  ];

  const icons = {
    code:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    cal:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    star:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    coin:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <section className="page-hero sec-dark" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="sec-eyebrow">About</span>
          <h1 className="sec-title on-dk">Cisco Community VITB</h1>
          <p className="sec-sub on-dk" style={{ margin: '12px auto 0' }}>
            A student-led technology community at VIT Bhopal University,
            bridging academia and industry through networking, cybersecurity,
            and cloud technology.
          </p>
          <div className="stat-chips">
            {[['6','Wings'],['30+','Active Members'],['2022','Founded'],['VIT','Bhopal']].map(([v,l]) => (
              <div key={l} className="stat-chip">
                <span className="stat-chip-v">{v}</span>
                <span className="stat-chip-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ─────────────────────────── */}
      <section className="sec-dark">
        <div className="container">
          <div className="mission-block">
            <div className="mission-text">
              <span className="sec-eyebrow">Mission</span>
              <h2 className="sec-title on-dk">Bridging academia<br />and industry.</h2>
              <p className="sec-sub on-dk" style={{ marginTop: 12, marginInline: 0 }}>
                We empower students with industry-relevant skills through certifications,
                collaborative projects, and a thriving peer community. Our goal is to close
                the gap between classroom theory and real-world application.
              </p>
            </div>
            <div className="mission-tags">
              {['Networking','Cybersecurity','Cloud','DevOps'].map((tag, i) => (
                <div key={tag} className="m-tag" style={{ '--i': i }}>
                  <span className="m-tag-dot" />{tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WINGS ───────────────────────────── */}
      <section className="sec-dark">
        <div className="container">
          <div className="sec-header">
            <span className="sec-eyebrow">Structure</span>
            <h2 className="sec-title on-dk">Six wings. One community.</h2>
          </div>
          <div className="wings-grid">
            {wings.map(w => (
              <div key={w.title} className="wing-card">
                <div className="w-icon">{icons[w.icon]}</div>
                <h3 className="w-title">{w.title}</h3>
                <p className="w-body">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ──────────────────────── */}
      <section className={dk ? 'sec-dark' : 'sec-light'}>
        <div className="container">
          <div className="sec-header">
            <span className="sec-eyebrow">Team</span>
            <h2 className={`sec-title${dk ? ' on-dk' : ''}`}>Club Leadership</h2>
            <p className={`sec-sub${dk ? ' on-dk' : ''}`}>The individuals driving Cisco Community VITB forward.</p>
          </div>
          <div className="leader-grid">
            {leadership.map(l => (
              <div key={l.name} className="leader-card">
                <div className="leader-av"><span>{l.i}</span></div>
                <h4 className="leader-name">{l.name}</h4>
                <p className="leader-role">{l.role}</p>
                <span className="leader-dept">{l.dept}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTOS ──────────────────────────── */}
      <section className="sec-dark">
        <div className="container">
          <div className="sec-header">
            <span className="sec-eyebrow">Community</span>
            <h2 className="sec-title on-dk">Life at Cisco VITB</h2>
          </div>
          <div className="photo-strip">
            {['Workshop Session','Hackathon 2024','Guest Lecture','Networking Event'].map(p => (
              <div key={p} className="photo-card">
                <div className="photo-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(165,156,255,0.5)" strokeWidth="1" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <span className="photo-lbl">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
