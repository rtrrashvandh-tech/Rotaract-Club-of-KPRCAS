import { useState, useEffect, useRef } from 'react';
import { Filter, X, Maximize2, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { getCustomGalleryItems } from '@/utils/adminData';
import { Link } from 'react-router-dom';

const filters = [
  { id: 'all', label: 'All Moments' },
  { id: 'club service', label: 'Club Service' },
  { id: 'community', label: 'Community' },
  { id: 'professional service', label: 'Professional' },
  { id: 'international service', label: 'International' },
  { id: 'district priority projects', label: 'DPP' },
];

const galleryItems = [
  { id: 1, type: 'image', src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755328575/IMG_2630_lfgtit.jpg', category: 'club service', title: 'Charter Day', description: 'Charter Day celebration "Purpose Power Progress"' },
  { id: 2, type: 'image', src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755328351/IMG_2449_fig2hu.jpg', category: 'club service', title: 'Swap and Serve', description: 'An initiative to build a sustainable community through sharing.' },
  { id: 3, type: 'image', src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755331800/IMG-20250727-WA0011_1_avnbqn.jpg', category: 'district priority projects', title: 'Plates of Joy', description: 'Serving hot meals with love and compassion to those in need.' },
  { id: 4, type: 'image', src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417179/WhatsApp_Image_2025-07-20_at_19.16.57_99f3161a_xktitp.jpg', category: 'professional service', title: 'Skill Up Summit', description: 'Empowering youth through motivational leadership sessions.' },
  { id: 5, type: 'image', src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417387/WhatsApp_Image_2025-07-21_at_23.31.20_ca301d31_yh4q7o.jpg', category: 'professional service', title: 'Income Tax Insights', description: 'A deep dive into financial literacy and tax management.' },
  { id: 6, type: 'image', src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417519/IMG_2547_deej97.jpg', category: 'professional service', title: 'Checkmate Challenge', description: 'Strategic thinking and sportsmanship at the annual chess tourney.' },
  { id: 7, type: 'image', src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755327320/IMG_2688_vkdcns.jpg', category: 'club service', title: 'Mattai Pandhu', description: 'Building sports fellowship through community cricket matches.' },
  { id: 8, type: 'image', src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760281257/PHOTO-2025-09-28-09-55-14_wodjhp.jpg', category: 'club service', title: 'Tharangam 3.0', description: 'Vibrant Onam celebrations filled with tradition and unity.' },
  { id: 9, type: 'image', src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761841757/IMG_20250831_141950_ymbxjs.jpg', category: 'club service', title: 'Shuffle and Roll', description: 'An evening of fun, games, and member engagement.' },
  { id: 10, type: 'image', src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761841998/IMG_20250916_115541_rftji2.jpg', category: 'club service', title: 'Verum Pen Illa', description: 'A special initiative focused on women empowerment and health.' },
  { id: 11, type: 'image', src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761842038/Screenshot_2025-09-29-22-04-09-91_6012fa4d4ddec268fc5c7112cbb265e7_o0kocj.jpg', category: 'club service', title: 'Charity Drive', description: 'Mobilizing resources to support local community projects.' },
  { id: 12, type: 'image', src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760283874/IMG_5440_any3nm.jpg', category: 'club service', title: 'Navrang', description: 'A colorful celebration of Navratri and cultural diversity.' },
  { id: 13, type: 'image', src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761842489/IMG-20250927-WA0100_zlndtq.jpg', category: 'professional service', title: 'Rac-a-thon', description: 'Harnessing innovation through our flagship 24-hour hackathon.' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selected, setSelected] = useState<any | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [customItems, setCustomItems] = useState<any[]>([]);
  const [marqueeX, setMarqueeX] = useState(0);
  const marqRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    document.title = 'Gallery | Rotaract KPRCAS';
    const anim = () => { marqRef.current -= 0.45; setMarqueeX(marqRef.current); rafRef.current = requestAnimationFrame(anim); };
    rafRef.current = requestAnimationFrame(anim);

    const fetchGallery = async () => {
      const items = await getCustomGalleryItems();
      setCustomItems(items);
    };
    fetchGallery();

    return () => { cancelAnimationFrame(rafRef.current); };
  }, []);

  const allItems = [...galleryItems, ...customItems];
  const filtered = activeFilter === 'all' ? allItems : allItems.filter(i => i.category === activeFilter);

  const openLightbox = (item: any) => {
    setSelected(item);
    setLightboxIdx(filtered.findIndex(i => i.id === item.id));
  };

  const prevImg = () => {
    const idx = (lightboxIdx - 1 + filtered.length) % filtered.length;
    setLightboxIdx(idx); setSelected(filtered[idx]);
  };

  const nextImg = () => {
    const idx = (lightboxIdx + 1) % filtered.length;
    setLightboxIdx(idx); setSelected(filtered[idx]);
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'ArrowRight') nextImg();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, lightboxIdx, filtered]);

  const catLabel = (cat: string) => filters.find(f => f.id === cat)?.label ?? cat;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&family=Unbounded:wght@300;400;500;700;900&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #0D0D0F; --paper: #F2EFE8; --red: #E8192C;
          --lime: #C8FF00; --muted: #8A8680; --border: #D4D0C8;
        }

        .gl-root {
          background: var(--paper); color: var(--ink);
          font-family: 'Fragment Mono', monospace;
          overflow-x: hidden; min-height: 100vh;
          padding-top: 80px;
        }

        /* ── HERO ── */
        .gl-hero {
          display: grid; grid-template-columns: 1fr 1px 2fr 1px 1fr;
          border-bottom: 3px solid var(--ink); min-height: 46vh;
          position: relative; overflow: hidden;
        }
        .gl-hero-left {
          padding: 52px 40px; display: flex; flex-direction: column; justify-content: space-between;
        }
        .hero-eyebrow { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--red); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .hero-eyebrow::before { content: '//'; opacity: 0.4; }
        .hero-h1 { font-family: 'Unbounded', sans-serif; font-size: clamp(36px,6vw,80px); font-weight: 900; letter-spacing: -3px; line-height: 0.92; text-transform: uppercase; color: var(--ink); }
        .hero-h1 .outline { -webkit-text-stroke: 1.5px var(--ink); color: transparent; }
        .hero-h1 .accent { color: var(--red); }
        .hero-count-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); margin-top: auto; }
        .hc-cell { background: var(--paper); padding: 14px 12px; cursor: default; transition: background 0.3s; }
        .hc-cell:hover { background: var(--ink); }
        .hc-n { font-family: 'Unbounded', sans-serif; font-size: 22px; font-weight: 900; letter-spacing: -1px; line-height: 1; transition: color 0.3s; }
        .hc-cell:hover .hc-n { color: var(--lime); }
        .hc-l { font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-top: 4px; transition: color 0.3s; }
        .hc-cell:hover .hc-l { color: rgba(242,239,232,0.4); }

        .gl-hero-div { background: var(--border); }

        /* Center: big hero image */
        .gl-hero-center { position: relative; overflow: hidden; }
        .gl-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; filter: saturate(0.65) contrast(1.1); transition: filter 0.5s, transform 8s ease; display: block; }
        .gl-hero-center:hover .gl-hero-img { filter: saturate(0.85); transform: scale(1.03); }
        .gl-hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,13,15,0.85) 0%, transparent 60%); }
        .gl-hero-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 40px 40px 32px; }
        .gl-hero-hl { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(28px,4vw,56px); line-height: 1.05; color: var(--paper); letter-spacing: -0.5px; margin-bottom: 10px; }
        .gl-hero-hl strong { font-style: normal; font-family: 'Unbounded', sans-serif; font-size: 0.45em; font-weight: 900; letter-spacing: -1px; display: block; color: var(--lime); text-transform: uppercase; margin-bottom: 6px; }
        .gl-hero-byline { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(242,239,232,0.4); display: flex; align-items: center; gap: 12px; }
        .byline-dot { width: 4px; height: 4px; background: var(--red); border-radius: 50%; }

        /* Right sidebar */
        .gl-hero-right {
          padding: 40px 32px; display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .gl-hero-bg-word { position: absolute; right: -10px; bottom: -30px; font-family: 'Unbounded', sans-serif; font-size: 110px; font-weight: 900; color: rgba(13,13,15,0.04); line-height: 1; pointer-events: none; letter-spacing: -5px; text-transform: uppercase; }
        .gl-right-label { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
        .gl-right-motto { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(18px,2.5vw,28px); line-height: 1.35; color: var(--ink); }
        .gl-right-motto strong { font-style: normal; font-family: 'Unbounded', sans-serif; font-size: 0.45em; font-weight: 900; display: block; color: var(--red); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
        .gl-meta-list { margin-top: auto; }
        .gl-meta-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; }
        .gm-k { color: var(--muted); }
        .gm-v { font-weight: 700; color: var(--ink); }

        /* ── MARQUEE ── */
        .gl-marquee { overflow: hidden; border-bottom: 3px solid var(--ink); padding: 12px 0; background: var(--lime); }
        .marquee-track { display: flex; white-space: nowrap; will-change: transform; }
        .mq-item { font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--ink); padding: 0 48px; display: inline-flex; align-items: center; gap: 24px; }
        .mq-star { color: var(--red); font-size: 16px; }

        /* ── FILTER BAR ── */
        .gl-filter-wrap {
          position: sticky; top: 0; z-index: 40;
          background: var(--paper); border-bottom: 3px solid var(--ink);
          padding: 0 48px;
          display: flex; justify-content: space-between; align-items: center; gap: 24px;
        }
        .gl-filter-label { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--red); white-space: nowrap; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .gl-filter-label::before { content: '//'; opacity: 0.4; }
        .gl-filter-row { display: flex; gap: 0; overflow-x: auto; scrollbar-width: none; flex: 1; }
        .gl-filter-row::-webkit-scrollbar { display: none; }
        .gl-filter-btn {
          padding: 18px 20px; font-family: 'Fragment Mono', monospace; font-size: 9px; letter-spacing: 3px;
          text-transform: uppercase; background: transparent; color: var(--muted); border: none;
          border-right: 1px solid var(--border); cursor: pointer; white-space: nowrap;
          transition: all 0.25s ease; position: relative;
        }
        .gl-filter-btn::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--red); transform: scaleX(0); transform-origin: left; transition: transform 0.3s cubic-bezier(0.23,1,0.32,1); }
        .gl-filter-btn:hover { color: var(--ink); background: rgba(13,13,15,0.04); }
        .gl-filter-btn.active { color: var(--ink); font-weight: 700; }
        .gl-filter-btn.active::after { transform: scaleX(1); }
        .gl-filter-count { font-family: 'Unbounded', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: -1px; color: var(--border); flex-shrink: 0; }

        /* ── GALLERY GRID ── */
        .gl-section { padding: 0; }
        .gl-section-hdr { padding: 32px 56px 20px; display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--border); }
        .gl-sec-lbl { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--red); display: flex; align-items: center; gap: 10px; }
        .gl-sec-lbl::before { content: '//'; opacity: 0.4; }
        .gl-sec-cnt { font-family: 'Unbounded', sans-serif; font-size: 36px; font-weight: 900; letter-spacing: -2px; color: var(--border); }

        .gl-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border-bottom: 3px solid var(--ink);
        }

        /* All cards uniform size — no wide/tall variants */
        .gl-card {
          background: var(--paper);
          position: relative; overflow: hidden; cursor: pointer;
          aspect-ratio: 3/4;
          transition: background 0.3s ease;
        }

        .gl-card-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: saturate(0.7) contrast(1.05);
          transition: transform 0.6s ease, filter 0.4s ease;
          display: block;
        }

        .gl-card:hover .gl-card-img { transform: scale(1.06); filter: saturate(0.9) contrast(1); }

        .gl-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(13,13,15,0.92) 0%, rgba(13,13,15,0.3) 50%, transparent 80%);
          opacity: 0; transition: opacity 0.35s ease;
        }

        .gl-card:hover .gl-card-overlay { opacity: 1; }

        .gl-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--red); transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1); z-index: 3;
        }
        .gl-card:hover::before { transform: scaleX(1); }

        .gl-card-info {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 28px 24px 20px;
          z-index: 4; transform: translateY(12px); transition: transform 0.35s ease;
        }
        .gl-card:hover .gl-card-info { transform: translateY(0); }

        .gl-card-cat { font-size: 8px; letter-spacing: 4px; text-transform: uppercase; color: var(--lime); margin-bottom: 6px; opacity: 0; transition: opacity 0.3s ease 0.05s; }
        .gl-card:hover .gl-card-cat { opacity: 1; }
        .gl-card-title { font-family: 'Unbounded', sans-serif; font-size: clamp(13px,1.4vw,18px); font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; color: var(--paper); line-height: 1.1; margin-bottom: 6px; opacity: 0; transition: opacity 0.3s ease 0.08s; }
        .gl-card:hover .gl-card-title { opacity: 1; }
        .gl-card-desc { font-size: 10px; line-height: 1.6; color: rgba(242,239,232,0.55); opacity: 0; transition: opacity 0.3s ease 0.12s; }
        .gl-card:hover .gl-card-desc { opacity: 1; }

        .gl-expand {
          position: absolute; bottom: 20px; right: 20px; z-index: 4;
          width: 32px; height: 32px; background: var(--lime); color: var(--ink);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.7) rotate(-15deg);
          transition: all 0.3s ease 0.1s;
        }
        .gl-card:hover .gl-expand { opacity: 1; transform: scale(1) rotate(0deg); }

        .gl-empty { padding: 80px 56px; text-align: center; }
        .gl-empty-title { font-family: 'Unbounded', sans-serif; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px; color: var(--border); margin-top: 16px; }
        .gl-empty-sub { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-top: 8px; }

        /* ── LIGHTBOX ── */
        .gl-lightbox {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(13,13,15,0.98);
          display: grid; grid-template-columns: 1fr 1px 380px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }

        .gl-lb-media {
          position: relative; display: flex; align-items: center; justify-content: center;
          background: #050505; overflow: hidden;
        }
        .gl-lb-img { max-width: 100%; max-height: 100%; object-fit: contain; }

        .gl-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px; background: transparent;
          border: 1px solid rgba(212,208,200,0.15); color: rgba(242,239,232,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s ease; z-index: 5;
        }
        .gl-lb-nav:hover { border-color: var(--lime); color: var(--lime); }
        .gl-lb-nav.prev { left: 20px; }
        .gl-lb-nav.next { right: 20px; }

        .gl-lb-div { background: rgba(212,208,200,0.08); }

        .gl-lb-panel {
          background: var(--ink); padding: 48px 36px;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .gl-lb-panel-bg { position: absolute; right: -10px; bottom: -30px; font-family: 'Unbounded', sans-serif; font-size: 110px; font-weight: 900; color: rgba(255,255,255,0.025); line-height: 1; pointer-events: none; letter-spacing: -5px; }

        .gl-lb-top { }
        .gl-lb-label { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--lime); margin-bottom: 8px; }
        .gl-lb-counter { font-family: 'Unbounded', sans-serif; font-size: 40px; font-weight: 900; letter-spacing: -2px; color: rgba(242,239,232,0.1); line-height: 1; margin-bottom: 32px; }
        .gl-lb-cat { font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--red); margin-bottom: 14px; }
        .gl-lb-title { font-family: 'Unbounded', sans-serif; font-size: clamp(18px,2vw,28px); font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: var(--paper); line-height: 1.05; margin-bottom: 16px; }
        .gl-lb-desc { font-size: 12px; line-height: 1.8; color: rgba(242,239,232,0.4); }

        .gl-lb-bottom { }
        .gl-lb-close {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 24px; background: transparent; color: rgba(242,239,232,0.35);
          font-family: 'Fragment Mono', monospace; font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; border: 1px solid rgba(212,208,200,0.1); cursor: pointer;
          transition: all 0.2s ease; width: 100%; justify-content: center; margin-bottom: 12px;
        }
        .gl-lb-close:hover { border-color: var(--red); color: var(--red); }
        .gl-lb-hint { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: rgba(212,208,200,0.18); text-align: center; }

        /* FOOTER */
        .gl-footer { padding: 20px 48px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); }
        .footer-brand { font-family: 'Unbounded', sans-serif; font-size: 14px; font-weight: 900; letter-spacing: -0.5px; color: rgba(13,13,15,0.18); text-transform: uppercase; }
        .footer-note { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); opacity: 0.5; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .gl-masthead { grid-template-columns: 1fr auto; padding: 0 24px; }
          .m-right { display: none; }
          .gl-hero { grid-template-columns: 1fr; }
          .gl-hero-div, .gl-hero-right { display: none; }
          .gl-hero-left { padding: 40px 28px; }
          .gl-filter-wrap { padding: 0 24px; }
          .gl-grid { grid-template-columns: repeat(2, 1fr); }
          .gl-section-hdr { padding: 28px 24px 16px; }
          .gl-edition { padding: 8px 24px; }
          .gl-footer { padding: 16px 24px; flex-direction: column; gap: 8px; }
          .gl-lightbox { grid-template-columns: 1fr; }
          .gl-lb-div { display: none; }
          .gl-lb-panel { padding: 28px 24px; min-height: 280px; }
        }
        @media (max-width: 600px) {
          .gl-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="gl-root">
        {/* HERO */}
        <div className="gl-hero">
          <div className="gl-hero-left">
            <div>
              <div className="hero-eyebrow">Visual Archive</div>
              <h1 className="hero-h1">
                <span className="outline">Our</span><br />
                Gal<span className="accent">lery</span>
              </h1>
            </div>
            <div className="hero-count-grid">
              {[
                { n: String(galleryItems.length), l: 'Moments' },
                { n: String(filters.length - 1), l: 'Avenues' },
                { n: '2025', l: 'Season' },
                { n: '100%', l: 'Service' },
              ].map(c => (
                <div key={c.l} className="hc-cell">
                  <div className="hc-n">{c.n}</div>
                  <div className="hc-l">{c.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="gl-hero-div" />

          <div className="gl-hero-center">
            <img
              src={galleryItems[0].src}
              alt="Gallery hero"
              className="gl-hero-img"
              style={{ minHeight: '400px' }}
            />
            <div className="gl-hero-img-overlay" />
            <div className="gl-hero-caption">
              <div className="gl-hero-hl">
                <strong>Moments. Memories.</strong>
                Capturing the heart<br />of every service.
              </div>
              <div className="gl-hero-byline">
                <span className="byline-dot" />
                {galleryItems.length} Photos
                <span className="byline-dot" />
                {filters.length - 1} Categories
                <span className="byline-dot" />
                2025
              </div>
            </div>
          </div>

          <div className="gl-hero-div" />

          <div className="gl-hero-right">
            <div className="gl-hero-bg-word">SNAP</div>
            <div>
              <div className="gl-right-label">// Visual Story</div>
              <div className="gl-right-motto">
                <strong>Gallery · 2025</strong>
                Every photo<br />tells a story<br />of impact.
              </div>
            </div>
            <div className="gl-meta-list">
              {[
                { k: 'Total Photos', v: String(galleryItems.length) },
                { k: 'Avenues', v: String(filters.length - 1) },
                { k: 'Format', v: 'Digital Archive' },
                { k: 'Season', v: '2025–26' },
              ].map(r => (
                <div key={r.k} className="gl-meta-row">
                  <span className="gm-k">{r.k}</span>
                  <span className="gm-v">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="gl-marquee">
          <div className="marquee-track" style={{ transform: `translateX(${marqueeX % -1200}px)` }}>
            {[...Array(12)].map((_, i) => (
              <span key={i} className="mq-item">
                Visual Archive <span className="mq-star">★</span>
                Rotaract KPRCAS <span className="mq-star">★</span>
                Service &amp; Fellowship <span className="mq-star">★</span>
              </span>
            ))}
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="gl-filter-wrap" style={{ top: '64px' }}>
          <div className="gl-filter-label">Filter By</div>
          <div className="gl-filter-row">
            {filters.map(f => (
              <button
                key={f.id}
                className={`gl-filter-btn ${activeFilter === f.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="gl-filter-count">{String(filtered.length).padStart(2, '0')}</div>
        </div>

        {/* SECTION HEADER */}
        <div className="gl-section-hdr">
          <div className="gl-sec-lbl">
            {activeFilter === 'all' ? 'All Moments · 2025' : catLabel(activeFilter)}
          </div>
          <div className="gl-sec-cnt">{String(filtered.length).padStart(2, '0')}</div>
        </div>

        {/* GALLERY GRID */}
        <div className="gl-section">
          {filtered.length > 0 ? (
            <div className="gl-grid">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="gl-card"
                  onClick={() => openLightbox(item)}
                >
                  <img src={item.src} alt={item.title} className="gl-card-img" />
                  <div className="gl-card-overlay" />
                  <div className="gl-card-info">
                    <div className="gl-card-cat">{catLabel(item.category)}</div>
                    <div className="gl-card-title">{item.title}</div>
                    <div className="gl-card-desc">{item.description}</div>
                  </div>
                  <div className="gl-expand">
                    <Maximize2 size={12} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="gl-empty">
              <Filter size={40} style={{ color: 'var(--border)', display: 'block', margin: '0 auto' }} />
              <div className="gl-empty-title">No Moments Found</div>
              <div className="gl-empty-sub">Try exploring another service avenue</div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="gl-footer">
          <div className="footer-brand">Rotaract Club of KPRCAS</div>
          <Link to="/admin" className="flex items-center gap-2 text-[8px] uppercase tracking-[3px] text-muted hover:text-red-500 transition-all opacity-30 hover:opacity-100">
            <Lock size={10} /> Admin Archive
          </Link>
          <div className="footer-note">© 2025 · All Rights Reserved</div>
        </div>

        {/* LIGHTBOX */}
        {selected && (
          <div className="gl-lightbox" onClick={() => setSelected(null)}>
            <div className="gl-lb-media" onClick={e => e.stopPropagation()}>
              <img src={selected.src} alt={selected.title} className="gl-lb-img" />
              <button className="gl-lb-nav prev" onClick={e => { e.stopPropagation(); prevImg(); }}>
                <ChevronLeft size={16} />
              </button>
              <button className="gl-lb-nav next" onClick={e => { e.stopPropagation(); nextImg(); }}>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="gl-lb-div" />

            <div className="gl-lb-panel" onClick={e => e.stopPropagation()}>
              <div className="gl-lb-panel-bg">IMG</div>
              <div className="gl-lb-top">
                <div className="gl-lb-label">// Image Detail</div>
                <div className="gl-lb-counter">{String(lightboxIdx + 1).padStart(2, '0')}/{String(filtered.length).padStart(2, '0')}</div>
                <div className="gl-lb-cat">{catLabel(selected.category)}</div>
                <div className="gl-lb-title">{selected.title}</div>
                <div className="gl-lb-desc">{selected.description}</div>
              </div>
              <div className="gl-lb-bottom">
                <button className="gl-lb-close" onClick={() => setSelected(null)}>
                  <X size={12} /> Close Viewer
                </button>
                <div className="gl-lb-hint">← → Arrow keys to navigate · ESC to close</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}