import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { membersData, MemberType } from '@/data/members';
import { CinematicTeamCard3D } from '@/components/CinematicTeamCard3D';
import AnimationWrapper from '@/components/AnimationWrapper';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sparkles, Trophy, Users, Star, ArrowRight } from 'lucide-react';
import { getTeamMembers, TeamMemberType } from '@/lib/storage';

const CATEGORIES = [
  { id: 'all', label: 'All Personnel' },
  { id: 'patron', label: 'Patrons' },
  { id: 'core', label: 'Core Board' },
  { id: 'director', label: 'Directors' },
  { id: 'chair', label: 'Chairs' }
];

const StatsCounter = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => {
  return (
    <div className="relative group p-6 bg-black/60 backdrop-blur-md border border-white/5 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 hover:border-gold/30 hover:bg-black/80">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-maroon to-gold rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 flex-shrink-0 group-hover:border-gold/20">
        <Icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
      </div>
      <span className="text-3xl font-extrabold text-white tracking-tight mb-1 group-hover:text-gold transition-colors duration-300">
        {value}
      </span>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
        {label}
      </span>
    </div>
  );
};

const Team = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dynamicMembers, setDynamicMembers] = useState<TeamMemberType[]>([]);

  const loadData = () => {
    setDynamicMembers(getTeamMembers());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage-synced', loadData);
    return () => window.removeEventListener('storage-synced', loadData);
  }, []);

  // Filter and combine members based on category selection and dynamic admin additions
  const filteredMembers = useMemo(() => {
    const staticMap = new Map<string, MemberType>();
    membersData.forEach(m => {
      const key = m.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      staticMap.set(key, m);
    });

    const result: MemberType[] = [];

    dynamicMembers.forEach(dm => {
      const dmKey = dm.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const existing = staticMap.get(dmKey);

      // Determine category based on position
      let category: 'patron' | 'core' | 'director' | 'chair' | 'member' = 'member';
      const pos = dm.position.toUpperCase();
      if (pos.includes('CHAIRMAN') || pos.includes('PRINCIPAL') || pos.includes('COORDINATOR') || pos.includes('ADVISOR')) {
        category = 'patron';
      } else if (pos.includes('PRESIDENT') || pos.includes('SECRETARY') || pos.includes('TREASURER') || pos.includes('SERGEANT') || pos.includes('SEARGANT')) {
        category = 'core';
      } else if (pos.includes('DIRECTOR')) {
        category = 'director';
      } else if (pos.includes('CHAIR')) {
        category = 'chair';
      }

      if (existing) {
        result.push({
          ...existing,
          name: dm.name,
          image: dm.image,
          badges: [dm.position, ...existing.badges.filter(b => b !== existing.badges[0])],
          category: category === 'member' ? existing.category : category,
        });
      } else {
        let hash = 0;
        for (let i = 0; i < dm.id.length; i++) {
          hash = dm.id.charCodeAt(i) + ((hash << 5) - hash);
        }
        result.push({
          id: Math.abs(hash),
          name: dm.name,
          image: dm.image,
          badges: [dm.position],
          category: category,
          paragraphs: [`Proudly serving as ${dm.position} for the Rotaract Club of KPRCAS.`],
          achievements: [],
          keyHighlights: []
        });
      }
    });

    const sorted = result.sort((a, b) => {
      const categoryOrder = { patron: 1, core: 2, director: 3, chair: 4, member: 5 };
      return (categoryOrder[a.category] || 99) - (categoryOrder[b.category] || 99);
    });

    if (selectedCategory === 'all') return sorted;
    return sorted.filter(m => m.category === selectedCategory);
  }, [dynamicMembers, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-maroon selection:text-white overflow-x-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg"
            alt="Team Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-block px-5 py-2 mb-6 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gold">
              MEET THE LEADERSHIP
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-600 to-gold">Leadership</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            A cohesive deck of dedicated professionals, mentors, and student directors steering the club towards monumental milestones.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Access personnel deck</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Metrics Row */}
      <section className="relative z-20 max-w-5xl mx-auto px-6 -mt-16 mb-20">
        <AnimationWrapper delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCounter value="32" label="Club Officers" icon={Users} />
            <StatsCounter value="100+" label="Active Members" icon={Sparkles} />
            <StatsCounter value="10+" label="District Awards" icon={Trophy} />
          </div>
        </AnimationWrapper>
      </section>

      {/* Sleek Timeline Filter Switcher */}
      <div className="w-full max-w-4xl mx-auto px-6 mb-16">
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-4 w-full">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
              </span>
              Structure
            </span>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
          </div>

          {/* Borderless Pill Timeline Row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {CATEGORIES.map(category => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "relative py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none",
                    isActive ? "text-gold" : "text-gray-400 hover:text-white"
                  )}
                >
                  {category.label}
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

      {/* Interactive Personnel Card Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, index) => (
              <motion.div
                layout
                key={member.id}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
                className="flex"
              >
                <CinematicTeamCard3D member={member} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-600 animate-pulse" />
            <p className="text-sm tracking-wider uppercase font-semibold">No Personnel Loaded</p>
          </div>
        )}
      </section>

      {/* Call to Action - Join Our Legacy */}
      <section className="relative py-24 bg-gradient-to-t from-neutral-950 to-transparent border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,0,0,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-6">
          <AnimationWrapper>
            <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Ready to Unleash the <span className="text-gold">Legacy</span>?
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8 font-light">
              Become part of a hyper-active family dedicated to collaborative service, professional leadership development, and lasting social impact.
            </p>
            <Button 
              className="relative group bg-gradient-to-r from-maroon to-gold border-none text-white hover:text-white px-8 py-6 rounded-full font-bold tracking-widest uppercase text-xs shadow-lg shadow-maroon/20 hover:shadow-gold/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
              onClick={() => window.location.href = '/join'}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-maroon to-gold rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500" />
              <span className="relative flex items-center gap-2">
                Join Our Team
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </AnimationWrapper>
        </div>
      </section>

    </div>
  );
};

export default Team;