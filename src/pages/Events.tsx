import { useState, useEffect, useMemo, useRef, RefObject } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimationWrapper from "@/components/AnimationWrapper";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, Globe, Filter, Search, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { getEvents, EventType } from '@/lib/storage';

const placeholderImage = 'https://placehold.co/800x400?text=Event+Poster';

const CinematicEventCard = ({ event, scrollContainerRef, setSelectedImage }: { event: EventType, scrollContainerRef: RefObject<HTMLDivElement>, index: number, setSelectedImage: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  // 3D Transforms
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);

  const eventDate = event.date ? new Date(event.date) : null;
  const day = eventDate?.getDate();
  const monthName = eventDate?.toLocaleString('default', { month: 'short' });

  return (
    <div style={{ perspective: "1500px" }} className="w-full h-full flex justify-center py-2 px-4">
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

          {/* Image Section */}
          <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-black/40 flex items-center justify-center min-h-[220px] md:min-h-[340px]">
            {/* Ambient Blurred Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none" 
              style={{ backgroundImage: `url(${event.image || 'https://placehold.co/800x400?text=Event+Poster'})` }} 
            />
            
            {/* Dark Overlay for depth */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 md:bg-gradient-to-r pointer-events-none" />
            
            <button
              onClick={() => setSelectedImage({ src: event.image || 'https://placehold.co/800x400?text=Event+Poster', alt: event.title })}
              className="w-full h-full focus:outline-none cursor-zoom-in relative z-20 flex items-center justify-center p-6"
            >
              <img
                src={event.image || 'https://placehold.co/800x400?text=Event+Poster'}
                alt={event.title}
                className="max-w-full max-h-full object-contain rounded-xl transition-all duration-700 group-hover:scale-[1.03] shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/5"
              />
            </button>

            {/* Date Badge */}
            {day && monthName && (
              <div className="absolute top-6 left-6 z-30 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-3 min-w-[70px] text-center shadow-2xl">
                <span className="block text-3xl font-bold text-gold leading-none">{day}</span>
                <span className="block text-[11px] font-bold uppercase tracking-widest text-gray-300 mt-2">{monthName}</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/50 text-left">
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/30 font-semibold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
                {event.platform === 'Online' || event.platform === 'Gmeet' ? 'Virtual Experience' : 'Live Event'}
              </Badge>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-gold transition-colors duration-300 uppercase tracking-tight">
              {event.title}
            </h3>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 font-light">
              {event.description}
            </p>

            <div className="space-y-4">
              {event.location && (
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <span className="truncate">{event.location}</span>
                </div>
              )}
              {event.time && (
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <span>{event.time}</span>
                </div>
              )}
              {event.platform && (
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-gold" />
                  </div>
                  <span>{event.platform}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

const Events = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const tolerance = 5; // tolerance for rounding differences
      setCanScrollLeft(el.scrollLeft > tolerance);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
    }
  };

  useEffect(() => {
    const loadEvents = () => setEvents(getEvents());
    loadEvents();
    window.addEventListener('storage-synced', loadEvents);
    return () => window.removeEventListener('storage-synced', loadEvents);
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleClose = () => {
    setSelectedImage(null);
    setZoom(1);
  };

  const availableMonths = useMemo(() => {
    const monthsData = events
      .filter(e => {
        if (!e.date) return false;
        return new Date(e.date).getFullYear() === selectedYear;
      })
      .map(e => {
        const d = new Date(e.date!);
        return {
          name: d.toLocaleString('default', { month: 'long' }),
          index: d.getMonth()
        };
      });

    // Extract unique months and sort them chronologically (by month index 0-11)
    const uniqueSortedMonths = Array.from(
      new Map(monthsData.map(m => [m.name, m])).values()
    )
    .sort((a, b) => a.index - b.index)
    .map(m => m.name);

    return ['All', ...uniqueSortedMonths];
  }, [events, selectedYear]);

  const filteredEvents = useMemo(() => {
    // Filter by selected year first
    let yearEvents = events.filter(event => {
      if (!event.date) return false;
      return new Date(event.date).getFullYear() === selectedYear;
    });

    // Sort chronologically (earliest to latest in the timeline)
    yearEvents = [...yearEvents].sort((a, b) => {
      return new Date(a.date!).getTime() - new Date(b.date!).getTime();
    });

    if (selectedMonth === 'All') return yearEvents;

    return yearEvents.filter(event => {
      const eventMonth = new Date(event.date!).toLocaleString('default', { month: 'long' });
      return eventMonth === selectedMonth;
    });
  }, [selectedMonth, selectedYear, events]);

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
  }, [filteredEvents]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-maroon selection:text-white">
      {/* Cinematic Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10" />
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760281257/PHOTO-2025-09-28-09-55-14_wodjhp.jpg"
            alt="Events Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="inline-block px-6 py-2 mb-8 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gold">
              Experience the Impact
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-600 to-gold">Legacy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Discover the monumental moments that define our journey in service, leadership, and community building.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Filter Section - Minimalist Typographic Timeline */}
      <div className="w-full max-w-4xl mx-auto px-6 py-8 mb-12">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Subtle separator and label */}
          <div className="flex items-center gap-4 w-full">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
              </span>
              Timeline
            </span>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
          </div>

          {/* Year Switcher Tabs */}
          <div className="flex bg-white/5 border border-white/10 rounded-full p-1 shadow-inner relative z-20">
            {[2026, 2025].map((year) => {
              const isYearActive = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setSelectedMonth('All');
                  }}
                  className={cn(
                    "relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 focus:outline-none w-36 text-center z-10",
                    isYearActive ? "text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {isYearActive && (
                    <motion.span
                      layoutId="activeYearBg"
                      className="absolute inset-0 bg-gradient-to-r from-maroon to-red-600 rounded-full z-[-1] shadow-lg shadow-maroon/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {year === 2026 ? "2026 Journey" : "2025 Legacy"}
                </button>
              );
            })}
          </div>

          {/* Borderless months row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {availableMonths.map((month) => {
              const isActive = selectedMonth === month;
              return (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={cn(
                    "relative py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none",
                    isActive ? "text-gold" : "text-gray-400 hover:text-white"
                  )}
                >
                  {month}
                  {isActive && (
                    <motion.span
                      layoutId="activeTimelineDot"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Horizontal Scrolling Event List */}
      <div className="relative w-full max-w-[100vw] pb-32 overflow-hidden">
        {filteredEvents.length > 0 ? (
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
                "absolute left-4 md:left-8 top-[35%] transform -translate-y-1/2 z-30 bg-black/60 hover:bg-gold/25 hover:border-gold/50 border border-white/10 text-white hover:text-gold w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl active:scale-95 group focus:outline-none",
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
                "absolute right-4 md:right-8 top-[35%] transform -translate-y-1/2 z-30 bg-black/60 hover:bg-gold/25 hover:border-gold/50 border border-white/10 text-white hover:text-gold w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl active:scale-95 group focus:outline-none",
                canScrollRight ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
              )}
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 md:gap-8 pb-12 snap-x snap-mandatory items-stretch [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Left Spacer */}
              <div className="w-[10vw] md:w-[20vw] lg:w-[26vw] flex-shrink-0" />

              {filteredEvents.map((event, index) => (
                <div key={`${selectedYear}-${selectedMonth}-${event.id || index}`} className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[48vw] snap-center">
                  <CinematicEventCard
                    event={event}
                    index={index}
                    scrollContainerRef={scrollContainerRef}
                    setSelectedImage={setSelectedImage}
                  />
                </div>
              ))}
              
              {/* Right Spacer */}
              <div className="w-[10vw] md:w-[20vw] lg:w-[26vw] flex-shrink-0" />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
              <Calendar className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">No Events Found</h3>
            <p className="text-gray-400 max-w-md text-lg">
              We couldn't find any events scheduled for {selectedMonth}.
            </p>
            <button
              onClick={() => setSelectedMonth('All')}
              className="mt-8 text-gold font-bold tracking-widest uppercase text-sm hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <span>View All Events</span>
              <div className="w-8 h-[1px] bg-gold" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Cinematic Image Zoom Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={handleClose}>
        <DialogContent className="p-0 max-w-6xl bg-transparent border-none shadow-none flex flex-col items-center justify-center w-screen h-screen">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl z-[-1]" onClick={handleClose} />
          {selectedImage && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
              <div className="absolute top-8 right-8 flex items-center space-x-4 z-50">
                <button
                  onClick={handleZoomOut}
                  className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-3 rounded-full transition-all border border-white/20 shadow-lg active:scale-95 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-3 rounded-full transition-all border border-white/20 shadow-lg active:scale-95 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={handleClose}
                  className="bg-red-500/20 hover:bg-red-500 text-white hover:text-white backdrop-blur-md p-3 rounded-full transition-all border border-red-500/30 hover:border-red-500 shadow-lg active:scale-95 ml-2 cursor-pointer"
                  title="Close Full View"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                src={selectedImage.src}
                alt={selectedImage.alt}
                style={{ transform: `scale(${zoom})` }}
                className="transition-transform duration-300 max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl shadow-black"
              />
              <h2 className="text-white text-2xl font-bold mt-8 tracking-wide text-center">{selectedImage.alt}</h2>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;