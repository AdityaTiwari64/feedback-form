import { Link } from 'react-router-dom';

export default function Home({ theme }) {
  const dk = theme === 'dark';
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero">
        <div className="aurora">
          <div className="aurora-blob" />
          <div className="aurora-blob" />
          <div className="aurora-blob" />
          <div className="aurora-blob" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title">
            Your voice<br /><em>shapes our community.</em>
          </h1>
          <p className="hero-sub">
            Share queries, feedback, and suggestions directly with club leadership.
            Every response is reviewed by the relevant department head.
          </p>
          <div className="hero-btns">
            <Link to="/feedback" className="btn btn-primary">Submit Feedback</Link>
            <Link to="/about" className="btn btn-outline">About the Club</Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className={dk ? 'sec-dark' : 'sec-light'}>
        <div className="container">
          <div className="sec-header">
            <span className="sec-eyebrow">Why it matters</span>
            <h2 className={`sec-title${dk ? ' on-dk' : ''}`}>Built on member input.</h2>
            <p className={`sec-sub${dk ? ' on-dk' : ''}`}>
              Every submission is structured, routed, and actioned.
            </p>
          </div>
          <div className="feature-grid">
            {[
              { icon:'msg',   t:'Heard directly',   b:'Every submission routes to the correct department automatically.' },
              { icon:'check', t:'Acted upon',       b:'Department leads review all queries within 48 hours.' },
              { icon:'clock', t:'Always open',      b:'Submit any time — technical, events, or membership issues.' },
              { icon:'lock',  t:'Private & direct', b:'Responses go to a secure Google Sheet — no middleman.' },
            ].map(f => (
              <div key={f.t} className="feature-card">
                <div className="f-icon">
                  {f.icon==='msg'   && <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                  {f.icon==='check' && <svg viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
                  {f.icon==='clock' && <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                  {f.icon==='lock'  && <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                </div>
                <h3 className="f-title">{f.t}</h3>
                <p className="f-body">{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ────────────────────────────────────── */}
      <section className="sec-dark">
        <div className="container">
          <div className="sec-header">
            <span className="sec-eyebrow">Process</span>
            <h2 className="sec-title on-dk">How it works.</h2>
          </div>
          <div className="steps-grid">
            {[
              { n:'01', t:'Fill the form',   b:'Nine structured questions covering your query, satisfaction, and availability.' },
              { n:'02', t:'Instant logging', b:'Your response is submitted directly to Google — no account needed.' },
              { n:'03', t:'Routed correctly',b:'Each submission is tagged by department and assigned to the right lead.' },
              { n:'04', t:'Follow-up',       b:'You hear back via your chosen contact method within 48 hours.' },
            ].map(s => (
              <div key={s.n} className="step-card">
                <span className="step-num">{s.n}</span>
                <h3 className="step-title">{s.t}</h3>
                <p className="step-body">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className={dk ? 'sec-dark' : 'sec-light'}>
        <div className="container">
          <div className="cta-split">
            <div className="cta-text">
              <span className="sec-eyebrow">Ready?</span>
              <h2 className={`sec-title${dk ? ' on-dk' : ''}`} style={{ marginBottom: 12 }}>
                It takes under two minutes.
              </h2>
              <p className={`sec-sub${dk ? ' on-dk' : ''}`} style={{ marginInline: 0 }}>
                Nine structured questions. Submissions go directly to the Cisco Community VITB team.
              </p>
            </div>
            <Link to="/feedback" className="btn btn-primary" style={{ fontSize: 17, padding: '14px 32px' }}>Open the Form</Link>
          </div>
        </div>
      </section>
    </>
  );
}
