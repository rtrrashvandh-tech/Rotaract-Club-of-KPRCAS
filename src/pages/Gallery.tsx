import { useState, useEffect, useRef, RefObject } from 'react';
import { Filter, X, Play, ZoomIn, ZoomOut, Sparkles, ChevronLeft, ChevronRight, Image, Video, Globe } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// ==========================================
// DATA DEFINITIONS
// ==========================================
const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'club service', label: 'Club Service' },
  { id: 'community', label: 'Community Service' },
  { id: 'professional service', label: 'Professional Service' },
  { id: 'international service', label: 'International Service' },
  { id: 'district priority projects', label: 'District Priority' },
];

interface GalleryItemType {
  id: number;
  type: string;
  src: string;
  category: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItemType[] = [
  {
    id: 1,
    type: 'image',
    src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755328575/IMG_2630_lfgtit.jpg',
    category: 'club service',
    title: 'Charter Day',
    description: 'Charter Day celebration "Purpose Power Progress"'
  },
  {
    id: 2,
    type: 'image',
    src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755328351/IMG_2449_fig2hu.jpg',
    category: 'club service',
    title: 'Swap and Serve',
    description: 'Swap and Serve an initiative to build a community'
  },
  {
    id: 3,
    type: 'image',
    src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755331800/IMG-20250727-WA0011_1_avnbqn.jpg',
    category: 'district priority projects',
    title: 'Plates of Joy',
    description: 'Serving with full hearted'
  },
  {
    id: 4,
    type: 'image',
    src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417179/WhatsApp_Image_2025-07-20_at_19.16.57_99f3161a_xktitp.jpg',
    category: 'professional service',
    title: 'Skill up Summit',
    description: 'Skill up summit-Motivational session'
  },
  {
    id: 5,
    type: 'image',
    src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417387/WhatsApp_Image_2025-07-21_at_23.31.20_ca301d31_yh4q7o.jpg',
    category: 'professional service',
    title: 'Income tax Insights',
    description: 'Income tax Insights'
  },
  {
    id: 6,
    type: 'image',
    src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417519/IMG_2547_deej97.jpg',
    category: 'professional service',
    title: 'Checkmate-Challenge',
    description: 'Checkmate-Challenge'
  },
  {
    id: 7,
    type: 'image',
    src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755327320/IMG_2688_vkdcns.jpg',
    category: 'club service',
    title: 'Mattai Pandhu',
    description: 'Mattai Pandhu an initiative to build a community'
  },
  {
    id: 8,
    type: 'image',
    src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760281257/PHOTO-2025-09-28-09-55-14_wodjhp.jpg',
    category: 'club service',
    title: 'Tharagam',
    description: 'The Rotaract Club of KPRCAS proudly celebrated Onam under Tharangam 3.0.'
  },
  {
    id: 9,
    type: 'image',
    src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761841757/IMG_20250831_141950_ymbxjs.jpg',
    category: 'club service',
    title: 'Shuffle and roll',
    description: 'Shuffle and roll an initiative to build a community'
  },
  {
    id: 10,
    type: 'image',
    src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761841998/IMG_20250916_115541_rftji2.jpg',
    category: 'club service',
    title: 'Verum pen illa',
    description: 'Verum pen illa an initiative to empower the womens'
  },
  {
    id: 11,
    type: 'image',
    src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761842038/Screenshot_2025-09-29-22-04-09-91_6012fa4d4ddec268fc5c7112cbb265e7_o0kocj.jpg',
    category: 'club service',
    title: 'Charity drive',
    description: 'Charity drive an initiative to raise funds for the needy'
  },
  {
    id: 12,
    type: 'image',
    src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760283874/IMG_5440_any3nm.jpg',
    category: 'club service',
    title: 'Navrang',
    description: 'Navrang is an event celebrating Navratri with vibrant traditions'
  },
  {
    id: 13,
    type: 'image',
    src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761842489/IMG-20250927-WA0100_zlndtq.jpg',
    category: 'professional service',
    title: 'Rac-a-thon',
    description: 'Rac-a-thon is a 24-hour hackathon event'
  },
];

// ==========================================
// CINEMATIC GALLERY CARD COMPONENT
// ==========================================
const CinematicGalleryCard = ({ 
  item, 
  scrollContainerRef, 
  setSelectedItem 
}: { 
  item: GalleryItemType; 
  scrollContainerRef: RefObject<HTMLDivElement>; 
  setSelectedItem: (item: { src: string; type: string; title?: string; category?: string; description?: string } | null) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  // 3D Transforms (matching Events page perfectly!)
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <div style={{ perspective: "1500px" }} className="w-full h-full flex justify-center py-1 px-4">
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

          {/* Media Section */}
          <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-black/40 flex items-center justify-center min-h-[220px] md:min-h-[340px]">
            {/* Ambient Blurred Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none" 
              style={{ backgroundImage: `url(${item.src})` }} 
            />
            
            {/* Dark Overlay for depth */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 md:bg-gradient-to-r pointer-events-none" />
            
            <button
              onClick={() => setSelectedItem({ src: item.src, type: item.type, title: item.title, category: item.category, description: item.description })}
              className="w-full h-full focus:outline-none cursor-zoom-in relative z-20 flex items-center justify-center p-6"
            >
              <img
                src={item.src}
                alt={item.title}
                className="max-w-full max-h-full object-contain rounded-xl transition-all duration-700 group-hover:scale-[1.03] shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/5"
              />
            </button>

            {/* Video Indicator Overlay */}
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <Play className="h-6 w-6 text-white ml-0.5 fill-white animate-pulse" />
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/50 text-left">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-gold/20 text-gold hover:bg-gold/30 border border-gold/30 font-semibold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
                {item.category}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-gold transition-colors duration-300 uppercase tracking-tight">
              {item.title}
            </h3>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 font-light">
              {item.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {item.type === 'video' ? <Video className="w-4 h-4 text-gold" /> : <Image className="w-4 h-4 text-gold" />}
                </div>
                <span>{item.type === 'video' ? 'Video Showcase' : 'Photo Showcase'}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-gold" />
                </div>
                <span>Rotaract KPRCAS</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <span>Active Campaign Capture</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// MAIN GALLERY COMPONENT
// ==========================================
const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<{ src: string; type: string; title?: string; category?: string; description?: string } | null>(null);
  const [zoom, setZoom] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  
  const handleClose = () => {
    setSelectedItem(null);
    setZoom(1);
  };

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const tolerance = 5; // tolerance for rounding differences
      setCanScrollLeft(el.scrollLeft > tolerance);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
    }
  };

  // Reset scroll to start when activeFilter changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeFilter]);

  // Setup scroll and resize listeners for scroll status chevrons
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
  }, [filteredItems]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-maroon selection:text-white font-poppins">
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[40vh] md:h-[48vh] flex items-center justify-center overflow-hidden pt-24 pb-8 md:pt-6 md:pb-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black z-10" />
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760283874/IMG_5440_any3nm.jpg"
            alt="Gallery Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-3.5 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gold">
              Captured Milestones
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-4xl md:text-6xl font-black mb-3 tracking-tighter"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-600 to-gold">Legacy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-sm md:text-base text-gray-300 font-light leading-relaxed max-w-xl mx-auto"
          >
            Explore the visual legacy, community service campaigns, and active leadership fellowships of our chartered chapter.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">Scroll to Explore</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Filter Section - Minimalist Typographic Timeline */}
      <div className="w-full max-w-4xl mx-auto px-6 py-3 mb-2 relative z-10">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Subtle separator and label */}
          <div className="flex items-center gap-4 w-full">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
              </span>
              Project Categories
            </span>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
          </div>

          {/* Borderless category row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "relative py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none",
                    isActive ? "text-gold" : "text-gray-400 hover:text-white"
                  )}
                >
                  {filter.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeGalleryTimelineDot"
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

      {/* 3D Horizontal Scrolling Gallery List */}
      <div className="relative w-full max-w-[100vw] pb-6 overflow-hidden">
        {filteredItems.length > 0 ? (
          <>
            {/* Left Scroll Chevron Button */}
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

            {/* Right Scroll Chevron Button */}
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
              {/* Left Spacers to center the first element nicely */}
              <div className="w-[10vw] md:w-[20vw] lg:w-[26vw] flex-shrink-0" />

              {filteredItems.map((item, index) => (
                <div key={`${activeFilter}-${index}`} className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[48vw] snap-center">
                  <CinematicGalleryCard
                    item={item}
                    scrollContainerRef={scrollContainerRef}
                    setSelectedItem={setSelectedItem}
                  />
                </div>
              ))}

              {/* Right Spacers to center the last element nicely */}
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
              <Filter className="w-12 h-12 text-gray-500 animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">No Items Found</h3>
            <p className="text-gray-400 max-w-md text-lg">
              We couldn't find any captures listed under {activeFilter} currently.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-8 text-gold font-bold tracking-widest uppercase text-sm hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <span>View All Projects</span>
              <div className="w-8 h-[1px] bg-gold" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Cinematic Image Zoom Lightbox */}
      <Dialog open={!!selectedItem} onOpenChange={handleClose}>
        <DialogContent className="p-0 max-w-6xl bg-transparent border-none shadow-none flex flex-col items-center justify-center w-screen h-screen z-[99999]">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl z-[-1]" onClick={handleClose} />
          {selectedItem && (
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
              
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  style={{ transform: `scale(${zoom})` }}
                  className="transition-transform duration-300 max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl shadow-black border border-white/5"
                />
              ) : (
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  src={selectedItem.src}
                  alt={selectedItem.title || "Showcase View"}
                  style={{ transform: `scale(${zoom})` }}
                  className="transition-transform duration-300 max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl shadow-black border border-white/5"
                />
              )}
              <h2 className="text-white text-2xl font-bold mt-8 tracking-wide text-center uppercase">{selectedItem.title}</h2>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;