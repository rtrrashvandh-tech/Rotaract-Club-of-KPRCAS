import { useState, useEffect, useCallback, useRef } from 'react';
import AnimationWrapper from "@/components/AnimationWrapper";
import { Calendar, Clock, MapPin, Monitor, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { getCustomEvents } from '@/utils/adminData';

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

const events: EventType[] = [
  { title: 'Yours Lovingly', date: '2025-08-24', time: '10:00 AM – 1:00 PM', location: 'Uthavum Karangal, Avinashi', platform: 'In-person', image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.05_8f591faf_dlqyvp.jpg', description: 'A Dream Mental Support Initiative.' },
  { title: 'Lingua Connection', date: '2025-08-25', time: '07:00 PM – 08:00 PM', platform: 'Gmeet', image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.05_3b4f2292_yjzwwh.jpg', description: 'A platform for language exchange and cultural enrichment.' },
  { title: 'அன்பின் மறு உருவம்', date: '2025-08-26', time: '10:00 AM - 1:00 PM', location: 'FAMILY FOR CHILDREN, VELLALOR, CBE.', platform: 'In-person', image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.04_a199c8ac_zeoxqn.jpg', description: 'An initiative to help elderly people.' },
  { title: 'Mattaipandhu 2.0', date: '2025-08-28', location: 'Karumathampatti', platform: 'In-person', image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053140/WhatsApp_Image_2025-08-24_at_21.45.07_224b18e3_fllgx6.jpg', description: 'An initiative to build a community.' },
  { title: 'வெறும் பெண் இல்லை', date: '2025-08-28', location: 'Arasur Govt School', platform: 'In-person', image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.04_c5c998e3_o6x8vz.jpg', description: 'A self-defence learning session for girls.' },
  { title: 'Excelerate - Art of Speaking', date: '2025-08-29', time: '10:00 AM', location: 'Seminar Hall (KPRCAS)', platform: 'In-person', image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053002/WhatsApp_Image_2025-08-24_at_20.52.42_78b8ef19_arjsxf.jpg', description: 'An initiative to enhance communication skills.' },
  { title: 'வளமான கல்விக்காக', date: '2025-08-30', time: '03:00 PM', location: 'Arasur Govt School', platform: 'In-person', image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053014/WhatsApp_Image_2025-08-24_at_21.45.07_f2b2c24d_ldwk5w.jpg', description: 'Books are bridges that connect dreams to reality — donate them.' },
  { title: 'Tharagam - Onam Celebration', date: '2025-09-03', time: '10:00 AM - 1:00 PM', location: 'KPRCAS Campus', platform: 'In-person', image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760281232/PHOTO-2025-09-03-09-22-13_kow0x9.jpg', description: 'The Rotaract Club of KPRCAS proudly celebrated Onam under Tharangam 3.0.' },
  { title: 'Words that Empower', date: '2025-09-08', time: '10:00 AM', location: 'Gmeet', platform: 'Online', image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760285151/Screenshot_2025-10-01-12-32-50-85_99c04817c0de5652397fc8b56c3b3817_s6f6tr.jpg', description: 'Unlock the potential of effective communication and personal growth.' },
  { title: 'RAC-a-THON', date: '2025-09-15', time: '9:00 AM', location: 'KPRCAS Campus', platform: 'In-person', image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287839/IMG-20251001-WA0068_pnyicy.jpg', description: 'A 24-hour hackathon event.' },
  { title: 'Veeram Pen Illai – Self-Defense Training', date: '2025-09-18', time: '10:00 AM', location: 'Vagarayampalayam Government School', platform: 'In-person', image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287144/IMG-20250917-WA0057_jzpqea.jpg', description: 'Empowering women with self-defense training for safety and confidence.' },
  { title: 'Touro quiz', date: '2025-09-27', time: '2:00 PM - 4:00 PM', location: 'Gmeet', platform: 'Online', image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760284629/Screenshot_2025-10-01-12-36-16-82_99c04817c0de5652397fc8b56c3b3817_fordh1.jpg', description: 'An event for quizzing and knowledge celebration.' },
  { title: 'Charity Drive', date: '2025-09-27', time: '2:00 PM - 4:00 PM', platform: 'In-person', image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287422/IMG-20250929-WA0005_xuyg6l.jpg', description: 'An event to raise funds for the needy.' },
  { title: 'Navrang - Navratri Celebration', date: '2025-09-29', time: '2:00 PM - 4:00 PM', location: 'KPRCAS Campus', platform: 'In-person', image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760283820/PHOTO-2025-09-26-21-51-21_mniq4e.jpg', description: 'Celebrating Navratri with vibrant traditions.' },
  { title: 'Innovision', date: '2025-09-29', time: '10:00 AM', location: 'Gmeet', platform: 'Online', image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760285361/IMG-20250926-WA0064_knpsv9.jpg', description: 'Unlock insights for SQL and enhance data understanding.' },
  { title: 'Nalam oru Padhai', date: '2025-10-07', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467685/10_Oct_Nalam_Oru_Pathai_Club_jijdhv.jpg", location: "15-Vellampalyam Government School, Tiruppur", description: 'Health and wellness outreach to build a stronger, healthier community.' },
  { title: 'Feed the Future', date: '2025-10-10', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/IMG-20251006-WA0012_tfllwk.jpg", location: "Family for Children, Vellalore, Coimbatore", description: 'Food distribution drive to support families in need.' },
  { title: 'Anbin maru Uruvam', date: '2025-10-10', platform: 'In-person', image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765464462/IMG-20251126-WA0007_c88v2i.jpg', location: 'Family for Children, Vellalore, Coimbatore', description: 'A compassion-led visit to spread kindness and support.' },
  { title: 'Nambikkai Siragugal', date: '2025-10-13', platform: 'In-person', image: placeholderImage, description: 'Inspiration session to empower students with hope and confidence.' },
  { title: 'Paasathin Pakkangal', date: '2025-10-13', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/IMG-20251009-WA0003_b93rpj.jpg", location: "Universal Peace Foundation, Pogallur", description: 'Celebrating the many facets of empathy and togetherness.' },
  { title: 'One Day Police', date: '2025-10-16', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468126/WhatsApp_Image_2025-12-11_at_8.46.45_PM_ufqwj2.jpg", location: "Coimbatore", description: 'Immersive policing experience for youth (runs Oct 16 – Oct 20).' },
  { title: 'Crewfinity', date: '2025-10-17', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468126/WhatsApp_Image_2025-12-11_at_8.46.45_PM_ufqwj2.jpg", location: "Coimbatore", description: 'Team-building challenge to strengthen collaboration and leadership.' },
  { title: 'Glow and Give', date: '2025-10-22', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/Photo_from_Monisha_n0whms.jpg", location: "SRCAS, Coimbatore", description: 'Evening fundraiser combining art, light, and community giving.' },
  { title: 'Help in Soul', date: '2025-10-26', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467842/10_Oct_Help_in_Soul_Club_limuzn.jpg", location: "Annur Old Town Panchyath, Annur", description: 'Mental health support circle focused on listening and care.' },
  { title: 'We are with you', date: '2025-10-27', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467987/10_Oct_We_are_with_you_Club_dazmz4.jpg", location: "Avinashi Old Bus Stand, Tiruppur", description: 'Solidarity event to stand with those facing challenges.' },
  { title: 'Dude Dayout', date: '2025-10-29', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468130/PHOTO-2025-10-24-21-44-38_d0g4j1.jpg", location: "Mirage cinema", description: 'Fun social outing to unwind and build friendships.' },
  { title: 'Mattai Pandhu 3.O', date: '2025-10-29', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468127/PHOTO-2025-10-24-21-44-38_1_ogc2cj.jpg", location: "Karumathampatti", description: 'Street cricket 3.0 — friendly matches that bring the community together.' },
  { title: 'Rotaween', date: '2025-10-31', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470143/IMG-20251103-WA0009_knttmi.jpg", location: "Sathya Jeevan Home", description: 'Halloween-themed celebration with the club.' },
  { title: 'Vaathi Raid 4.0', date: '2025-10-31', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470133/PHOTO-2025-12-02-15-23-50_t3jjan.jpg", location: "KPRCAS Campus", description: 'The fourth edition of Vaathi Raid.' },
  { title: 'Rotaract Fusion Fiesta', date: '2025-11-02', platform: 'Gmeet', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470132/IMG-20251028-WA0043_1_duvk0h.jpg", description: 'Fusion Fiesta celebrating international service.' },
  { title: 'Cyber Security Awareness', date: '2025-11-08', platform: 'Professional Service', image: placeholderImage, description: 'Workshop on staying safe online.' },
  { title: 'Eegai', date: '2025-11-12', platform: 'Gmeet', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470134/IMG-20251125-WA0012_tsdstk.jpg", description: 'Service initiative focused on giving back.' },
  { title: 'Cleanfluence', date: '2025-11-12', platform: 'In-person', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470132/IMG-20251113-WA0001_scb5pg.jpg", location: "Tinkle sevaa Tribal School", description: 'Cleanliness drive with international collaboration.' },
  { title: 'Bouncing Back', date: '2025-11-12', platform: 'Gmeet', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470790/IMG-20251108-WA0073_lnkx5c.jpg", description: 'Session on resilience and professional growth.' },
  { title: 'Pair and Share', date: '2025-11-13', platform: 'Gmeet', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765471195/PHOTO-2025-11-09-18-16-29_bpbevr.jpg", description: 'Club service activity focused on collaboration.' },
  { title: 'Mind and Me', date: '2025-11-13', platform: 'Gmeet', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470131/IMG-20251112-WA0011_yxsck9.jpg", description: 'Mental wellness and professional development session.' },
  { title: 'View Point', date: '2025-11-21', platform: 'Gmeet', image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470134/IMG-20251120-WA0013_iu5vtf.jpg", description: 'Media, Mindset and Screen Culture.' },
];

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