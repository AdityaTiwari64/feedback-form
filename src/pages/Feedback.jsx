import { useState, useRef } from 'react';

/* ── Google Form wiring — DO NOT MODIFY ─────────────────────────── */
const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScYiR8HQJiRDySHvxhQoyvSvJCX0e6ccNoa_i7hdvxRyCJayw/formResponse';
const ENTRY = {
  fullName:'entry.1194075951', regNumber:'entry.1069166524', department:'entry.84755719',
  queryNature:'entry.1796633368', queryDetails:'entry.434690552', satisfaction:'entry.2078131148',
  volunteering:'entry.123885434', contactMethod:'entry.735302602',
  avail6pm:'entry.18899239', avail9pm:'entry.1325897487',
};
/* ─────────────────────────────────────────────────────────────────── */

const DEPTS = ['Technical','Events and Management','Creative and Design','Public Relations','General Membership','Finance','Other'];
const NATURES = ['General Information Request','Feedback/Complaint','Event Participation','Membership/Subscription Issue','Collaboration Proposal','Other'];
const CONTACTS = ['Email','Phone Call','WhatsApp/Messaging','Not required'];
const VOLS = ['Yes, absolutely','Maybe later','No, thank you'];
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const SAT_LABELS = { 1:'Very Dissatisfied', 2:'Dissatisfied', 3:'Neutral', 4:'Satisfied', 5:'Very Satisfied' };

const STEPS = [
  { id:'personal',    title:'Personal Information',     num:'01' },
  { id:'department',  title:'Department or Wing',       num:'02' },
  { id:'nature',      title:'Nature of Query',          num:'03' },
  { id:'details',     title:'Query Details',            num:'04' },
  { id:'satisfaction', title:'Overall Satisfaction',     num:'05' },
  { id:'volunteering', title:'Volunteering Interest',   num:'06' },
  { id:'contact',     title:'Preferred Contact Method', num:'07' },
  { id:'availability', title:'Availability',            num:'08' },
];

/* Reusable UI */
function PillCheck({ label, active, onClick }) {
  return (
    <label className={`pill-card${active ? ' is-active' : ''}`} onClick={onClick}>
      <span className="pill-check"><svg viewBox="0 0 9 8"><polyline points="1,4 3.5,7 8,1"/></svg></span>
      {label}
    </label>
  );
}
function PillRadio({ label, active, onClick }) {
  return (
    <label className={`pill-card${active ? ' is-active' : ''}`} onClick={onClick}>
      <span className="pill-radio"><span className="pill-radio-dot" /></span>
      {label}
    </label>
  );
}
function AvailCb({ on, onClick }) {
  return (
    <span className={`avail-cb${on ? ' on' : ''}`} onClick={onClick} role="checkbox" aria-checked={on} tabIndex={0}>
      <svg viewBox="0 0 10 8"><polyline points="1,4 3.5,7 9,1"/></svg>
    </span>
  );
}

export default function Feedback({ theme }) {
  const iframeRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1); // 1=forward, -1=back (for slide direction)
  const [error, setError] = useState('');

  const [f, setF] = useState({
    fullName:'', regNumber:'', departments:[], queryNature:'',
    queryDetails:'', satisfaction:3, volunteering:'', contactMethods:[],
    avail6pm:[], avail9pm:[],
  });

  const set = (k,v) => setF(p => ({...p,[k]:v}));
  const tog = (k,v) => setF(p => ({...p,[k]:p[k].includes(v)?p[k].filter(x=>x!==v):[...p[k],v]}));

  /* Step validation */
  const validateStep = (s) => {
    switch(s) {
      case 0: return f.fullName.trim() && f.regNumber.trim() ? '' : 'Please fill in both fields.';
      case 1: return f.departments.length ? '' : 'Select at least one department.';
      case 2: return f.queryNature ? '' : 'Please select the nature of your query.';
      case 3: return f.queryDetails.trim().length >= 10 ? '' : 'Please provide at least 10 characters.';
      case 4: return f.satisfaction ? '' : 'Please rate your satisfaction.';
      case 5: return f.volunteering ? '' : 'Please select one option.';
      case 6: return f.contactMethods.length ? '' : 'Select at least one contact method.';
      default: return '';
    }
  };

  const goTo = (target) => {
    // Allow going back freely; validate going forward
    if (target > step) {
      const err = validateStep(step);
      if (err) { setError(err); return; }
    }
    setError('');
    setDir(target > step ? 1 : -1);
    setStep(target);
  };

  const next = () => {
    const err = validateStep(step);
    if (err) { setError(err); return; }
    setError('');
    if (step < STEPS.length - 1) { setDir(1); setStep(step + 1); }
  };
  const back = () => { setError(''); setDir(-1); setStep(Math.max(0, step - 1)); };

  /* Submit */
  const handleSubmit = () => {
    // Validate step 6 (last required)
    if (step === 6) {
      const err = validateStep(6);
      if (err) { setError(err); return; }
    }
    setError('');
    setSubmitting(true);
    const p = new URLSearchParams();
    p.append(ENTRY.fullName,f.fullName.trim());
    p.append(ENTRY.regNumber,f.regNumber.trim());
    f.departments.forEach(d=>p.append(ENTRY.department,d));
    p.append(ENTRY.queryNature,f.queryNature);
    p.append(ENTRY.queryDetails,f.queryDetails.trim());
    p.append(ENTRY.satisfaction,String(f.satisfaction));
    p.append(ENTRY.volunteering,f.volunteering);
    f.contactMethods.forEach(c=>p.append(ENTRY.contactMethod,c));
    f.avail6pm.forEach(d=>p.append(ENTRY.avail6pm,d));
    f.avail9pm.forEach(d=>p.append(ENTRY.avail9pm,d));
    const iframe = iframeRef.current;
    const fb = setTimeout(()=>{setSubmitting(false);setSubmitted(true)},4500);
    iframe.onload=()=>{clearTimeout(fb);setSubmitting(false);setSubmitted(true)};
    iframe.onerror=()=>{clearTimeout(fb);setSubmitting(false);setSubmitted(true)};
    iframe.src=`${FORM_ACTION}?${p.toString()}`;
  };

  const reset = () => {
    setSubmitted(false); setStep(0); setError('');
    setF({fullName:'',regNumber:'',departments:[],queryNature:'',queryDetails:'',satisfaction:3,volunteering:'',contactMethods:[],avail6pm:[],avail9pm:[]});
  };

  const pct = ((f.satisfaction - 1) / 4 * 100).toFixed(0) + '%';
  const isLast = step === STEPS.length - 1;
  const isLastRequired = step === 6; // availability is optional, so 7 is the last step

  /* Completed steps count for progress */
  const completedSteps = [
    f.fullName.trim() && f.regNumber.trim(),
    f.departments.length > 0,
    !!f.queryNature,
    f.queryDetails.trim().length >= 10,
    !!f.satisfaction,
    !!f.volunteering,
    f.contactMethods.length > 0,
    true, // availability always optional
  ].filter(Boolean).length;

  return (
    <div className="feedback-page" data-theme={theme}>
      <iframe ref={iframeRef} name="gf" title="form" style={{display:'none'}} />
      <div className="container">

        {submitted ? (
          <div className="success-wrap">
            <div className="success-mark"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
            <h2 className="success-title">Response submitted.</h2>
            <p className="success-body">Thank you for your feedback. The team will review and follow up via your preferred contact method.</p>
            <button className="btn-submit" onClick={reset} style={{margin:'0 auto'}}>
              <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
              Submit another
            </button>
          </div>
        ) : (
          <div className="wizard">

            {/* Step indicator dots */}
            <div className="wizard-dots">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`wizard-dot${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}
                  onClick={() => goTo(i)}
                  title={s.title}
                >
                  <span className="wizard-dot-num">{s.num}</span>
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="wizard-progress">
              <div className="wizard-progress-fill" style={{width:`${(completedSteps / STEPS.length) * 100}%`}} />
            </div>

            {/* Step title */}
            <div className="wizard-header">
              <span className="wizard-step-label">Step {step + 1} of {STEPS.length}</span>
              <h2 className="wizard-title">{STEPS[step].title}</h2>
            </div>

            {/* Slide container */}
            <div className="wizard-slide-wrap">
              <div
                className="wizard-slide"
                key={step}
                style={{ animation: `slide-${dir > 0 ? 'in-right' : 'in-left'} 0.35s var(--ease) both` }}
              >

                {/* STEP 0: Personal */}
                {step === 0 && (
                  <div className="wizard-card">
                    <div className="personal-grid">
                      <div>
                        <label className="field-label">Full Name<span className="field-req">*</span></label>
                        <input type="text" className="form-input" placeholder="Your full name" autoComplete="name" autoFocus
                          value={f.fullName} onChange={e=>set('fullName',e.target.value)} />
                      </div>
                      <div>
                        <label className="field-label">Registration Number<span className="field-req">*</span></label>
                        <input type="text" className="form-input" placeholder="e.g. 22BCE1234"
                          value={f.regNumber} onChange={e=>set('regNumber',e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: Department */}
                {step === 1 && (
                  <div className="wizard-card">
                    <p className="wizard-desc">Select all departments your query relates to.</p>
                    <div className="pill-grid-3" style={{marginTop:20}}>
                      {DEPTS.map(d=><PillCheck key={d} label={d} active={f.departments.includes(d)} onClick={()=>tog('departments',d)} />)}
                    </div>
                  </div>
                )}

                {/* STEP 2: Nature */}
                {step === 2 && (
                  <div className="wizard-card">
                    <p className="wizard-desc">What is the nature of your query?</p>
                    <div className="pill-grid-2" style={{marginTop:20}}>
                      {NATURES.map(n=><PillRadio key={n} label={n} active={f.queryNature===n} onClick={()=>set('queryNature',n)} />)}
                    </div>
                  </div>
                )}

                {/* STEP 3: Details */}
                {step === 3 && (
                  <div className="wizard-card">
                    <p className="wizard-desc">Describe your query or feedback in detail.</p>
                    <textarea className="form-textarea" style={{marginTop:20}}
                      placeholder="Be specific — include context, dates, or names if relevant..."
                      rows={6} value={f.queryDetails} onChange={e=>set('queryDetails',e.target.value)} autoFocus />
                  </div>
                )}

                {/* STEP 4: Satisfaction */}
                {step === 4 && (
                  <div className="wizard-card">
                    <p className="wizard-desc">How satisfied have you been with the club's activities?</p>
                    <div className="slider-wrap" style={{marginTop:24}}>
                      <div className="slider-labels"><span>Very Dissatisfied</span><span>Very Satisfied</span></div>
                      <input type="range" className="range-input" min={1} max={5} step={1}
                        value={f.satisfaction} style={{'--pct':pct}}
                        onChange={e=>set('satisfaction',Number(e.target.value))} />
                      <div className="slider-ticks">
                        {[1,2,3,4,5].map(n=><span key={n} className={`slider-tick${f.satisfaction===n?' is-active':''}`}>{n}</span>)}
                      </div>
                      <p className="slider-value">{SAT_LABELS[f.satisfaction]}</p>
                    </div>
                  </div>
                )}

                {/* STEP 5: Volunteering */}
                {step === 5 && (
                  <div className="wizard-card">
                    <p className="wizard-desc">Are you interested in volunteering for upcoming events?</p>
                    <div className="pill-row" style={{marginTop:24}}>
                      {VOLS.map(o=><PillRadio key={o} label={o} active={f.volunteering===o} onClick={()=>set('volunteering',o)} />)}
                    </div>
                  </div>
                )}

                {/* STEP 6: Contact */}
                {step === 6 && (
                  <div className="wizard-card">
                    <p className="wizard-desc">How should we follow up with you?</p>
                    <div className="pill-grid-2" style={{marginTop:20}}>
                      {CONTACTS.map(m=><PillCheck key={m} label={m} active={f.contactMethods.includes(m)} onClick={()=>tog('contactMethods',m)} />)}
                    </div>
                  </div>
                )}

                {/* STEP 7: Availability */}
                {step === 7 && (
                  <div className="wizard-card">
                    <p className="wizard-desc">Which days work for club meetings? This is optional.</p>
                    <div className="avail-table-wrap" style={{marginTop:20}}>
                      <table className="avail-table">
                        <thead><tr><th>Day</th><th>6:00 – 7:00 PM</th><th>9:15 – 10:00 PM</th></tr></thead>
                        <tbody>
                          {DAYS.map(d=>(
                            <tr key={d}>
                              <td>{d}</td>
                              <td><AvailCb on={f.avail6pm.includes(d)} onClick={()=>tog('avail6pm',d)} /></td>
                              <td><AvailCb on={f.avail9pm.includes(d)} onClick={()=>tog('avail9pm',d)} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>{/* wizard-slide */}
            </div>{/* wizard-slide-wrap */}

            {/* Error */}
            {error && <p className="wizard-error">{error}</p>}

            {/* Nav buttons */}
            <div className="wizard-nav">
              <button type="button" className="wizard-btn wizard-btn-back" onClick={back} disabled={step === 0}>
                <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                Back
              </button>

              {isLast ? (
                <button type="button" className="btn-submit" onClick={handleSubmit} disabled={submitting}>
                  {submitting
                    ? <><svg className="spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="32" strokeDashoffset="12"/></svg>Submitting...</>
                    : <><svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Submit Feedback</>
                  }
                </button>
              ) : isLastRequired && step === 6 ? (
                /* After last required step, show both Next and Submit */
                <div style={{display:'flex',gap:10}}>
                  <button type="button" className="wizard-btn wizard-btn-next" onClick={next}>
                    Next <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              ) : (
                <button type="button" className="wizard-btn wizard-btn-next" onClick={next}>
                  Next <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              )}
            </div>

            <p className="wizard-footnote">Responses go directly to Google Forms.</p>

          </div>
        )}
      </div>
    </div>
  );
}
