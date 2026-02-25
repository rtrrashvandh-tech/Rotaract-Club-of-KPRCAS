import { useState, useEffect, useRef } from 'react';
import { FileText, Download, X, Maximize2, Minimize2, ChevronRight } from 'lucide-react';
import { getCustomBulletins, AdminBulletin } from '@/utils/adminData';

// --- Google Drive PDF file IDs ---
const pdfFiles: Record<string, string> = {
  'July-2025': '1HRRqhiuJIrOzChxt-SfaaFnOWuq-jrdg',
  'August-2025': '1wRTNBYPr2gLsgTdL-Cz4hsdbngBLDqHl',
  'September-2025': '1Fy5mcdadNAo2_u4BOdRK19HCxo_4H5xN',
  'October-2025': '1JoC-BbeoHBoKWpdUvatnVwBRrd1n8Ui1',
};

const getPdfViewerUrl = (fileId: string) => `https://drive.google.com/file/d/${fileId}/preview`;
const getPdfDownloadUrl = (fileId: string) => `https://drive.google.com/uc?export=download&id=${fileId}`;

const pageTurnSound = typeof Audio !== 'undefined' ? new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3') : null;

const staticBulletins = [
  { id: '1', title: 'July', year: '2025', date: 'July-2025', issue: 'Issue 01', color: '#FF6B35' },
  { id: '2', title: 'August', year: '2025', date: 'August-2025', issue: 'Issue 02', color: '#F7931E' },
  { id: '3', title: 'September', year: '2025', date: 'September-2025', issue: 'Issue 03', color: '#C0392B' },
  { id: '4', title: 'October', year: '2025', date: 'October-2025', issue: 'Issue 04', color: '#8E44AD' },
];

export default function Bulletin() {
  const [currentPdf, setCurrentPdf] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [allBulletins, setAllBulletins] = useState<any[]>(staticBulletins);
  const [combinedPdfFiles, setCombinedPdfFiles] = useState<Record<string, string>>(pdfFiles);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Bulletin | Rotaract KPRCAS';
    pageTurnSound?.load();

    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);

    const fetchCustom = async () => {
      const custom = await getCustomBulletins();
      if (custom && custom.length > 0) {
        const formattedCustom = custom.map(b => ({
          id: b.id,
          title: b.title.split(' ')[0],
          year: b.title.split(' ')[1] || '2025',
          date: b.date,
          issue: 'Custom Issue',
          color: '#2C3E50',
          fileId: b.fileId
        }));

        setAllBulletins([...staticBulletins, ...formattedCustom]);

        const newPdfFiles = { ...pdfFiles };
        formattedCustom.forEach(cb => {
          newPdfFiles[cb.date] = cb.fileId;
        });
        setCombinedPdfFiles(newPdfFiles);
      }
    };

    fetchCustom();

    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const playSound = () => {
    if (pageTurnSound) {
      pageTurnSound.currentTime = 0;
      pageTurnSound.play().catch(() => { });
    }
  };

  const handlePdfClick = (date: string) => {
    const fileId = combinedPdfFiles[date];
    if (fileId) {
      setCurrentPdf(getPdfViewerUrl(fileId));
      setIsViewerOpen(true);
      playSound();
    }
  };

  const handleDownload = (date: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const fileId = combinedPdfFiles[date];
    if (fileId) {
      const a = document.createElement('a');
      a.href = getPdfDownloadUrl(fileId);
      a.download = `bulletin-${date}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      playSound();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .bulletin-page {
          min-height: 100vh;
          background: #0A0A0A;
          color: #F0EDE6;
          font-family: 'DM Mono', monospace;
          overflow-x: hidden;
        }

        /* Cursor glow */
        .cursor-glow {
          position: fixed;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: left 0.1s ease, top 0.1s ease;
          z-index: 0;
        }

        /* Hero */
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: flex-end;
          padding: 80px 60px;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg');
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          transition: transform 8s ease;
          filter: brightness(0.3) saturate(0.5);
        }

        .hero:hover .hero-bg { transform: scale(1.08); }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .hero-accent-line {
          position: absolute;
          right: 60px;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 40%;
          background: linear-gradient(to bottom, transparent, #FF6B35, transparent);
          opacity: 0.6;
        }

        .hero-tag {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #FF6B35;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hero-tag::before {
          content: '';
          display: inline-block;
          width: 32px;
          height: 1px;
          background: #FF6B35;
        }

        .hero-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(72px, 14vw, 180px);
          line-height: 0.9;
          letter-spacing: -2px;
          position: relative;
          z-index: 1;
          color: #F0EDE6;
        }

        .hero-title span {
          display: block;
          -webkit-text-stroke: 1px #F0EDE6;
          color: transparent;
          opacity: 0.4;
        }

        .hero-sub {
          position: absolute;
          bottom: 80px;
          right: 80px;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
          writing-mode: vertical-rl;
          z-index: 1;
        }

        .hero-scroll {
          position: absolute;
          bottom: 32px;
          left: 60px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          letter-spacing: 3px;
          color: #555;
          text-transform: uppercase;
          z-index: 1;
        }

        .scroll-line {
          width: 48px;
          height: 1px;
          background: #555;
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; width: 48px; }
          50% { opacity: 1; width: 64px; }
        }

        /* Grid section */
        .section-header {
          padding: 80px 60px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #1A1A1A;
        }

        .section-label {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #555;
        }

        .section-count {
          font-family: 'Bebas Neue', cursive;
          font-size: 48px;
          color: #1A1A1A;
          letter-spacing: 2px;
        }

        .bulletin-grid {
          padding: 60px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2px;
          background: #111;
        }

        /* Bulletin Card */
        .bulletin-card {
          position: relative;
          background: #0D0D0D;
          cursor: pointer;
          overflow: hidden;
          aspect-ratio: 3/4;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .bulletin-card:hover { transform: scale(0.98); }

        .card-bg-number {
          position: absolute;
          bottom: -20px;
          right: -10px;
          font-family: 'Bebas Neue', cursive;
          font-size: 200px;
          color: #111;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: color 0.4s ease, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .bulletin-card:hover .card-bg-number {
          transform: scale(1.1) translateX(-10px);
        }

        .card-accent-bar {
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 0;
          transition: height 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .bulletin-card:hover .card-accent-bar { height: 100%; }

        .card-content {
          position: relative;
          z-index: 1;
          padding: 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .card-issue {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #444;
          margin-bottom: auto;
          transition: color 0.3s ease;
        }

        .bulletin-card:hover .card-issue { color: #888; }

        .card-title-wrap {
          margin-top: auto;
          margin-bottom: 32px;
        }

        .card-month {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(52px, 6vw, 80px);
          line-height: 0.9;
          letter-spacing: 1px;
          color: #F0EDE6;
          transition: color 0.3s ease;
          display: block;
        }

        .card-year {
          font-size: 11px;
          letter-spacing: 6px;
          color: #333;
          text-transform: uppercase;
          margin-top: 8px;
          transition: color 0.3s ease;
        }

        .bulletin-card:hover .card-year { color: #666; }

        .card-divider {
          width: 40px;
          height: 1px;
          background: #222;
          margin: 20px 0;
          transition: width 0.4s ease, background 0.4s ease;
        }

        .bulletin-card:hover .card-divider { width: 80px; }

        .card-actions {
          display: flex;
          gap: 12px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .bulletin-card:hover .card-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-view {
          flex: 1;
          padding: 12px 16px;
          border: none;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          color: #0A0A0A;
        }

        .btn-download {
          padding: 12px 16px;
          background: transparent;
          border: 1px solid #2A2A2A;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #666;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .btn-download:hover {
          border-color: #555;
          color: #F0EDE6;
        }

        /* No PDF available state */
        .card-unavailable {
          font-size: 10px;
          letter-spacing: 2px;
          color: #2A2A2A;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-unavailable::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2A2A2A;
        }

        /* Horizontal featured card (first item) */
        .bulletin-card.featured {
          grid-column: 1 / -1;
          aspect-ratio: auto;
          min-height: 300px;
        }

        .featured .card-content {
          flex-direction: row;
          align-items: center;
          gap: 80px;
        }

        .featured .card-title-wrap { margin: 0; }

        .featured .card-month { font-size: clamp(80px, 10vw, 140px); }

        .featured .card-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .featured .card-actions {
          opacity: 1;
          transform: none;
        }

        /* PDF Viewer */
        .viewer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.97);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .viewer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 32px;
          border-bottom: 1px solid #1A1A1A;
          background: #050505;
        }

        .viewer-title {
          font-family: 'Bebas Neue', cursive;
          font-size: 28px;
          letter-spacing: 3px;
          color: #F0EDE6;
        }

        .viewer-controls {
          display: flex;
          gap: 8px;
        }

        .viewer-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #1A1A1A;
          background: transparent;
          color: #888;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .viewer-btn:hover { border-color: #444; color: #F0EDE6; }

        .viewer-close:hover { border-color: #FF6B35; color: #FF6B35; }

        .viewer-body { flex: 1; position: relative; }

        .viewer-body iframe { width: 100%; height: 100%; border: none; }

        .viewer-loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050505;
        }

        .loading-text {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #333;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

        .viewer-footer {
          padding: 16px 32px;
          border-top: 1px solid #1A1A1A;
          background: #050505;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .viewer-footer-text {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #333;
        }

        .viewer-download-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #555;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .viewer-download-link:hover { color: #FF6B35; }

        /* Decorative ticker */
        .ticker {
          overflow: hidden;
          border-top: 1px solid #1A1A1A;
          border-bottom: 1px solid #1A1A1A;
          padding: 14px 0;
          background: #050505;
        }

        .ticker-track {
          display: flex;
          gap: 80px;
          animation: ticker 20s linear infinite;
          width: max-content;
        }

        .ticker-item {
          font-family: 'Bebas Neue', cursive;
          font-size: 14px;
          letter-spacing: 6px;
          color: #1E1E1E;
          white-space: nowrap;
          text-transform: uppercase;
        }

        .ticker-dot {
          color: #FF6B35;
          margin: 0 16px;
        }

        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* Footer */
        .page-footer {
          padding: 60px;
          border-top: 1px solid #111;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-brand {
          font-family: 'Bebas Neue', cursive;
          font-size: 24px;
          letter-spacing: 4px;
          color: #222;
        }

        .footer-note {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #333;
        }

        @media (max-width: 768px) {
          .hero { padding: 40px; }
          .section-header, .grid-container, .page-footer { padding: 40px 24px; }
          .bulletin-card { aspect-ratio: 4/5; }
          .featured .card-content { flex-direction: column; gap: 32px; }
          .card-content { padding: 28px; }
          .hero-title { font-size: clamp(56px, 18vw, 120px); }
        }
      `}</style>

      <div className="bulletin-page">
        {/* Cursor glow */}
        <div
          className="cursor-glow"
          style={{ left: mousePos.x, top: mousePos.y }}
        />

        {/* Hero */}
        <section className="hero" ref={heroRef}>
          <div className="hero-bg" />
          <div className="hero-noise" />
          <div className="hero-accent-line" />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="hero-tag">Rotaract KPRCAS · Est. 2025</div>
            <h1 className="hero-title">
              Monthly<br />
              <span>Bulletins</span>
            </h1>
          </div>

          <div className="hero-sub">Read · Explore · Connect</div>

          <div className="hero-scroll">
            <span className="scroll-line" />
            Scroll to explore
          </div>
        </section>

        {/* Ticker */}
        <div className="ticker">
          <div className="ticker-track">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="ticker-item">
                Monthly Bulletin
                <span className="ticker-dot">✦</span>
                Rotaract KPRCAS
                <span className="ticker-dot">✦</span>
                2025 Edition
                <span className="ticker-dot">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Section header */}
        <div className="section-header">
          <span className="section-label">Archive · 2025 Season</span>
          <span className="section-count">0{allBulletins.length}</span>
        </div>

        {/* Cards Grid */}
        <div className="bulletin-grid">
          {allBulletins.map((b, i) => {
            const isHovered = hoveredCard === b.id;
            const hasPdf = !!combinedPdfFiles[b.date];

            return (
              <div
                key={b.id}
                className="bulletin-card"
                onMouseEnter={() => setHoveredCard(b.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Accent bar */}
                <div
                  className="card-accent-bar"
                  style={{ background: b.color }}
                />

                {/* Big background number */}
                <div
                  className="card-bg-number"
                  style={{ color: isHovered ? b.color + '18' : '#111' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="card-content">
                  <div className="card-issue">{b.issue}</div>

                  <div className="card-title-wrap">
                    <span
                      className="card-month"
                      style={{ color: isHovered ? b.color : '#F0EDE6' }}
                    >
                      {b.title}
                    </span>
                    <div className="card-year">{b.year}</div>
                  </div>

                  <div
                    className="card-divider"
                    style={{ background: isHovered ? b.color : '#222' }}
                  />

                  {hasPdf ? (
                    <div className="card-actions">
                      <button
                        className="btn-view"
                        style={{ background: b.color }}
                        onClick={() => handlePdfClick(b.date)}
                      >
                        <FileText size={12} />
                        Read
                        <ChevronRight size={12} />
                      </button>
                      <button
                        className="btn-download"
                        onClick={(e) => handleDownload(b.date, e)}
                      >
                        <Download size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="card-unavailable">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="page-footer">
          <div className="footer-brand">Rotaract KPRCAS</div>
          <div className="footer-note">© 2025 · All Rights Reserved</div>
        </footer>

        {/* PDF Viewer */}
        {isViewerOpen && currentPdf && (
          <PDFViewer
            currentPdf={currentPdf}
            onClose={() => {
              setIsViewerOpen(false);
              if (document.fullscreenElement) document.exitFullscreen();
            }}
            playSound={playSound}
          />
        )}
      </div>
    </>
  );
}

interface PDFViewerProps {
  currentPdf: string;
  onClose: () => void;
  playSound: () => void;
}

function PDFViewer({ currentPdf, onClose, playSound }: PDFViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); playSound(); }
    };
    const handleFsChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKey);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.error);
    }
  };

  return (
    <div className="viewer-overlay" onClick={() => { onClose(); playSound(); }}>
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="viewer-header">
          <div className="viewer-title">Bulletin Viewer</div>
          <div className="viewer-controls">
            <button className="viewer-btn" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button className="viewer-btn viewer-close" onClick={() => { onClose(); playSound(); }}>
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="viewer-body">
          <iframe
            src={currentPdf}
            title="Bulletin PDF"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            style={{ height: 'calc(100vh - 130px)' }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
          {isLoading && (
            <div className="viewer-loading">
              <div className="loading-text">Loading bulletin...</div>
            </div>
          )}
        </div>

        <div className="viewer-footer">
          <span className="viewer-footer-text">Press ESC to close</span>
          <a
            href={currentPdf.replace('/preview', '')}
            download
            className="viewer-download-link"
            onClick={(e) => { e.stopPropagation(); playSound(); }}
          >
            <Download size={12} />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}