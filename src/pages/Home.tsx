import { useEffect, useState, useRef, RefObject } from 'react';
import { Users, Calendar, Award, ArrowRight, Heart, Target, Eye, Sparkles, BookOpen, Camera, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';

// External image URLs
const heroBanner = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/hero-banner_sqahw4.jpg";
const communityService = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755328575/IMG_2630_lfgtit.jpg";
const teamPhoto = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg";
const rotaryLogos = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/Rotary_Logo_UFG_Azure_poxpg1.png";
const kprLogo = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/kprcas_cheoab.png";
const clubLogo = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/club-logo_wsjsmp.png";

// Highly responsive animated number counter triggered on scroll
const AnimatedCounter = ({ value, duration = 1.2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const target = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const hasPlus = value.includes('+');

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasAnimated(true);
        let start = 0;
        const totalMilliseconds = duration * 1000;
        const steps = 50;
        const stepTime = totalMilliseconds / steps;
        const increment = target / steps;
        
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          if (currentStep >= steps) {
            clearInterval(timer);
            setCount(target);
          } else {
            setCount(Math.floor(increment * currentStep));
          }
        }, stepTime);
      }
    }, { threshold: 0.1 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count}{hasPlus ? '+' : ''}</span>;
};

// Premium glowing horizontal progress line triggered on scroll
const StatProgressBar = ({ color, value }: { color: string; value: string }) => {
  const [fillWidth, setFillWidth] = useState('0%');
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let pct = '90%';
        if (value.includes('40')) pct = '80%';
        if (value.includes('50')) pct = '85%';
        if (value.includes('25')) pct = '70%';
        if (value.includes('1000')) pct = '96%';
        
        setTimeout(() => setFillWidth(pct), 200);
      }
    }, { threshold: 0.1 });
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);
  
  return (
    <div ref={ref} className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden relative">
      <div 
        style={{ width: fillWidth }}
        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
      />
    </div>
  );
};

// ==========================================
// CINEMATIC PILLAR CARD COMPONENT
// ==========================================
const CinematicPillarCard = ({ 
  pillar,
  scrollContainerRef
}: { 
  pillar: any;
  scrollContainerRef: RefObject<HTMLDivElement>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);

  const Icon = pillar.icon;

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

          {/* Left Column (Icon Section) */}
          <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-black/40 flex items-center justify-center min-h-[220px] md:min-h-[340px]">
            {/* Ambient Blurred background duplicate */}
            <div 
              className={`absolute inset-0 opacity-20 blur-2xl scale-110 pointer-events-none z-0 bg-gradient-to-br ${pillar.hoverBg}`} 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 md:bg-gradient-to-r pointer-events-none" />
            
            <div className="relative z-20 flex flex-col items-center justify-center p-6 text-center select-none">
              <div 
                className="w-24 h-24 rounded-3xl border border-white/10 flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.5)] mb-4 group-hover:scale-110 transition-transform duration-500"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: '#D4AF37'
                }}
              >
                <Icon className="w-12 h-12 text-gold" />
              </div>
              <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-mono">Rotaract KPRCAS</span>
              <h4 className="text-white text-md font-bold mt-1 font-mono tracking-widest uppercase">{pillar.tagline}</h4>
            </div>
          </div>

          {/* Right Column (Content Section) */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/50 text-left">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/30 font-semibold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
                Core Pillar
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-gold transition-colors duration-300 uppercase tracking-tight">
              {pillar.title}
            </h3>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-light">
              {pillar.description}
            </p>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors duration-300">Discover projects</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold group-hover:text-black transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

const Home = () => {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const [hoveredPortal, setHoveredPortal] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // References for 3D cursor tracking container
  const heroRightRef = useRef<HTMLDivElement>(null);
  
  // Motion Values for real-time cursor coordinate tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking
  const springX = useSpring(mouseX, { stiffness: 90, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 18 });

  // Transform coordinates into degrees for 3D card tilt
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  // Transform translation to create deep multi-layered parallax
  const cardLeftX = useTransform(springX, [-0.5, 0.5], [-30, 10]);
  const cardLeftY = useTransform(springY, [-0.5, 0.5], [-20, 10]);

  const cardRightX = useTransform(springX, [-0.5, 0.5], [10, -30]);
  const cardRightY = useTransform(springY, [-0.5, 0.5], [10, -20]);

  useEffect(() => {
    document.title = 'Rotaract Club of KPRCAS | Youth Leadership & Service';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Rotaract Club of KPRCAS: Empowering youth through service, leadership, and fellowship. Discover events, join our club, and make an impact.');
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const tolerance = 5;
      setCanScrollLeft(el.scrollLeft > tolerance);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      updateScrollButtons();
      el.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
      return () => {
        el.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const el = heroRightRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set((x / rect.width) - 0.5);
    mouseY.set((y / rect.height) - 0.5);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Synchronized color ambient glow blobs calculation
  const getAmbientGlow = () => {
    // Pillars
    if (hoveredPillar === 0) return { blob1: 'bg-gold/30', blob2: 'bg-amber-500/10' };
    if (hoveredPillar === 1) return { blob1: 'bg-red-700/35', blob2: 'bg-maroon/20' };
    if (hoveredPillar === 2) return { blob1: 'bg-pink-600/30', blob2: 'bg-purple-800/15' };
    
    // Portals
    if (hoveredPortal === 0) return { blob1: 'bg-red-600/30', blob2: 'bg-orange-500/15' };
    if (hoveredPortal === 1) return { blob1: 'bg-gold/30', blob2: 'bg-amber-600/15' };
    if (hoveredPortal === 2) return { blob1: 'bg-purple-600/30', blob2: 'bg-pink-500/15' };
    if (hoveredPortal === 3) return { blob1: 'bg-cyan-500/35', blob2: 'bg-teal-500/15' };
    if (hoveredPortal === 4) return { blob1: 'bg-pink-600/30', blob2: 'bg-rose-500/20' };

    // Default rich color cosmos
    return { blob1: 'bg-maroon/25', blob2: 'bg-gold/10' };
  };

  const ambient = getAmbientGlow();

  const stats = [
    { icon: Users, label: 'Active Members', value: '40+', desc: 'Dedicated Rotaractors', color: 'from-gold via-yellow-500 to-amber-600', textGlow: 'text-gold' },
    { icon: Calendar, label: 'Events Organized', value: '50+', desc: 'Community footprints', color: 'from-maroon via-red-600 to-rose-700', textGlow: 'text-red-500' },
    { icon: Award, label: 'Awards Won', value: '25+', desc: 'Recognized excellence', color: 'from-gold via-amber-500 to-yellow-600', textGlow: 'text-amber-500' },
    { icon: Heart, label: 'Lives Impacted', value: '1000+', desc: 'Direct social impact', color: 'from-maroon via-pink-600 to-purple-800', textGlow: 'text-pink-500' },
  ];

  const pillars = [
    {
      icon: Target,
      title: 'Leadership Development',
      tagline: 'Lead with purpose',
      description: 'Step into governance roles, manage real service projects, coordinate large events, and participate in exclusive public speaking and leadership training academies.',
      color: 'rgba(212,175,55,0.4)',
      glow: 'shadow-[0_0_50px_rgba(212,175,55,0.3)]',
      border: 'border-gold/30 hover:border-gold/60',
      gradient: 'from-gold/20 via-transparent to-transparent',
      hoverBg: 'from-gold/15 via-gold/5 to-transparent',
      accentColor: 'text-gold'
    },
    {
      icon: Heart,
      title: 'Community Service',
      tagline: 'Service Above Self',
      description: 'Make sustainable impacts. Organize rural developmental camps, blood donation drives, educational programs, and environmental cleanups directly in our community.',
      color: 'rgba(128,0,0,0.5)',
      glow: 'shadow-[0_0_50px_rgba(239,68,68,0.25)]',
      border: 'border-maroon/40 hover:border-red-600/50',
      gradient: 'from-maroon/20 via-transparent to-transparent',
      hoverBg: 'from-maroon/25 via-maroon/5 to-transparent',
      accentColor: 'text-red-500'
    },
    {
      icon: Users,
      title: 'Professional Networking',
      tagline: 'Global Fellowship',
      description: 'Connect with international Rotaractors, elite Rotarians, industry leaders, and academic alumni to gain mentorships, references, and lifelong career growth.',
      color: 'rgba(192,38,75,0.4)',
      glow: 'shadow-[0_0_50px_rgba(192,38,75,0.3)]',
      border: 'border-pink-600/30 hover:border-pink-500/50',
      gradient: 'from-pink-600/10 via-transparent to-transparent',
      hoverBg: 'from-pink-600/20 via-pink-600/5 to-transparent',
      accentColor: 'text-pink-500'
    },
  ];

  // Portal Universe items connecting deep pages
  const portalItems = [
    {
      title: "The Legacy",
      subtitle: "EVENTS",
      description: "Witness the historic footprint of our community projects, camps, and collaborations.",
      path: "/events",
      icon: Calendar,
      color: "from-red-600 via-rose-500 to-orange-500",
      shadow: "shadow-[0_0_40px_rgba(239,68,68,0.25)]",
      glowBg: "rgba(239,68,68,0.08)",
      badge: "50+ Organized",
      tagline: "Relive our achievements"
    },
    {
      title: "The Leadership",
      subtitle: "BOARD",
      description: "Meet the executive members, staff coordinators, and directors steering the club.",
      path: "/team",
      icon: Users,
      color: "from-gold via-amber-500 to-yellow-600",
      shadow: "shadow-[0_0_40px_rgba(212,175,55,0.25)]",
      glowBg: "rgba(212,175,55,0.08)",
      badge: "Core Board",
      tagline: "Meet our directors"
    },
    {
      title: "The Chronologies",
      subtitle: "BULLETINS",
      description: "Browse our official weekly newsletters, achievement records, and monthly updates.",
      path: "/bulletin",
      icon: BookOpen,
      color: "from-purple-600 via-pink-500 to-indigo-600",
      shadow: "shadow-[0_0_40px_rgba(168,85,247,0.25)]",
      glowBg: "rgba(168,85,247,0.08)",
      badge: "Weekly Reads",
      tagline: "Weekly news archive"
    },
    {
      title: "The Canvas",
      subtitle: "GALLERY",
      description: "View high-definition captures of our fellowships, campaigns, and outdoor milestones.",
      path: "/gallery",
      icon: Camera,
      color: "from-cyan-500 via-teal-500 to-emerald-500",
      shadow: "shadow-[0_0_40px_rgba(6,182,212,0.25)]",
      glowBg: "rgba(6,182,212,0.08)",
      badge: "500+ Captures",
      tagline: "A timeline in snapshots"
    },
    {
      title: "The Brotherhood",
      subtitle: "JOIN US",
      description: "Unlock public speaking roles, community fellowships, and solid professional mentors.",
      path: "/join",
      icon: UserPlus,
      color: "from-pink-600 via-rose-500 to-purple-800",
      shadow: "shadow-[0_0_40px_rgba(236,72,153,0.25)]",
      glowBg: "rgba(236,72,153,0.08)",
      badge: "Chartered 2024",
      tagline: "Become a member"
    }
  ];

  return (
    <div className="min-h-screen bg-[#040101] text-white selection:bg-maroon selection:text-white overflow-hidden relative">
      
      {/* Living Colorful Ambient Cosmos Background Glows */}
      <motion.div 
        animate={{ 
          x: [0, 90, -70, 0],
          y: [0, -110, 80, 0],
          scale: [1, 1.15, 0.9, 1]
        }}
        transition={{ 
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-1/6 left-1/5 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none z-0 transition-colors duration-700 ${ambient.blob1}`} 
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 100, 0],
          y: [0, 90, -90, 0],
          scale: [1, 0.85, 1.15, 1]
        }}
        transition={{ 
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className={`absolute bottom-1/5 right-1/5 w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none z-0 transition-colors duration-700 ${ambient.blob2}`} 
      />

      {/* Dynamic Cyan/Purple drift orbs */}
      <motion.div 
        animate={{ 
          x: [0, 60, -60, 0],
          y: [0, 60, -60, 0],
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/2 left-2/3 w-[350px] h-[350px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ 
          x: [0, -50, 50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-cyan-950/15 rounded-full blur-[130px] pointer-events-none z-0" 
      />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80000008_1px,transparent_1px),linear-gradient(to_bottom,#80000008_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 lg:pt-0 z-10 px-4">
        <div className="container-custom max-w-7xl w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <AnimationWrapper>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 mb-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md text-gold shadow-[0_5px_25px_rgba(212,175,55,0.12)] text-xs md:text-sm font-bold uppercase tracking-[0.2em]"
                >
                  <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
                  Fellowship Through Service
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight relative">
                  Discover the
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-gold via-pink-500 via-orange-500 to-amber-500 animate-pulse-slow">
                    Visionary Force
                  </span>
                  of Rotaract
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl">
                  Welcome to the **Rotaract Club of KPRCAS**. We empower young leaders, drive monumental service projects, and build international friendships.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 pt-4 max-w-md">
                  <Link to="/join" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-white/20 text-white bg-gradient-to-r from-maroon to-red-800 hover:shadow-[0_0_35px_rgba(128,0,0,0.6)] hover:scale-[1.02] transition-all duration-300 active:scale-95">
                      Join Our Club
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/events" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-gold/40 text-gold bg-gold/5 backdrop-blur-sm hover:text-black hover:bg-gold hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all duration-300 active:scale-95">
                      View Events
                    </Button>
                  </Link>
                </div>
              </AnimationWrapper>
            </div>
            
            {/* Right Column: Hyper-Interactive Cursor-Tracking 3D Card Stack */}
            <div 
              ref={heroRightRef}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              className="lg:col-span-5 relative h-[400px] md:h-[500px] w-full flex items-center justify-center"
            >
              <AnimationWrapper delay={200} className="w-full h-full flex items-center justify-center">
                <motion.div 
                  style={{
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                  className="relative w-full h-[320px] md:h-[420px] max-w-[340px] md:max-w-[400px] cursor-grab active:cursor-grabbing flex items-center justify-center"
                >
                  {/* Glowing halo backdrop */}
                  <div className="absolute inset-0 bg-maroon/20 rounded-[3rem] blur-3xl scale-110 pointer-events-none z-0 animate-pulse" />

                  {/* 1. Left/Underlay Card (Community Service) */}
                  <motion.div
                    style={{
                      x: isMobile ? 0 : cardLeftX,
                      y: isMobile ? 0 : cardLeftY,
                      transformStyle: "preserve-3d"
                    }}
                    whileHover={{ scale: 1.05, zIndex: 30 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="absolute inset-0 p-2 bg-black/70 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.65)] w-full h-full -rotate-8 -translate-x-8 -translate-y-4 hover:rotate-0 hover:-translate-x-0 hover:-translate-y-0 transition-transform duration-500 select-none cursor-pointer"
                  >
                    <div className="h-full rounded-[2rem] overflow-hidden border border-white/5 relative">
                      <img 
                        src={communityService} 
                        alt="Community Service Project"
                        className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                        draggable="false"
                      />
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/85 border border-white/10 backdrop-blur-md shadow-2xl">
                        <span className="text-[10px] text-red-400 uppercase font-extrabold tracking-wider">Service Project</span>
                        <h4 className="text-white text-sm font-black mt-1">Transforming Local Lives</h4>
                      </div>
                    </div>
                  </motion.div>

                  {/* 2. Right/Underlay Card (Professional Networking / Members) */}
                  <motion.div
                    style={{
                      x: isMobile ? 0 : cardRightX,
                      y: isMobile ? 0 : cardRightY,
                      transformStyle: "preserve-3d"
                    }}
                    whileHover={{ scale: 1.05, zIndex: 30 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="absolute inset-0 p-2 bg-black/70 backdrop-blur-xl border border-pink-500/10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.65)] w-full h-full rotate-8 translate-x-8 translate-y-4 hover:rotate-0 hover:-translate-x-0 hover:-translate-y-0 transition-transform duration-500 select-none cursor-pointer"
                  >
                    <div className="h-full rounded-[2rem] overflow-hidden border border-white/5 relative">
                      <img 
                        src={teamPhoto} 
                        alt="Rotaract Team and Fellows"
                        className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                        draggable="false"
                      />
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/85 border border-pink-600/10 backdrop-blur-md shadow-2xl">
                        <span className="text-[10px] text-pink-400 uppercase font-extrabold tracking-wider">Global Fellowship</span>
                        <h4 className="text-white text-sm font-black mt-1">Professional Leadership Links</h4>
                      </div>
                    </div>
                  </motion.div>

                  {/* 3. Center/Featured Card (District Banner) */}
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: 2, zIndex: 40 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="absolute inset-0 p-2 bg-black/90 backdrop-blur-xl border border-gold/40 rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.85)] w-full h-full scale-[0.98] select-none cursor-pointer"
                  >
                    <div className="h-full rounded-[2rem] overflow-hidden border border-white/5 relative group">
                      <img 
                        src={heroBanner} 
                        alt="Rotaract Leadership Banner"
                        className="w-full h-full object-cover" 
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
                      
                      {/* Sweeping dynamic reflection block */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-gradient-to-r from-maroon/90 to-black/80 border border-gold/30 backdrop-blur-md shadow-2xl">
                        <span className="text-[10px] text-gold uppercase font-extrabold tracking-wider">Chartered Campus</span>
                        <h4 className="text-white text-sm font-black mt-1">District Fellowship 3206</h4>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimationWrapper>
            </div>
            
          </div>
        </div>
      </section>

      {/* Official Chartered Logos Panel */}
      <section className="py-16 relative z-10 border-y border-white/5 bg-black/60 backdrop-blur-md">
        <div className="container-custom px-4">
          <AnimationWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4 text-center lg:text-left">
                <span className="text-xs uppercase text-gold font-bold tracking-widest">Affiliations & Roots</span>
                <h3 className="text-2xl font-black text-white mt-1">Officially Chartered Under Rotary International</h3>
              </div>

              <div className="lg:col-span-8 grid grid-cols-3 gap-4 items-center justify-items-center">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 w-full flex items-center justify-center h-20 group">
                  <img src={rotaryLogos} alt="Rotary Logo" className="max-h-12 w-auto object-contain brightness-95 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 w-full flex items-center justify-center h-20 group">
                  <img src={clubLogo} alt="Club Logo" className="max-h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 w-full flex items-center justify-center h-20 group">
                  <img src={kprLogo} alt="KPRCAS Logo" className="max-h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
              </div>

            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Interactive Core Pillars of Rotaract */}
      <section className="py-28 relative z-10 border-b border-white/5 bg-black/20">
        <div className="container-custom px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.2em] uppercase bg-maroon/20 border border-maroon/30 rounded-full text-red-400 mb-4">
              Explore Our Core Pillars
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              The Spheres of <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-500 to-gold">Impact</span>
            </h2>
            <p className="text-gray-400 text-lg font-light mt-4 leading-relaxed">
              We design every single project around three core developmental areas. Hover over each sphere below to watch their energetic colors expand.
            </p>
          </div>

          {/* 3D Horizontal Scrolling Pillars Carousel */}
          <div className="relative w-full max-w-[100vw] overflow-hidden -mx-4 md:-mx-8">
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
                "absolute left-4 md:left-8 top-[50%] transform -translate-y-1/2 z-30 bg-black/60 hover:bg-gold/25 hover:border-gold/50 border border-white/10 text-white hover:text-gold w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl active:scale-95 group focus:outline-none",
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
                "absolute right-4 md:right-8 top-[50%] transform -translate-y-1/2 z-30 bg-black/60 hover:bg-gold/25 hover:border-gold/50 border border-white/10 text-white hover:text-gold w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl active:scale-95 group focus:outline-none",
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

              {pillars.map((pillar, index) => (
                <div key={pillar.title} className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[48vw] snap-center">
                  <CinematicPillarCard
                    pillar={pillar}
                    scrollContainerRef={scrollContainerRef}
                  />
                </div>
              ))}
              
              {/* Right Spacer */}
              <div className="w-[10vw] md:w-[20vw] lg:w-[26vw] flex-shrink-0" />
            </div>
          </div>

        </div>
      </section>

      {/* NEW SECTION: "Explore Our Universe" (The Portal Gateway) */}
      <section className="py-28 relative z-10 border-b border-white/5 bg-gradient-to-b from-transparent to-black/35">
        <div className="container-custom px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.2em] uppercase bg-gold/10 border border-gold/20 rounded-full text-gold mb-4">
              Step Into Our Chapters
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Universe</span>
            </h2>
            <p className="text-gray-400 text-lg font-light mt-4 leading-relaxed">
              Unlock the portals below to deep dive into each segment of our organization. Witness the full impact of our actions, leaders, and bulletins.
            </p>
          </div>

          {/* Dynamic Flex Accordion Portal Grid */}
          <div className="flex flex-col lg:flex-row gap-5 lg:h-[460px] w-full mt-10">
            {portalItems.map((item, index) => {
              const Icon = item.icon;
              const isHovered = hoveredPortal === index;
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setHoveredPortal(index)}
                  onMouseLeave={() => setHoveredPortal(null)}
                  style={{
                    backgroundColor: isHovered ? item.glowBg : 'rgba(255,255,255,0.03)',
                    transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                  className={`relative rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col justify-between p-8 md:p-10 select-none cursor-pointer w-full transition-all duration-500 ${
                    isHovered 
                      ? `lg:flex-[2.5] ${item.shadow} border-white/20` 
                      : 'lg:flex-[1] border-white/5 lg:opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* Backdrop moving gradient glow highlight */}
                  <div 
                    style={{
                      background: isHovered ? `radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))` : undefined
                    }}
                    className={`absolute -inset-24 bg-gradient-to-r ${item.color} opacity-[0.06] blur-[60px] pointer-events-none rounded-full transition-all duration-500`}
                  />

                  {/* Header info */}
                  <div className="flex justify-between items-start w-full relative z-10">
                    <div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center border text-white transition-all duration-500 bg-white/5 border-white/10`}
                      style={{
                        background: isHovered ? `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))` : undefined,
                        borderColor: isHovered ? 'rgba(255,255,255,0.3)' : undefined,
                        boxShadow: isHovered ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : undefined
                      }}
                    >
                      <Icon className={`w-6 h-6 transition-transform duration-500 ${isHovered ? 'scale-110 text-white' : 'text-gray-300'}`} />
                    </div>
                    
                    <span 
                      style={{ transition: 'all 0.4s' }}
                      className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest border transition-all ${
                        isHovered 
                          ? `bg-gradient-to-r ${item.color} text-white border-transparent` 
                          : 'bg-white/5 text-gray-400 border-white/5'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Dynamic Middle/Bottom Typography Details */}
                  <div className="mt-12 lg:mt-0 flex flex-col justify-end w-full relative z-10">
                    
                    <span className="text-[10px] text-gold uppercase tracking-[0.25em] font-extrabold block mb-1">
                      {item.subtitle}
                    </span>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-none tracking-tight">
                      {item.title}
                    </h3>
                    
                    {/* Animated vertical text capsule */}
                    <div 
                      style={{ 
                        maxHeight: isMobile || isHovered ? '160px' : '0px', 
                        opacity: isMobile || isHovered ? 1 : 0,
                        transition: 'all 0.5s ease-out'
                      }}
                      className="overflow-hidden space-y-4"
                    >
                      <p className="text-gray-300 text-xs font-light leading-relaxed mt-3">
                        {item.description}
                      </p>
                      
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-extrabold block">
                        {item.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Lower interactive indicator */}
                  <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center w-full relative z-10">
                    <Link to={item.path} className="w-full">
                      <button 
                        style={{ transition: 'all 0.4s' }}
                        className={`w-full flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest transition-all ${
                          isHovered ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                        }`}
                      >
                        <span>Portal Open</span>
                        <div 
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300`}
                          style={{
                            borderColor: isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
                            background: isHovered ? `linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))` : undefined
                          }}
                        >
                          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`} />
                        </div>
                      </button>
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Asymmetric Stats & Animated Dial Block */}
      <section className="py-24 relative z-10 border-b border-white/5 bg-black/40">
        <div className="container-custom px-4">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs uppercase text-gold font-bold tracking-[0.2em]">Our Footprints</span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-none">The Metrics of Our Global Drive</h2>
              <p className="text-gray-400 text-md leading-relaxed font-light">
                Numbers tell only a fraction of our story. Behind every milestone lies the absolute dedication of dozens of students shaping their local communities.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-maroon to-gold rounded-full" />
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <AnimationWrapper key={stat.label} delay={index * 120}>
                  <div className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/30 rounded-[2rem] p-8 flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                    
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 text-white shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className={`text-4xl font-black text-white group-hover:${stat.textGlow} transition-colors duration-300 leading-none`}>
                          <AnimatedCounter value={stat.value} />
                        </h4>
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block mt-1">{stat.label}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <span className="text-[10px] text-gray-500 block font-light">{stat.desc}</span>
                      <StatProgressBar color={stat.color} value={stat.value} />
                    </div>

                  </div>
                </AnimationWrapper>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Visual About Showcase */}
      <section className="py-28 relative z-10">
        <div className="container-custom px-4">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1">
              <AnimationWrapper delay={150}>
                <div className="relative p-3 bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-gold/30 transition-all duration-500">
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5">
                    <img
                      src={communityService}
                      alt="Community Service Projects"
                      className="rounded-[2.5rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </div>
                </div>
              </AnimationWrapper>
            </div>

            <div className="lg:col-span-6 space-y-8 order-1 lg:order-2 text-left">
              <AnimationWrapper>
                <div className="space-y-4">
                  <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase bg-gold/10 border border-gold/20 rounded-full text-gold">
                    Our Mission
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
                    Building Leaders,
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-500 to-gold mt-2">Serving Communities</span>
                  </h2>
                </div>
                
                <p className="text-lg text-gray-400 font-light leading-relaxed pt-4">
                  We believe in the immense potential of college youth to foster sustainable social changes. Through Rotaract, students collaborate to host blood camps, literacy seminars, environmental drives, and international cultural exchanges.
                </p>
                
                <div className="space-y-5 pt-4">
                  <div className="flex items-center space-x-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Eye className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Vision</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Creating inspired youth who lead with professional ethics & service purposes.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-maroon/20 border border-maroon/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Target className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Mission</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Empowering rural areas and building solid international fellowship links.</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <Link to="/about">
                    <Button className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] border border-white/20 text-white bg-gradient-to-r from-maroon to-red-800 hover:shadow-[0_0_30px_rgba(128,0,0,0.5)] transition-all duration-300 active:scale-95">
                      Explore Our Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </AnimationWrapper>
            </div>

          </div>
        </div>
      </section>

      {/* Breathtaking Call to Action */}
      <section className="py-28 relative z-10 bg-black">
        <div className="container-custom px-4">
          <AnimationWrapper>
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-maroon/30 via-[#0e0000] to-black backdrop-blur-2xl border border-gold/20 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] transition-all duration-500">
              
              {/* Inner glowing details */}
              <div className="absolute -top-24 -left-24 w-60 h-60 bg-maroon/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-gold/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="max-w-3xl mx-auto text-white space-y-8 relative z-10">
                <span className="inline-block px-5 py-2 text-xs font-bold tracking-[0.25em] uppercase bg-gold/10 border border-gold/20 rounded-full text-gold">
                  Make Your Mark
                </span>
                
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  Ready to Shape the Future?
                </h2>
                
                <p className="text-xl text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
                  Join the Rotaract Club of KPRCAS today. Discover projects, expand your skills, and build a lasting legacy.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center w-full px-4 sm:px-0 pt-6 max-w-md mx-auto">
                  <Link to="/join" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-white/20 text-white bg-gradient-to-r from-maroon to-red-800 hover:shadow-[0_0_35px_rgba(128,0,0,0.6)] transition-all duration-300 active:scale-95">
                      Become a Member
                    </Button>
                  </Link>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-gold/40 text-gold bg-gold/5 backdrop-blur-sm hover:text-black hover:bg-gold hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </section>

    </div>
  );
};

export default Home;