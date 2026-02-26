import { Target, Eye, Users, Award, Heart, ArrowRight, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const teamPhoto = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg";
const communityService = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755328575/IMG_2630_lfgtit.jpg";

const milestones = [
  { year: '2021', event: 'Foundation Laid', description: 'Established under Rotary International District 3201, sponsored by Rotary Club of Coimbatore Central.', tag: 'ORIGIN' },
  { year: '2022', event: 'First Steps', description: 'Began operations as a vibrant youth-led organization at KPR College of Arts Science and Research.', tag: 'LAUNCH' },
  { year: '2023', event: 'Building Momentum', description: 'Launched impactful service projects and awareness drives, fostering community engagement.', tag: 'GROWTH' },
  { year: '2024', event: 'Leadership Development', description: 'Strengthened fellowship programs and leadership initiatives, empowering young leaders.', tag: 'SCALE' },
  { year: '2025', event: '5th Rotaract Year', description: 'Entering 5th year as a reviving force with renewed passion and "Fellowship through Service".', tag: 'NOW' },
];

const values = [
  { icon: Heart, title: 'Service Above Self', description: 'We prioritize community service and making a positive impact in the lives of others.' },
  { icon: Users, title: 'Fellowship', description: 'Building lasting friendships and professional relationships through shared experiences.' },
  { icon: Award, title: 'Excellence', description: 'Striving for excellence in all projects and personal development initiatives.' },
  { icon: Target, title: 'Integrity', description: 'Maintaining the highest ethical standards in all our actions and decisions.' },
];

const stats = [
  { value: '5+', label: 'Years Active' },
  { value: '100+', label: 'Members' },
  { value: '50+', label: 'Projects' },
  { value: '1K+', label: 'Lives Impacted' },
];

export default function About() {
  const [marqueeX, setMarqueeX] = useState(0);
  const rafRef = useRef<number>(0);
  const marqRef = useRef(0);

  useEffect(() => {
    document.title = 'About | Rotaract Club of KPRCAS';

    const animMarquee = () => {
      marqRef.current -= 0.5;
      setMarqueeX(marqRef.current);
      rafRef.current = requestAnimationFrame(animMarquee);
    };
    rafRef.current = requestAnimationFrame(animMarquee);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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

        .ab-root {
          background: var(--paper);
          color: var(--ink);
          font-family: 'Fragment Mono', monospace;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ── EDITION BAR ── */
        .ab-edition {
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

        /* ── PAGE HERO ── */
        .ab-hero {
          display: grid;
          grid-template-columns: 1fr 2.5fr 1fr;
          border-bottom: 3px solid var(--ink);
          min-height: 60vh;
        }

        .ab-hero-left {
          border-right: 1px solid var(--border);
          padding: 48px 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .ab-hero-section-tag {
          font-size: 9px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--red);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          align-self: center;
        }

        .ab-hero-year-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ab-year-chip {
          font-family: 'Unbounded', sans-serif;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border: 1px solid var(--border);
          text-align: center;
          transition: all 0.2s ease;
          cursor: default;
        }

        .ab-year-chip:hover {
          background: var(--ink);
          color: var(--lime);
          border-color: var(--ink);
        }

        /* Center hero */
        .ab-hero-center {
          position: relative;
          overflow: hidden;
        }

        .ab-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
          filter: saturate(0.65) contrast(1.1);
          display: block;
          transition: filter 0.5s ease, transform 8s ease;
        }

        .ab-hero-center:hover .ab-hero-img {
          filter: saturate(0.85);
          transform: scale(1.02);
        }

        .ab-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,13,15,0.88) 0%, rgba(13,13,15,0.2) 50%, transparent 100%);
        }

        .ab-hero-caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 48px 48px 36px;
        }

        .ab-hero-hl {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-size: clamp(36px, 5vw, 76px);
          line-height: 1.0;
          color: var(--paper);
          letter-spacing: -1px;
          margin-bottom: 12px;
        }

        .ab-hero-hl strong {
          font-style: normal;
          font-family: 'Unbounded', sans-serif;
          font-size: 0.5em;
          font-weight: 900;
          letter-spacing: -1px;
          display: block;
          color: var(--lime);
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .ab-hero-byline {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(242,239,232,0.45);
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .byline-dot {
          width: 4px; height: 4px;
          background: var(--red);
          border-radius: 50%;
        }

        /* Right sidebar */
        .ab-hero-right {
          border-left: 1px solid var(--border);
          padding: 40px 28px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sidebar-stat {
          padding: 20px 0;
          border-bottom: 1px solid var(--border);
          cursor: default;
        }

        .sidebar-stat:last-child { border-bottom: none; }

        .sidebar-stat-n {
          font-family: 'Unbounded', sans-serif;
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1;
          transition: color 0.2s ease;
        }

        .sidebar-stat:hover .sidebar-stat-n { color: var(--red); }

        .sidebar-stat-l {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 6px;
        }

        /* ── MARQUEE ── */
        .ab-marquee {
          overflow: hidden;
          border-bottom: 3px solid var(--ink);
          padding: 12px 0;
          background: var(--lime);
        }

        .marquee-track {
          display: flex;
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

        .marquee-star { color: var(--red); font-size: 16px; }

        /* ── STORY SECTION ── */
        .ab-story {
          display: grid;
          grid-template-columns: 1.5fr 1px 1fr;
          border-bottom: 3px solid var(--ink);
        }

        .ab-divider-v { background: var(--border); }

        .story-main {
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
          gap: 10px;
        }

        .section-label::before { content: '//'; opacity: 0.4; }

        .story-h2 {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(22px, 3.5vw, 42px);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.05;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 28px;
        }

        .story-h2 span { color: var(--red); }

        .story-img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          filter: saturate(0.6) contrast(1.1);
          display: block;
          margin-bottom: 28px;
          transition: filter 0.5s ease;
        }

        .story-img:hover { filter: saturate(0.85); }

        .story-body {
          font-size: 13px;
          line-height: 1.9;
          color: #4A4840;
          columns: 2;
          column-gap: 32px;
          margin-bottom: 36px;
        }

        .story-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
        }

        .story-tag {
          font-family: 'Fragment Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 14px;
          border: 1px solid var(--ink);
          transition: all 0.2s ease;
          cursor: default;
        }

        .story-tag:hover {
          background: var(--ink);
          color: var(--lime);
        }

        /* Mission / Vision sidebar */
        .story-sidebar {
          padding: 64px 40px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .mv-block {
          padding: 32px 0;
          border-bottom: 1px solid var(--border);
        }

        .mv-block:last-child { border-bottom: none; }

        .mv-label {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mv-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--red);
          opacity: 0.3;
        }

        .mv-title {
          font-family: 'Unbounded', sans-serif;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: -0.5px;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 12px;
        }

        .mv-text {
          font-size: 12px;
          line-height: 1.8;
          color: #4A4840;
        }

        .mv-quote {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-size: 16px;
          line-height: 1.6;
          color: var(--ink);
          margin-top: 16px;
          padding-left: 16px;
          border-left: 2px solid var(--red);
        }

        /* ── VALUES ── */
        .ab-values {
          border-bottom: 3px solid var(--ink);
        }

        .values-header {
          padding: 48px 56px 32px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid var(--border);
        }

        .values-h2 {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(20px, 3vw, 36px);
          font-weight: 900;
          letter-spacing: -1px;
          text-transform: uppercase;
          color: var(--ink);
        }

        .values-h2 span { color: var(--red); }

        .values-count {
          font-family: 'Unbounded', sans-serif;
          font-size: 48px;
          font-weight: 900;
          color: var(--border);
          letter-spacing: -2px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
        }

        .value-cell {
          background: var(--paper);
          padding: 40px 32px;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: background 0.3s ease;
        }

        .value-cell:hover { background: var(--ink); }

        .value-cell::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--red);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }

        .value-cell:hover::before { transform: scaleX(1); }

        .value-icon {
          width: 40px; height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          margin-bottom: 20px;
          color: var(--red);
          transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
        }

        .value-cell:hover .value-icon {
          border-color: var(--lime);
          background: transparent;
          color: var(--lime);
        }

        .value-title {
          font-family: 'Unbounded', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.3px;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 12px;
          transition: color 0.3s ease;
        }

        .value-cell:hover .value-title { color: var(--lime); }

        .value-desc {
          font-size: 12px;
          line-height: 1.7;
          color: var(--muted);
          transition: color 0.3s ease;
        }

        .value-cell:hover .value-desc { color: rgba(242,239,232,0.5); }

        .value-num {
          position: absolute;
          bottom: 16px;
          right: 20px;
          font-family: 'Unbounded', sans-serif;
          font-size: 48px;
          font-weight: 900;
          color: rgba(0,0,0,0.04);
          line-height: 1;
          transition: color 0.3s ease;
        }

        .value-cell:hover .value-num { color: rgba(255,255,255,0.04); }

        /* ── TIMELINE ── */
        .ab-timeline {
          background: var(--ink);
          border-bottom: 3px solid var(--lime);
        }

        .timeline-header {
          padding: 56px 56px 40px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .timeline-h2 {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(22px, 3.5vw, 44px);
          font-weight: 900;
          letter-spacing: -2px;
          text-transform: uppercase;
          color: var(--paper);
        }

        .timeline-h2 span { color: var(--lime); }

        .timeline-meta {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(242,239,232,0.25);
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.05);
        }

        .timeline-cell {
          background: var(--ink);
          padding: 40px 32px;
          position: relative;
          cursor: default;
          transition: background 0.3s ease;
          overflow: hidden;
        }

        .timeline-cell:hover { background: #141416; }

        .timeline-cell::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--lime);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.23,1,0.32,1);
        }

        .timeline-cell:hover::after { transform: scaleX(1); }

        .tl-tag {
          font-size: 8px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 14px;
          display: block;
        }

        .tl-year {
          font-family: 'Unbounded', sans-serif;
          font-size: 40px;
          font-weight: 900;
          letter-spacing: -2px;
          color: var(--paper);
          line-height: 1;
          margin-bottom: 12px;
          transition: color 0.3s ease;
        }

        .timeline-cell:hover .tl-year { color: var(--lime); }

        .tl-event {
          font-family: 'Unbounded', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.3px;
          color: rgba(242,239,232,0.8);
          margin-bottom: 12px;
        }

        .tl-desc {
          font-size: 11px;
          line-height: 1.7;
          color: rgba(242,239,232,0.35);
          transition: color 0.3s ease;
        }

        .timeline-cell:hover .tl-desc { color: rgba(242,239,232,0.6); }

        .tl-num {
          position: absolute;
          bottom: -10px;
          right: 16px;
          font-family: 'Unbounded', sans-serif;
          font-size: 80px;
          font-weight: 900;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
        }

        /* ── CTA ── */
        .ab-cta {
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

        .cta-bg-word {
          position: absolute;
          right: -20px; bottom: -50px;
          font-family: 'Unbounded', sans-serif;
          font-size: 180px;
          font-weight: 900;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          letter-spacing: -8px;
          text-transform: uppercase;
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
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        .cta-h2 strong {
          font-style: normal;
          font-family: 'Unbounded', sans-serif;
          font-size: 0.55em;
          font-weight: 900;
          display: block;
          color: var(--lime);
          letter-spacing: -1px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .cta-body {
          font-size: 13px;
          line-height: 1.8;
          color: rgba(242,239,232,0.4);
          max-width: 380px;
          margin-bottom: 40px;
        }

        .cta-btn-row { display: flex; gap: 12px; flex-wrap: wrap; }

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

        .nx-btn-lime:hover { background: var(--paper); transform: translateY(-2px); }

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

        .nx-btn-ghost-paper:hover { border-color: var(--lime); color: var(--lime); }

        .cta-right {
          background: var(--lime);
          padding: 72px 56px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cta-right-bg {
          position: absolute;
          left: -20px; bottom: -50px;
          font-family: 'Unbounded', sans-serif;
          font-size: 180px;
          font-weight: 900;
          color: rgba(0,0,0,0.04);
          line-height: 1;
          pointer-events: none;
          letter-spacing: -8px;
          text-transform: uppercase;
        }

        .cta-right-label {
          font-size: 9px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(13,13,15,0.5);
          margin-bottom: 28px;
        }

        .cta-motto {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--ink);
          letter-spacing: -1px;
          margin-bottom: 32px;
        }

        .cta-meta {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cta-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(13,13,15,0.15);
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .cta-meta-key { color: rgba(13,13,15,0.5); }
        .cta-meta-val { font-weight: 700; color: var(--ink); }

        /* ── FOOTER ── */
        .ab-footer-cells {
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
          margin-bottom: 14px;
        }

        .footer-cell-val {
          font-family: 'Unbounded', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--ink);
          line-height: 1.8;
        }

        .ab-footer-bottom {
          padding: 20px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-bottom-text {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ab-masthead { grid-template-columns: 1fr auto; padding: 0 24px; }
          .masthead-right { display: none; }
          .ab-hero { grid-template-columns: 1fr; }
          .ab-hero-left { display: none; }
          .ab-hero-right { border-left: none; border-top: 1px solid var(--border); flex-direction: row; flex-wrap: wrap; padding: 24px; gap: 0; }
          .sidebar-stat { flex: 1; min-width: 80px; border-bottom: none; border-right: 1px solid var(--border); padding: 16px 12px; }
          .sidebar-stat:last-child { border-right: none; }
          .ab-story { grid-template-columns: 1fr; }
          .ab-divider-v { display: none; }
          .story-body { columns: 1; }
          .story-main { padding: 48px 28px; }
          .story-sidebar { padding: 48px 28px; border-top: 3px solid var(--ink); }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
          .values-header { padding: 40px 28px 24px; }
          .timeline-grid { grid-template-columns: 1fr; }
          .timeline-header { padding: 48px 28px 32px; }
          .ab-cta { grid-template-columns: 1fr; }
          .cta-left { padding: 56px 28px; }
          .cta-right { padding: 48px 28px; }
          .ab-footer-cells { grid-template-columns: repeat(2, 1fr); }
          .ab-footer-bottom { padding: 16px 24px; flex-direction: column; gap: 8px; text-align: center; }
          .ab-edition { padding: 8px 24px; }
          .ab-marquee { display: none; }
        }
      `}</style>

      <div className="ab-root">

        {/* ── EDITION BAR ── */}
        <div className="ab-edition mt-20 md:mt-24">
          <span>Youth · Leadership · Service · Fellowship</span>
          <span>Empowering Youth Since 2021</span>
        </div>


        {/* ── PAGE HERO ── */}
        <div className="ab-hero">
          {/* Left: rotated label + year chips */}
          <div className="ab-hero-left">
            <span className="ab-hero-section-tag">About the Club</span>
            <div className="ab-hero-year-stack">
              {['2021', '2022', '2023', '2024', '2025'].map(y => (
                <div key={y} className="ab-year-chip">{y}</div>
              ))}
            </div>
          </div>

          {/* Center: full hero image */}
          <div className="ab-hero-center">
            <img src={teamPhoto} alt="Rotaract KPRCAS Team" className="ab-hero-img" style={{ minHeight: '480px' }} />
            <div className="ab-hero-overlay" />
            <div className="ab-hero-caption">
              <h1 className="ab-hero-hl">
                <strong>More than a club.</strong>
                A movement<br />that serves.
              </h1>
              <div className="ab-hero-byline">
                <span className="byline-dot" />
                Est. 2021
                <span className="byline-dot" />
                5th Rotaract Year
                <span className="byline-dot" />
                District 3206
              </div>
            </div>
          </div>

          {/* Right: stats */}
          <div className="ab-hero-right">
            {stats.map(s => (
              <div key={s.label} className="sidebar-stat">
                <div className="sidebar-stat-n">{s.value}</div>
                <div className="sidebar-stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MARQUEE ── */}
        <div className="ab-marquee">
          <div
            className="marquee-track"
            style={{ transform: `translateX(${marqueeX % -1200}px)` }}
          >
            {[...Array(12)].map((_, i) => (
              <span key={i} className="marquee-item">
                Fellowship Through Service
                <span className="marquee-star">★</span>
                Rotaract KPRCAS
                <span className="marquee-star">★</span>
                Est. 2021
                <span className="marquee-star">★</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── STORY ── */}
        <div className="ab-story">
          <div className="story-main">
            <div className="section-label">Our Story</div>
            <h2 className="story-h2">
              Building Leaders,<br /><span>Serving</span> Communities
            </h2>
            <img src={communityService} alt="Community Service" className="story-img" />
            <p className="story-body">
              The Rotaract Club of KPRCAS was established in <strong>2021</strong> under Rotary International District 3201, sponsored by the Rotary Club of Coimbatore Central — a vibrant youth-led organization at KPR College of Arts Science and Research.
              <br /><br />
              Despite being a young club, it has shown remarkable energy and dedication as a reviving force, now entering its <strong>5th Rotaract year</strong> with renewed passion. From impactful service projects and awareness drives to enriching fellowships and leadership programs, the club fosters personal development and community impact.
            </p>
            <div className="story-tags">
              {['Service', 'Leadership', 'Diversity', 'Integrity', 'Fellowship', 'Youth'].map(t => (
                <span key={t} className="story-tag">{t}</span>
              ))}
            </div>
            <Link to="/join" className="nx-btn-lime" style={{ display: 'inline-flex' }}>
              Join the Movement <ChevronRight size={14} />
            </Link>
          </div>

          <div className="ab-divider-v" />

          {/* Mission / Vision */}
          <div className="story-sidebar">
            <div className="mv-block">
              <div className="mv-label">Mission</div>
              <div className="mv-title">What We Do</div>
              <p className="mv-text">
                To empower students to grow as socially responsible leaders through service, leadership, diversity, integrity, and fellowship — creating positive change in our communities.
              </p>
            </div>
            <div className="mv-block">
              <div className="mv-label">Vision</div>
              <div className="mv-title">Where We're Going</div>
              <p className="mv-text">
                To be a movement driven by the belief that small actions spark big change — fostering personal development and community impact through impactful service and leadership programs.
              </p>
            </div>
            <div className="mv-block">
              <div className="mv-label">Motto</div>
              <div className="mv-title">Our Guiding Words</div>
              <div className="mv-quote">
                "Fellowship through Service"
              </div>
            </div>
            <div className="mv-block">
              <div className="mv-label">Quick Facts</div>
              <div style={{ fontFamily: 'Fragment Mono', fontSize: 11, lineHeight: 2.2, color: '#4A4840' }}>
                Founded: 2021<br />
                District: 3206<br />
                Sponsor: RC Coimbatore Central<br />
                Zone: Tamil Nadu, India<br />
                Category: Youth Service<br />
                Meetings: Every Saturday
              </div>
            </div>
          </div>
        </div>

        {/* ── VALUES ── */}
        <div className="ab-values">
          <div className="values-header">
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>Core Values</div>
              <h2 className="values-h2">
                The principles that<br /><span>guide us</span>
              </h2>
            </div>
            <div className="values-count">04</div>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} className="value-cell">
                <div className="value-icon"><v.icon size={18} /></div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.description}</div>
                <div className="value-num">{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TIMELINE ── */}
        <div className="ab-timeline">
          <div className="timeline-header">
            <div>
              <div style={{ fontSize: 9, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(200,255,0,0.5)', marginBottom: 12 }}>// Journey</div>
              <h2 className="timeline-h2">Our <span>Milestones</span></h2>
            </div>
            <div className="timeline-meta">2021 → 2025</div>
          </div>
          <div className="timeline-grid">
            {milestones.map((m, i) => (
              <div key={m.year} className="timeline-cell">
                <span className="tl-tag">{m.tag}</span>
                <div className="tl-year">{m.year}</div>
                <div className="tl-event">{m.event}</div>
                <div className="tl-desc">{m.description}</div>
                <div className="tl-num">{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="ab-cta">
          <div className="cta-left">
            <div className="cta-bg-word">JOIN</div>
            <div className="cta-eyebrow">// Get Involved</div>
            <h2 className="cta-h2">
              <strong>Join Our Movement.</strong>
              Be part of<br />something bigger.
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
            <div className="cta-right-bg">SERVE</div>
            <div className="cta-right-label">// Club Motto</div>
            <div className="cta-motto">
              "Fellowship<br />through<br />Service"
            </div>
            <div className="cta-meta">
              {[
                { k: 'Founded', v: '2021' },
                { k: 'District', v: 'RID 3206' },
                { k: 'Members', v: '100+' },
                { k: 'Projects', v: '50+' },
                { k: 'Impact', v: '1,000+ Lives' },
              ].map(r => (
                <div key={r.k} className="cta-meta-row">
                  <span className="cta-meta-key">{r.k}</span>
                  <span className="cta-meta-val">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER CELLS ── */}
        <div className="ab-footer-cells">
          {[
            { l: 'Club', v: 'Rotaract Club\nof KPRCAS' },
            { l: 'District', v: 'Rotary International\nDistrict 3206' },
            { l: 'Location', v: 'Coimbatore\nTamil Nadu, India' },
            { l: 'Charter Year', v: '2021–2022\nEst. 5 years ago' },
          ].map(c => (
            <div key={c.l} className="footer-cell">
              <div className="footer-cell-label">{c.l}</div>
              <div className="footer-cell-val" style={{ whiteSpace: 'pre-line' }}>{c.v}</div>
            </div>
          ))}
        </div>

        <div className="ab-footer-bottom">
          <div className="footer-bottom-text">© 2025 · All Rights Reserved</div>
          <div className="footer-bottom-text">Rotaract Club of KPRCAS</div>
        </div>
      </div>
    </>
  );
}