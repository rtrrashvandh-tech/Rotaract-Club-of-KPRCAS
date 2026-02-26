import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, X } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'rac@kprcas.ac.in',
    link: 'mailto:rac@kprcas.ac.in',
    code: '01',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+91 9629009396',
    link: 'tel:+919629009396',
    code: '02',
  },
  {
    icon: MapPin,
    title: 'Address',
    content: 'KPR College of Arts Science and Research, Arasur, Coimbatore - 641407',
    link: 'https://www.google.com/maps/place/KPR+College+of+Arts+Science+and+Research/@11.0805985,77.1329603,17z',
    code: '03',
  },
];

const socialLinks = [
  { icon: Instagram, name: 'Instagram', handle: '@rac_kprcas', url: 'https://www.instagram.com/rac_kprcas' },
  { icon: Linkedin, name: 'LinkedIn', handle: 'rotaract-club-of-kprcas', url: 'https://www.linkedin.com/company/rotaract-club-of-kprcas/' },
];

const faqs = [
  { q: 'How can I join the club?', a: 'Contact us through our social media channels or email us at rac@kprcas.ac.in to express your interest.' },
  { q: 'What activities do you offer?', a: 'Community service projects, leadership development programs, and social events throughout the year.' },
  { q: 'Is there a membership fee?', a: 'Yes, a nominal annual fee covers club activities, materials, and Rotary International registration.' },
  { q: 'Can I participate without joining?', a: 'You can attend public events and volunteer for some projects, but full participation requires membership.' },
];

const officeHours = [
  { day: 'Monday – Friday', time: '10:00 AM – 5:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 2:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export default function Contact() {
  const [marqueeX, setMarqueeX] = useState(0);
  const marqRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Contact | Rotaract KPRCAS';
    const anim = () => {
      marqRef.current -= 0.45;
      setMarqueeX(marqRef.current);
      rafRef.current = requestAnimationFrame(anim);
    };
    rafRef.current = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&family=Unbounded:wght@300;400;500;700;900&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #0D0D0F; --paper: #F2EFE8; --red: #E8192C;
          --lime: #C8FF00; --muted: #8A8680; --border: #D4D0C8;
        }

        .ct-root {
          background: var(--paper); color: var(--ink);
          font-family: 'Fragment Mono', monospace;
          overflow-x: hidden; min-height: 100vh;
          padding-top: 80px;
        }

        /* ── HERO ── */
        .ct-hero {
          display: grid; grid-template-columns: 1fr 1px 2fr 1px 1fr;
          border-bottom: 3px solid var(--ink); min-height: 46vh;
          position: relative; overflow: hidden;
        }
        .ct-hero-left {
          padding: 52px 40px; display: flex; flex-direction: column; justify-content: space-between;
        }
        .hero-eyebrow {
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: var(--red); margin-bottom: 20px; display: flex; align-items: center; gap: 10px;
        }
        .hero-eyebrow::before { content: '//'; opacity: 0.4; }
        .hero-h1 {
          font-family: 'Unbounded', sans-serif; font-size: clamp(36px,6vw,80px);
          font-weight: 900; letter-spacing: -3px; line-height: 0.92;
          text-transform: uppercase; color: var(--ink);
        }
        .hero-h1 .outline { -webkit-text-stroke: 1.5px var(--ink); color: transparent; }
        .hero-h1 .accent { color: var(--red); }

        .ct-hero-meta { margin-top: auto; display: flex; flex-direction: column; gap: 1px; background: var(--border); }
        .ct-meta-row {
          background: var(--paper); padding: 12px 14px;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          transition: background 0.3s;
        }
        .ct-meta-row:hover { background: var(--ink); }
        .ct-meta-k { color: var(--muted); transition: color 0.3s; }
        .ct-meta-row:hover .ct-meta-k { color: rgba(242,239,232,0.4); }
        .ct-meta-v { font-weight: 700; transition: color 0.3s; }
        .ct-meta-row:hover .ct-meta-v { color: var(--lime); }

        .ct-hero-div { background: var(--border); }

        /* Hero center: decorative type panel */
        .ct-hero-center {
          position: relative; overflow: hidden;
          background: var(--ink);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 48px;
        }
        .ct-center-bg {
          position: absolute; inset: 0;
          font-family: 'Unbounded', sans-serif; font-size: 220px; font-weight: 900;
          color: rgba(255,255,255,0.03); letter-spacing: -12px; text-transform: uppercase;
          line-height: 0.85; pointer-events: none; user-select: none;
          display: flex; align-items: center; overflow: hidden;
        }
        .ct-hero-hl {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: clamp(28px,4vw,56px); line-height: 1.05;
          color: var(--paper); letter-spacing: -0.5px; margin-bottom: 10px;
          position: relative; z-index: 2;
        }
        .ct-hero-hl strong {
          font-style: normal; font-family: 'Unbounded', sans-serif;
          font-size: 0.45em; font-weight: 900; letter-spacing: -1px;
          display: block; color: var(--lime); text-transform: uppercase; margin-bottom: 6px;
        }
        .ct-hero-byline {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(242,239,232,0.4); display: flex; align-items: center; gap: 12px;
          position: relative; z-index: 2;
        }
        .byline-dot { width: 4px; height: 4px; background: var(--red); border-radius: 50%; }

        /* Right sidebar */
        .ct-hero-right {
          padding: 40px 32px; display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .ct-hero-bg-word {
          position: absolute; right: -10px; bottom: -30px;
          font-family: 'Unbounded', sans-serif; font-size: 110px; font-weight: 900;
          color: rgba(13,13,15,0.04); line-height: 1; pointer-events: none;
          letter-spacing: -5px; text-transform: uppercase;
        }
        .ct-right-label { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
        .ct-right-motto {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: clamp(18px,2.5vw,28px); line-height: 1.35; color: var(--ink);
        }
        .ct-right-motto strong {
          font-style: normal; font-family: 'Unbounded', sans-serif; font-size: 0.45em;
          font-weight: 900; display: block; color: var(--red); letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .ct-hours { margin-top: auto; display: flex; flex-direction: column; gap: 1px; background: var(--border); }
        .ct-hour-row {
          background: var(--paper); padding: 10px 12px;
          display: flex; justify-content: space-between;
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          transition: background 0.3s;
        }
        .ct-hour-row:hover { background: var(--ink); }
        .ct-hour-d { color: var(--muted); transition: color 0.3s; }
        .ct-hour-row:hover .ct-hour-d { color: rgba(242,239,232,0.4); }
        .ct-hour-t { font-weight: 700; transition: color 0.3s; }
        .ct-hour-row:hover .ct-hour-t { color: var(--lime); }

        /* ── MARQUEE ── */
        .ct-marquee { overflow: hidden; border-bottom: 3px solid var(--ink); padding: 12px 0; background: var(--lime); }
        .marquee-track { display: flex; white-space: nowrap; will-change: transform; }
        .mq-item {
          font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; color: var(--ink);
          padding: 0 48px; display: inline-flex; align-items: center; gap: 24px;
        }
        .mq-star { color: var(--red); font-size: 16px; }

        /* ── CONTACT CARDS ── */
        .ct-cards-section { border-bottom: 3px solid var(--ink); }
        .ct-cards-hdr {
          padding: 32px 56px 20px; display: flex; justify-content: space-between; align-items: baseline;
          border-bottom: 1px solid var(--border);
        }
        .ct-sec-lbl {
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--red);
          display: flex; align-items: center; gap: 10px;
        }
        .ct-sec-lbl::before { content: '//'; opacity: 0.4; }
        .ct-sec-cnt {
          font-family: 'Unbounded', sans-serif; font-size: 36px; font-weight: 900;
          letter-spacing: -2px; color: var(--border);
        }

        .ct-cards-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border);
        }
        .ct-card {
          background: var(--paper); padding: 48px 40px;
          display: flex; flex-direction: column; gap: 20px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: background 0.3s ease;
          text-decoration: none; color: inherit;
        }
        .ct-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--red); transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .ct-card:hover::before { transform: scaleX(1); }
        .ct-card:hover { background: var(--ink); }
        .ct-card-num {
          font-family: 'Unbounded', sans-serif; font-size: 48px; font-weight: 900;
          letter-spacing: -3px; color: var(--border); line-height: 1;
          transition: color 0.3s;
        }
        .ct-card:hover .ct-card-num { color: rgba(255,255,255,0.08); }
        .ct-card-icon-wrap {
          width: 48px; height: 48px; background: var(--lime);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s, transform 0.3s;
        }
        .ct-card:hover .ct-card-icon-wrap { background: var(--red); transform: rotate(6deg); }
        .ct-card-icon { color: var(--ink); transition: color 0.3s; }
        .ct-card:hover .ct-card-icon { color: #fff; }
        .ct-card-title {
          font-family: 'Unbounded', sans-serif; font-size: 11px; font-weight: 900;
          letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
          transition: color 0.3s;
        }
        .ct-card:hover .ct-card-title { color: rgba(242,239,232,0.4); }
        .ct-card-content {
          font-size: 13px; line-height: 1.7; color: var(--ink);
          transition: color 0.3s;
        }
        .ct-card:hover .ct-card-content { color: var(--paper); }
        .ct-card-arrow {
          margin-top: auto; font-family: 'Unbounded', sans-serif; font-size: 20px;
          color: var(--border); transition: color 0.3s, transform 0.3s;
          display: inline-block;
        }
        .ct-card:hover .ct-card-arrow { color: var(--lime); transform: translate(4px, -4px); }

        /* ── MAP + SOCIAL ── */
        .ct-map-section {
          display: grid; grid-template-columns: 2fr 1px 1fr;
          border-bottom: 3px solid var(--ink); min-height: 400px;
        }
        .ct-map-wrap { position: relative; overflow: hidden; }
        .ct-map-wrap iframe { display: block; width: 100%; height: 100%; min-height: 400px; filter: grayscale(0.6) contrast(1.1); }
        .ct-map-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(135deg, rgba(13,13,15,0.15) 0%, transparent 60%);
        }
        .ct-map-tag {
          position: absolute; top: 20px; left: 20px;
          background: var(--ink); color: var(--lime);
          font-family: 'Unbounded', sans-serif; font-size: 9px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; padding: 8px 14px;
        }

        .ct-map-div { background: var(--border); }

        .ct-social-panel {
          background: var(--ink); padding: 48px 36px;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .ct-social-bg {
          position: absolute; right: -10px; bottom: -30px;
          font-family: 'Unbounded', sans-serif; font-size: 110px; font-weight: 900;
          color: rgba(255,255,255,0.025); line-height: 1; pointer-events: none; letter-spacing: -5px;
        }
        .ct-social-label { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--lime); margin-bottom: 8px; }
        .ct-social-title {
          font-family: 'Unbounded', sans-serif; font-size: clamp(20px,2.5vw,32px);
          font-weight: 900; letter-spacing: -2px; text-transform: uppercase;
          color: var(--paper); line-height: 1; margin-bottom: 32px;
        }
        .ct-social-links { display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.06); }
        .ct-social-link {
          display: flex; align-items: center; gap: 16px;
          padding: 16px 20px; background: rgba(13,13,15,0.6);
          text-decoration: none; transition: background 0.25s ease;
          position: relative; overflow: hidden;
        }
        .ct-social-link::after {
          content: '↗'; position: absolute; right: 16px;
          font-size: 16px; color: var(--lime); opacity: 0;
          transition: opacity 0.25s ease, transform 0.25s ease;
          transform: translate(-4px, 4px);
        }
        .ct-social-link:hover { background: rgba(200,255,0,0.08); }
        .ct-social-link:hover::after { opacity: 1; transform: translate(0, 0); }
        .ct-social-icon-wrap {
          width: 36px; height: 36px; background: rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: background 0.25s;
        }
        .ct-social-link:hover .ct-social-icon-wrap { background: var(--lime); }
        .ct-social-link:hover .ct-social-icon { color: var(--ink); }
        .ct-social-icon { color: rgba(242,239,232,0.5); transition: color 0.25s; }
        .ct-social-name {
          font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; color: var(--paper);
        }
        .ct-social-handle { font-size: 9px; letter-spacing: 2px; color: rgba(242,239,232,0.3); margin-top: 2px; }

        /* ── FAQ ── */
        .ct-faq-section { border-bottom: 3px solid var(--ink); }
        .ct-faq-hdr {
          padding: 32px 56px 20px; display: flex; justify-content: space-between; align-items: baseline;
          border-bottom: 1px solid var(--border);
        }
        .ct-faq-grid {
          display: grid; grid-template-columns: 1fr 1px 1fr;
          background: var(--border); gap: 1px;
        }
        .ct-faq-div { background: var(--border); }
        .ct-faq-col { display: flex; flex-direction: column; gap: 1px; background: var(--border); }
        .ct-faq-item {
          background: var(--paper); padding: 36px 40px; cursor: pointer;
          transition: background 0.25s ease; position: relative; overflow: hidden;
        }
        .ct-faq-item::before {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: var(--lime); transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .ct-faq-item.open { background: var(--ink); }
        .ct-faq-item.open::before { transform: scaleX(1); }
        .ct-faq-q-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
        .ct-faq-q {
          font-family: 'Unbounded', sans-serif; font-size: clamp(11px,1.2vw,14px);
          font-weight: 700; letter-spacing: -0.3px; text-transform: uppercase;
          color: var(--ink); line-height: 1.3; transition: color 0.25s;
        }
        .ct-faq-item.open .ct-faq-q { color: var(--paper); }
        .ct-faq-toggle {
          width: 28px; height: 28px; flex-shrink: 0; background: var(--lime);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Unbounded', sans-serif; font-size: 16px; font-weight: 900;
          color: var(--ink); transition: background 0.25s, transform 0.35s;
          line-height: 1;
        }
        .ct-faq-item.open .ct-faq-toggle { background: var(--red); color: #fff; transform: rotate(45deg); }
        .ct-faq-a {
          font-size: 11px; line-height: 1.8; color: rgba(242,239,232,0.5);
          margin-top: 16px; max-height: 0; overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .ct-faq-item.open .ct-faq-a { max-height: 200px; opacity: 1; }

        /* ── FOOTER ── */
        .ct-footer {
          padding: 20px 48px; display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid var(--border);
        }
        .footer-brand {
          font-family: 'Unbounded', sans-serif; font-size: 14px; font-weight: 900;
          letter-spacing: -0.5px; color: rgba(13,13,15,0.18); text-transform: uppercase;
        }
        .footer-note { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); opacity: 0.5; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ct-hero { grid-template-columns: 1fr; }
          .ct-hero-div, .ct-hero-right { display: none; }
          .ct-hero-left { padding: 40px 28px; }
          .ct-cards-grid { grid-template-columns: 1fr; }
          .ct-cards-hdr { padding: 28px 28px 16px; }
          .ct-map-section { grid-template-columns: 1fr; }
          .ct-map-div { display: none; }
          .ct-social-panel { min-height: 340px; }
          .ct-faq-grid { grid-template-columns: 1fr; }
          .ct-faq-div { display: none; }
          .ct-faq-hdr { padding: 28px 28px 16px; }
          .ct-footer { padding: 16px 24px; flex-direction: column; gap: 8px; }
        }
        @media (max-width: 600px) {
          .ct-card { padding: 32px 24px; }
          .ct-faq-item { padding: 28px 24px; }
        }
      `}</style>

      <div className="ct-root">

        {/* ── HERO ── */}
        <div className="ct-hero">
          <div className="ct-hero-left">
            <div>
              <div className="hero-eyebrow">Get In Touch</div>
              <h1 className="hero-h1">
                <span className="outline">Con</span><br />
                <span className="accent">tact</span>
              </h1>
            </div>
            <div className="ct-hero-meta">
              {[
                { k: 'Response Time', v: '< 24 Hours' },
                { k: 'Location', v: 'Coimbatore' },
                { k: 'Season', v: '2025–26' },
              ].map(r => (
                <div key={r.k} className="ct-meta-row">
                  <span className="ct-meta-k">{r.k}</span>
                  <span className="ct-meta-v">{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ct-hero-div" />

          <div className="ct-hero-center">
            <div className="ct-center-bg">CONTACT</div>
            <div className="ct-hero-hl">
              <strong>Reach Out.</strong>
              We'd love to hear<br />from you.
            </div>
            <div className="ct-hero-byline">
              <span className="byline-dot" />
              {contactInfo.length} Channels
              <span className="byline-dot" />
              {socialLinks.length} Socials
              <span className="byline-dot" />
              Always Open
            </div>
          </div>

          <div className="ct-hero-div" />

          <div className="ct-hero-right">
            <div className="ct-hero-bg-word">RAC</div>
            <div>
              <div className="ct-right-label">// Office Hours</div>
              <div className="ct-right-motto">
                <strong>We're Here</strong>
                Come say<br />hello anytime<br />during hours.
              </div>
            </div>
            <div className="ct-hours">
              {officeHours.map(h => (
                <div key={h.day} className="ct-hour-row">
                  <span className="ct-hour-d">{h.day}</span>
                  <span className="ct-hour-t">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MARQUEE ── */}
        <div className="ct-marquee">
          <div className="marquee-track" style={{ transform: `translateX(${marqueeX % -1200}px)` }}>
            {[...Array(12)].map((_, i) => (
              <span key={i} className="mq-item">
                Reach Out <span className="mq-star">★</span>
                Rotaract KPRCAS <span className="mq-star">★</span>
                Let's Connect <span className="mq-star">★</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── CONTACT CARDS ── */}
        <div className="ct-cards-section">
          <div className="ct-cards-hdr">
            <div className="ct-sec-lbl">Contact Channels</div>
            <div className="ct-sec-cnt">0{contactInfo.length}</div>
          </div>
          <div className="ct-cards-grid">
            {contactInfo.map(info => (
              <a
                key={info.code}
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : undefined}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="ct-card"
              >
                <div className="ct-card-num">{info.code}</div>
                <div className="ct-card-icon-wrap">
                  <info.icon size={20} className="ct-card-icon" />
                </div>
                <div className="ct-card-title">{info.title}</div>
                <div className="ct-card-content">{info.content}</div>
                <div className="ct-card-arrow">↗</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── MAP + SOCIAL ── */}
        <div className="ct-map-section">
          <div className="ct-map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.7890123456789!2d77.1329603!3d11.0805985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8ff39cc24b9ab:0x2ae19c385129a1b5!2sKPR+College+of+Arts+Science+and+Research!5e0!3m2!1sen!2sin!4v1234567890"
              title="KPR College Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="ct-map-overlay" />
            <div className="ct-map-tag">// Location</div>
          </div>

          <div className="ct-map-div" />

          <div className="ct-social-panel">
            <div className="ct-social-bg">SOC</div>
            <div>
              <div className="ct-social-label">// Follow Us</div>
              <div className="ct-social-title">Stay<br />Connected</div>
            </div>
            <div className="ct-social-links">
              {socialLinks.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="ct-social-link">
                  <div className="ct-social-icon-wrap">
                    <s.icon size={16} className="ct-social-icon" />
                  </div>
                  <div>
                    <div className="ct-social-name">{s.name}</div>
                    <div className="ct-social-handle">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="ct-faq-section">
          <div className="ct-faq-hdr">
            <div className="ct-sec-lbl">Frequently Asked Questions</div>
            <div className="ct-sec-cnt">0{faqs.length}</div>
          </div>
          <div className="ct-faq-grid">
            <div className="ct-faq-col">
              {faqs.slice(0, 2).map((faq, i) => (
                <div
                  key={i}
                  className={`ct-faq-item ${openFaq === i ? 'open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="ct-faq-q-row">
                    <div className="ct-faq-q">{faq.q}</div>
                    <div className="ct-faq-toggle">+</div>
                  </div>
                  <div className="ct-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
            <div className="ct-faq-div" />
            <div className="ct-faq-col">
              {faqs.slice(2).map((faq, i) => (
                <div
                  key={i + 2}
                  className={`ct-faq-item ${openFaq === i + 2 ? 'open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i + 2 ? null : i + 2)}
                >
                  <div className="ct-faq-q-row">
                    <div className="ct-faq-q">{faq.q}</div>
                    <div className="ct-faq-toggle">+</div>
                  </div>
                  <div className="ct-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ct-footer">
          <div className="footer-brand">Rotaract Club of KPRCAS</div>
          <div className="footer-note">© 2025 · All Rights Reserved</div>
        </div>

      </div>
    </>
  );
}