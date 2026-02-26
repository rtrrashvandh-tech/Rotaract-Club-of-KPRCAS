import { useEffect, useState, useRef } from 'react';
import { User, GraduationCap, Building, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: GraduationCap, num: '01', title: 'Leadership Development', description: 'Develop essential leadership skills through hands-on experience and mentorship opportunities.' },
  { icon: User, num: '02', title: 'Personal Growth', description: 'Build confidence, communication skills, and expand your comfort zone through diverse experiences.' },
  { icon: Building, num: '03', title: 'Professional Networking', description: 'Connect with like-minded individuals, professionals, and alumni in various industries.' },
  { icon: CheckCircle, num: '04', title: 'Community Impact', description: 'Make a meaningful difference in your community through impactful service projects.' },
];

const requirements = [
  'Be a current student at KPRCAS',
  'Maintain good academic standing',
  'Commit to regular meeting attendance',
  'Participate in at least 2 service projects per semester',
  'Pay annual membership dues',
  'Uphold Rotaract values and ethics',
];

const steps = [
  { n: 'Step 01', title: 'Express Interest', desc: 'Reach out to us via the contact form or visit us at a club meeting.' },
  { n: 'Step 02', title: 'Join Discussions', desc: 'Participate in our online community and stay updated with club activities.' },
  { n: 'Step 03', title: 'Submit Application', desc: 'Fill out the membership form and submit required documents.' },
  { n: 'Step 04', title: 'Welcome Aboard', desc: 'Complete induction and begin your Rotaract journey with us!' },
];

export default function JoinUs() {
  const [marqueeX, setMarqueeX] = useState(0);
  const marqRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    document.title = 'Join Us | Rotaract Club of KPRCAS';
    const anim = () => { marqRef.current -= 0.5; setMarqueeX(marqRef.current); rafRef.current = requestAnimationFrame(anim); };
    rafRef.current = requestAnimationFrame(anim);
    return () => { cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&family=Unbounded:wght@300;400;500;700;900&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root { --ink:#0D0D0F; --paper:#F2EFE8; --red:#E8192C; --lime:#C8FF00; --muted:#8A8680; --border:#D4D0C8; }

        .ju-root { background:var(--paper); color:var(--ink); font-family:'Fragment Mono',monospace; overflow-x:hidden; min-height:100vh; padding-top: 80px; }

        /* HERO */
        .ju-hero { display:grid; grid-template-columns:1.2fr 1px 1.8fr 1px 1fr; border-bottom:3px solid var(--ink); min-height:55vh; }
        .ju-hero-div { background:var(--border); }

        .ju-hero-left { padding:56px 48px; display:flex; flex-direction:column; justify-content:space-between; }
        .eyebrow { font-size:9px; letter-spacing:5px; text-transform:uppercase; color:var(--red); margin-bottom:20px; display:flex; align-items:center; gap:10px; }
        .eyebrow::before { content:'//'; opacity:0.4; }
        .hero-h1 { font-family:'Unbounded',sans-serif; font-size:clamp(40px,6.5vw,88px); font-weight:900; letter-spacing:-4px; line-height:0.9; text-transform:uppercase; }
        .hero-h1 .outline { -webkit-text-stroke:1.5px var(--ink); color:transparent; }
        .hero-h1 .accent { color:var(--red); }
        .hero-desc { font-size:13px; line-height:1.9; color:#4A4840; margin-top:24px; max-width:360px; }
        .ju-stat-strip { display:flex; gap:0; margin-top:auto; padding-top:40px; }
        .ju-stat-cell { flex:1; padding:16px 12px; border-top:1px solid var(--border); border-right:1px solid var(--border); cursor:default; transition:background 0.3s; }
        .ju-stat-cell:last-child { border-right:none; }
        .ju-stat-cell:hover { background:var(--ink); }
        .js-n { font-family:'Unbounded',sans-serif; font-size:22px; font-weight:900; letter-spacing:-1px; line-height:1; transition:color 0.3s; }
        .ju-stat-cell:hover .js-n { color:var(--lime); }
        .js-l { font-size:8px; letter-spacing:3px; text-transform:uppercase; color:var(--muted); margin-top:4px; transition:color 0.3s; }
        .ju-stat-cell:hover .js-l { color:rgba(242,239,232,0.4); }

        .ju-hero-center { padding:56px 56px; display:flex; flex-direction:column; justify-content:space-between; background:var(--ink); position:relative; overflow:hidden; }
        .jc-bg { position:absolute; right:-20px; bottom:-40px; font-family:'Unbounded',sans-serif; font-size:200px; font-weight:900; color:rgba(255,255,255,0.025); line-height:1; pointer-events:none; letter-spacing:-8px; text-transform:uppercase; }
        .jc-tag { font-size:9px; letter-spacing:5px; text-transform:uppercase; color:var(--lime); margin-bottom:28px; }
        .jc-hl { font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(32px,5vw,72px); line-height:1.05; color:var(--paper); letter-spacing:-1px; margin-bottom:20px; }
        .jc-hl strong { font-style:normal; font-family:'Unbounded',sans-serif; font-size:0.48em; font-weight:900; display:block; color:var(--lime); letter-spacing:-1px; text-transform:uppercase; margin-bottom:8px; }
        .jc-body { font-size:13px; line-height:1.8; color:rgba(242,239,232,0.4); max-width:400px; margin-bottom:36px; }
        .jc-cta { display:flex; gap:12px; flex-wrap:wrap; position:relative; z-index:1; }

        .ju-hero-right { padding:48px 36px; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden; }
        .jr-bg { position:absolute; right:-10px; bottom:-30px; font-family:'Unbounded',sans-serif; font-size:110px; font-weight:900; color:rgba(13,13,15,0.04); line-height:1; pointer-events:none; letter-spacing:-5px; text-transform:uppercase; }
        .jr-label { font-size:9px; letter-spacing:5px; text-transform:uppercase; color:var(--muted); margin-bottom:16px; }
        .jr-motto { font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(18px,2.5vw,30px); line-height:1.35; color:var(--ink); }
        .jr-motto strong { font-style:normal; font-family:'Unbounded',sans-serif; font-size:0.45em; font-weight:900; display:block; color:var(--red); letter-spacing:2px; text-transform:uppercase; margin-bottom:8px; }
        .jr-meta { margin-top:auto; }
        .jr-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--border); font-size:10px; letter-spacing:2px; text-transform:uppercase; }
        .jr-k { color:var(--muted); }
        .jr-v { font-weight:700; }

        .ju-marquee { overflow:hidden; border-bottom:3px solid var(--ink); padding:12px 0; background:var(--lime); }
        .marquee-track { display:flex; white-space:nowrap; will-change:transform; }
        .mq-item { font-family:'Unbounded',sans-serif; font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--ink); padding:0 48px; display:inline-flex; align-items:center; gap:24px; }
        .mq-star { color:var(--red); font-size:16px; }

        /* BENEFITS */
        .ju-benefits { border-bottom:3px solid var(--ink); }
        .ju-benefits-hdr { padding:44px 56px 28px; display:flex; justify-content:space-between; align-items:baseline; border-bottom:1px solid var(--border); }
        .sec-lbl { font-size:9px; letter-spacing:5px; text-transform:uppercase; color:var(--red); display:flex; align-items:center; gap:10px; margin-bottom:8px; }
        .sec-lbl::before { content:'//'; opacity:0.4; }
        .sec-h2 { font-family:'Unbounded',sans-serif; font-size:clamp(20px,3vw,36px); font-weight:900; letter-spacing:-1px; text-transform:uppercase; }
        .sec-h2 span { color:var(--red); }
        .sec-count { font-family:'Unbounded',sans-serif; font-size:40px; font-weight:900; letter-spacing:-2px; color:var(--border); }
        .benefits-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--border); }
        .bc { background:var(--paper); padding:48px 32px; position:relative; overflow:hidden; cursor:default; transition:background 0.3s; }
        .bc:hover { background:var(--ink); }
        .bc::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--red); transform:scaleX(0); transform-origin:left; transition:transform 0.4s cubic-bezier(0.23,1,0.32,1); }
        .bc:hover::before { transform:scaleX(1); }
        .bc-num { font-family:'Unbounded',sans-serif; font-size:10px; font-weight:700; letter-spacing:2px; color:var(--muted); margin-bottom:20px; transition:color 0.3s; }
        .bc:hover .bc-num { color:rgba(242,239,232,0.3); }
        .bc-icon { width:42px; height:42px; display:flex; align-items:center; justify-content:center; border:1px solid var(--border); color:var(--red); margin-bottom:20px; transition:border-color 0.3s,color 0.3s; }
        .bc:hover .bc-icon { border-color:var(--lime); color:var(--lime); }
        .bc-title { font-family:'Unbounded',sans-serif; font-size:12px; font-weight:700; letter-spacing:-0.3px; text-transform:uppercase; color:var(--ink); margin-bottom:12px; transition:color 0.3s; }
        .bc:hover .bc-title { color:var(--lime); }
        .bc-desc { font-size:12px; line-height:1.7; color:var(--muted); transition:color 0.3s; }
        .bc:hover .bc-desc { color:rgba(242,239,232,0.45); }
        .bc-bgn { position:absolute; right:-5px; bottom:-15px; font-family:'Unbounded',sans-serif; font-size:80px; font-weight:900; color:rgba(13,13,15,0.04); line-height:1; letter-spacing:-3px; pointer-events:none; transition:color 0.3s; }
        .bc:hover .bc-bgn { color:rgba(255,255,255,0.03); }

        /* REQUIREMENTS + STEPS */
        .ju-content { display:grid; grid-template-columns:1fr 1px 1fr; border-bottom:3px solid var(--ink); }
        .ju-div { background:var(--border); }
        .req-section { padding:64px 56px; }
        .req-h2 { font-family:'Unbounded',sans-serif; font-size:clamp(22px,3vw,40px); font-weight:900; letter-spacing:-2px; text-transform:uppercase; margin-bottom:36px; }
        .req-h2 span { color:var(--red); }
        .req-list { display:flex; flex-direction:column; }
        .req-item { display:flex; gap:18px; padding:16px 0; border-bottom:1px solid var(--border); align-items:flex-start; cursor:default; transition:padding-left 0.25s; }
        .req-item:hover { padding-left:8px; }
        .req-check { width:28px; height:28px; min-width:28px; display:flex; align-items:center; justify-content:center; background:var(--ink); color:var(--lime); flex-shrink:0; font-family:'Unbounded',sans-serif; font-size:9px; font-weight:900; }
        .req-text { font-size:13px; line-height:1.6; color:#4A4840; }
        .steps-section { padding:64px 48px; background:var(--ink); }
        .steps-h2 { font-family:'Unbounded',sans-serif; font-size:clamp(22px,3vw,40px); font-weight:900; letter-spacing:-2px; text-transform:uppercase; color:var(--paper); margin-bottom:36px; }
        .steps-h2 span { color:var(--lime); }
        .steps-eyebrow { font-size:9px; letter-spacing:5px; text-transform:uppercase; color:rgba(200,255,0,0.5); margin-bottom:16px; }
        .steps-list { display:flex; flex-direction:column; gap:1px; background:rgba(255,255,255,0.05); }
        .step-card { background:var(--ink); padding:24px 28px; position:relative; overflow:hidden; cursor:default; transition:background 0.3s; }
        .step-card:hover { background:#141416; }
        .step-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:var(--lime); transform:scaleX(0); transform-origin:left; transition:transform 0.4s cubic-bezier(0.23,1,0.32,1); }
        .step-card:hover::after { transform:scaleX(1); }
        .step-tag { font-size:8px; letter-spacing:4px; text-transform:uppercase; color:var(--red); margin-bottom:8px; display:block; }
        .step-title { font-family:'Unbounded',sans-serif; font-size:14px; font-weight:700; letter-spacing:-0.3px; text-transform:uppercase; color:var(--paper); margin-bottom:8px; transition:color 0.3s; }
        .step-card:hover .step-title { color:var(--lime); }
        .step-desc { font-size:12px; line-height:1.7; color:rgba(242,239,232,0.35); transition:color 0.3s; }
        .step-card:hover .step-desc { color:rgba(242,239,232,0.6); }
        .step-bgn { position:absolute; right:-5px; bottom:-10px; font-family:'Unbounded',sans-serif; font-size:64px; font-weight:900; color:rgba(255,255,255,0.025); line-height:1; pointer-events:none; }

        /* CTA */
        .ju-cta { display:grid; grid-template-columns:1fr 1fr; border-bottom:3px solid var(--ink); }
        .cta-left { background:var(--ink); padding:72px 56px; position:relative; overflow:hidden; }
        .cta-bg { position:absolute; right:-20px; bottom:-50px; font-family:'Unbounded',sans-serif; font-size:180px; font-weight:900; color:rgba(255,255,255,0.025); line-height:1; pointer-events:none; letter-spacing:-8px; text-transform:uppercase; }
        .cta-ey { font-size:9px; letter-spacing:5px; text-transform:uppercase; color:var(--lime); margin-bottom:28px; }
        .cta-h2 { font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(32px,4vw,56px); line-height:1.05; color:var(--paper); letter-spacing:-1px; margin-bottom:16px; }
        .cta-h2 strong { font-style:normal; font-family:'Unbounded',sans-serif; font-size:0.5em; font-weight:900; display:block; color:var(--lime); letter-spacing:-1px; text-transform:uppercase; margin-bottom:8px; }
        .cta-body { font-size:13px; line-height:1.8; color:rgba(242,239,232,0.4); max-width:380px; margin-bottom:40px; }
        .cta-btns { display:flex; gap:12px; flex-wrap:wrap; position:relative; z-index:1; }

        .cta-right { background:var(--lime); padding:72px 56px; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:center; }
        .cta-right-bg { position:absolute; left:-20px; bottom:-50px; font-family:'Unbounded',sans-serif; font-size:180px; font-weight:900; color:rgba(13,13,15,0.04); line-height:1; pointer-events:none; letter-spacing:-8px; }
        .cta-right-lbl { font-size:9px; letter-spacing:5px; text-transform:uppercase; color:rgba(13,13,15,0.45); margin-bottom:24px; }
        .cta-right-motto { font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(28px,4vw,48px); color:var(--ink); line-height:1.15; letter-spacing:-1px; margin-bottom:36px; }
        .cm-list { display:flex; flex-direction:column; }
        .cm-row { display:flex; justify-content:space-between; padding:11px 0; border-bottom:1px solid rgba(13,13,15,0.15); font-size:10px; letter-spacing:2px; text-transform:uppercase; }
        .cm-k { color:rgba(13,13,15,0.45); }
        .cm-v { font-weight:700; color:var(--ink); }

        /* BUTTONS */
        .nx-lime { display:inline-flex; align-items:center; gap:10px; padding:16px 28px; background:var(--lime); color:var(--ink); font-family:'Fragment Mono',monospace; font-size:11px; letter-spacing:2px; text-transform:uppercase; text-decoration:none; font-weight:700; border:none; cursor:pointer; transition:all 0.25s; }
        .nx-lime:hover { background:var(--paper); transform:translateY(-2px); }
        .nx-ghost { display:inline-flex; align-items:center; gap:8px; padding:14px 24px; background:transparent; color:rgba(242,239,232,0.5); font-family:'Fragment Mono',monospace; font-size:11px; letter-spacing:2px; text-transform:uppercase; text-decoration:none; border:1px solid rgba(242,239,232,0.15); cursor:pointer; transition:all 0.25s; }
        .nx-ghost:hover { border-color:var(--lime); color:var(--lime); }

        /* FOOTER */
        .ju-fcells { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--border); border-bottom:3px solid var(--ink); }
        .fc { background:var(--paper); padding:32px 28px; cursor:default; transition:background 0.3s; text-align:center; }
        .fc:hover { background:var(--ink); }
        .fc-l { font-size:9px; letter-spacing:4px; text-transform:uppercase; color:var(--red); margin-bottom:12px; }
        .fc-v { font-family:'Unbounded',sans-serif; font-size:13px; font-weight:700; letter-spacing:-0.3px; color:var(--ink); line-height:1.8; transition:color 0.3s; }
        .fc:hover .fc-v { color:var(--paper); }
        .ju-fb { padding:20px 48px; display:flex; flex-direction:column; align-items:center; gap:8px; }
        .fb-brand { font-family:'Unbounded',sans-serif; font-size:14px; font-weight:900; letter-spacing:-0.5px; color:rgba(13,13,15,0.18); text-transform:uppercase; }
        .fb-note { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--muted); opacity:0.5; }

        /* RESPONSIVE */
        @media (max-width:1024px) {
          .ju-masthead { grid-template-columns:1fr auto; padding:0 24px; }
          .m-right { display:none; }
          .ju-hero { grid-template-columns:1fr; }
          .ju-hero-div { display:none; }
          .ju-hero-left,.ju-hero-center,.ju-hero-right { padding:40px 28px; }
          .benefits-grid { grid-template-columns:repeat(2,1fr); }
          .ju-benefits-hdr { padding:36px 28px 24px; }
          .ju-content { grid-template-columns:1fr; }
          .ju-div { display:none; }
          .req-section { padding:48px 28px; }
          .steps-section { padding:48px 28px; }
          .ju-cta { grid-template-columns:1fr; }
          .cta-left { padding:56px 28px; }
          .cta-right { padding:48px 28px; }
          .ju-fcells { grid-template-columns:1fr; }
          .ju-fb { padding:16px 24px; flex-direction:column; gap:8px; }
          .ju-edition { padding:8px 24px; }
        }
      `}</style>

      <div className="ju-root">

        {/* HERO */}
        <div className="ju-hero">
          <div className="ju-hero-left">
            <div>
              <div className="eyebrow">Membership</div>
              <h1 className="hero-h1">
                <span className="outline">Join</span><br />
                Our<br />
                <span className="accent">Club</span>
              </h1>
              <p className="hero-desc">Become part of a vibrant community of young leaders dedicated to service, fellowship, and personal development.</p>
            </div>
            <div className="ju-stat-strip">
              {[{ n: '100+', l: 'Members' }, { n: '50+', l: 'Projects' }, { n: '5+', l: 'Years' }].map(s => (
                <div key={s.l} className="ju-stat-cell">
                  <div className="js-n">{s.n}</div>
                  <div className="js-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ju-hero-div" />

          <div className="ju-hero-center">
            <div className="jc-bg">JOIN</div>
            <div className="jc-tag">// Why Join?</div>
            <div className="jc-hl">
              <strong>Be The Change.</strong>
              Your journey of<br />leadership &amp; service<br />starts here.
            </div>
            <p className="jc-body">The Rotaract Club of KPRCAS offers a unique platform to grow as a leader, serve your community, and forge lifelong bonds of fellowship. Every initiative, every project, every meeting is a step toward becoming your best self.</p>
            <div className="jc-cta">
              <Link to="/contact" className="nx-lime">Get in Touch <ArrowRight size={14} /></Link>
              <Link to="/about" className="nx-ghost">Learn More</Link>
            </div>
          </div>

          <div className="ju-hero-div" />

          <div className="ju-hero-right">
            <div className="jr-bg">NOW</div>
            <div>
              <div className="jr-label">// Enrollment</div>
              <div className="jr-motto">
                <strong>Open · 2025</strong>
                Leadership<br />begins with<br />a single step.
              </div>
            </div>
            <div className="jr-meta">
              {[{ k: 'College', v: 'KPRCAS' }, { k: 'District', v: 'RID 3206' }].map(r => (
                <div key={r.k} className="jr-row">
                  <span className="jr-k">{r.k}</span>
                  <span className="jr-v">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="ju-marquee">
          <div className="marquee-track" style={{ transform: `translateX(${marqueeX % -1200}px)` }}>
            {[...Array(12)].map((_, i) => (
              <span key={i} className="mq-item">Join Rotaract <span className="mq-star">★</span> Serve &amp; Lead <span className="mq-star">★</span> KPRCAS 2025 <span className="mq-star">★</span></span>
            ))}
          </div>
        </div>

        {/* BENEFITS */}
        <div className="ju-benefits">
          <div className="ju-benefits-hdr">
            <div>
              <div className="sec-lbl">Why Join Rotaract?</div>
              <div className="sec-h2">What Awaits <span>You</span></div>
            </div>
            <div className="sec-count">04</div>
          </div>
          <div className="benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="bc">
                <div className="bc-bgn">{b.num}</div>
                <div className="bc-num">{b.num}</div>
                <div className="bc-icon"><b.icon size={18} /></div>
                <div className="bc-title">{b.title}</div>
                <div className="bc-desc">{b.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* REQUIREMENTS + STEPS */}
        <div className="ju-content">
          <div className="req-section">
            <div className="sec-lbl" style={{ marginBottom: 16 }}>Membership Requirements</div>
            <h2 className="req-h2">What We<br /><span>Expect</span></h2>
            <div className="req-list">
              {requirements.map((r, i) => (
                <div key={i} className="req-item">
                  <div className="req-check">{String(i + 1).padStart(2, '0')}</div>
                  <div className="req-text">{r}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ju-div" />

          <div className="steps-section">
            <div className="steps-eyebrow">// How To Join</div>
            <h2 className="steps-h2">The <span>Process</span></h2>
            <div className="steps-list">
              {steps.map((s, i) => (
                <div key={s.title} className="step-card">
                  <div className="step-bgn">{String(i + 1).padStart(2, '0')}</div>
                  <span className="step-tag">{s.n}</span>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="ju-cta">
          <div className="cta-left">
            <div className="cta-bg">JOIN</div>
            <div className="cta-ey">// Ready to Begin?</div>
            <h2 className="cta-h2">
              <strong>Make Your Mark.</strong>
              Take the first<br />step today.
            </h2>
            <p className="cta-body">Reach out to us and we'll guide you through the membership process. Your journey of service, leadership, and fellowship begins now.</p>
            <div className="cta-btns">
              <Link to="/contact" className="nx-lime">Contact Us <ArrowRight size={14} /></Link>
              <Link to="/about" className="nx-ghost">Learn More</Link>
            </div>
          </div>

          <div className="cta-right">
            <div className="cta-right-bg">SERVE</div>
            <div className="cta-right-lbl">// Club Membership</div>
            <div className="cta-right-motto">"Service Above Self"</div>
            <div className="cm-list">
              {[{ k: 'College', v: 'KPRCAS' }, { k: 'District', v: 'RID 3206' }, { k: 'Members', v: '100+' }].map(r => (
                <div key={r.k} className="cm-row">
                  <span className="cm-k">{r.k}</span>
                  <span className="cm-v">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER CELLS */}
        <div className="ju-fcells">
          {[
            { l: 'Club', v: 'Rotaract Club\nof KPRCAS' },
            { l: 'District', v: 'Rotary International\nDistrict 3206' },
            { l: 'Location', v: 'Coimbatore\nTamil Nadu, India' },
          ].map(c => (
            <div key={c.l} className="fc">
              <div className="fc-l">{c.l}</div>
              <div className="fc-v" style={{ whiteSpace: 'pre-line' }}>{c.v}</div>
            </div>
          ))}
        </div>

        <div className="ju-fb">
          <div className="fb-brand">Rotaract Club of KPRCAS</div>
          <div className="fb-note">© 2025 · All Rights Reserved</div>
        </div>
      </div>
    </>
  );
}