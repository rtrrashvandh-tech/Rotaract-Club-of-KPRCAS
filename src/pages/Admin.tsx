import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  getEvents,
  saveEvents,
  getBulletins,
  saveBulletins,
  getTeamMembers,
  saveTeamMembers,
  EventType,
  BulletinType,
  TeamMemberType
} from '@/lib/storage';
import {
  Trash2,
  Calendar,
  Newspaper,
  Users,
  Search,
  Plus,
  Lock,
  LogOut,
  Image as ImageIcon,
  MapPin,
  Clock,
  Globe,
  User,
  ArrowRight,
  Download,
  X,
  Edit,
  Fingerprint,
  Activity,
  Terminal,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface Particle3D {
  x: number;
  y: number;
  z: number;
}

const Futuristic3DCanvas: React.FC<{ variant?: 'sphere' | 'plexus' | 'ring'; size?: number }> = ({ variant = 'plexus', size = 300 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = size;
    let height = canvas.height = size;

    // Generate 3D points
    const particles: Particle3D[] = [];
    const particleCount = variant === 'sphere' ? 100 : (variant === 'ring' ? 80 : 60);
    const radius = size * 0.38;

    for (let i = 0; i < particleCount; i++) {
      if (variant === 'sphere') {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        particles.push({
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi),
        });
      } else if (variant === 'ring') {
        const theta = (i / particleCount) * Math.PI * 2;
        const ringIndex = i % 2;
        if (ringIndex === 0) {
          particles.push({
            x: radius * Math.cos(theta),
            y: radius * Math.sin(theta),
            z: (Math.random() - 0.5) * 8,
          });
        } else {
          particles.push({
            x: radius * Math.cos(theta),
            y: (Math.random() - 0.5) * 8,
            z: radius * Math.sin(theta),
          });
        }
      } else {
        particles.push({
          x: (Math.random() - 0.5) * size * 0.7,
          y: (Math.random() - 0.5) * size * 0.7,
          z: (Math.random() - 0.5) * size * 0.7,
        });
      }
    }

    let angleX = 0.002;
    let angleY = 0.002;
    const perspective = size * 0.9;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = (x / (width / 2)) * 0.012;
      mouseRef.current.targetY = (y / (height / 2)) * 0.012;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse rotation damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const currentAngleX = angleX + mouseRef.current.y;
      const currentAngleY = angleY + mouseRef.current.x;

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      // Projects and rotates particles
      const projected = particles.map(p => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;

        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        const scale = perspective / (perspective + z2);
        const projX = x1 * scale + width / 2;
        const projY = y2 * scale + height / 2;

        return { projX, projY, scale, z2 };
      });

      // Draw lines between close particles
      if (variant === 'plexus' || variant === 'ring') {
        const connectionDistance = variant === 'ring' ? size * 0.2 : size * 0.24;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < projected.length; i++) {
          for (let j = i + 1; j < projected.length; j++) {
            const dx = projected[i].projX - projected[j].projX;
            const dy = projected[i].projY - projected[j].projY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const alpha = (1 - dist / connectionDistance) * 0.22;
              const color = projected[i].z2 > 0 ? `rgba(128, 0, 32, ${alpha})` : `rgba(212, 175, 55, ${alpha})`;
              ctx.strokeStyle = color;
              ctx.beginPath();
              ctx.moveTo(projected[i].projX, projected[i].projY);
              ctx.lineTo(projected[j].projX, projected[j].projY);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particle points
      projected.forEach((p) => {
        if (p.projX < 0 || p.projX > width || p.projY < 0 || p.projY > height) return;

        const size = Math.max(0.6, p.scale * 2.2);
        const alpha = Math.min(1, Math.max(0.15, p.scale * 0.8));
        ctx.fillStyle = p.z2 > 0 
          ? `rgba(239, 68, 68, ${alpha})` 
          : `rgba(212, 175, 55, ${alpha})`; 

        ctx.beginPath();
        ctx.arc(p.projX, p.projY, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw outer glow for front particles in sphere
        if (p.z2 < -15 && variant === 'sphere') {
          ctx.shadowBlur = 3;
          ctx.shadowColor = '#d4af37';
          ctx.fillStyle = `rgba(255, 215, 0, ${alpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.projX, p.projY, size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Slowly rotate particles internally
      particles.forEach(p => {
        const spinSpeed = 0.0035;
        const xTemp = p.x * Math.cos(spinSpeed) - p.y * Math.sin(spinSpeed);
        p.y = p.x * Math.sin(spinSpeed) + p.y * Math.cos(spinSpeed);
        p.x = xTemp;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [variant, size]);

  return <canvas ref={canvasRef} className="opacity-70 pointer-events-none mix-blend-screen" />;
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState<EventType[]>([]);
  const [bulletins, setBulletins] = useState<BulletinType[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [showGuide, setShowGuide] = useState(true);

  // Editing States
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingBulletinId, setEditingBulletinId] = useState<string | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  // Search Filters
  const [eventSearch, setEventSearch] = useState('');
  const [bulletinSearch, setBulletinSearch] = useState('');
  const [teamSearch, setTeamSearch] = useState('');

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    platform: '',
    image: '',
    description: ''
  });

  // Bulletin Form State
  const [bulletinForm, setBulletinForm] = useState({
    title: '',
    date: '',
    content: '',
    fileId: '',
    coverImage: ''
  });

  // Team Member Form State
  const [teamForm, setTeamForm] = useState({
    name: '',
    position: '',
    image: ''
  });

  // Active Tab State (for visual effects)
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    const loadData = () => {
      setEvents(getEvents());
      setBulletins(getBulletins());
      setTeamMembers(getTeamMembers());
    };
    loadData();
    window.addEventListener('storage-synced', loadData);
    return () => window.removeEventListener('storage-synced', loadData);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('Access granted! Welcome to the Admin Console');
    } else {
      toast.error('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    toast.info('Logged out successfully');
  };

  const handleExportDatabase = () => {
    const eventsStr = JSON.stringify(events, null, 2);
    const bulletinsStr = JSON.stringify(bulletins, null, 2);
    const teamMembersStr = JSON.stringify(teamMembers, null, 2);

    const fullCode = `export type EventType = {
  id: string;
  title: string;
  date?: string;
  time?: string;
  location?: string;
  platform?: string;
  image: string;
  description: string;
};

export type BulletinType = {
  id: string;
  title: string;
  date: string;
  content: string;
  fileId: string;
  coverImage?: string;
};

export type TeamMemberType = {
  id: string;
  name: string;
  position: string;
  image: string;
};

const EVENTS_KEY = 'rotaract_events';
const BULLETINS_KEY = 'rotaract_bulletins';
const TEAM_MEMBERS_KEY = 'rotaract_team_members';

// Copy this code into your src/lib/storage.ts file to persist changes globally for all hosted users!
const initialEvents: EventType[] = ${eventsStr};

const initialBulletins: BulletinType[] = ${bulletinsStr};

const initialTeamMembers: TeamMemberType[] = ${teamMembersStr};

export const getEvents = (): EventType[] => {
  const stored = localStorage.getItem(EVENTS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migration: Ensure Mattai Pandhu 3.O image is updated to turf_cricket.jpg
      const e27 = parsed.find((e: any) => e.id === 'e27');
      if (e27 && e27.image !== '/turf_cricket.jpg') {
        const updated = parsed.map((e: any) => 
          e.id === 'e27' ? { ...e, image: '/turf_cricket.jpg' } : e
        );
        saveEvents(updated);
        return updated;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse events from local storage', e);
    }
  }
  saveEvents(initialEvents);
  return initialEvents;
};

export const saveEvents = (events: EventType[]) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

export const getBulletins = (): BulletinType[] => {
  const stored = localStorage.getItem(BULLETINS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse bulletins from local storage', e);
    }
  }
  saveBulletins(initialBulletins);
  return initialBulletins;
};

export const saveBulletins = (bulletins: BulletinType[]) => {
  localStorage.setItem(BULLETINS_KEY, JSON.stringify(bulletins));
};

export const getTeamMembers = (): TeamMemberType[] => {
  const stored = localStorage.getItem(TEAM_MEMBERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse team members from local storage', e);
    }
  }
  saveTeamMembers(initialTeamMembers);
  return initialTeamMembers;
};

export const saveTeamMembers = (members: TeamMemberType[]) => {
  localStorage.setItem(TEAM_MEMBERS_KEY, JSON.stringify(members));
};
`;

    const blob = new Blob([fullCode], { type: 'text/typescript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "storage.ts");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Database exported! Replace src/lib/storage.ts with the downloaded file to persist changes.");
  };

  // --- Add/Edit Event Handler ---
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.description) {
      toast.error('Title and Description are required');
      return;
    }

    let updatedEvents: EventType[];

    if (editingEventId) {
      updatedEvents = events.map(evt =>
        evt.id === editingEventId ? { ...eventForm, id: editingEventId } : evt
      );
      setEditingEventId(null);
      toast.success(`Event "${eventForm.title}" updated successfully!`);
    } else {
      const newEvent: EventType = {
        ...eventForm,
        id: `e_${Date.now()}`
      };
      updatedEvents = [newEvent, ...events];
      toast.success(`Event "${newEvent.title}" added successfully!`);
    }

    setEvents(updatedEvents);
    saveEvents(updatedEvents, true);
    setEventForm({ title: '', date: '', time: '', location: '', platform: '', image: '', description: '' });
  };

  const startEditEvent = (event: EventType) => {
    setEditingEventId(event.id);
    setEventForm({
      title: event.title || '',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      platform: event.platform || '',
      image: event.image || '',
      description: event.description || ''
    });
    // Smooth scroll to event form title input
    const formEl = document.getElementById('title');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formEl.focus();
    }
  };

  const cancelEditEvent = () => {
    setEditingEventId(null);
    setEventForm({ title: '', date: '', time: '', location: '', platform: '', image: '', description: '' });
    toast.info('Event editing cancelled');
  };

  // --- Delete Event Handler ---
  const handleDeleteEvent = (id: string) => {
    const eventToDelete = events.find(e => e.id === id);
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    saveEvents(updatedEvents, true);
    toast.success(`Deleted Event: ${eventToDelete?.title || 'Event'}`);
  };

  // --- Google Drive Link/ID Extraction Helper ---
  const extractGoogleDriveId = (urlOrId: string): string => {
    if (!urlOrId) return '';
    const trimmed = urlOrId.trim();
    const fileDMatch = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileDMatch && fileDMatch[1]) {
      return fileDMatch[1];
    }
    const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (idParamMatch && idParamMatch[1]) {
      return idParamMatch[1];
    }
    return trimmed;
  };

  // --- Add/Edit Bulletin Handler ---
  const handleAddBulletin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinForm.title || !bulletinForm.fileId || !bulletinForm.date) {
      toast.error('Title, Identifier, and Google Drive File ID are required');
      return;
    }

    const cleanFileId = extractGoogleDriveId(bulletinForm.fileId);
    const cleanedBulletinForm = {
      ...bulletinForm,
      fileId: cleanFileId
    };

    let updatedBulletins: BulletinType[];

    if (editingBulletinId) {
      updatedBulletins = bulletins.map(b =>
        b.id === editingBulletinId ? { ...cleanedBulletinForm, id: editingBulletinId } : b
      );
      setEditingBulletinId(null);
      toast.success(`Bulletin "${cleanedBulletinForm.title}" updated successfully!`);
    } else {
      const newBulletin: BulletinType = {
        ...cleanedBulletinForm,
        id: `b_${Date.now()}`
      };
      updatedBulletins = [newBulletin, ...bulletins];
      toast.success(`Bulletin "${newBulletin.title}" added successfully!`);
    }

    setBulletins(updatedBulletins);
    saveBulletins(updatedBulletins, true);
    setBulletinForm({ title: '', date: '', content: '', fileId: '', coverImage: '' });
  };

  const startEditBulletin = (bulletin: BulletinType) => {
    setEditingBulletinId(bulletin.id);
    setBulletinForm({
      title: bulletin.title || '',
      date: bulletin.date || '',
      content: bulletin.content || '',
      fileId: bulletin.fileId || '',
      coverImage: bulletin.coverImage || ''
    });
    const formEl = document.getElementById('b_title');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formEl.focus();
    }
  };

  const cancelEditBulletin = () => {
    setEditingBulletinId(null);
    setBulletinForm({ title: '', date: '', content: '', fileId: '', coverImage: '' });
    toast.info('Bulletin editing cancelled');
  };

  // --- Delete Bulletin Handler ---
  const handleDeleteBulletin = (id: string) => {
    const bulletinToDelete = bulletins.find(b => b.id === id);
    const updatedBulletins = bulletins.filter(b => b.id !== id);
    setBulletins(updatedBulletins);
    saveBulletins(updatedBulletins, true);
    toast.success(`Deleted Bulletin: ${bulletinToDelete?.title || 'Bulletin'}`);
  };

  // --- Add/Edit Team Member Handler ---
  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.position) {
      toast.error('Full Name and Position/Role are required');
      return;
    }

    const defaultImage = 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/club-logo_wsjsmp.png';
    let updatedMembers: TeamMemberType[];

    if (editingTeamId) {
      updatedMembers = teamMembers.map(m =>
        m.id === editingTeamId ? { ...teamForm, image: teamForm.image.trim() || defaultImage, id: editingTeamId } : m
      );
      setEditingTeamId(null);
      toast.success(`Team Member "${teamForm.name}" updated successfully!`);
    } else {
      const newMember: TeamMemberType = {
        ...teamForm,
        image: teamForm.image.trim() || defaultImage,
        id: `t_${Date.now()}`
      };
      updatedMembers = [newMember, ...teamMembers];
      toast.success(`Team Member "${newMember.name}" added successfully!`);
    }

    setTeamMembers(updatedMembers);
    saveTeamMembers(updatedMembers, true);
    setTeamForm({ name: '', position: '', image: '' });
  };

  const startEditTeamMember = (member: TeamMemberType) => {
    setEditingTeamId(member.id);
    setTeamForm({
      name: member.name || '',
      position: member.position || '',
      image: member.image === 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/club-logo_wsjsmp.png' ? '' : (member.image || '')
    });
    const formEl = document.getElementById('m_name');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formEl.focus();
    }
  };

  const cancelEditTeamMember = () => {
    setEditingTeamId(null);
    setTeamForm({ name: '', position: '', image: '' });
    toast.info('Team member editing cancelled');
  };

  // --- Delete Team Member Handler ---
  const handleDeleteTeamMember = (id: string) => {
    const memberToDelete = teamMembers.find(m => m.id === id);
    const updatedMembers = teamMembers.filter(m => m.id !== id);
    setTeamMembers(updatedMembers);
    saveTeamMembers(updatedMembers, true);
    toast.success(`Deleted Team Member: ${memberToDelete?.name || 'Member'}`);
  };

  // --- Filtered Computations ---
  const filteredEvents = useMemo(() => {
    return events.filter(e =>
      e.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
      (e.location && e.location.toLowerCase().includes(eventSearch.toLowerCase()))
    );
  }, [events, eventSearch]);

  const filteredBulletins = useMemo(() => {
    return bulletins.filter(b =>
      b.title.toLowerCase().includes(bulletinSearch.toLowerCase()) ||
      b.date.toLowerCase().includes(bulletinSearch.toLowerCase())
    );
  }, [bulletins, bulletinSearch]);

  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter(m =>
      m.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      m.position.toLowerCase().includes(teamSearch.toLowerCase())
    );
  }, [teamMembers, teamSearch]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020005] flex items-center justify-center px-4 relative overflow-hidden selection:bg-rose-950 selection:text-gold">
        {/* Holographic Matrix Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,0,24,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,0,24,0.3)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
        
        {/* Dynamic Laser Beam Scanline */}
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff0044] to-transparent opacity-40 animate-[bounce_5s_infinite] pointer-events-none shadow-[0_0_15px_rgba(255,0,68,0.8)]"></div>

        {/* Ambient sovereign colors */}
        <div className="absolute top-1/10 left-1/10 w-[500px] h-[500px] bg-maroon/20 rounded-full blur-[160px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/10 right-1/10 w-[500px] h-[500px] bg-gold/15 rounded-full blur-[160px] pointer-events-none animate-pulse"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg relative z-10"
        >
          {/* Tech Cybernetic Corner Brackets */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-gold/70 pointer-events-none"></div>
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-gold/70 pointer-events-none"></div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-gold/70 pointer-events-none"></div>
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold/70 pointer-events-none"></div>

          <Card className="bg-[#05010a]/90 backdrop-blur-2xl border border-red-500/20 shadow-[0_0_60px_rgba(128,0,32,0.3)] rounded-2xl overflow-hidden text-white relative">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-maroon via-gold to-maroon"></div>
            
            <CardHeader className="pt-10 pb-4 text-center relative">
              {/* Sovereign Biometric Decryptor HUD with 3D Hologram & Crown Sigil */}
              <div className="relative mx-auto w-36 h-36 flex items-center justify-center mb-6 group cursor-pointer">
                {/* Outer spin rings */}
                <div className="absolute inset-0 rounded-full border border-dashed border-red-500/30 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border border-double border-gold/40 animate-[spin_10s_linear_infinite_reverse]"></div>
                
                {/* Real-time Interactive 3D Holographic Sphere */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-105">
                  <Futuristic3DCanvas variant="sphere" size={144} />
                </div>
                
                <div className="absolute inset-5 rounded-full bg-black/85 backdrop-blur-md border border-gold/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                  {/* Glowing 3D-feeling Crown SVG */}
                  <svg className="w-14 h-14 text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.7)] animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 70 L15 35 L35 50 L50 20 L65 50 L85 35 L80 70 Z" fill="url(#crownGradient)" stroke="#d4af37" strokeWidth="2" strokeLinejoin="round"/>
                    <circle cx="15" cy="35" r="3" fill="#ff0044" />
                    <circle cx="35" cy="50" r="3" fill="#ff0044" />
                    <circle cx="50" cy="20" r="4" fill="#ffee88" className="animate-ping origin-center" />
                    <circle cx="50" cy="20" r="4" fill="#d4af37" />
                    <circle cx="65" cy="50" r="3" fill="#ff0044" />
                    <circle cx="85" cy="35" r="3" fill="#ff0044" />
                    <rect x="25" y="62" width="50" height="5" rx="2" fill="#800020" stroke="#d4af37" strokeWidth="1" />
                    <circle cx="35" cy="64.5" r="1.5" fill="#d4af37" />
                    <circle cx="50" cy="64.5" r="1.5" fill="#d4af37" />
                    <circle cx="65" cy="64.5" r="1.5" fill="#d4af37" />
                    <path d="M35 75 C35 85, 50 92, 50 92 C50 92, 65 85, 65 75 L65 70 L35 70 Z" fill="none" stroke="#d4af37" strokeWidth="1.5" />
                    <defs>
                      <linearGradient id="crownGradient" x1="50" y1="20" x2="50" y2="70" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffee88"/>
                        <stop offset="50%" stopColor="#d4af37"/>
                        <stop offset="100%" stopColor="#800020"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Floating laser line scanner */}
                <div className="absolute left-4 right-4 h-0.5 bg-gold/80 opacity-70 shadow-[0_0_10px_#ffaa00] animate-[ping_2s_infinite] pointer-events-none"></div>
              </div>
              
              <div className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase font-black mb-1 animate-pulse">
                [ ROYAL COURT KEEP ENTRY ]
              </div>
              
              <CardTitle className="text-4xl font-extrabold tracking-tighter bg-gradient-to-r from-white via-red-200 to-gold bg-clip-text text-transparent font-mono">
                SOVEREIGN KEEP
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs mt-2 max-w-sm mx-auto font-light font-mono leading-relaxed">
                Scan Crown Sigil pattern or present the Royal Seal passphrase to ascend to the Monarch's Throne.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-10 px-10">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center font-mono">
                    <Label htmlFor="password" className="text-gold text-xs font-black tracking-widest uppercase">
                      ROYAL SEAL KEY / KNIGHT'S VOW
                    </Label>
                    <span className="text-[10px] text-red-500/70 font-semibold uppercase tracking-wider animate-pulse">
                      ▲ ROYAL SHIELD SECURE
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-gold/50 text-sm select-none">
                      👑
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="ENTER ROYAL MONARCH KEY"
                      required
                      className="bg-black/80 border-red-500/20 text-gold placeholder-red-955 font-mono tracking-[0.3em] text-center rounded-xl py-6 pl-12 pr-4 focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 w-full shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] text-lg"
                    />
                    {/* Tech Corners on Input */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40"></div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-950 via-maroon to-red-950 hover:from-red-900 hover:to-red-900 text-gold hover:text-white font-mono text-xs font-black tracking-[0.2em] py-7 rounded-xl border border-gold/30 shadow-[0_0_20px_rgba(128,0,32,0.4)] hover:shadow-[0_0_35px_rgba(255,170,0,0.3)] transition-all duration-500 flex items-center justify-center gap-3 group uppercase relative overflow-hidden"
                  >
                    {/* Inner glowing hover sheet */}
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span>👑 [ ASCEND THE THRONE OF THE REALM ] 👑</span>
                    <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                
                <div className="text-center font-mono text-[9px] text-gray-500 tracking-wider pt-2 select-none uppercase">
                  Realm Code: <span className="text-gold/60">SOV-DEC-09EE2A</span> | status: <span className="text-rose-500 animate-pulse font-bold">Awaiting Royal Sigil</span>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020005] text-gray-100 py-12 px-4 pt-28 selection:bg-rose-950 selection:text-gold relative overflow-hidden">
      {/* Background Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,0,24,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(18,0,24,0.15)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Floating Interactive 3D Plexus Background Network */}
      <div className="absolute right-0 top-10 w-[350px] h-[350px] pointer-events-none opacity-40 mix-blend-screen hidden lg:block">
        <Futuristic3DCanvas variant="plexus" size={350} />
      </div>

      {/* Floating sovereign ambient lights */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-maroon/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Sovereign Header Console */}
        <header className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 p-6 bg-[#06020c]/85 border border-red-500/20 rounded-3xl backdrop-blur-xl shadow-[0_0_40px_rgba(128,0,32,0.2)] relative group">
          {/* Tech accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/40"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold/40"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold/40"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold/40"></div>

          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-16 h-16 bg-[#020005] rounded-2xl flex items-center justify-center border border-gold/30 shadow-[0_0_20px_rgba(255,0,68,0.2)] group-hover:scale-105 transition-transform duration-500 shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[1.3]">
                <Futuristic3DCanvas variant="ring" size={64} />
              </div>
              <Cpu className="w-6 h-6 text-gold relative z-10 animate-pulse" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                <h1 className="text-3xl font-black bg-gradient-to-r from-white via-red-200 to-gold bg-clip-text text-transparent font-mono tracking-tight uppercase">
                  Sovereign Deck
                </h1>
                <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-500/30 px-3 py-1 rounded-full font-mono text-[9px] text-rose-500 uppercase tracking-widest animate-pulse mt-1 md:mt-0 shadow-[0_0_10px_rgba(255,0,68,0.1)]">
                  <Activity className="w-3.5 h-3.5" />
                  <span>SYSTEM OVERSEER ONLINE</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-1.5 font-light tracking-wide">
                Absolute administration console of KPRCAS Rotaract Realm.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={handleExportDatabase}
              className="rounded-2xl px-6 py-6 border border-gold/30 bg-[#0c000f]/60 hover:bg-gold/15 text-gold hover:text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(255,170,0,0.05)]"
            >
              <Download className="w-4 h-4" />
              <span>[ EXPORT DECK STORAGE ]</span>
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="rounded-2xl px-6 py-6 border border-red-500/30 bg-red-950/20 hover:bg-red-500 hover:text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              <span>[ LOCK GATEWAY ]</span>
            </Button>
          </div>
        </header>

        {/* Sovereign Telemetry HUD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 font-mono">
          {/* Card 1: Chronos Nodes */}
          <div className="bg-[#06010c] border border-red-500/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(255,0,68,0.03)] hover:shadow-[0_0_30px_rgba(255,0,68,0.15)] hover:border-red-500/40 transition-all duration-300 group">
            {/* Tech accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/10 pointer-events-none group-hover:border-red-500/60 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500/10 pointer-events-none group-hover:border-red-500/60 transition-colors"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">[ DEPLOYED CHRONOS NODES ]</p>
                <h3 className="text-4xl font-extrabold text-white mt-1 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">{events.length}</h3>
              </div>
              <div className="w-12 h-12 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform duration-300">
                <Calendar className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            
            <div className="text-[10px] text-red-400 flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>TEMPORAL DATA STABLE & DEPLOYED</span>
            </div>
          </div>

          {/* Card 2: Holonet Broadcasts */}
          <div className="bg-[#06010c] border border-gold/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(255,170,0,0.03)] hover:shadow-[0_0_30px_rgba(255,170,0,0.15)] hover:border-gold/40 transition-all duration-300 group">
            {/* Tech accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/10 pointer-events-none group-hover:border-gold/60 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/10 pointer-events-none group-hover:border-gold/60 transition-colors"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">[ HOLONET BROADCASTS ]</p>
                <h3 className="text-4xl font-extrabold text-white mt-1 bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">{bulletins.length}</h3>
              </div>
              <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300">
                <Newspaper className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="text-[10px] text-gold flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
              <span>COMMUNICATION BEACONS ACTIVE</span>
            </div>
          </div>

          {/* Card 3: Legion Officers */}
          <div className="bg-[#06010c] border border-red-500/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.01)] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-gold/30 transition-all duration-300 group">
            {/* Tech accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/10 pointer-events-none group-hover:border-gold/40 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500/10 pointer-events-none group-hover:border-gold/40 transition-colors"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">[ ROSTER OFFICERS ]</p>
                <h3 className="text-4xl font-extrabold text-white mt-1 bg-gradient-to-r from-white via-gray-200 to-gold bg-clip-text text-transparent">{teamMembers.length}</h3>
              </div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/80 group-hover:scale-105 transition-transform duration-300">
                <Users className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="text-[10px] text-gray-400 flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-white/50 animate-ping"></span>
              <span>ROSTER ALIGNMENT SECURE</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-gradient-to-r from-maroon/20 via-black/40 to-gold/10 border border-gold/30 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-maroon/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              
              <button
                onClick={() => setShowGuide(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 hover:bg-white/10 rounded-full transition-all"
                title="Dismiss Guide"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-4 items-start pr-8">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 text-gold animate-pulse">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    📢 How to Publish Admin Changes Globally (Hosting Sync Guide)
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed max-w-4xl">
                    Since this site runs as a fast, secure, serverless static application, edits made here are temporarily saved in your local browser. Follow this simple 3-step workflow to push your updates live for all users globally:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-white/5 border border-white/5 hover:border-gold/20 rounded-2xl transition-all duration-300">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">1</span>
                        Add / Edit Data
                      </div>
                      <p className="text-gray-400 text-xs font-light leading-relaxed">
                        Add, update, or delete events, bulletins, or team members on this dashboard. Changes are saved instantly in your local preview.
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 hover:border-gold/20 rounded-2xl transition-all duration-300">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">2</span>
                        Export Database
                      </div>
                      <p className="text-gray-400 text-xs font-light leading-relaxed">
                        Click the <strong className="text-white">Export Database Code</strong> button above to download the compiled <code className="text-gold font-mono px-1 py-0.5 rounded bg-black/40 text-[10px]">storage.ts</code> file.
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 hover:border-gold/20 rounded-2xl transition-all duration-300">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">3</span>
                        Publish Live
                      </div>
                      <p className="text-gray-400 text-xs font-light leading-relaxed">
                        Replace <code className="text-gold font-mono px-1 py-0.5 rounded bg-black/40 text-[10px]">src/lib/storage.ts</code> in your code with the downloaded file, then commit & push to GitHub to auto-redeploy!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Nav Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-10 max-w-lg mx-auto bg-white/5 p-1.5 border border-white/10 rounded-2xl shadow-xl">
            <TabsTrigger
              value="events"
              className={`rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${activeTab === 'events' ? 'bg-gradient-to-r from-maroon to-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger
              value="bulletins"
              className={`rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${activeTab === 'bulletins' ? 'bg-gradient-to-r from-maroon to-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Bulletins</span>
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className={`rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${activeTab === 'team' ? 'bg-gradient-to-r from-maroon to-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Users className="w-4 h-4" />
              <span>Team</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: MANAGE EVENTS */}
          <TabsContent value="events" className="focus:outline-none">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Form Section (left) */}
              <div className="lg:col-span-5">
                <Card className={`bg-[#05010a]/90 border border-red-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,68,0.05)] relative transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,170,0,0.1)] group ${editingEventId ? 'ring-2 ring-gold/60 border-gold/50 shadow-gold/10' : ''}`}>
                  {/* Tech Cybernetic Corner Brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/50 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/50 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/50 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/50 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-maroon via-gold to-maroon opacity-80"></div>
                  
                  <CardHeader className="pb-4">
                    <div className="font-mono text-[9px] text-rose-500 tracking-[0.2em] font-black uppercase mb-1">[ CHRONOS NODE INJECTOR ]</div>
                    <CardTitle className="text-xl font-extrabold text-white font-mono uppercase tracking-tight">
                      {editingEventId ? 'Edit Chronos Node' : 'Deploy Chronos Node'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs">
                      {editingEventId ? 'Re-calibrate the temporal coordinates of this ledger entry.' : 'Inject a new live event node into the public Chronos timeline.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddEvent} className="space-y-4 text-gray-300">
                      <div className="space-y-1.5">
                        <Label htmlFor="title" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">EVENT TITLE *</Label>
                        <Input
                          id="title"
                          value={eventForm.title}
                          onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                          placeholder="e.g., MATTAIPANDHU 3.0"
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold font-sans placeholder-red-950"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="date" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">DATE</Label>
                          <Input
                            id="date"
                            type="date"
                            value={eventForm.date}
                            onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                            className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="time" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">TIME</Label>
                          <Input
                            id="time"
                            value={eventForm.time}
                            onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                            placeholder="e.g., 10:00 AM"
                            className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-950 text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="location" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">VENUE/LOCATION</Label>
                        <Input
                          id="location"
                          value={eventForm.location}
                          onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                          placeholder="e.g., KPRCAS SEMINAR HALL"
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-950"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="platform" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">PLATFORM/TYPE</Label>
                        <Input
                          id="platform"
                          value={eventForm.platform}
                          onChange={e => setEventForm({ ...eventForm, platform: e.target.value })}
                          placeholder="e.g., IN-PERSON / ONLINE"
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-950"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="image" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">VISUAL CORRELATE (IMAGE URL)</Label>
                        <Input
                          id="image"
                          value={eventForm.image}
                          onChange={e => setEventForm({ ...eventForm, image: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-950 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="description" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">DECRYPTED DESCRIPTION *</Label>
                        <Textarea
                          id="description"
                          value={eventForm.description}
                          onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                          placeholder="Provide a highly descriptive log..."
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-950 min-h-[90px]"
                          required
                        />
                      </div>

                      {/* Dynamic Live Preview */}
                      <div className="border border-red-500/10 rounded-xl p-4 bg-[#0c0014]/60 mt-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40"></div>
                        <span className="text-[10px] font-mono font-bold uppercase text-gold block mb-2 tracking-widest">[ DECK SCREEN PREVIEW ]</span>
                        <div className="bg-black/60 border border-red-500/10 rounded-lg p-3 flex gap-3 items-center">
                          <div className="w-16 h-12 rounded bg-[#020005] border border-red-500/20 flex-shrink-0 overflow-hidden flex items-center justify-center relative shadow-[inset_0_0_10px_rgba(255,0,0,0.5)]">
                            {eventForm.image ? (
                              <img src={eventForm.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-rose-500/60" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1 font-mono">
                            <h4 className="text-xs font-bold text-white truncate uppercase tracking-wider">{eventForm.title || 'UNTITLED NODE'}</h4>
                            <p className="text-[9px] text-gray-500 truncate">{eventForm.description || 'No descriptive feed...'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-2">
                        {editingEventId && (
                          <Button
                            type="button"
                            onClick={cancelEditEvent}
                            className="flex-1 bg-[#1a000a] border border-red-500/20 hover:bg-red-950/40 text-rose-400 hover:text-white font-mono text-xs font-bold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4 text-red-500" />
                            <span>[ ABORT ]</span>
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className={`${editingEventId ? 'flex-1 bg-gradient-to-r from-gold to-yellow-600 text-black font-extrabold shadow-[0_0_20px_rgba(255,170,0,0.3)]' : 'w-full bg-gradient-to-r from-red-950 via-maroon to-red-950 text-gold hover:text-white font-extrabold border border-gold/30 shadow-[0_0_20px_rgba(128,0,32,0.4)]'} font-mono text-xs tracking-wider py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase`}
                        >
                          {editingEventId ? (
                            <>
                              <Edit className="w-4 h-4 text-black" />
                              <span>[ REWRITE DATA ]</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-gold" />
                              <span>[ INJECT CHRONOS NODE ]</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List Section (right) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Search Header */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <Input
                    type="text"
                    value={eventSearch}
                    onChange={e => setEventSearch(e.target.value)}
                    placeholder="QUERY CORE LEDGER BY TITLE OR LOCATION..."
                    className="bg-black/60 border-red-500/20 pl-12 py-6 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold w-full text-gold font-mono placeholder-red-950 text-xs tracking-widest shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute top-0 right-4 bottom-0 flex items-center pointer-events-none font-mono text-[9px] text-gray-500 tracking-wider">
                    [ LEDGER FILTER ]
                  </div>
                </div>

                <Card className="bg-[#05010a]/90 border border-red-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,68,0.05)] relative group">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-maroon via-gold to-maroon opacity-80"></div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between font-mono">
                      <div>
                        <div className="text-[9px] text-rose-500 tracking-[0.2em] font-black uppercase mb-1">[ ACTIVE CHRONOLOGY FEEDS ]</div>
                        <CardTitle className="text-lg font-bold text-white uppercase tracking-wider">Temporal Ledger Registers</CardTitle>
                        <CardDescription className="text-gray-400 text-xs mt-0.5">Monitoring live network Chronos nodes ({filteredEvents.length} indexes).</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto divide-y divide-red-950/20 custom-scrollbar font-mono">
                      <AnimatePresence initial={false}>
                        {filteredEvents.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-5 hover:bg-red-950/10 transition-colors duration-300 relative group/row border-b border-red-950/15"
                          >
                            {/* Hover overlay highlights */}
                            <div className="absolute inset-y-0 left-0 w-1 bg-gold opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="w-16 h-12 rounded bg-[#020005] border border-red-500/20 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md relative shadow-[inset_0_0_10px_rgba(255,0,0,0.4)]">
                              {event.image ? (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-4 h-4 text-rose-500/60" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0 font-mono">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-xs truncate uppercase tracking-widest leading-snug">{event.title}</h4>
                                <span className="text-[8px] bg-red-950/50 text-rose-400 border border-red-500/20 px-1.5 py-0.5 rounded uppercase font-black tracking-widest shrink-0 scale-90">
                                  {event.id}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-gray-500 mt-1.5">
                                <span className="flex items-center gap-1 text-[10px]"><Calendar className="w-3.5 h-3.5 text-gold/70" /> {event.date || 'UNSPECIFIED'}</span>
                                {event.location && <span className="flex items-center gap-1 text-[10px]"><MapPin className="w-3.5 h-3.5 text-gold/70 animate-pulse" /> {event.location}</span>}
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                type="button"
                                size="icon"
                                onClick={() => startEditEvent(event)}
                                className={`rounded-xl w-10 h-10 border transition-all duration-300 flex items-center justify-center ${editingEventId === event.id ? 'bg-gold border-gold text-black shadow-lg shadow-gold/20' : 'border-gold/20 bg-gold/10 text-gold hover:bg-gold hover:text-black'}`}
                                title="Edit Event"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteEvent(event.id)}
                                className="rounded-xl w-10 h-10 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                                title="Delete Event"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredEvents.length === 0 && (
                        <div className="py-16 text-center text-gray-500 font-mono">
                          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold animate-bounce" />
                          <p className="text-xs tracking-widest">[ NO CHRONOLOGY INDEXES DETECTED ]</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: MANAGE BULLETINS */}
          <TabsContent value="bulletins" className="focus:outline-none">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Form Section (left) */}
              <div className="lg:col-span-5">
                <Card className={`bg-[#05010a]/90 border border-red-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,68,0.05)] relative transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,170,0,0.1)] group ${editingBulletinId ? 'ring-2 ring-gold/60 border-gold/50 shadow-gold/10' : ''}`}>
                  {/* Tech Cybernetic Corner Brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/50 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/50 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/50 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/50 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-maroon via-gold to-maroon opacity-80"></div>
                  
                  <CardHeader className="pb-4">
                    <div className="font-mono text-[9px] text-rose-500 tracking-[0.2em] font-black uppercase mb-1">[ HOLONET BROADCASTER ]</div>
                    <CardTitle className="text-xl font-extrabold text-white font-mono uppercase tracking-tight">
                      {editingBulletinId ? 'Edit Broadcast' : 'Publish Bulletin'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs">
                      {editingBulletinId ? 'Re-align the Holonet data array coefficients.' : 'Deploy a new digital bulletin release directly onto the Holonet network.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddBulletin} className="space-y-4 text-gray-300">
                      <div className="space-y-1.5">
                        <Label htmlFor="b_title" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">BULLETIN TITLE *</Label>
                        <Input
                          id="b_title"
                          value={bulletinForm.title}
                          onChange={e => setBulletinForm({ ...bulletinForm, title: e.target.value })}
                          placeholder="e.g., NOVEMBER 2025 EDITION"
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-955"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_date" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">CHRONOLOGY IDENTIFIER *</Label>
                        <Input
                          id="b_date"
                          value={bulletinForm.date}
                          onChange={e => setBulletinForm({ ...bulletinForm, date: e.target.value })}
                          placeholder="e.g., November-2025"
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-955 font-mono"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_fileId" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">GOOGLE DRIVE SHARE LINK OR ASSET ID *</Label>
                        <Input
                          id="b_fileId"
                          value={bulletinForm.fileId}
                          onChange={e => setBulletinForm({ ...bulletinForm, fileId: e.target.value })}
                          placeholder="Paste full Google Drive Link or File ID..."
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-955 font-mono text-xs"
                          required
                        />
                        <p className="text-[9px] text-gray-500 leading-tight font-sans">
                          💡 You can paste the **entire Google Drive Share Link** or just the File ID. We will extract the ID automatically.
                          <br />
                          ⚠️ Crucial: Make sure the file sharing in Google Drive is set to **"Anyone with the link can view"**.
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_coverImage" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">COVER POSTER PATH/URL</Label>
                        <Input
                          id="b_coverImage"
                          value={bulletinForm.coverImage}
                          onChange={e => setBulletinForm({ ...bulletinForm, coverImage: e.target.value })}
                          placeholder="e.g., /bulletin-covers/november.png"
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-955 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_content" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">BULLETIN ABSTRACT / CONTENT</Label>
                        <Textarea
                          id="b_content"
                          value={bulletinForm.content}
                          onChange={e => setBulletinForm({ ...bulletinForm, content: e.target.value })}
                          placeholder="Summarize key announcements in this broadcast data packet..."
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-955 min-h-[90px]"
                        />
                      </div>

                      <div className="flex gap-4 mt-2">
                        {editingBulletinId && (
                          <Button
                            type="button"
                            onClick={cancelEditBulletin}
                            className="flex-1 bg-[#1a000a] border border-red-500/20 hover:bg-red-950/40 text-rose-400 hover:text-white font-mono text-xs font-bold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4 text-red-500" />
                            <span>[ ABORT ]</span>
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className={`${editingBulletinId ? 'flex-1 bg-gradient-to-r from-gold to-yellow-600 text-black font-extrabold shadow-[0_0_20px_rgba(255,170,0,0.3)]' : 'w-full bg-gradient-to-r from-red-950 via-maroon to-red-950 text-gold hover:text-white font-extrabold border border-gold/30 shadow-[0_0_20px_rgba(128,0,32,0.4)]'} font-mono text-xs tracking-wider py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase`}
                        >
                          {editingBulletinId ? (
                            <>
                              <Edit className="w-4 h-4 text-black" />
                              <span>[ REWRITE BROADCAST ]</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-gold" />
                              <span>[ BROADCAST TO HOLONET ]</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List Section (right) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Search Header */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <Input
                    type="text"
                    value={bulletinSearch}
                    onChange={e => setBulletinSearch(e.target.value)}
                    placeholder="QUERY HOLONET REGISTRY BY TITLE OR IDENTIFIER..."
                    className="bg-black/60 border-red-500/20 pl-12 py-6 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold w-full text-gold font-mono placeholder-red-955 text-xs tracking-widest shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute top-0 right-4 bottom-0 flex items-center pointer-events-none font-mono text-[9px] text-gray-500 tracking-wider">
                    [ BROADCAST FILTER ]
                  </div>
                </div>

                <Card className="bg-[#05010a]/90 border border-red-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,68,0.05)] relative group">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-maroon via-gold to-maroon opacity-80"></div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between font-mono">
                      <div>
                        <div className="text-[9px] text-rose-500 tracking-[0.2em] font-black uppercase mb-1">[ DETECTED DATA SIGNALS ]</div>
                        <CardTitle className="text-lg font-bold text-white uppercase tracking-wider font-mono">Holonet Node Registers</CardTitle>
                        <CardDescription className="text-gray-400 text-xs mt-0.5">Actively monitoring published monthly bulletins ({filteredBulletins.length} registers).</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto divide-y divide-red-950/20 custom-scrollbar font-mono">
                      <AnimatePresence initial={false}>
                        {filteredBulletins.map((bulletin) => (
                          <motion.div
                            key={bulletin.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-5 hover:bg-red-950/10 transition-colors duration-300 relative group/row border-b border-red-950/15"
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-gold opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="w-12 h-16 rounded bg-[#020005] border border-red-500/20 overflow-hidden flex-shrink-0 flex items-center justify-center text-gold shadow-md aspect-[3/4] relative shadow-[inset_0_0_10px_rgba(255,0,0,0.3)]">
                              {bulletin.coverImage ? (
                                <img src={bulletin.coverImage} alt={bulletin.title} className="w-full h-full object-cover" />
                              ) : (
                                <Newspaper className="w-5 h-5 text-gold/60" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0 font-mono">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-xs truncate uppercase tracking-widest leading-snug">{bulletin.title}</h4>
                                <span className="text-[8px] bg-red-950/50 text-rose-400 border border-red-500/20 px-1.5 py-0.5 rounded uppercase font-black tracking-widest shrink-0 scale-90">
                                  {bulletin.id}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-500 mt-2">
                                <span className="flex items-center gap-1 font-mono text-[9px] text-rose-500/60 font-semibold tracking-wider">REF: {bulletin.fileId.slice(0, 10)}...</span>
                                <span className="flex items-center gap-1 text-[9px] bg-red-950/40 border border-red-500/20 px-2 py-0.5 rounded-full text-gold font-bold uppercase tracking-widest">{bulletin.date}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                type="button"
                                size="icon"
                                onClick={() => startEditBulletin(bulletin)}
                                className={`rounded-xl w-10 h-10 border transition-all duration-300 flex items-center justify-center ${editingBulletinId === bulletin.id ? 'bg-gold border-gold text-black shadow-lg shadow-gold/20' : 'border-gold/20 bg-gold/10 text-gold hover:bg-gold hover:text-black'}`}
                                title="Edit Bulletin"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteBulletin(bulletin.id)}
                                className="rounded-xl w-10 h-10 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                                title="Delete Bulletin"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredBulletins.length === 0 && (
                        <div className="py-16 text-center text-gray-500 font-mono">
                          <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold animate-bounce" />
                          <p className="text-xs tracking-widest">[ NO HOLONET NODE SIGNALS DETECTED ]</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: MANAGE TEAM MEMBERS */}
          <TabsContent value="team" className="focus:outline-none">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Form Section (left) */}
              <div className="lg:col-span-5">
                <Card className={`bg-[#05010a]/90 border border-red-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,68,0.05)] relative group transition-all duration-300 ${editingTeamId ? 'ring-1 ring-gold shadow-[0_0_25px_rgba(212,175,55,0.15)] border-gold/50' : ''}`}>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-maroon via-gold to-maroon opacity-80"></div>
                  
                  <CardHeader className="pb-4">
                    <div className="font-mono text-[9px] text-rose-500 tracking-[0.2em] font-black uppercase mb-1">[ ROSTER RECRUIT TERMINAL ]</div>
                    <CardTitle className="text-xl font-extrabold text-white font-mono uppercase tracking-tight">
                      {editingTeamId ? 'Modify Officer Commission' : 'Commission Command Officer'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs font-mono">
                      {editingTeamId ? 'Re-calibrate credentials for this legion roster agent.' : 'Enlist a new officer to command active club sectors.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddTeamMember} className="space-y-4 text-gray-300">
                      <div className="space-y-1.5">
                        <Label htmlFor="m_name" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">OFFICER IDENTIFIER / NAME *</Label>
                        <Input
                          id="m_name"
                          value={teamForm.name}
                          onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
                          placeholder="e.g., Rtr. Sanjay K"
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-955 text-xs font-mono"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="m_position" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">ASSIGNED ROLE / SECTOR *</Label>
                        <Input
                          id="m_position"
                          value={teamForm.position}
                          onChange={e => setTeamForm({ ...teamForm, position: e.target.value })}
                          placeholder="e.g., DESIGN CHAIR"
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-955 text-xs font-mono"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="m_image" className="text-xs uppercase font-bold text-gold tracking-widest font-mono">PORTRAIT VISUAL SIGNAL DATA (URL)</Label>
                        <Input
                          id="m_image"
                          value={teamForm.image}
                          onChange={e => setTeamForm({ ...teamForm, image: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="bg-black/40 border-red-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-red-955 text-xs font-mono"
                        />
                        <p className="text-[9px] text-gray-500 font-mono tracking-wide mt-1">
                          Leave empty to deploy standard KPRCAS Rotaract crest identity.
                        </p>
                      </div>

                      {/* Interactive Premium Card Preview */}
                      <div className="border border-red-500/20 rounded-2xl p-6 bg-[#0c0014]/60 mt-6 relative overflow-hidden flex flex-col items-center group/preview shadow-[inset_0_0_20px_rgba(255,0,68,0.05)]">
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40"></div>
                        <div className="absolute top-2 left-3 text-[9px] font-mono font-bold text-gold/80 uppercase tracking-[0.2em]">
                          [ ROSTER TELEMETRY PREVIEW ]
                        </div>
                        
                        {/* Futuristic Hologram Ring */}
                        <div className="relative w-28 h-28 mx-auto mt-4 mb-4 flex-shrink-0 flex items-center justify-center">
                          {/* Pulsing scanner circle */}
                          <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping opacity-45"></div>
                          {/* Outer Rotating HUD Bracket */}
                          <div className="absolute inset-[-6px] rounded-full border-2 border-dashed border-gold/40 animate-[spin_20s_linear_infinite]"></div>
                          {/* Inner glowing cyber circle */}
                          <div className="absolute inset-0 rounded-full border-[3px] border-double border-maroon/80 shadow-[0_0_15px_rgba(128,0,32,0.6)] overflow-hidden bg-black/60 flex items-center justify-center">
                            {teamForm.image ? (
                              <img src={teamForm.image} alt={teamForm.name} className="w-full h-full object-cover group-hover/preview:scale-110 transition-transform duration-500" />
                            ) : (
                              <User className="w-10 h-10 text-rose-500/40 animate-pulse" />
                            )}
                          </div>
                          {/* Horizontal scanline laser */}
                          <div className="absolute left-0 right-0 h-[2px] bg-red-500/80 shadow-[0_0_8px_#ff003c] animate-[bounce_3s_infinite] pointer-events-none opacity-60"></div>
                        </div>
                        
                        <h4 className="text-sm font-bold text-white text-center leading-snug uppercase tracking-widest font-mono">
                          {teamForm.name || 'Officer Candidate'}
                        </h4>
                        <p className="text-[10px] text-gold font-extrabold tracking-[0.25em] uppercase text-center mt-2.5 bg-red-950/40 border border-red-500/25 px-3 py-1 rounded">
                          {teamForm.position || 'ROLE / SECTOR'}
                        </p>
                      </div>

                      <div className="flex gap-4 mt-2">
                        {editingTeamId && (
                          <Button
                            type="button"
                            onClick={cancelEditTeamMember}
                            className="flex-1 bg-[#1a000a] border border-red-500/20 hover:bg-red-950/40 text-rose-400 hover:text-white font-mono text-xs font-bold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4 text-red-500" />
                            <span>[ ABORT ]</span>
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className={`${editingTeamId ? 'flex-1 bg-gradient-to-r from-gold to-yellow-600 text-black font-extrabold shadow-[0_0_20px_rgba(255,170,0,0.3)]' : 'w-full bg-gradient-to-r from-red-950 via-maroon to-red-950 text-gold hover:text-white font-extrabold border border-gold/30 shadow-[0_0_20px_rgba(128,0,32,0.4)]'} font-mono text-xs tracking-wider py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase`}
                        >
                          {editingTeamId ? (
                            <>
                              <Edit className="w-4 h-4 text-black" />
                              <span>[ REWRITE REGISTER ]</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-gold" />
                              <span>[ COMMISSION OFFICER ]</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List Section (right) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Search Header */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <Input
                    type="text"
                    value={teamSearch}
                    onChange={e => setTeamSearch(e.target.value)}
                    placeholder="QUERY ROSTER REGISTRY BY NAME OR POSITION..."
                    className="bg-black/60 border-red-500/20 pl-12 py-6 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold w-full text-gold font-mono placeholder-red-955 text-xs tracking-widest shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute top-0 right-4 bottom-0 flex items-center pointer-events-none font-mono text-[9px] text-gray-500 tracking-wider">
                    [ OFFICER FILTER ]
                  </div>
                </div>

                <Card className="bg-[#05010a]/90 border border-red-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,68,0.05)] relative group">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-maroon via-gold to-maroon opacity-80"></div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between font-mono">
                      <div>
                        <div className="text-[9px] text-rose-500 tracking-[0.2em] font-black uppercase mb-1">[ DETECTED LIFEFORMS ]</div>
                        <CardTitle className="text-lg font-bold text-white uppercase tracking-wider font-mono">Tactical Legion Ledger</CardTitle>
                        <CardDescription className="text-gray-400 text-xs mt-0.5">Actively monitoring commissioned active roster officers ({filteredTeamMembers.length} entities).</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto divide-y divide-red-950/20 custom-scrollbar font-mono">
                      <AnimatePresence initial={false}>
                        {filteredTeamMembers.map((member) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-5 hover:bg-red-950/10 transition-colors duration-300 relative group/row border-b border-red-950/15"
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-gold opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Futuristic Officer Frame */}
                            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                              {/* Pulsing signal ring around picture */}
                              <div className="absolute inset-0 rounded-full border border-red-500/20 group-hover/row:border-gold/50 transition-colors duration-300 group-hover/row:scale-105"></div>
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-maroon/40 bg-[#020005] flex items-center justify-center relative shadow-[inset_0_0_8px_rgba(255,0,0,0.4)]">
                                {member.image ? (
                                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                  <User className="w-4 h-4 text-rose-500/40" />
                                )}
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0 font-mono">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-xs truncate uppercase tracking-widest leading-snug">{member.name}</h4>
                                <span className="text-[8px] bg-red-950/50 text-rose-400 border border-red-500/20 px-1.5 py-0.5 rounded uppercase font-black tracking-widest shrink-0 scale-90">
                                  {member.id}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-500 mt-2">
                                <span className="flex items-center gap-1 text-[9px] bg-red-950/40 border border-red-500/20 px-2 py-0.5 rounded-full text-gold font-bold uppercase tracking-widest">{member.position}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                type="button"
                                size="icon"
                                onClick={() => startEditTeamMember(member)}
                                className={`rounded-xl w-10 h-10 border transition-all duration-300 flex items-center justify-center ${editingTeamId === member.id ? 'bg-gold border-gold text-black shadow-lg shadow-gold/20' : 'border-gold/20 bg-gold/10 text-gold hover:bg-gold hover:text-black'}`}
                                title="Edit Officer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteTeamMember(member.id)}
                                className="rounded-xl w-10 h-10 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                                title="Decommission Officer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredTeamMembers.length === 0 && (
                        <div className="py-16 text-center text-gray-500 font-mono">
                          <Users className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold animate-pulse" />
                          <p className="text-xs tracking-widest">[ NO COGNITIVE OFFICERS DETECTED ]</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
