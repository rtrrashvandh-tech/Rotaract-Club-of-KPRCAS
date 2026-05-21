import { useState, useEffect, useRef, RefObject, useMemo } from 'react';
import { 
  Target, 
  Eye, 
  Users, 
  Award, 
  Heart, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Calendar,
  BookOpen
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from "@/lib/utils";

const teamPhoto = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg";

// ==========================================
// CINEMATIC MILESTONE CARD COMPONENT
// ==========================================
const CinematicMilestoneCard = ({ 
  milestone,
  scrollContainerRef,
  cardRef
}: { 
  milestone: { year: string; event: string; description: string; icon: any; color: string; hoverBg: string; textGlow: string }; 
  scrollContainerRef: RefObject<HTMLDivElement>;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  // 3D Rotational Scroll Transformations
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);

  const Icon = milestone.icon;

  return (
    <div 
      ref={cardRef} 
      style={{ perspective: "1500px" }} 
      className="w-full h-full flex justify-center py-8 px-4"
    >
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
        <div className={cn("absolute -inset-1 bg-gradient-to-r rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200", milestone.color)}></div>
        <div className="relative h-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">

          {/* Media/Visual Section (Left Column) */}
          <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-black/40 flex items-center justify-center min-h-[220px] md:min-h-[340px]">
            {/* Ambient Blurred Background */}
            <div 
              className={cn("absolute inset-0 bg-gradient-to-br opacity-20 blur-2xl scale-110 pointer-events-none z-0", milestone.hoverBg)} 
            />
            
            {/* Inner Floating Icon Graphic */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 md:bg-gradient-to-r pointer-events-none" />
            
            <div className="relative z-20 flex flex-col items-center justify-center p-6 text-center select-none">
              <div className={cn("w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.5)] mb-4 group-hover:scale-110 transition-transform duration-500", milestone.textGlow)}>
                <Icon className="w-12 h-12" />
              </div>
              <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-mono">Rotaract KPRCAS</span>
              <h4 className="text-white text-md font-bold mt-1 font-mono tracking-widest">{milestone.year} Milestone</h4>
            </div>
          </div>

          {/* Content Section (Right Column) */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/50 text-left">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/30 font-semibold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
                {milestone.year} Chapter
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-gold transition-colors duration-300 uppercase tracking-tight">
              {milestone.event}
            </h3>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-light">
              {milestone.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <Calendar className="w-4 h-4 text-gold animate-pulse" />
                <span>Rotaract Year: {milestone.year} - {parseInt(milestone.year) + 1}</span>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-ping" />
                <span>Status: Fully Achieved</span>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// MAIN ABOUT COMPONENT
// ==========================================
const About = () => {
  const [selectedYear, setSelectedYear] = useState('all');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    document.title = 'About | Rotaract Club of KPRCAS';
  }, []);

  const milestones = [
    { 
      year: '2021', 
      event: 'Foundation Laid', 
      description: 'Rotaract Club of KPRCAS established under Rotary International District 3201, sponsored by Rotary Club of Coimbatore Central.',
      icon: Target,
      color: 'from-gold via-yellow-500 to-amber-600',
      hoverBg: 'from-gold/20 to-amber-600/5',
      textGlow: 'text-gold'
    },
    { 
      year: '2022', 
      event: 'First Steps', 
      description: 'Began operations as a vibrant youth-led organization at KPR College of Arts Science and Research, engaging hundreds of students.',
      icon: Users,
      color: 'from-maroon via-red-600 to-rose-700',
      hoverBg: 'from-maroon/20 to-rose-700/5',
      textGlow: 'text-red-500'
    },
    { 
      year: '2023', 
      event: 'Building Momentum', 
      description: 'Launched impactful service projects and awareness drives, fostering community engagement and international fellowships.',
      icon: Award,
      color: 'from-gold via-amber-500 to-yellow-600',
      hoverBg: 'from-gold/20 to-yellow-600/5',
      textGlow: 'text-amber-500'
    },
    { 
      year: '2024', 
      event: 'Leadership Development', 
      description: 'Strengthened fellowship programs and leadership initiatives, empowering young directors to lead larger projects.',
      icon: Heart,
      color: 'from-maroon via-pink-600 to-purple-800',
      hoverBg: 'from-maroon/20 to-purple-800/5',
      textGlow: 'text-pink-500'
    },
    { 
      year: '2025', 
      event: '5th Rotaract Year', 
      description: 'Entering 5th year as a reviving force with renewed passion and commitment to the motto "Fellowship through Service".',
      icon: Sparkles,
      color: 'from-gold via-yellow-500 to-orange-500',
      hoverBg: 'from-gold/20 to-orange-500/5',
      textGlow: 'text-gold'
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Service Above Self',
      description: 'We prioritize community service and making a positive impact in the lives of others.'
    },
    {
      icon: Users,
      title: 'Fellowship',
      description: 'Building lasting friendships and professional relationships through shared experiences.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for excellence in all our projects and personal development initiatives.'
    },
    {
      icon: Target,
      title: 'Integrity',
      description: 'Maintaining the highest ethical standards in all our actions and decisions.'
    }
  ];

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const tolerance = 5;
      setCanScrollLeft(el.scrollLeft > tolerance);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
    }
  };

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    if (year === 'all') {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    } else {
      const cardEl = cardRefs.current[year];
      if (cardEl && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const containerCenter = container.clientWidth / 2;
        const cardCenter = cardEl.offsetLeft + cardEl.clientWidth / 2;
        container.scrollTo({
          left: cardCenter - containerCenter,
          behavior: 'smooth'
        });
      }
    }
  };

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
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-maroon selection:text-white overflow-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#030101]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10" />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block px-6 py-2 mb-4 text-xs font-semibold tracking-[0.2em] uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gold">
              Our Heritage & Roots
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-600 to-gold">Rotaract KPRCAS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-sm md:text-base text-gray-300 font-light leading-relaxed max-w-xl mx-auto"
          >
            A vibrant youth-led organization committed to spreading smiles, inspiring hope, and building a brighter tomorrow through fellowship and service.
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

      {/* Mission & Vision (With Premium Margins & Design) */}
      <section className="py-28 relative z-10 bg-black">
        <div className="container-custom px-4 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Mission Card */}
            <AnimationWrapper>
              <div className="group relative rounded-3xl p-1 bg-gradient-to-br from-maroon/60 via-red-900/20 to-transparent shadow-2xl hover:shadow-[0_0_30px_rgba(128,0,0,0.3)] transition-all duration-500">
                <Card className="h-full bg-black/80 backdrop-blur-xl border-none text-white overflow-hidden rounded-[22px]">
                  <CardContent className="p-10 relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-maroon/20 border border-maroon/30 flex items-center justify-center mr-4">
                          <Target className="h-7 w-7 text-red-500 animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">Our Mission</h2>
                      </div>
                      <p className="text-lg text-gray-300 font-light leading-relaxed">
                        To empower students to grow as socially responsible leaders through 
                        service, leadership, diversity, integrity, and fellowship, creating 
                        positive change in our communities.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimationWrapper>

            {/* Vision Card */}
            <AnimationWrapper delay={300}>
              <div className="group relative rounded-3xl p-1 bg-gradient-to-br from-gold/60 via-yellow-900/20 to-transparent shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500">
                <Card className="h-full bg-black/80 backdrop-blur-xl border-none text-white overflow-hidden rounded-[22px]">
                  <CardContent className="p-10 relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mr-4">
                          <Eye className="h-7 w-7 text-gold animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">Our Vision</h2>
                      </div>
                      <p className="text-lg text-gray-300 font-light leading-relaxed">
                        To be a movement driven by the belief that small actions spark big change, 
                        fostering personal development and community impact through impactful 
                        service projects and leadership programs.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-28 relative z-10 border-t border-white/5 bg-[#030101]">
        <div className="container-custom px-4 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimationWrapper>
              <div className="space-y-6 text-left">
                <span className="text-xs uppercase text-gold font-bold tracking-[0.2em]">Our Heritage</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-600 to-gold">Story</span>
                </h2>
                <div className="space-y-4 text-gray-400 font-light leading-relaxed text-base">
                  <p>
                    The Rotaract Club of KPRCAS, established in 2021 under Rotary International 
                    District 3201 and sponsored by the Rotary Club of Coimbatore Central, is a 
                    vibrant youth-led organization at KPR College of Arts Science and Research. 
                    With a foundation rooted in service, leadership, diversity, integrity, and 
                    fellowship, the club empowers students to grow as socially responsible leaders.
                  </p>
                  <p>
                    Despite being a young club, it has shown remarkable energy and dedication as a 
                    reviving force, now entering its 5th Rotaract year with renewed passion. From 
                    impactful service projects and awareness drives to enriching fellowships and 
                    leadership programs, the club fosters personal development and community impact. 
                    More than just a club, it's a movement driven by the belief that small actions 
                    spark big change.
                  </p>
                  <p className="text-gray-300 font-normal">
                    Committed to spreading smiles, inspiring hope, striving to build a brighter, 
                    better tomorrow and igniting purpose, the Rotaract Club of KPRCAS proudly lives 
                    its motto: <strong className="text-gold font-bold">"Fellowship through Service"</strong>
                  </p>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={300} animation="slide-in-right">
              <div className="relative group overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                <img
                  src={teamPhoto}
                  alt="Team Photo"
                  className="rounded-[2rem] w-full object-cover transition-transform duration-750 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent rounded-[2rem]" />
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Values (Enhanced Spacing) */}
      <section className="py-28 relative z-10 border-t border-white/5 bg-black">
        <div className="container-custom px-4 max-w-7xl mx-auto">
          <AnimationWrapper className="text-center mb-16">
            <span className="text-xs uppercase text-gold font-bold tracking-[0.2em] block mb-2">Our Foundation</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-500 to-gold">Core Values</span>
            </h2>
            <p className="text-md text-gray-400 font-light max-w-2xl mx-auto mt-2">
              The core principles that guide everything we do and every decision we make.
            </p>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimationWrapper key={value.title} delay={index * 150} animation="bounce-in">
                <Card className="card-hover h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.12)] overflow-hidden rounded-3xl">
                  <CardContent className="p-8 text-center flex flex-col items-center">
                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-maroon to-red-800 border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(128,0,0,0.3)]">
                      <value.icon className="h-7 w-7 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Snapping Journey Timeline Carousel */}
      <section className="py-28 relative z-10 border-t border-white/5 bg-[#030101]">
        <div className="container-custom px-4 max-w-7xl mx-auto">
          <AnimationWrapper className="text-center mb-12">
            <span className="text-xs uppercase text-gold font-bold tracking-[0.2em] block mb-2">Our Road Map</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-500 to-gold">Journey</span>
            </h2>
            <p className="text-md text-gray-400 font-light mt-2">
              Explore the key milestones that trace our growth and history.
            </p>
          </AnimationWrapper>

          {/* Typographic Timeline Filter Row */}
          <div className="w-full max-w-5xl mx-auto px-6 pt-6 pb-12">
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex items-center gap-4 w-full">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
                  </span>
                  Milestone Years
                </span>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
              </div>

              <div className="flex justify-center gap-x-8 gap-y-2 flex-wrap">
                {['all', '2021', '2022', '2023', '2024', '2025'].map((year) => {
                  const isActive = selectedYear === year;
                  return (
                    <button
                      key={year}
                      onClick={() => handleYearClick(year)}
                      className={cn(
                        "relative py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none",
                        isActive ? "text-gold" : "text-gray-400 hover:text-white"
                      )}
                    >
                      {year === 'all' ? 'Entire Journey' : `${year} Edition`}
                      {isActive && (
                        <motion.span
                          layoutId="activeAboutTimelineDot"
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

          {/* 3D Horizontal Snapping Carousel Viewport */}
          <div className="relative w-full max-w-[100vw] pt-6 pb-28 overflow-hidden">
            {/* Left Chevron Button */}
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
                "absolute left-4 md:left-8 top-[46%] transform -translate-y-1/2 z-30 bg-black/60 hover:bg-gold/25 hover:border-gold/50 border border-white/10 text-white hover:text-gold w-14 h-14 rounded-full md:flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl active:scale-95 group focus:outline-none hidden",
                canScrollLeft ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
              )}
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            {/* Right Chevron Button */}
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
                "absolute right-4 md:right-8 top-[46%] transform -translate-y-1/2 z-30 bg-black/60 hover:bg-gold/25 hover:border-gold/50 border border-white/10 text-white hover:text-gold w-14 h-14 rounded-full md:flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl active:scale-95 group focus:outline-none hidden",
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
              onScroll={updateScrollButtons}
            >
              {/* Left Snap Padding Spacer */}
              <div className="w-[6vw] xs:w-[7.5vw] md:w-[20vw] lg:w-[26vw] flex-shrink-0" />

              {milestones.map((milestone) => (
                <div 
                  key={milestone.year} 
                  className="flex-shrink-0 w-[88vw] xs:w-[85vw] sm:w-[80vw] md:w-[60vw] lg:w-[48vw] snap-center"
                >
                  <CinematicMilestoneCard
                    milestone={milestone}
                    scrollContainerRef={scrollContainerRef}
                    cardRef={(el) => { cardRefs.current[milestone.year] = el; }}
                  />
                </div>
              ))}
              
              {/* Right Snap Padding Spacer */}
              <div className="w-[6vw] xs:w-[7.5vw] md:w-[20vw] lg:w-[26vw] flex-shrink-0" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;