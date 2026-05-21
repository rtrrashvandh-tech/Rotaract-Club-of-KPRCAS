import { useState, useEffect, useRef, RefObject, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimationWrapper from '@/components/AnimationWrapper';
import { 
  FileText, 
  Download, 
  X, 
  Search, 
  Sparkles, 
  Calendar, 
  BookOpen, 
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  ExternalLink,
  Newspaper
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { getBulletins, getEvents, BulletinType, EventType } from '@/lib/storage';
import { cn } from "@/lib/utils";

// --- Google Drive PDF file IDs ---
const pdfFiles = {
  'July-2025': '1HRRqhiuJIrOzChxt-SfaaFnOWuq-jrdg',
  'August-2025': '1wRTNBYPr2gLsgTdL-Cz4hsdbngBLDqHl',
  'September-2025': '1Fy5mcdadNAo2_u4BOdRK19HCxo_4H5xN',
  'October-2025': '1JoC-BbeoHBoKWpdUvatnVwBRrd1n8Ui1',
};

// --- Helper functions ---
const getPdfViewerUrl = (fileId: string) =>
  `https://drive.google.com/file/d/${fileId}/preview`;

const getPdfDownloadUrl = (fileId: string) =>
  `https://drive.google.com/uc?export=download&id=${fileId}`;

// --- Date sorting helper ---
const monthOrder: Record<string, number> = {
  'july': 7,
  'august': 8,
  'september': 9,
  'october': 10,
  'november': 11,
  'december': 12,
  'january': 1,
  'february': 2,
  'march': 3,
  'april': 4,
  'may': 5,
  'june': 6
};

const getBulletinTimestamp = (dateStr: string) => {
  const parts = dateStr.toLowerCase().split('-');
  const month = parts[0];
  const year = parseInt(parts[1]) || 2025;
  const monthNum = monthOrder[month] || 0;
  return year * 100 + monthNum;
};

// ==========================================
// CINEMATIC BULLETIN CARD COMPONENT
// ==========================================
const CinematicBulletinCard = ({ 
  bulletin,
  events,
  scrollContainerRef, 
  handleReadClick,
  handleDownloadPdf
}: { 
  bulletin: BulletinType; 
  events: EventType[];
  scrollContainerRef: RefObject<HTMLDivElement>; 
  handleReadClick: (fileId: string, title: string) => void;
  handleDownloadPdf: (fileId: string, date: string, e: React.MouseEvent) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  // 3D Transforms (matching Events and Gallery pages perfectly!)
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);

  // Extract events associated with this bulletin's month
  const monthParts = bulletin.date.toLowerCase().split('-');
  const monthName = monthParts[0];
  const yearName = monthParts[1] || '2025';
  
  const bulletinEvents = events.filter(e => {
    if (!e.date) return false;
    const parts = e.date.split('-');
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const monthIndex = parseInt(parts[1]) - 1;
    return months[monthIndex] === monthName;
  });

  return (
    <div style={{ perspective: "1500px" }} className="w-full h-full flex justify-center py-8 px-4">
      <motion.div
        ref={ref}
        style={{
          rotateY,
          scale,
          opacity,
          x,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full max-w-3xl relative group flex flex-col"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-maroon to-gold rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative h-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">

          {/* Media Section (Left Column) */}
          <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-black/40 flex items-center justify-center min-h-[220px] md:min-h-[340px]">
            {/* Ambient Blurred Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none" 
              style={{ backgroundImage: `url(${bulletin.coverImage || 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/club-logo_wsjsmp.png'})` }} 
            />
            
            {/* Dark Overlay for depth */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 md:bg-gradient-to-r pointer-events-none" />
            
            <button
              onClick={() => handleReadClick(bulletin.fileId, `${bulletin.title} Bulletin`)}
              className="w-full h-full focus:outline-none cursor-zoom-in relative z-20 flex items-center justify-center p-6"
            >
              <img
                src={bulletin.coverImage || 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/club-logo_wsjsmp.png'}
                alt={bulletin.title}
                className="max-h-[90%] max-w-[85%] object-contain rounded-xl transition-all duration-700 group-hover:scale-[1.03] shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/5 aspect-[3/4]"
              />
            </button>
          </div>

          {/* Content Section (Right Column) */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/50 text-left">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/30 font-semibold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
                {yearName} Edition
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-gold transition-colors duration-300 uppercase tracking-tight">
              {bulletin.title} Issue
            </h3>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 font-light">
              {bulletin.content || "Official monthly updates, activities, and achievements summary."}
            </p>

            {/* Mapped Key Milestones/Events (Clean, neat bullet list) */}
            {bulletinEvents.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-white/5 mb-4">
                <p className="text-[9.5px] uppercase tracking-[0.15em] text-gold font-black">
                  Key Milestones
                </p>
                <div className="space-y-1">
                  {bulletinEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="flex items-start gap-2 text-xs text-gray-300 group-hover:text-white transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-maroon mt-1.5 shrink-0" />
                      <span className="font-light truncate leading-snug">{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details and Actions */}
            <div className="space-y-4 pt-3 border-t border-white/5">
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <Calendar className="w-4 h-4 text-gold animate-pulse" />
                <span>Published: {bulletin.date}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleReadClick(bulletin.fileId, `${bulletin.title} Bulletin`)}
                  className="flex-1 bg-white/5 hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-white/10 text-white font-extrabold uppercase tracking-widest rounded-full py-2.5 text-[9px] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Read Bulletin
                </button>
                
                <button
                  onClick={(e) => handleDownloadPdf(bulletin.fileId, bulletin.date, e)}
                  className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 p-2.5 flex items-center justify-center shadow-md animate-pulse"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// MAIN BULLETIN COMPONENT
// ==========================================
const Bulletin = () => {
  const [bulletins, setBulletins] = useState<BulletinType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  
  // Reader Modal States
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState('');
  const [viewerTitle, setViewerTitle] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    document.title = 'Bulletins | Rotaract KPRCAS';
    const loadData = () => {
      setBulletins(getBulletins());
      setEvents(getEvents());
    };
    loadData();
    window.addEventListener('storage-synced', loadData);
    return () => window.removeEventListener('storage-synced', loadData);
  }, []);

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const tolerance = 5;
      setCanScrollLeft(el.scrollLeft > tolerance);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
    }
  };

  const handleReadClick = (fileId: string, title: string) => {
    setViewerTitle(title);
    setViewerUrl(getPdfViewerUrl(fileId));
    setViewerOpen(true);
  };

  const handleDownloadPdf = (fileId: string, date: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileId) {
      const link = document.createElement('a');
      link.href = getPdfDownloadUrl(fileId);
      link.download = `bulletin-${date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Chronological Sort: newest first
  const sortedBulletins = useMemo(() => {
    return [...bulletins].sort((a, b) => 
      getBulletinTimestamp(b.date) - getBulletinTimestamp(a.date)
    );
  }, [bulletins]);

  const filteredBulletins = useMemo(() => {
    return sortedBulletins.filter((bulletin) => {
      const matchesSearch = 
        bulletin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bulletin.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const year = bulletin.date.split('-')[1];
      const matchesYear = selectedYear === 'all' || year === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [sortedBulletins, searchQuery, selectedYear]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      updateScrollButtons();
      const timer = setTimeout(updateScrollButtons, 100);

      el.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
      return () => {
        clearTimeout(timer);
        el.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, [filteredBulletins]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-maroon selection:text-white">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10" />
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg"
            alt="Bulletins Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block px-6 py-2 mb-4 text-xs font-semibold tracking-[0.2em] uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gold">
              Weekly & Monthly Chronologies
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase"
          >
            Our Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-600 to-gold">Chronicles</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-sm md:text-base text-gray-300 font-light leading-relaxed max-w-xl mx-auto"
          >
            Browse our carefully documented newsletters, chapter summaries, and achievement records capturing the spirit of our youth leadership.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">Scroll to Explore</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Filter & Search Section - Minimalist Typographic Timeline */}
      <div className="w-full max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Subtle separator and label */}
          <div className="flex items-center gap-4 w-full">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
              </span>
              Seasons
            </span>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full pb-2">
            {/* Borderless seasons row */}
            <div className="flex justify-center gap-x-8 gap-y-2">
              {['all', '2025'].map((year) => {
                const isActive = selectedYear === year;
                return (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={cn(
                      "relative py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none",
                      isActive ? "text-gold" : "text-gray-400 hover:text-white"
                    )}
                  >
                    {year === 'all' ? 'All Seasons' : `${year} Edition`}
                    {isActive && (
                      <motion.span
                        layoutId="activeBulletinTimelineDot"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Compact Search input field */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search bulletins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold/40 rounded-full px-5 py-2 pl-11 text-xs text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-gold/20"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Horizontal Scrolling Bulletin List */}
      <div className="relative w-full max-w-[100vw] pt-6 pb-28 overflow-hidden">
        {filteredBulletins.length > 0 ? (
          <>
            {/* Left Navigation Button */}
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({
                    left: -window.innerWidth * 0.6,
                    behavior: 'smooth'
                  });
                }
              }}
              className={cn(
                "absolute left-4 md:left-8 top-[46%] transform -translate-y-1/2 z-30 bg-black/60 hover:bg-gold/25 hover:border-gold/50 border border-white/10 text-white hover:text-gold w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl active:scale-95 group focus:outline-none",
                canScrollLeft ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
              )}
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            {/* Right Navigation Button */}
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({
                    left: window.innerWidth * 0.6,
                    behavior: 'smooth'
                  });
                }
              }}
              className={cn(
                "absolute right-4 md:right-8 top-[46%] transform -translate-y-1/2 z-30 bg-black/60 hover:bg-gold/25 hover:border-gold/50 border border-white/10 text-white hover:text-gold w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl active:scale-95 group focus:outline-none",
                canScrollRight ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
              )}
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 md:gap-8 pb-1 snap-x snap-mandatory items-stretch [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Left Spacer */}
              <div className="w-[10vw] md:w-[20vw] lg:w-[26vw] flex-shrink-0" />

              {filteredBulletins.map((bulletin, index) => (
                <div key={`${selectedYear}-${index}`} className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[48vw] snap-center">
                  <CinematicBulletinCard
                    bulletin={bulletin}
                    events={events}
                    scrollContainerRef={scrollContainerRef}
                    handleReadClick={handleReadClick}
                    handleDownloadPdf={handleDownloadPdf}
                  />
                </div>
              ))}
              
              {/* Right Spacer */}
              <div className="w-[10vw] md:w-[20vw] lg:w-[26vw] flex-shrink-0" />
            </div>
          </>
        ) : (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <Info className="w-12 h-12 text-gray-500 mx-auto" />
            <p className="text-gray-400 font-light text-sm">No bulletins match your search criteria. Try another search.</p>
            <Button 
              variant="ghost" 
              onClick={() => { setSearchQuery(''); setSelectedYear('all'); }}
              className="text-gold hover:text-gold/80 font-bold uppercase tracking-wider text-xs border border-white/10 hover:border-gold/30 rounded-full px-6 py-2"
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>

      {/* Fullscreen PDF Modal Reader */}
      <AnimatePresence>
        {viewerOpen && viewerUrl && (
          <FullscreenPDFReader
            title={viewerTitle}
            url={viewerUrl}
            onClose={() => setViewerOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

// ==========================================
// CINEMATIC PDF READER MODAL
// ==========================================
interface PDFReaderProps {
  title: string;
  url: string;
  onClose: () => void;
}

const FullscreenPDFReader = ({ title, url, onClose }: PDFReaderProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    } catch (err) {
      console.error('Fullscreen toggle failed:', err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-[99999]"
      onClick={onClose}
    >
      <div
        className="w-full h-full flex flex-col bg-neutral-950 border-white/10 border shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-neutral-900 border-b border-white/10 text-white px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <h2 className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              {title}
            </h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleFullscreen}
              className="text-gray-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="h-4.5 w-4.5" /> : <Maximize2 className="h-4.5 w-4.5" />}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 rounded-full bg-maroon/20 border border-maroon/30 hover:bg-maroon hover:text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Iframe inside dark backdrop */}
        <div className="flex-1 relative bg-black">
          <iframe
            src={url}
            className="w-full h-full border-0 z-0 relative"
            title="PDF Viewer"
            allowFullScreen
            onLoad={() => setIsPdfLoading(false)}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
          {isPdfLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#040101]/80 backdrop-blur z-20 gap-3">
              <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin shadow-2xl" />
              <span className="text-xs font-black tracking-widest text-gold uppercase font-mono animate-pulse">
                Loading Document...
              </span>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="bg-neutral-900 border-t border-white/10 px-6 py-4 flex justify-between items-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-mono">
            Secure Viewer • Google Drive Sandbox Enabled
          </span>
          <a
            href={url.replace('/preview', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gold hover:text-gold/80 flex items-center gap-1.5 font-bold uppercase tracking-wider font-mono hover:underline"
          >
            <ExternalLink className="h-4 w-4" /> Open Original
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Bulletin;
