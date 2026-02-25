import { useEffect, useState, useRef } from 'react';
import { Users, Calendar, Award, ArrowRight, Heart, Target, Eye, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroBanner = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/hero-banner_sqahw4.jpg";
const communityService = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755328575/IMG_2630_lfgtit.jpg";
const rotaryLogos = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/Rotary_Logo_UFG_Azure_poxpg1.png";
const kprLogo = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/kprcas_cheoab.png";
const clubLogo = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/club-logo_wsjsmp.png";

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [marqueeX, setMarqueeX] = useState(0);
  const rafRef = useRef<number>(0);
  const marqRef = useRef(0);

  useEffect(() => {
    document.title = 'Rotaract Club of KPRCAS | Youth Leadership & Service';

    const animMarquee = () => {
      marqRef.current -= 0.6;
      setMarqueeX(marqRef.current);
      rafRef.current = requestAnimationFrame(animMarquee);
    };
    rafRef.current = requestAnimationFrame(animMarquee);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stats = [
    { n: '40+', l: 'Members' },
    { n: '50+', l: 'Events' },
    { n: '25+', l: 'Awards' },
    { n: '1K+', l: 'Impacted' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&family=Unbounded:wght@300;400;500;700;900&family=Instrument+Serif:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #0D0D0F;
          --paper: #F2EFE8;
          --red: #E8192C;
          --lime: #C8FF00;
          --muted: #8A8680;
          --border: #D4D0C8;
        }

        .nx-root {
          background: var(--paper);
          color: var(--ink);
          font-family: 'Fragment Mono', monospace;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ── EDITION BAR ── */
        .nx-edition {
          background: var(--ink);
          color: var(--paper);
          padding: 8px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .edition-tag {
          background: var(--red);
          color: white;
          padding: 3px 10px;
          font-size: 9px;
          letter-spacing: 2px;
        }

        /* ── HERO GRID ── */
        .nx-hero {
          display: grid;
          grid-template-columns: 1fr 3fr 1.2fr;
          grid-template-rows: auto auto;
          border-bottom: 3px solid var(--ink);
          min-height: 80vh;
        }

        /* Column 1: vertical stats */
        .hero-col-1 {
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 32px;
        }

        .hero-stat-item {
          border-bottom: 1px solid var(--border);
          padding: 20px 0;
        }

        .hero-stat-item:last-child { border-bottom: none; }

        .hero-stat-n {
          font-family: 'Unbounded', sans-serif;
          font-size: 36px;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1;
          color: var(--ink);
          transition: color 0.2s ease;
        }

        .hero-stat-item:hover .hero-stat-n { color: var(--red); }

        .hero-stat-l {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 6px;
        }

        /* Column 2: main feature */
        .hero-col-2 {
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .hero-img-wrap {
          position: relative;
          flex: 1;
          overflow: hidden;
          min-height: 440px;
        }

        .hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 20%;
          filter: saturate(0.7) contrast(1.1);
          transition: filter 0.5s ease, transform 8s ease;
        }

        .nx-hero:hover .hero-img {
          transform: scale(1.03);
          filter: saturate(0.85) contrast(1.05);
        }

        .hero-img-caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(13,13,15,0.85) 0%, transparent 100%);
          padding: 48px 40px 28px;
        }

        .hero-hl {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-size: clamp(32px, 5vw, 72px);
          line-height: 1.0;
          color: var(--paper);
          letter-spacing: -1px;
          margin-bottom: 12px;
        }

        .hero-hl strong {
          font-style: normal;
          font-family: 'Unbounded', sans-serif;
          font-size: 0.55em;
          font-weight: 900;
          letter-spacing: -1px;
          display: block;
          color: var(--lime);
          margin-bottom: 4px;
        }

        .hero-byline {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(242,239,232,0.5);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .byline-dot {
          width: 4px; height: 4px;
          background: var(--red);
          border-radius: 50%;
          display: inline-block;
        }

        .hero-text-block {
          padding: 28px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          border-top: 1px solid var(--border);
        }

        .hero-desc {
          font-size: 13px;
          line-height: 1.8;
          color: #4A4840;
        }

        .hero-cta-area {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: flex-end;
        }

        .nx-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: var(--ink);
          color: var(--paper);
          font-family: 'Fragment Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          transition: background 0.25s ease;
          gap: 12px;
        }

        .nx-btn-primary:hover { background: var(--red); }

        .nx-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          background: transparent;
          color: var(--ink);
          font-family: 'Fragment Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid var(--ink);
          transition: all 0.25s ease;
          gap: 12px;
        }

        .nx-btn-outline:hover {
          background: var(--ink);
          color: var(--paper);
        }

        /* Column 3: sidebar */
        .hero-col-3 {
          display: flex;
          flex-direction: column;
        }

        .sidebar-block {
          padding: 32px 28px;
          border-bottom: 1px solid var(--border);
          flex: 1;
        }

        .sidebar-label {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sidebar-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--red);
          opacity: 0.3;
        }

        .sidebar-logo-row {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        .sidebar-logo {
          width: 100%;
          max-height: 44px;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.55;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        .sidebar-logo:hover { opacity: 1; filter: grayscale(0); }

        .sidebar-sep { width: 100%; height: 1px; background: var(--border); }

        .sidebar-vision {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-size: 16px;
          line-height: 1.6;
          color: var(--ink);
          margin-bottom: 16px;
        }

        .sidebar-meta {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          line-height: 1.8;
        }

        /* ── MARQUEE ── */
        .nx-marquee {
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 3px solid var(--ink);
          padding: 12px 0;
          background: var(--lime);
        }

        .marquee-track {
          display: flex;
          gap: 0;
          white-space: nowrap;
          will-change: transform;
        }

        .marquee-item {
          font-family: 'Unbounded', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ink);
          padding: 0 48px;
          display: inline-flex;
          align-items: center;
          gap: 24px;
        }

        .marquee-star {
          color: var(--red);
          font-size: 16px;
        }

        /* ── CONTENT GRID ── */
        .nx-content {
          display: grid;
          grid-template-columns: 2fr 1px 1.2fr;
          border-bottom: 3px solid var(--ink);
        }

        .nx-divider-v {
          background: var(--border);
        }

        /* About */
        .about-section {
          padding: 64px 56px;
        }

        .section-label {
          font-size: 9px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-label::before {
          content: '//';
          opacity: 0.4;
        }

        .about-h2 {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(24px, 3.5vw, 44px);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.05;
          color: var(--ink);
          margin-bottom: 28px;
          text-transform: uppercase;
        }

        .about-h2 span {
          color: var(--red);
          font-style: normal;
        }

        .about-img-inline {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          filter: saturate(0.6) contrast(1.1);
          margin-bottom: 28px;
          display: block;
          transition: filter 0.5s ease;
        }

        .about-img-inline:hover { filter: saturate(0.9) contrast(1.05); }

        .about-body {
          font-size: 13px;
          line-height: 1.9;
          color: #4A4840;
          margin-bottom: 36px;
          columns: 2;
          gap: 32px;
        }

        .about-pillars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border);
          margin-bottom: 36px;
        }

        .pillar-cell {
          background: var(--paper);
          padding: 20px;
          transition: background 0.3s ease;
          cursor: default;
        }

        .pillar-cell:hover { background: var(--ink); }

        .pillar-cell:hover .pillar-t { color: var(--lime); }
        .pillar-cell:hover .pillar-d { color: rgba(242,239,232,0.5); }

        .pillar-t {
          font-family: 'Fragment Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }

        .pillar-d {
          font-size: 12px;
          line-height: 1.6;
          color: #4A4840;
          transition: color 0.3s ease;
        }

        /* Features sidebar */
        .features-section {
          padding: 64px 40px;
        }

        .feat-card {
          border: 1px solid var(--border);
          padding: 28px 24px;
          margin-bottom: 16px;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s ease;
        }

        .feat-card:hover { border-color: var(--ink); }

        .feat-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--red);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }

        .feat-card:hover::before { transform: scaleY(1); }

        .feat-num {
          font-family: 'Unbounded', sans-serif;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
          color: var(--muted);
          margin-bottom: 12px;
        }

        .feat-title {
          font-family: 'Unbounded', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--ink);
          margin-bottom: 10px;
          transition: color 0.3s ease;
          text-transform: uppercase;
        }

        .feat-card:hover .feat-title { color: var(--red); }

        .feat-desc {
          font-size: 12px;
          line-height: 1.7;
          color: var(--muted);
        }

        /* ── CTA ── */
        .nx-cta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 3px solid var(--ink);
        }

        .cta-left {
          background: var(--ink);
          padding: 72px 56px;
          position: relative;
          overflow: hidden;
        }

        .cta-bg-num {
          position: absolute;
          right: -20px; bottom: -40px;
          font-family: 'Unbounded', sans-serif;
          font-size: 200px;
          font-weight: 900;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
          letter-spacing: -10px;
        }

        .cta-eyebrow {
          font-size: 9px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--lime);
          margin-bottom: 28px;
        }

        .cta-h2 {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-size: clamp(32px, 4vw, 56px);
          line-height: 1.1;
          color: var(--paper);
          margin-bottom: 20px;
          letter-spacing: -1px;
        }

        .cta-h2 strong {
          font-style: normal;
          font-family: 'Unbounded', sans-serif;
          font-size: 0.6em;
          font-weight: 900;
          display: block;
          color: var(--lime);
          letter-spacing: -1px;
          text-transform: uppercase;
        }

        .cta-body {
          font-size: 13px;
          line-height: 1.8;
          color: rgba(242,239,232,0.45);
          margin-bottom: 40px;
          max-width: 380px;
        }

        .cta-btn-row {
          display: flex;
          gap: 12px;
        }

        .nx-btn-lime {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          background: var(--lime);
          color: var(--ink);
          font-family: 'Fragment Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.25s ease;
        }

        .nx-btn-lime:hover {
          background: var(--paper);
          transform: translateY(-2px);
        }

        .nx-btn-ghost-paper {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          background: transparent;
          color: rgba(242,239,232,0.5);
          font-family: 'Fragment Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(242,239,232,0.15);
          transition: all 0.25s ease;
        }

        .nx-btn-ghost-paper:hover {
          border-color: var(--lime);
          color: var(--lime);
        }

        .cta-right {
          padding: 72px 56px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--paper);
        }

        .cta-right-stat {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .cta-stat-row {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }

        .cta-stat-num {
          font-family: 'Unbounded', sans-serif;
          font-size: 40px;
          font-weight: 900;
          letter-spacing: -2px;
          color: var(--ink);
          line-height: 1;
          transition: color 0.3s ease;
        }

        .cta-stat-row:hover .cta-stat-num { color: var(--red); }

        .cta-stat-info { }

        .cta-stat-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
        }

        .cta-right-bottom {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ── FOOTER ── */
        .nx-footer {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border-bottom: 3px solid var(--ink);
        }

        .footer-cell {
          background: var(--paper);
          padding: 36px 32px;
        }

        .footer-cell-label {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 16px;
        }

        .footer-cell-val {
          font-family: 'Unbounded', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--ink);
          line-height: 1.6;
        }

        .footer-bottom {
          padding: 20px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: none;
        }

        .footer-bottom-left {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
        }

        .footer-bottom-right {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .nx-masthead { grid-template-columns: 1fr auto; padding: 0 24px; }
          .masthead-right { display: none; }
          .nx-hero { grid-template-columns: 1fr; grid-template-rows: auto; }
          .hero-col-1 { flex-direction: row; gap: 0; border-right: none; border-bottom: 1px solid var(--border); }
          .hero-stat-item { flex: 1; border-bottom: none; border-right: 1px solid var(--border); padding: 20px 16px; }
          .hero-stat-item:last-child { border-right: none; }
          .hero-col-3 { display: none; }
          .hero-col-2 { border-right: none; }
          .hero-text-block { grid-template-columns: 1fr; gap: 20px; padding: 24px; }
          .nx-edition { padding: 8px 24px; }
          .nx-content { grid-template-columns: 1fr; }
          .nx-divider-v { display: none; }
          .about-body { columns: 1; }
          .about-section { padding: 48px 28px; }
          .features-section { padding: 48px 28px; border-top: 3px solid var(--ink); }
          .nx-cta { grid-template-columns: 1fr; }
          .cta-left { padding: 56px 28px; }
          .cta-right { padding: 48px 28px; }
          .nx-footer { grid-template-columns: repeat(2, 1fr); }
          .footer-bottom { padding: 16px 24px; flex-direction: column; gap: 8px; text-align: center; }
          .nx-marquee { display: none; }
        }
      `}</style>

      <div className="nx-root">

        {/* ── EDITION BAR ── */}
        <div className="nx-edition mt-16 md:mt-20">
          <span>Youth · Leadership · Service · Fellowship</span>
          <span className="edition-tag">● Live</span>
          <span>Empowering Youth Since 2019</span>
        </div>

        {/* ── HERO GRID ── */}
        <div className="nx-hero">
          {/* Col 1: stats */}
          <div className="hero-col-1">
            {[{ n: '40+', l: 'Members' }, { n: '50+', l: 'Events' }, { n: '25+', l: 'Awards' }, { n: '1K+', l: 'Impacted' }].map(s => (
              <div key={s.l} className="hero-stat-item">
                <div className="hero-stat-n">{s.n}</div>
                <div className="hero-stat-l">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Col 2: main */}
          <div className="hero-col-2">
            <div className="hero-img-wrap">
              <img src={heroBanner} alt="Rotaract KPRCAS" className="hero-img" />
              <div className="hero-img-caption">
                <h1 className="hero-hl">
                  <strong>Serve. Lead.</strong>
                  Youth that<br />changes the world.
                </h1>
                <div className="hero-byline">
                  <span className="byline-dot" />
                  Rotaract Club of KPRCAS
                  <span className="byline-dot" />
                  District 3206
                  <span className="byline-dot" />
                  Est. 2019
                </div>
              </div>
            </div>
            <div className="hero-text-block">
              <p className="hero-desc">
                Empowering the next generation through service, leadership, and fellowship. We are a vibrant community of young leaders dedicated to creating real, lasting impact — one project at a time.
              </p>
              <div className="hero-cta-area">
                <Link to="/join" className="nx-btn-primary">
                  Join Our Club <ChevronRight size={14} />
                </Link>
                <Link to="/events" className="nx-btn-outline">
                  View Events <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Col 3: sidebar */}
          <div className="hero-col-3">
            <div className="sidebar-block">
              <div className="sidebar-label">Affiliated With</div>
              <div className="sidebar-logo-row">
                <img src={rotaryLogos} alt="Rotary" className="sidebar-logo" />
                <div className="sidebar-sep" />
                <img src={clubLogo} alt="Club" className="sidebar-logo" />
                <div className="sidebar-sep" />
                <img src={kprLogo} alt="KPR" className="sidebar-logo" />
              </div>
            </div>
            <div className="sidebar-block" style={{ flex: 1 }}>
              <div className="sidebar-label">Our Vision</div>
              <p className="sidebar-vision">
                "Creating leaders who serve with purpose and inspire those around them."
              </p>
              <div className="sidebar-meta">
                District: 3206<br />
                Zone: Tamil Nadu<br />
                Charter Year: 2019–20<br />
                Category: Youth Service
              </div>
            </div>
          </div>
        </div>

        {/* ── MARQUEE ── */}
        <div className="nx-marquee">
          <div
            className="marquee-track"
            style={{ transform: `translateX(${marqueeX % -1200}px)` }}
          >
            {[...Array(12)].map((_, i) => (
              <span key={i} className="marquee-item">
                Leadership <span className="marquee-star">★</span>
                Service <span className="marquee-star">★</span>
                Fellowship <span className="marquee-star">★</span>
                Impact <span className="marquee-star">★</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="nx-content">
          {/* About */}
          <div className="about-section">
            <div className="section-label">About the Club</div>
            <h2 className="about-h2">
              Building Leaders,<br /><span>Serving</span> Communities
            </h2>
            <img src={communityService} alt="Community Service" className="about-img-inline" />
            <p className="about-body">
              The Rotaract Club of KPRCAS is more than a student organization — it is a movement. Founded in 2019, we have grown into a powerhouse of youth-driven service, professional development, and leadership excellence. Our members go beyond campus boundaries to create measurable change.
              <br /><br />
              From blood donation drives and educational outreach to district-level events and international fellowship exchanges, every initiative we undertake is guided by Rotary's core values: service above self.
            </p>
            <div className="about-pillars">
              <div className="pillar-cell">
                <div className="pillar-t">Vision</div>
                <div className="pillar-d">Leaders who serve with purpose and inspire lasting change.</div>
              </div>
              <div className="pillar-cell">
                <div className="pillar-t">Mission</div>
                <div className="pillar-d">Empower youth through service, leadership & fellowship.</div>
              </div>
            </div>
            <Link to="/about" className="nx-btn-primary" style={{ display: 'inline-flex' }}>
              Read Full Story <ChevronRight size={14} />
            </Link>
          </div>

          <div className="nx-divider-v" />

          {/* Features */}
          <div className="features-section">
            <div className="section-label">Why Join Rotaract?</div>

            {[
              { n: '01', t: 'Leadership Development', d: 'Forge real-world skills through workshops, live challenges & peer mentorship programs.' },
              { n: '02', t: 'Community Service', d: 'Drive change locally — blood drives, education camps, environment & health initiatives.' },
              { n: '03', t: 'Professional Network', d: 'Connect with students, industry professionals & Rotary leaders across the globe.' },
            ].map(f => (
              <div key={f.n} className="feat-card">
                <div className="feat-num">{f.n}</div>
                <div className="feat-title">{f.t}</div>
                <div className="feat-desc">{f.d}</div>
              </div>
            ))}

            <div style={{ marginTop: 32, padding: '24px', background: 'var(--ink)', color: 'var(--paper)' }}>
              <div style={{ fontFamily: 'Fragment Mono', fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--lime)', marginBottom: 12 }}>
                Quick Facts
              </div>
              <div style={{ fontFamily: 'Fragment Mono', fontSize: 11, lineHeight: 2, color: 'rgba(242,239,232,0.55)' }}>
                Founded: 2019 · Members: 40+ · Events/yr: 15+<br />
                District: 3206 · Zone: Tamil Nadu, IN<br />
                Meetings: Every Saturday
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="nx-cta">
          <div className="cta-left">
            <div className="cta-bg-num">NOW</div>
            <div className="cta-eyebrow">// Join Us Today</div>
            <h2 className="cta-h2">
              <strong>Make Your Mark.</strong>
              Ready to change<br />the world with us?
            </h2>
            <p className="cta-body">
              Become part of a movement that's already impacted thousands of lives. Your journey of leadership and service begins with a single step.
            </p>
            <div className="cta-btn-row">
              <Link to="/join" className="nx-btn-lime">
                Become a Member <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="nx-btn-ghost-paper">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="cta-right">
            <div className="cta-right-stat">
              {[
                { n: '40+', l: 'Active Members', sub: 'and growing every year' },
                { n: '50+', l: 'Events Organized', sub: 'across 6 years of operation' },
                { n: '1K+', l: 'Lives Impacted', sub: 'through community service' },
              ].map(s => (
                <div key={s.l} className="cta-stat-row">
                  <div className="cta-stat-num">{s.n}</div>
                  <div className="cta-stat-info">
                    <div className="cta-stat-label">{s.l}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cta-right-bottom">
              <Link to="/events" className="nx-btn-outline">
                View All Events <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── FOOTER CELLS ── */}
        <div className="nx-footer">
          {[
            { l: 'Club', v: 'Rotaract Club\nof KPRCAS' },
            { l: 'District', v: 'Rotary International\nDistrict 3206' },
            { l: 'Location', v: 'Coimbatore\nTamil Nadu, India' },
            { l: 'Charter Year', v: '2019–2020\nEst. 5+ years ago' },
          ].map(c => (
            <div key={c.l} className="footer-cell">
              <div className="footer-cell-label">{c.l}</div>
              <div className="footer-cell-val" style={{ whiteSpace: 'pre-line' }}>{c.v}</div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">© 2025 Rotaract Club of KPRCAS · All Rights Reserved</div>
          <div className="footer-bottom-right">Service Above Self</div>
        </div>
      </div>
    </>
  );
}