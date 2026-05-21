import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MemberHighlight, MemberType } from '@/data/members';
import { Award, BookOpen, Star, Target, Compass, Sparkles, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CinematicTeamCard3DProps {
  member: MemberType;
}

export const CinematicTeamCard3D: React.FC<CinematicTeamCard3DProps> = ({ member }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showDossier, setShowDossier] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 3D Mouse Tilt Transforms
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring settings for super smooth motion
  const springConfig = { stiffness: 120, damping: 20 };
  const rotateXSpring = useSpring(x, springConfig);
  const rotateYSpring = useSpring(y, springConfig);

  // Map mouse positions to rotations (-15 to 15 degrees)
  const rotateX = useTransform(rotateYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(rotateXSpring, [-0.5, 0.5], [-15, 15]);

  // Shiny radial gradient overlay coordinates
  const shimmerX = useMotionValue(50);
  const shimmerY = useMotionValue(50);
  const shimmerXSpring = useSpring(shimmerX, springConfig);
  const shimmerYSpring = useSpring(shimmerY, springConfig);

  const shimmerBg = useTransform(
    [shimmerXSpring, shimmerYSpring],
    ([sx, sy]) => `radial-gradient(circle 120px at ${sx}% ${sy}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 80%)`
  );

  useEffect(() => {
    // Detect touch device to disable active 3D tracking
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);

    // Map shimmer coordinates (0% to 100%)
    shimmerX.set((relativeX + 0.5) * 100);
    shimmerY.set((relativeY + 0.5) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    shimmerX.set(50);
    shimmerY.set(50);
  };

  return (
    <>
      <div 
        style={{ perspective: "1000px" }}
        className="w-full flex justify-center py-4 px-2"
      >
        <motion.div
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setShowDossier(true)}
          style={!isMobile ? {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          } : undefined}
          className="w-full max-w-sm relative group cursor-pointer"
        >
          {/* Crimson & Gold Halo Glow Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-maroon via-red-600 to-gold rounded-[2rem] blur opacity-20 group-hover:opacity-75 transition-all duration-1000 group-hover:duration-300" />
          
          {/* Premium Dark Glass Outer Shell */}
          <div className="relative aspect-[3/4] w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col justify-between p-6 shadow-2xl transition-all duration-500 group-hover:border-white/20">
            
            {/* Shimmer overlay tracks mouse */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-20"
              style={{ background: shimmerBg }}
            />

            {/* Circular Profile Section */}
            <div className="relative w-full h-[60%] flex items-center justify-center overflow-hidden rounded-2xl bg-black/40">
              {/* Ambient Blurred Portrait halo behind */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none transition-transform duration-700 group-hover:scale-125" 
                style={{ backgroundImage: `url(${member.image})` }} 
              />
              
              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />

              {/* Portrait Foreground Image */}
              <motion.div 
                className="relative z-10 w-36 h-36 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:scale-105 group-hover:border-gold/50"
                style={!isMobile ? { transform: "translateZ(30px)" } : undefined}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                )}
              </motion.div>
            </div>

            {/* Content metadata */}
            <div 
              className="w-full flex flex-col items-center text-center mt-2 z-10"
              style={!isMobile ? { transform: "translateZ(20px)" } : undefined}
            >
              {/* Gold badges */}
              <div className="flex flex-wrap justify-center gap-1.5 mb-2.5">
                {member.badges.slice(0, 2).map((badge, i) => (
                  <span 
                    key={i} 
                    className="bg-gold/20 text-gold border border-gold/30 font-semibold px-3 py-1 rounded-full text-[9px] tracking-widest uppercase whitespace-nowrap"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-gold transition-colors duration-300">
                {member.name}
              </h3>

              {/* Action Prompt */}
              <div className="w-full mt-2 pt-3 border-t border-white/5 flex justify-center">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                  Access Dossier
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Cinematic High-Fidelity Modal Dossier (Radix Dialog) */}
      <Dialog open={showDossier} onOpenChange={setShowDossier}>
        <DialogContent className="p-0 max-w-5xl bg-transparent border-none shadow-none flex items-center justify-center w-screen h-screen">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl z-[-1]" onClick={() => setShowDossier(false)} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
            className="w-[92vw] md:w-full max-w-4xl max-h-[85vh] bg-neutral-950/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-y-auto overflow-x-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col md:flex-row [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDossier(false)}
              className="absolute top-6 right-6 z-50 bg-white/5 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 hover:text-red-400 text-white backdrop-blur-md p-2.5 rounded-full transition-all active:scale-95 cursor-pointer"
              title="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Sidebar Column - Portrait & Highlights */}
            <div className="md:w-2/5 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col items-center justify-start text-center">
              
              {/* Picture Frame with Ambient Blur Halo */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-gold/30 shadow-[0_15px_30px_rgba(0,0,0,0.5)] mb-6 flex-shrink-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-110 pointer-events-none" 
                  style={{ backgroundImage: `url(${member.image})` }} 
                />
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover relative z-10"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <User className="w-24 h-24 text-gray-600" />
                  </div>
                )}
              </div>

              {/* Title Block */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                {member.name}
              </h2>
              
              <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                {member.badges.map((badge, idx) => (
                  <span 
                    key={idx} 
                    className="bg-gold/25 text-gold border border-gold/30 font-bold px-3 py-1 rounded-full text-[10px] tracking-wider uppercase whitespace-nowrap"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Key Highlights list (with Emojis) */}
              {member.keyHighlights && member.keyHighlights.length > 0 && (
                <div className="w-full mt-6 text-left border-t border-white/5 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-4 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    Key Records
                  </h4>
                  <div className="space-y-3">
                    {member.keyHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-gray-300">
                        <span className="text-sm select-none leading-none mt-0.5">{highlight.emoji}</span>
                        <span className="leading-relaxed">{highlight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Information Column - Narrative biography */}
            <div className="md:w-3/5 p-8 sm:p-12 flex flex-col justify-start">
              
              {/* Dossier Header Label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
                  </span>
                  Leader Profile
                </span>
                <div className="h-[1px] bg-gradient-to-r from-white/10 to-transparent flex-1" />
              </div>

              {/* Biography description */}
              <div className="space-y-5 text-gray-300 text-sm leading-relaxed mb-8">
                {member.paragraphs.map((para, idx) => (
                  <p 
                    key={idx} 
                    className="indent-2"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>

              {/* Achievements Checklist (if present) */}
              {member.achievements && member.achievements.length > 0 && (
                <div className="w-full mt-4 border-t border-white/5 pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold" />
                    Accomplishments
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {member.achievements.map((ach, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-xs text-gray-300 hover:bg-white/[0.04] transition-colors"
                      >
                        <Compass className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};
