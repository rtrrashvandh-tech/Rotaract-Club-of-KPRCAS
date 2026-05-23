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
  Server,
  Layers,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Settings
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

    const particles: Particle3D[] = [];
    const particleCount = variant === 'sphere' ? 80 : (variant === 'ring' ? 60 : 50);
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
        particles.push({
          x: radius * Math.cos(theta),
          y: radius * Math.sin(theta),
          z: (Math.random() - 0.5) * 8,
        });
      } else {
        particles.push({
          x: (Math.random() - 0.5) * size * 0.7,
          y: (Math.random() - 0.5) * size * 0.7,
          z: (Math.random() - 0.5) * size * 0.7,
        });
      }
    }

    let angleX = 0.0015;
    let angleY = 0.0015;
    const perspective = size * 0.9;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = (x / (width / 2)) * 0.008;
      mouseRef.current.targetY = (y / (height / 2)) * 0.008;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const currentAngleX = angleX + mouseRef.current.y;
      const currentAngleY = angleY + mouseRef.current.x;

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

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

      if (variant === 'plexus' || variant === 'ring') {
        const connectionDistance = size * 0.22;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < projected.length; i++) {
          for (let j = i + 1; j < projected.length; j++) {
            const dx = projected[i].projX - projected[j].projX;
            const dy = projected[i].projY - projected[j].projY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const alpha = (1 - dist / connectionDistance) * 0.15;
              ctx.strokeStyle = projected[i].z2 > 0 ? `rgba(163, 29, 56, ${alpha})` : `rgba(229, 193, 88, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(projected[i].projX, projected[i].projY);
              ctx.lineTo(projected[j].projX, projected[j].projY);
              ctx.stroke();
            }
          }
        }
      }

      projected.forEach((p) => {
        if (p.projX < 0 || p.projX > width || p.projY < 0 || p.projY > height) return;

        const pSize = Math.max(0.6, p.scale * 2);
        const alpha = Math.min(1, Math.max(0.12, p.scale * 0.7));
        ctx.fillStyle = p.z2 > 0 
          ? `rgba(163, 29, 56, ${alpha})` 
          : `rgba(229, 193, 88, ${alpha})`;

        ctx.beginPath();
        ctx.arc(p.projX, p.projY, pSize, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach(p => {
        const spinSpeed = 0.0025;
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

  return <canvas ref={canvasRef} className="opacity-40 pointer-events-none mix-blend-screen" />;
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

  // Active Tab State
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
      toast.success('Authentication successful! Welcome to the Admin Console.');
    } else {
      toast.error('Access Denied. Passkey is incorrect.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    toast.info('Signed out successfully.');
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
      // Migration: Ensure newly added hardcoded initial events are merged for existing local caches
      if (Array.isArray(parsed)) {
        let updated = false;
        const merged = [...parsed];
        initialEvents.forEach(initE => {
          if (!merged.some(e => e.id === initE.id)) {
            merged.push(initE);
            updated = true;
          }
        });
        if (updated) {
          saveEvents(merged);
          return merged;
        }
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse events from local storage', e);
    }
  }
  saveEvents(initialEvents);
  return initialEvents;
};

export const saveEvents = (events: EventType[], syncToServer = false) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  if (syncToServer) {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(events)
    }).catch(e => console.warn('Backend server unreachable, saved to local cache only.', e));
  }
};

export const getBulletins = (): BulletinType[] => {
  const stored = localStorage.getItem(BULLETINS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migration: Ensure newly added hardcoded initial bulletins are merged for existing local caches
      if (Array.isArray(parsed)) {
        let updated = false;
        const merged = [...parsed];
        initialBulletins.forEach(initB => {
          if (!merged.some(b => b.id === initB.id)) {
            merged.push(initB);
            updated = true;
          }
        });
        if (updated) {
          saveBulletins(merged);
          return merged;
        }
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse bulletins from local storage', e);
    }
  }
  saveBulletins(initialBulletins);
  return initialBulletins;
};

export const saveBulletins = (bulletins: BulletinType[], syncToServer = false) => {
  localStorage.setItem(BULLETINS_KEY, JSON.stringify(bulletins));
  if (syncToServer) {
    fetch('/api/bulletins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bulletins)
    }).catch(e => console.warn('Backend server unreachable, saved to local cache only.', e));
  }
};

export const getTeamMembers = (): TeamMemberType[] => {
  const stored = localStorage.getItem(TEAM_MEMBERS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migration: Ensure newly added hardcoded initial team members are merged for existing local caches
      if (Array.isArray(parsed)) {
        let updated = false;
        const merged = [...parsed];
        initialTeamMembers.forEach(initT => {
          if (!merged.some(t => t.id === initT.id)) {
            merged.push(initT);
            updated = true;
          }
        });
        if (updated) {
          saveTeamMembers(merged);
          return merged;
        }
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse team members from local storage', e);
    }
  }
  saveTeamMembers(initialTeamMembers);
  return initialTeamMembers;
};

export const saveTeamMembers = (members: TeamMemberType[], syncToServer = false) => {
  localStorage.setItem(TEAM_MEMBERS_KEY, JSON.stringify(members));
  if (syncToServer) {
    fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(members)
    }).catch(e => console.warn('Backend server unreachable, saved to local cache only.', e));
  }
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
    toast.success("Database exported! Overwrite src/lib/storage.ts with the downloaded file to deploy updates.");
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
      toast.success(`Event "${newEvent.title}" created successfully!`);
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
      toast.error('Title, Date, and Google Drive File ID are required');
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
      toast.success(`Bulletin "${newBulletin.title}" published successfully!`);
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
      toast.success(`Roster member "${teamForm.name}" updated successfully!`);
    } else {
      const newMember: TeamMemberType = {
        ...teamForm,
        image: teamForm.image.trim() || defaultImage,
        id: `t_${Date.now()}`
      };
      updatedMembers = [newMember, ...teamMembers];
      toast.success(`Roster member "${newMember.name}" added successfully!`);
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
    toast.info('Roster editing cancelled');
  };

  // --- Delete Team Member Handler ---
  const handleDeleteTeamMember = (id: string) => {
    const memberToDelete = teamMembers.find(m => m.id === id);
    const updatedMembers = teamMembers.filter(m => m.id !== id);
    setTeamMembers(updatedMembers);
    saveTeamMembers(updatedMembers, true);
    toast.success(`Deleted Member: ${memberToDelete?.name || 'Member'}`);
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
      <div className="min-h-screen bg-[#06040A] flex items-center justify-center px-4 relative overflow-hidden selection:bg-rose-900/50 selection:text-gold">
        {/* Modern Elegant Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(163,29,56,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-maroon/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[140px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="bg-[#0B0813]/85 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden text-white relative">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-maroon via-gold to-maroon"></div>
            
            <CardHeader className="pt-12 pb-6 text-center relative">
              {/* Interactive subtle 3D plexus in the background of login card */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 scale-90 -z-10">
                <Futuristic3DCanvas variant="plexus" size={260} />
              </div>
              
              <div className="mx-auto w-16 h-16 bg-[#120E20] border border-gold/20 rounded-full flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(229,193,88,0.15)]">
                <Lock className="w-6 h-6 text-gold drop-shadow-[0_0_8px_rgba(229,193,88,0.5)]" />
              </div>
              
              <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-bold mb-1">
                Rotaract KPRCAS
              </span>
              <CardTitle className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-red-200 to-gold bg-clip-text text-transparent font-sans">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs mt-2 max-w-xs mx-auto leading-relaxed">
                Provide the administrator passphrase to manage events, monthly bulletins, and club roster.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-10 px-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gold tracking-widest uppercase">
                    <Label htmlFor="password">ADMINISTRATOR PASSKEY</Label>
                    <span className="text-rose-500/80 font-black animate-pulse flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Secure Connection
                    </span>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••"
                    required
                    className="bg-black/40 border-white/10 text-white placeholder-gray-600 tracking-[0.25em] text-center rounded-xl py-6 focus:ring-1 focus:ring-gold focus:border-gold transition-all duration-300 w-full text-base shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-maroon to-red-800 hover:from-red-700 hover:to-red-900 text-white font-extrabold tracking-widest py-6 rounded-xl border border-gold/20 shadow-[0_10px_20px_rgba(163,29,56,0.2)] hover:shadow-[0_12px_25px_rgba(229,193,88,0.2)] transition-all duration-500 flex items-center justify-center gap-2 text-xs uppercase"
                  >
                    <span>Authenticate Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07050D] text-gray-200 py-12 px-4 pt-28 selection:bg-rose-950 selection:text-gold relative overflow-hidden">
      {/* Modern Background Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="absolute right-0 top-10 w-[300px] h-[300px] pointer-events-none opacity-20 mix-blend-screen hidden lg:block">
        <Futuristic3DCanvas variant="plexus" size={300} />
      </div>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-maroon/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Sleek Modern Header Console */}
        <header className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 p-6 bg-[#0E0B1A]/85 border border-white/5 rounded-3xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.3)] relative group">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-14 h-14 bg-[#120E22] rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-500 shrink-0 overflow-hidden relative shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-105 opacity-60">
                <Futuristic3DCanvas variant="ring" size={56} />
              </div>
              <Settings className="w-5 h-5 text-gold relative z-10 animate-spin-slow" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                <h1 className="text-2xl font-black bg-gradient-to-r from-white via-red-200 to-gold bg-clip-text text-transparent tracking-tight">
                  Admin Console
                </h1>
                <div className="flex items-center gap-1 bg-rose-950/40 border border-rose-500/20 px-3 py-0.5 rounded-full font-mono text-[9px] text-rose-400 uppercase tracking-widest shadow-[0_0_8px_rgba(163,29,56,0.2)]">
                  <Activity className="w-3 h-3 text-rose-500 animate-pulse" />
                  <span>Control Center Active</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-1">
                Database administration dashboard for the Rotaract Club of KPRCAS.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={handleExportDatabase}
              className="rounded-2xl px-5 py-5 border border-gold/20 bg-[#120E22] hover:bg-gold/10 text-gold hover:text-white font-medium text-xs tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Database</span>
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="rounded-2xl px-5 py-5 border border-rose-500/20 bg-rose-950/30 hover:bg-rose-600 text-rose-400 hover:text-white font-medium text-xs tracking-wider flex items-center gap-2 transition-all duration-300"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </header>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Total Events */}
          <div className="bg-[#0B0815]/90 border border-white/5 hover:border-maroon/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_25px_rgba(163,29,56,0.15)] transition-all duration-300 group">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-maroon/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Total Events</p>
                <h3 className="text-4xl font-extrabold text-white mt-1 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">{events.length}</h3>
              </div>
              <div className="w-11 h-11 bg-rose-950/30 border border-rose-500/20 rounded-xl flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="text-[10px] text-rose-400/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>Events directory verified and live</span>
            </div>
          </div>

          {/* Card 2: Bulletins */}
          <div className="bg-[#0B0815]/90 border border-white/5 hover:border-gold/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_25px_rgba(229,193,88,0.15)] transition-all duration-300 group">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Bulletins Published</p>
                <h3 className="text-4xl font-extrabold text-white mt-1 bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">{bulletins.length}</h3>
              </div>
              <div className="w-11 h-11 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <Newspaper className="w-5 h-5" />
              </div>
            </div>
            <div className="text-[10px] text-gold/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              <span>Bulletins synchronized with server</span>
            </div>
          </div>

          {/* Card 3: Team Members */}
          <div className="bg-[#0B0815]/90 border border-white/5 hover:border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_25px_rgba(255,255,255,0.05)] transition-all duration-300 group">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Legion Roster</p>
                <h3 className="text-4xl font-extrabold text-white mt-1 bg-gradient-to-r from-white via-gray-200 to-gold bg-clip-text text-transparent">{teamMembers.length}</h3>
              </div>
              <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/80 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-[10px] text-gray-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span>All dynamic roster members active</span>
            </div>
          </div>
        </div>

        {/* Collapsible Database Sync Guide */}
        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-6 bg-gradient-to-r from-maroon/10 via-black/40 to-gold/5 border border-white/10 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-2xl"
            >
              <button
                onClick={() => setShowGuide(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 hover:bg-white/10 rounded-full transition-all"
                title="Dismiss Guide"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-4 items-start pr-8">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    📢 Database Hosting & Synchronization Guide
                  </h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed max-w-4xl">
                    This admin panel securely synchronizes with the Express backend server database. To ensure that your modifications remain persistent and are deployed across static hosting fallbacks globally, follow this standard deployment sequence:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-white/5 border border-white/5 hover:border-gold/20 rounded-2xl transition-all duration-300">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">1</span>
                        Update Records
                      </div>
                      <p className="text-gray-400 text-[11px] font-light leading-relaxed">
                        Add, modify, or delete events, bulletins, or team members on this console. All active modifications are saved instantly to the backend's persistent disk.
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 hover:border-gold/20 rounded-2xl transition-all duration-300">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">2</span>
                        Export Database Code
                      </div>
                      <p className="text-gray-400 text-[11px] font-light leading-relaxed">
                        Click the <strong className="text-white">Export Database</strong> button to download the latest <code className="text-gold font-mono px-1 py-0.5 rounded bg-black/40 text-[10px]">storage.ts</code> code configuration file.
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 hover:border-gold/20 rounded-2xl transition-all duration-300">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">3</span>
                        Commit Changes
                      </div>
                      <p className="text-gray-400 text-[11px] font-light leading-relaxed">
                        Replace <code className="text-gold font-mono px-1 py-0.5 rounded bg-black/40 text-[10px]">src/lib/storage.ts</code> in your project folder with the downloaded file, then commit and push to Git to redeploy statically!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-10 max-w-md mx-auto bg-white/5 p-1.5 border border-white/10 rounded-2xl shadow-xl">
            <TabsTrigger
              value="events"
              className={`rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs ${activeTab === 'events' ? 'bg-gradient-to-r from-maroon to-red-800 text-white shadow-lg shadow-maroon/20' : 'text-gray-400 hover:text-white'}`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger
              value="bulletins"
              className={`rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs ${activeTab === 'bulletins' ? 'bg-gradient-to-r from-maroon to-red-800 text-white shadow-lg shadow-maroon/20' : 'text-gray-400 hover:text-white'}`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>Bulletins</span>
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className={`rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs ${activeTab === 'team' ? 'bg-gradient-to-r from-maroon to-red-800 text-white shadow-lg shadow-maroon/20' : 'text-gray-400 hover:text-white'}`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Roster</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: MANAGE EVENTS */}
          <TabsContent value="events" className="focus:outline-none">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Form Card */}
              <div className="lg:col-span-5">
                <Card className={`bg-[#0B0815]/95 border border-white/5 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.35)] relative transition-all duration-500 ${editingEventId ? 'ring-2 ring-gold/40 border-gold/30 shadow-gold/5' : ''}`}>
                  <CardHeader className="pb-4 border-b border-white/5">
                    <span className="text-[9px] text-gold tracking-widest font-bold uppercase mb-1">Interactive Editor</span>
                    <CardTitle className="text-lg font-bold text-white uppercase tracking-tight">
                      {editingEventId ? 'Edit Event Details' : 'Create New Event'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs">
                      {editingEventId ? 'Modify the details and location parameters of this event entry.' : 'Register and host a new event visible on the public events grid.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAddEvent} className="space-y-4 text-gray-300">
                      <div className="space-y-1.5">
                        <Label htmlFor="title" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Event Title *</Label>
                        <Input
                          id="title"
                          value={eventForm.title}
                          onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                          placeholder="e.g., Yours Lovingly 2.0"
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="date" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={eventForm.date}
                            onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                            className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="time" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Time</Label>
                          <Input
                            id="time"
                            value={eventForm.time}
                            onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                            placeholder="e.g., 10:00 AM"
                            className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600 text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="location" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Venue / Location</Label>
                        <Input
                          id="location"
                          value={eventForm.location}
                          onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                          placeholder="e.g., Seminar Hall (KPRCAS)"
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="platform" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Platform / Type</Label>
                        <Input
                          id="platform"
                          value={eventForm.platform}
                          onChange={e => setEventForm({ ...eventForm, platform: e.target.value })}
                          placeholder="e.g., In-person / Online"
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="image" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Banner Image URL</Label>
                        <Input
                          id="image"
                          value={eventForm.image}
                          onChange={e => setEventForm({ ...eventForm, image: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="description" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Event Description *</Label>
                        <Textarea
                          id="description"
                          value={eventForm.description}
                          onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                          placeholder="Provide a comprehensive summary of the event initiative..."
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600 min-h-[90px]"
                          required
                        />
                      </div>

                      {/* Premium Live Card Preview */}
                      <div className="border border-white/5 rounded-2xl p-4 bg-[#120E22]/40 mt-4 relative overflow-hidden">
                        <span className="text-[9px] font-bold uppercase text-gold/80 block mb-2 tracking-wider">Live Preview</span>
                        <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex gap-3 items-center">
                          <div className="w-16 h-12 rounded bg-black border border-white/10 flex-shrink-0 overflow-hidden flex items-center justify-center relative">
                            {eventForm.image ? (
                              <img src={eventForm.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-white truncate uppercase tracking-wider">{eventForm.title || 'Untitled Event'}</h4>
                            <p className="text-[10px] text-gray-500 truncate leading-snug">{eventForm.description || 'No description provided...'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        {editingEventId && (
                          <Button
                            type="button"
                            onClick={cancelEditEvent}
                            className="flex-1 bg-black/60 border border-white/10 hover:bg-white/5 text-gray-300 font-bold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className={`flex-1 ${editingEventId ? 'bg-gradient-to-r from-gold to-yellow-600 text-black font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.2)]' : 'bg-gradient-to-r from-maroon to-red-800 text-white font-extrabold shadow-[0_8px_20px_rgba(163,29,56,0.15)]'} text-xs tracking-wider py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase`}
                        >
                          {editingEventId ? (
                            <>
                              <Edit className="w-4 h-4" />
                              <span>Apply Changes</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Create Event</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List Section */}
              <div className="lg:col-span-7 space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <Input
                    type="text"
                    value={eventSearch}
                    onChange={e => setEventSearch(e.target.value)}
                    placeholder="Search events by title or venue..."
                    className="bg-[#0B0815]/95 border border-white/5 pl-12 py-6 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold w-full text-white placeholder-gray-500 text-xs tracking-wider shadow-lg"
                  />
                </div>

                <Card className="bg-[#0B0815]/95 border border-white/5 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
                  <CardHeader className="pb-4 border-b border-white/5">
                    <CardTitle className="text-base font-bold text-white uppercase tracking-wider">Events Directory</CardTitle>
                    <CardDescription className="text-gray-400 text-xs">A comprehensive list of all events currently registered in the database ({filteredEvents.length} records).</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                      <AnimatePresence initial={false}>
                        {filteredEvents.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors duration-300 relative group/row"
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-gold opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="w-16 h-12 rounded bg-black border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                              {event.image ? (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-xs truncate uppercase tracking-wider">{event.title}</h4>
                                <span className="text-[8px] bg-white/5 text-gray-400 border border-white/10 px-1.5 py-0.5 rounded font-bold uppercase shrink-0 scale-90">
                                  {event.id}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-gray-500 mt-1.5">
                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold/70" /> {event.date || 'Unspecified'}</span>
                                {event.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gold/70" /> {event.location}</span>}
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                type="button"
                                size="icon"
                                onClick={() => startEditEvent(event)}
                                className={`rounded-xl w-10 h-10 border transition-all duration-300 flex items-center justify-center ${editingEventId === event.id ? 'bg-gold border-gold text-black shadow-lg shadow-gold/20' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-gold hover:text-black hover:border-gold'}`}
                                title="Edit Event"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteEvent(event.id)}
                                className="rounded-xl w-10 h-10 border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                                title="Delete Event"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredEvents.length === 0 && (
                        <div className="py-20 text-center text-gray-500">
                          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold" />
                          <p className="text-xs tracking-wider">No matching events discovered</p>
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
              {/* Form Card */}
              <div className="lg:col-span-5">
                <Card className={`bg-[#0B0815]/95 border border-white/5 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.35)] relative transition-all duration-500 ${editingBulletinId ? 'ring-2 ring-gold/40 border-gold/30 shadow-gold/5' : ''}`}>
                  <CardHeader className="pb-4 border-b border-white/5">
                    <span className="text-[9px] text-gold tracking-widest font-bold uppercase mb-1">Publications Editor</span>
                    <CardTitle className="text-lg font-bold text-white uppercase tracking-tight">
                      {editingBulletinId ? 'Edit Bulletin Details' : 'Publish New Bulletin'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs">
                      {editingBulletinId ? 'Modify the monthly chronicle files and publication parameters.' : 'Publish a new monthly newsletter file onto the digital bulletins grid.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAddBulletin} className="space-y-4 text-gray-300">
                      <div className="space-y-1.5">
                        <Label htmlFor="b_title" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Bulletin Title *</Label>
                        <Input
                          id="b_title"
                          value={bulletinForm.title}
                          onChange={e => setBulletinForm({ ...bulletinForm, title: e.target.value })}
                          placeholder="e.g., November 2025"
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_date" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Publish Date Identifier *</Label>
                        <Input
                          id="b_date"
                          value={bulletinForm.date}
                          onChange={e => setBulletinForm({ ...bulletinForm, date: e.target.value })}
                          placeholder="e.g., November-2025"
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600 font-mono"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_fileId" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Google Drive Share Link or File ID *</Label>
                        <Input
                          id="b_fileId"
                          value={bulletinForm.fileId}
                          onChange={e => setBulletinForm({ ...bulletinForm, fileId: e.target.value })}
                          placeholder="Paste Google Drive Share Link or Document ID..."
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600 font-mono text-xs"
                          required
                        />
                        <p className="text-[10px] text-gray-500 leading-tight">
                          💡 You can paste the **entire Google Drive Share Link** or just the File ID. We will extract the ID automatically.
                          <br />
                          ⚠️ Crucial: Make sure the file sharing in Google Drive is set to **"Anyone with the link can view"**.
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_coverImage" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Cover Poster URL</Label>
                        <Input
                          id="b_coverImage"
                          value={bulletinForm.coverImage}
                          onChange={e => setBulletinForm({ ...bulletinForm, coverImage: e.target.value })}
                          placeholder="e.g., https://res.cloudinary.com/..."
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_content" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Bulletin Brief Description / Content</Label>
                        <Textarea
                          id="b_content"
                          value={bulletinForm.content}
                          onChange={e => setBulletinForm({ ...bulletinForm, content: e.target.value })}
                          placeholder="Briefly describe key announcements or summaries contained within this publication..."
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600 min-h-[90px]"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        {editingBulletinId && (
                          <Button
                            type="button"
                            onClick={cancelEditBulletin}
                            className="flex-1 bg-black/60 border border-white/10 hover:bg-white/5 text-gray-300 font-bold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className={`flex-1 ${editingBulletinId ? 'bg-gradient-to-r from-gold to-yellow-600 text-black font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.2)]' : 'bg-gradient-to-r from-maroon to-red-800 text-white font-extrabold shadow-[0_8px_20px_rgba(163,29,56,0.15)]'} text-xs tracking-wider py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase`}
                        >
                          {editingBulletinId ? (
                            <>
                              <Edit className="w-4 h-4" />
                              <span>Apply Changes</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Publish Bulletin</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List Section */}
              <div className="lg:col-span-7 space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <Input
                    type="text"
                    value={bulletinSearch}
                    onChange={e => setBulletinSearch(e.target.value)}
                    placeholder="Search bulletins by title or date identifier..."
                    className="bg-[#0B0815]/95 border border-white/5 pl-12 py-6 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold w-full text-white placeholder-gray-500 text-xs tracking-wider shadow-lg"
                  />
                </div>

                <Card className="bg-[#0B0815]/95 border border-white/5 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
                  <CardHeader className="pb-4 border-b border-white/5">
                    <CardTitle className="text-base font-bold text-white uppercase tracking-wider">Bulletins Directory</CardTitle>
                    <CardDescription className="text-gray-400 text-xs">All monthly newsletters and digital bulletin documents registered in the system ({filteredBulletins.length} records).</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                      <AnimatePresence initial={false}>
                        {filteredBulletins.map((bulletin) => (
                          <motion.div
                            key={bulletin.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors duration-300 relative group/row"
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-gold opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="w-12 h-16 rounded bg-black border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center text-gold shadow-md aspect-[3/4] relative">
                              {bulletin.coverImage ? (
                                <img src={bulletin.coverImage} alt={bulletin.title} className="w-full h-full object-cover" />
                              ) : (
                                <Newspaper className="w-5 h-5 text-gold/60" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-xs truncate uppercase tracking-wider">{bulletin.title}</h4>
                                <span className="text-[8px] bg-white/5 text-gray-400 border border-white/10 px-1.5 py-0.5 rounded font-bold uppercase shrink-0 scale-90">
                                  {bulletin.id}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-500 mt-2">
                                <span className="flex items-center gap-1 font-mono text-[9px] text-rose-500/60 font-semibold tracking-wider">ID: {bulletin.fileId.slice(0, 10)}...</span>
                                <span className="flex items-center gap-1 text-[9px] bg-maroon/20 border border-maroon/30 px-2 py-0.5 rounded-full text-gold font-bold uppercase tracking-wider">{bulletin.date}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                type="button"
                                size="icon"
                                onClick={() => startEditBulletin(bulletin)}
                                className={`rounded-xl w-10 h-10 border transition-all duration-300 flex items-center justify-center ${editingBulletinId === bulletin.id ? 'bg-gold border-gold text-black shadow-lg shadow-gold/20' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-gold hover:text-black hover:border-gold'}`}
                                title="Edit Bulletin"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteBulletin(bulletin.id)}
                                className="rounded-xl w-10 h-10 border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                                title="Delete Bulletin"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredBulletins.length === 0 && (
                        <div className="py-20 text-center text-gray-500">
                          <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold" />
                          <p className="text-xs tracking-wider">No matching bulletins discovered</p>
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
              {/* Form Card */}
              <div className="lg:col-span-5">
                <Card className={`bg-[#0B0815]/95 border border-white/5 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.35)] relative transition-all duration-500 ${editingTeamId ? 'ring-2 ring-gold/40 border-gold/30 shadow-gold/5' : ''}`}>
                  <CardHeader className="pb-4 border-b border-white/5">
                    <span className="text-[9px] text-gold tracking-widest font-bold uppercase mb-1">Roster Editor</span>
                    <CardTitle className="text-lg font-bold text-white uppercase tracking-tight">
                      {editingTeamId ? 'Modify Officer Details' : 'Add Team Officer'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs">
                      {editingTeamId ? 'Update credentials and assigned directory positions for this officer entry.' : 'Enlist and register a new active leadership team officer in the roster.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAddTeamMember} className="space-y-4 text-gray-300">
                      <div className="space-y-1.5">
                        <Label htmlFor="m_name" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Officer Name *</Label>
                        <Input
                          id="m_name"
                          value={teamForm.name}
                          onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
                          placeholder="e.g., Rtr. Hari Priya"
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="m_position" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Assigned Position / Role *</Label>
                        <Input
                          id="m_position"
                          value={teamForm.position}
                          onChange={e => setTeamForm({ ...teamForm, position: e.target.value })}
                          placeholder="e.g., Club Service Chair"
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="m_image" className="text-xs uppercase font-bold text-gold/80 tracking-wider font-semibold">Portrait Image URL</Label>
                        <Input
                          id="m_image"
                          value={teamForm.image}
                          onChange={e => setTeamForm({ ...teamForm, image: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="bg-black/40 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-gray-600 text-xs font-mono"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">
                          Leave empty to deploy standard KPRCAS Rotaract crest identity.
                        </p>
                      </div>

                      {/* Interactive Card Preview */}
                      <div className="border border-white/5 rounded-2xl p-6 bg-[#120E22]/40 mt-6 relative overflow-hidden flex flex-col items-center group/preview">
                        <span className="text-[9px] font-bold text-gold/80 uppercase tracking-wider self-start mb-4">
                          Profile Preview
                        </span>
                        
                        <div className="relative w-28 h-28 mx-auto mb-4 flex-shrink-0 flex items-center justify-center">
                          <div className="absolute inset-[-4px] rounded-full border border-dashed border-gold/40 animate-[spin_30s_linear_infinite]"></div>
                          <div className="absolute inset-0 rounded-full border border-maroon/80 overflow-hidden bg-black flex items-center justify-center shadow-lg">
                            {teamForm.image ? (
                              <img src={teamForm.image} alt={teamForm.name} className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-500" />
                            ) : (
                              <User className="w-10 h-10 text-gray-600" />
                            )}
                          </div>
                        </div>
                        
                        <h4 className="text-sm font-bold text-white text-center leading-snug uppercase tracking-widest">
                          {teamForm.name || 'Candidate Name'}
                        </h4>
                        <p className="text-[10px] text-gold font-extrabold tracking-widest uppercase text-center mt-2 bg-maroon/20 border border-maroon/30 px-3 py-0.5 rounded-full">
                          {teamForm.position || 'Assigned Position'}
                        </p>
                      </div>

                      <div className="flex gap-3 pt-2">
                        {editingTeamId && (
                          <Button
                            type="button"
                            onClick={cancelEditTeamMember}
                            className="flex-1 bg-black/60 border border-white/10 hover:bg-white/5 text-gray-300 font-bold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className={`flex-1 ${editingTeamId ? 'bg-gradient-to-r from-gold to-yellow-600 text-black font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.2)]' : 'bg-gradient-to-r from-maroon to-red-800 text-white font-extrabold shadow-[0_8px_20px_rgba(163,29,56,0.15)]'} text-xs tracking-wider py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase`}
                        >
                          {editingTeamId ? (
                            <>
                              <Edit className="w-4 h-4" />
                              <span>Apply Changes</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Commission Member</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List Section */}
              <div className="lg:col-span-7 space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <Input
                    type="text"
                    value={teamSearch}
                    onChange={e => setTeamSearch(e.target.value)}
                    placeholder="Search roster members by name or position..."
                    className="bg-[#0B0815]/95 border border-white/5 pl-12 py-6 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold w-full text-white placeholder-gray-500 text-xs tracking-wider shadow-lg"
                  />
                </div>

                <Card className="bg-[#0B0815]/95 border border-white/5 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
                  <CardHeader className="pb-4 border-b border-white/5">
                    <CardTitle className="text-base font-bold text-white uppercase tracking-wider">Leadership Roster Directory</CardTitle>
                    <CardDescription className="text-gray-400 text-xs">All active administrative board officers and coordinators registered in the system ({filteredTeamMembers.length} records).</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                      <AnimatePresence initial={false}>
                        {filteredTeamMembers.map((member) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors duration-300 relative group/row"
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-gold opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                              <div className="absolute inset-0 rounded-full border border-white/10 group-hover/row:scale-105 transition-all"></div>
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-maroon/40 bg-black flex items-center justify-center shadow-lg">
                                {member.image ? (
                                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                  <User className="w-4 h-4 text-gray-600" />
                                )}
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-xs truncate uppercase tracking-wider">{member.name}</h4>
                                <span className="text-[8px] bg-white/5 text-gray-400 border border-white/10 px-1.5 py-0.5 rounded font-bold uppercase shrink-0 scale-90">
                                  {member.id}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-500 mt-2">
                                <span className="flex items-center gap-1 text-[9px] bg-maroon/20 border border-maroon/30 px-2.5 py-0.5 rounded-full text-gold font-bold uppercase tracking-wider">{member.position}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                type="button"
                                size="icon"
                                onClick={() => startEditTeamMember(member)}
                                className={`rounded-xl w-10 h-10 border transition-all duration-300 flex items-center justify-center ${editingTeamId === member.id ? 'bg-gold border-gold text-black shadow-lg shadow-gold/20' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-gold hover:text-black hover:border-gold'}`}
                                title="Edit Officer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteTeamMember(member.id)}
                                className="rounded-xl w-10 h-10 border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                                title="Delete Officer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredTeamMembers.length === 0 && (
                        <div className="py-20 text-center text-gray-500">
                          <Users className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold animate-pulse" />
                          <p className="text-xs tracking-wider">No matching roster members discovered</p>
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
