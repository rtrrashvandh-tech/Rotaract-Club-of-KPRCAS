import { useState, useEffect, useCallback, useRef } from 'react';
import AnimationWrapper from "@/components/AnimationWrapper";
import { Calendar, Clock, MapPin, Monitor, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { getCustomEvents } from '@/utils/adminData';
import { STATIC_EVENTS } from '@/utils/staticData';

type EventType = {
  title: string;
  date?: string;
  time?: string;
  location?: string;
  platform?: string;
  image: string;
  description: string;
};

const placeholderImage = 'https://placehold.co/800x400?text=Event+Poster';

const events = STATIC_EVENTS as EventType[];

const getPlatformColor = (platform?: string) => {
  if (!platform) return '#6b7280';
  const p = platform.toLowerCase();
  if (p.includes('gmeet') || p.includes('online')) return '#2563eb';
  if (p.includes('person')) return '#16a34a';
  return '#7c3aed';
};

const getPlatformBg = (platform?: string) => {
  if (!platform) return 'rgba(107,114,128,0.18)';
  const p = platform.toLowerCase();
  if (p.includes('gmeet') || p.includes('online')) return 'rgba(37,99,235,0.15)';
  if (p.includes('person')) return 'rgba(22,163,74,0.15)';
  return 'rgba(124,58,237,0.15)';
};

const Events = () => {
  const [allEvents, setAllEvents] = useState<EventType[]>(events);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const thumbRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const custom = await getCustomEvents();
        const combined = [...events, ...custom];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sorted = combined.sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : Infinity;
          const db = b.date ? new Date(b.date).getTime() : Infinity;
          const aIsPast = a.date ? new Date(a.date) < today : false;
          const bIsPast = b.date ? new Date(b.date) < today : false;
          if (aIsPast !== bIsPast) return aIsPast ? 1 : -1;
          if (!aIsPast && !bIsPast) return da - db;
          return db - da;
        });

        setAllEvents(sorted);
      } catch (error) {
        console.error("Failed to fetch custom events:", error);
      }
    };
    fetchEvents();
  }, []);

  const goTo = useCallback((idx: number, dir: 'left' | 'right' = 'right') => {
    if (isAnimating || idx === current) return;
    setDirection(dir);
    setPrev(current);
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => {
      setPrev(null);
      setIsAnimating(false);
    }, 420);
  }, [current, isAnimating]);

  const next = useCallback(() => {
    if (allEvents.length === 0) return;
    goTo((current + 1) % allEvents.length, 'right');
  }, [current, goTo, allEvents.length]);

  const prev2 = useCallback(() => {
    if (allEvents.length === 0) return;
    goTo((current - 1 + allEvents.length) % allEvents.length, 'left');
  }, [current, goTo, allEvents.length]);

  // Auto-play
  useEffect(() => {
    if (autoPlay && allEvents.length > 1) {
      autoRef.current = setInterval(next, 5000);
    }
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [autoPlay, next, allEvents.length]);

  // Scroll thumbnail into view
  useEffect(() => {
    const container = thumbRef.current;
    if (!container) return;
    const thumb = container.children[current] as HTMLElement;
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [current]);

  if (allEvents.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  const event = allEvents[current];
  const prevEvent = prev !== null ? allEvents[prev] : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isEventPast = event?.date ? new Date(event.date) < today : false;

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* HERO */}
      <section className="relative h-[42vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg"
            alt="Events Hero"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35)' }}
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <AnimationWrapper>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-3 tracking-tight" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}>
              Our Events
            </h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto opacity-80">
              Moments that make a difference — explore every event we've brought to life.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* SLIDESHOW SECTION */}
      <div className="container mx-auto px-4 py-10" style={{ maxWidth: 1100 }}>

        {/* MAIN SLIDE */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{ height: 480, background: '#1a1a2e' }}
        >
          {/* Previous slide (exit) */}
          {prevEvent && (
            <div
              key={`prev-${prev}`}
              className="absolute inset-0"
              style={{
                animation: `slideExit${direction === 'right' ? 'Left' : 'Right'} 0.42s cubic-bezier(.4,0,.2,1) forwards`,
              }}
            >
              <img src={prevEvent.image} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.45)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent 80%)' }} />
            </div>
          )}

          {/* Current slide (enter) */}
          <div
            key={`curr-${current}`}
            className="absolute inset-0"
            style={{
              animation: isAnimating
                ? `slideEnter${direction === 'right' ? 'Right' : 'Left'} 0.42s cubic-bezier(.4,0,.2,1) forwards`
                : 'none',
            }}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.45)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 35%, transparent 75%)' }} />

            {/* Slide content */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {event.date && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', backdropFilter: 'blur(6px)' }}>
                    📅 {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
                {event.platform && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: getPlatformBg(event.platform), color: getPlatformColor(event.platform), backdropFilter: 'blur(6px)' }}>
                    {event.platform}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-white font-extrabold leading-tight mb-2"
                style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                {event.title}
              </h2>

              {/* Description */}
              <p className="text-white/75 text-sm md:text-base mb-3 max-w-2xl leading-relaxed line-clamp-2">
                {event.description}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 text-white/70 text-xs">
                {event.time && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="opacity-70" /> {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="opacity-70" /> {event.location}
                  </span>
                )}
              </div>
            </div>

            {/* Counter */}
            <div className="absolute top-5 right-6 text-white/60 text-xs font-medium tabular-nums"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
              {current + 1} / {allEvents.length}
            </div>
          </div>

          {/* Arrow Buttons */}
          <button
            onClick={() => { setAutoPlay(false); prev2(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full transition-all duration-200"
            style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >
            <ChevronLeft size={22} color="#fff" />
          </button>
          <button
            onClick={() => { setAutoPlay(false); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full transition-all duration-200"
            style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >
            <ChevronRight size={22} color="#fff" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setAutoPlay(p => !p)}
            className="absolute top-5 left-5 z-20 flex items-center justify-center rounded-full transition-all duration-200"
            style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
            title={autoPlay ? 'Pause' : 'Play'}
          >
            {autoPlay ? <Pause size={15} color="#fff" /> : <Play size={15} color="#fff" />}
          </button>

          {/* Progress Bar */}
          {autoPlay && (
            <div
              key={`progress-${current}-${autoPlay}`}
              className="absolute bottom-0 left-0 h-[3px] z-30 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #818cf8)',
                animation: 'progressBar 4s linear forwards',
              }}
            />
          )}
        </div>

        {/* DOT INDICATORS */}
        <div className="flex justify-center gap-1.5 mt-5 flex-wrap px-4">
          {allEvents.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAutoPlay(false); goTo(i, i > current ? 'right' : 'left'); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? '#7c3aed' : 'rgba(0,0,0,0.15)',
              }}
            />
          ))}
        </div>

        {/* THUMBNAIL STRIP */}
        <div
          ref={thumbRef}
          className="flex gap-3 mt-6 pb-3 overflow-x-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(124,58,237,0.3) transparent' }}
        >
          {allEvents.map((ev, i) => (
            <button
              key={i}
              onClick={() => { setAutoPlay(false); goTo(i, i > current ? 'right' : 'left'); }}
              className="flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 relative group"
              style={{
                width: 120,
                height: 80,
                border: i === current ? '2.5px solid #a78bfa' : '2.5px solid transparent',
                boxShadow: i === current ? '0 0 0 3px rgba(167,139,250,0.3)' : 'none',
                opacity: i === current ? 1 : 0.55,
                transform: i === current ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" loading="lazy" />
              <div
                className="absolute inset-0 flex items-end p-1.5"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 50%, transparent 100%)' }}
              >
                <span className="text-white text-[9px] font-semibold leading-tight line-clamp-2 text-left">
                  {ev.title}
                </span>
              </div>
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: 'rgba(167,139,250,0.15)' }} />
            </button>
          ))}
        </div>

        {/* DETAIL CARD BELOW SLIDER */}
        <div
          key={current}
          className="mt-6 rounded-2xl p-6 grid md:grid-cols-4 gap-4"
          style={{
            background: '#f8f7ff',
            border: '1px solid #e9e0ff',
            animation: 'fadeUp 0.4s ease forwards',
          }}
        >
          {[
            event.date && { icon: <Calendar size={16} />, label: 'Date', value: new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) },
            event.time && { icon: <Clock size={16} />, label: 'Time', value: event.time },
            event.location && { icon: <MapPin size={16} />, label: 'Location', value: event.location },
            event.platform && { icon: <Monitor size={16} />, label: 'Platform', value: event.platform },
          ].filter(Boolean).map((item: any, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                <p className="text-sm text-gray-800 font-medium leading-snug">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <footer
          className="mt-12 py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-widest uppercase text-gray-400"
        >
          <span>© 2025 · All Rights Reserved</span>
          <span className="font-bold text-gray-900">Rotaract Club of KPRCAS</span>
        </footer>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideEnterRight {
          from { transform: translateX(60px); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
        @keyframes slideEnterLeft {
          from { transform: translateX(-60px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideExitLeft {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(-60px); opacity: 0; }
        }
        @keyframes slideExitRight {
          from { transform: translateX(0);   opacity: 1; }
          to   { transform: translateX(60px); opacity: 0; }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <footer style={{
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        background: '#0a0a0a',
        marginTop: 'auto'
      }}>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          © 2025 · All Rights Reserved
        </div>
        <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '0.85rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
          Rotaract Club of KPRCAS
        </div>
      </footer>
    </div>
  );
};

export default Events;