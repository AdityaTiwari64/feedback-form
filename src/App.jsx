import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import About from './pages/About';
import Contact from './pages/Contact';

function Navbar({ theme, onToggle }) {
  return (
    <nav className="navbar" data-theme={theme}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Cisco Community VITB" className="navbar-logo" />
        </Link>

        <div className="navbar-center">
          <ul className="navbar-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/feedback">Feedback</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        <div className="navbar-right">
          <button className="theme-btn" onClick={onToggle}
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
            {theme === 'dark'
              ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
          <Link to="/feedback" className="nav-cta">Feedback</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer({ theme }) {
  return (
    <footer className="footer" data-theme={theme}>
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.png" alt="" style={{ height: 26, opacity: 0.6 }} />
        </div>
        <p className="footer-text">&copy; {new Date().getFullYear()} Cisco Community VITB &mdash; VIT Bhopal University</p>
        <div className="footer-links">
          <Link to="/feedback">Feedback</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const getInit = () => {
    const s = localStorage.getItem('cisco-theme');
    if (s) return s;
    return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  };
  const [theme, setTheme] = useState(getInit);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cisco-theme', theme);
  }, [theme]);
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <Navbar theme={theme} onToggle={toggle} />
      <div className="page-wrapper" data-theme={theme}>
        <Routes>
          <Route path="/"         element={<Home    theme={theme} />} />
          <Route path="/feedback" element={<Feedback theme={theme} />} />
          <Route path="/about"    element={<About   theme={theme} />} />
          <Route path="/contact"  element={<Contact theme={theme} />} />
        </Routes>
        <Footer theme={theme} />
      </div>
    </Router>
  );
}
