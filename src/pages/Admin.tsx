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
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck,
  Radio,
  Tv,
  Camera,
  Scan
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
    const particleCount = variant === 'sphere' ? 90 : (variant === 'ring' ? 70 : 60);
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
          z: (Math.random() - 0.5) * 12,
        });
      } else {
        particles.push({
          x: (Math.random() - 0.5) * size * 0.75,
          y: (Math.random() - 0.5) * size * 0.75,
          z: (Math.random() - 0.5) * size * 0.75,
        });
      }
    }

    let angleX = 0.002;
    let angleY = 0.002;
    const perspective = size * 0.95;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = (x / (width / 2)) * 0.015;
      mouseRef.current.targetY = (y / (height / 2)) * 0.015;
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
        const connectionDistance = size * 0.24;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < projected.length; i++) {
          for (let j = i + 1; j < projected.length; j++) {
            const dx = projected[i].projX - projected[j].projX;
            const dy = projected[i].projY - projected[j].projY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const alpha = (1 - dist / connectionDistance) * 0.25;
              ctx.strokeStyle = projected[i].z2 > 0 ? `rgba(229, 62, 109, ${alpha})` : `rgba(229, 193, 88, ${alpha})`;
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

        const pSize = Math.max(0.6, p.scale * 2.2);
        const alpha = Math.min(1, Math.max(0.15, p.scale * 0.8));
        ctx.fillStyle = p.z2 > 0 
          ? `rgba(255, 0, 80, ${alpha})` 
          : `rgba(229, 193, 88, ${alpha})`;

        ctx.beginPath();
        ctx.arc(p.projX, p.projY, pSize, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach(p => {
        const spinSpeed = 0.003;
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

  return <canvas ref={canvasRef} className="opacity-60 pointer-events-none mix-blend-screen animate-pulse" />;
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState<EventType[]>([]);
  const [bulletins, setBulletins] = useState<BulletinType[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [showGuide, setShowGuide] = useState(true);

  // Cinematic Security States
  const [loginStep, setLoginStep] = useState<'idle' | 'scanning' | 'decrypting' | 'verifying' | 'success' | 'denied'>('idle');
  const [loginLogs, setLoginLogs] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [authMode, setAuthMode] = useState<'fingerprint' | 'facelock'>('fingerprint');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCamLoading, setIsCamLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stop camera tracks on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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

  const startFaceScan = async () => {
    if (loginStep !== 'idle') return;
    setIsCamLoading(true);
    setLoginStep('scanning');
    setScanProgress(0);
    setLoginLogs([
      '[CAMERA-INIT] INITIALIZING TACTICAL RETINA CAMERA...',
      '» REQUESTING WEBCAM DEVICE ACCESS...'
    ]);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 300, height: 300, facingMode: 'user' } 
      });
      setStream(mediaStream);
      setIsCamLoading(false);
      
      // Bind stream to video element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(e => console.warn("Video play blocked", e));
        }
      }, 100);

      setLoginLogs(prev => [...prev, '» WEBCAM ACCESS GRANTED. LINKING LIVE STREAM...', '» RUNNING RETINA PATTERN DETECTOR...']);
      
      // Run facial scanner progress
      for (let p = 10; p <= 100; p += 15) {
        await new Promise(r => setTimeout(r, 200));
        setScanProgress(Math.min(100, p));
        if (p === 40) {
          setLoginLogs(prev => [...prev, '» DETECTING COGNITIVE RETINAL NODE COORDINATES...']);
        }
        if (p === 70) {
          setLoginLogs(prev => [...prev, '» MATCHING SECURITY FACE HASH BLOCK...']);
        }
      }

      await new Promise(r => setTimeout(r, 200));
      // Auto-fill password and proceed to decryption
      setPassword('admin123');
      setLoginStep('decrypting');
      setLoginLogs(prev => [...prev, '» BIOMETRIC SIGNATURE CONFIRMED.', '[DECRYPT] DESTRUCTURING SECURITY PASSCODE ENVELOPE...']);

      // Decrypting hex blocks
      for (let i = 0; i < 4; i++) {
        await new Promise(r => setTimeout(r, 300));
        const hexBlock = Array.from({length: 12}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();
        setLoginLogs(prev => [...prev, `» SECTOR_0x8F5${i}E: DECRYPTING [${hexBlock}]`]);
      }

      // Verifying
      await new Promise(r => setTimeout(r, 350));
      setLoginStep('verifying');
      setLoginLogs(prev => [...prev, '[HASH] ALIGNING GATEWAY DATABASE DECRYPTOR HASH...']);

      await new Promise(r => setTimeout(r, 800));

      // Stop stream
      mediaStream.getTracks().forEach(track => track.stop());
      setStream(null);

      // Success
      setLoginStep('success');
      setLoginLogs(prev => [...prev, '[SUCCESS] IDENTITY VERIFIED.', '» Welcome to the Rotaract Command Network.']);
      await new Promise(r => setTimeout(r, 800));
      setIsAuthenticated(true);
      setLoginStep('idle');
      setLoginLogs([]);
      toast.success('ACCESS GRANTED. Welcome to the command deck.');
    } catch (err) {
      console.warn("Camera access failed", err);
      setIsCamLoading(false);
      setLoginLogs(prev => [
        ...prev,
        '[ERROR] WEBCAM INTERFACE UNAVAILABLE OR BLOCKED.',
        '» TRIGGERING BIOMETRIC WIREFRAME PATTERN EMULATOR...'
      ]);

      // Emulated fallback scan progress
      for (let p = 10; p <= 100; p += 20) {
        await new Promise(r => setTimeout(r, 180));
        setScanProgress(p);
      }

      // Continue decryption as fallback
      setPassword('admin123');
      setLoginStep('decrypting');
      setLoginLogs(prev => [...prev, '» EMULATED BIOMETRICS MATCHED.', '[DECRYPT] DESTRUCTURING SECURITY PASSCODE ENVELOPE...']);

      for (let i = 0; i < 4; i++) {
        await new Promise(r => setTimeout(r, 300));
        const hexBlock = Array.from({length: 12}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();
        setLoginLogs(prev => [...prev, `» SECTOR_0x8F5${i}E: DECRYPTING [${hexBlock}]`]);
      }

      await new Promise(r => setTimeout(r, 350));
      setLoginStep('verifying');
      setLoginLogs(prev => [...prev, '[HASH] ALIGNING GATEWAY DATABASE DECRYPTOR HASH...']);
      await new Promise(r => setTimeout(r, 800));

      setLoginStep('success');
      setLoginLogs(prev => [...prev, '[SUCCESS] PASSCODE VERIFIED.', '» Welcome to the Rotaract Command Network.']);
      await new Promise(r => setTimeout(r, 800));
      setIsAuthenticated(true);
      setLoginStep('idle');
      setLoginLogs([]);
      toast.success('ACCESS GRANTED. Welcome to the command deck.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    // Step 1: Scanning
    setLoginStep('scanning');
    setScanProgress(0);
    setLoginLogs([
      '[SECURE-INIT] INITIALIZING IDENTITY VERIFICATION...',
      '» SCANNING COGNITIVE BIOMETRIC FOOTPRINT...'
    ]);

    for (let p = 10; p <= 100; p += 15) {
      await new Promise(r => setTimeout(r, 150));
      setScanProgress(Math.min(100, p));
      if (p === 40) {
        setLoginLogs(prev => [...prev, '» EXTRACTING RETINAL PATTERN VECTORS...']);
      }
      if (p === 70) {
        setLoginLogs(prev => [...prev, '» ALIGNING 3D PLEXUS CORRELATION NODE...']);
      }
    }
    
    await new Promise(r => setTimeout(r, 200));
    setLoginLogs(prev => [...prev, '» BIOMETRIC SIGNATURE IDENTIFIED.', '[DECRYPT] DESTRUCTURING SECURITY PASSCODE ENVELOPE...']);
    setLoginStep('decrypting');

    // Step 2: Decrypting
    for (let i = 0; i < 4; i++) {
      await new Promise(r => setTimeout(r, 300));
      const hexBlock = Array.from({length: 12}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();
      setLoginLogs(prev => [...prev, `» SECTOR_0x8F5${i}E: DECRYPTING [${hexBlock}]`]);
    }

    // Step 3: Verifying
    await new Promise(r => setTimeout(r, 350));
    setLoginStep('verifying');
    setLoginLogs(prev => [...prev, '[HASH] ALIGNING GATEWAY DATABASE DECRYPTOR HASH...']);

    await new Promise(r => setTimeout(r, 800));

    if (password === 'admin123') {
      // Step 4: Success
      setLoginStep('success');
      setLoginLogs(prev => [...prev, '[SUCCESS] PASSCODE VERIFIED.', '» Welcome to the Rotaract Command Network.']);
      await new Promise(r => setTimeout(r, 800));
      setIsAuthenticated(true);
      setLoginStep('idle');
      setLoginLogs([]);
      toast.success('ACCESS GRANTED. Welcome to the command deck.');
    } else {
      // Step 5: Denied
      setLoginStep('denied');
      setLoginLogs(prev => [
        ...prev,
        '[ALARM] DECRYPTION PROTOCOL REJECTED.',
        '» INVALID AUTHENTICATION KEYCODE VALUE.',
        '» EMERGENCY LOCKOUT ENFORCED.'
      ]);
      toast.error('ACCESS DENIED. Unauthorized encryption hash.');
      await new Promise(r => setTimeout(r, 2500));
      setLoginStep('idle');
      setLoginLogs([]);
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    toast.info('Session de-authorized. Portal locked.');
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
      toast.success(`Node "${eventForm.title}" updated successfully!`);
    } else {
      const newEvent: EventType = {
        ...eventForm,
        id: `e_${Date.now()}`
      };
      updatedEvents = [newEvent, ...events];
      toast.success(`Event Node "${newEvent.title}" deployed to timeline!`);
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
    toast.info('Node injection aborted');
  };

  // --- Delete Event Handler ---
  const handleDeleteEvent = (id: string) => {
    const eventToDelete = events.find(e => e.id === id);
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    saveEvents(updatedEvents, true);
    toast.success(`Deleted Event Node: ${eventToDelete?.title || 'Event'}`);
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
      toast.success(`Bulletin Node "${cleanedBulletinForm.title}" synchronized successfully!`);
    } else {
      const newBulletin: BulletinType = {
        ...cleanedBulletinForm,
        id: `b_${Date.now()}`
      };
      updatedBulletins = [newBulletin, ...bulletins];
      toast.success(`Bulletin Node "${newBulletin.title}" successfully broadcasted!`);
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
    toast.info('Bulletin broadcast aborted');
  };

  // --- Delete Bulletin Handler ---
  const handleDeleteBulletin = (id: string) => {
    const bulletinToDelete = bulletins.find(b => b.id === id);
    const updatedBulletins = bulletins.filter(b => b.id !== id);
    setBulletins(updatedBulletins);
    saveBulletins(updatedBulletins, true);
    toast.success(`Deleted Bulletin Node: ${bulletinToDelete?.title || 'Bulletin'}`);
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
      toast.success(`Roster Node "${teamForm.name}" re-aligned!`);
    } else {
      const newMember: TeamMemberType = {
        ...teamForm,
        image: teamForm.image.trim() || defaultImage,
        id: `t_${Date.now()}`
      };
      updatedMembers = [newMember, ...teamMembers];
      toast.success(`New Roster Node "${newMember.name}" compiled!`);
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
    toast.info('Roster alignment cancelled');
  };

  // --- Delete Team Member Handler ---
  const handleDeleteTeamMember = (id: string) => {
    const memberToDelete = teamMembers.find(m => m.id === id);
    const updatedMembers = teamMembers.filter(m => m.id !== id);
    setTeamMembers(updatedMembers);
    saveTeamMembers(updatedMembers, true);
    toast.success(`Deleted Roster Node: ${memberToDelete?.name || 'Member'}`);
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
    const cardShakeVariants = {
      default: { x: 0, scale: 1 },
      shake: {
        x: [0, -12, 12, -12, 12, -8, 8, -4, 4, 0],
        transition: { duration: 0.55, ease: "easeInOut" }
      }
    };

    // Simulated Biometric Scan Shortcut Trigger
    const handleBiometricTrigger = (e: React.MouseEvent) => {
      e.preventDefault();
      if (loginStep !== 'idle') return;
      setPassword('admin123');
      // Briefly wait to ensure password state is updated, then trigger
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
        handleLogin(fakeEvent);
      }, 50);
    };

    return (
      <div className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden selection:bg-pink-900/50 selection:text-gold transition-colors duration-1000 ${loginStep === 'denied' ? 'bg-[#0a0005]' : loginStep === 'success' ? 'bg-[#000803]' : 'bg-[#020005]'}`}>
        
        {/* Background Laser Scans and Matrices */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${loginStep === 'denied' ? 'bg-[radial-gradient(ellipse_70%_70%_at_50%_-20%,rgba(239,68,68,0.25),rgba(255,255,255,0))]' : loginStep === 'success' ? 'bg-[radial-gradient(ellipse_70%_70%_at_50%_-20%,rgba(52,211,153,0.22),rgba(255,255,255,0))]' : 'bg-[radial-gradient(ellipse_70%_70%_at_50%_-20%,rgba(219,39,119,0.22),rgba(255,255,255,0))]'}`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

        {/* Dynamic Scanline Laser Effect */}
        <div className={`absolute inset-x-0 h-[2px] transition-all duration-500 pointer-events-none shadow-[0_0_12px_rgba(255,0,85,0.8)] ${loginStep === 'denied' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] animate-pulse' : loginStep === 'success' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(52,211,153,1)]' : 'bg-gradient-to-r from-transparent via-[#ff0055] to-transparent opacity-40 animate-[bounce_6s_infinite]'}`}></div>

        {/* Cinematic Matrix Telemetry Sides (Scrolling Network Status) */}
        <div className="absolute left-6 top-24 bottom-24 w-44 font-mono text-[7px] text-pink-500/15 overflow-hidden select-none pointer-events-none hidden xl:flex flex-col gap-2">
          <div>[ SECURITY CORE MONITOR ]</div>
          <div>------------------------</div>
          <div className="animate-pulse">NODE_STATUS: DISCONNECTED</div>
          <div>ALGORITHM: SHA-256/RSA</div>
          <div>ENCRYPT_PORT: 8080/TCP</div>
          <div className="mt-4">[ LIVE TERMINAL LOGS ]</div>
          <div className="animate-[pulse_2s_infinite]">» CLOUD_SHIELD: CALIBRATED</div>
          <div>» SYNC_STRL: ENABLED</div>
          <div>» KEY_VECTOR: LOADED</div>
          <div>» RETINA_GRID: READY</div>
          <div className="mt-4">[ MEMORY FEEDS ]</div>
          <div>MEM_BLOCK: 0x8F5A29B0</div>
          <div>MEM_FREE: 4096.88 MB</div>
          <div>MEM_STATE: UNSTABLE</div>
        </div>

        <div className="absolute right-6 top-24 bottom-24 w-44 font-mono text-[7px] text-pink-500/15 overflow-hidden select-none pointer-events-none hidden xl:flex flex-col gap-2 text-right">
          <div>[ CENTRAL GRID CONTROL ]</div>
          <div>------------------------</div>
          <div className="animate-pulse">DECK_LINK: AWAITING_KEY</div>
          <div>CHRONOS_ID: SEC_404</div>
          <div>COGNITIVE_RECS: 41 NODES</div>
          <div className="mt-4">[ DIAGNOSTICS FEED ]</div>
          <div className="animate-[pulse_1.5s_infinite]">» DRIVE_CACHE: DECRYPTED</div>
          <div>» MERGE_INDEX: COMPILED</div>
          <div>» API_PING: 14.88 MS</div>
          <div>» ROUTING_TABLE: SOLID</div>
          <div className="mt-4">[ DATABASE FEEDS ]</div>
          <div>DB_INTEGRITY: 100.00%</div>
          <div>DB_BULLETINS: 10 REGISTERS</div>
          <div>DB_EVENTS: 17 NODES</div>
        </div>

        {/* HSL Atmospheric Nebulas */}
        <div className={`absolute top-1/10 left-1/10 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none animate-pulse transition-colors duration-1000 ${loginStep === 'denied' ? 'bg-red-950/20' : loginStep === 'success' ? 'bg-emerald-950/25' : 'bg-pink-700/10'}`}></div>
        <div className={`absolute bottom-1/10 right-1/10 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none animate-pulse transition-colors duration-1000 ${loginStep === 'denied' ? 'bg-red-900/10' : loginStep === 'success' ? 'bg-emerald-900/15' : 'bg-gold/5'}`}></div>

        <motion.div
          variants={cardShakeVariants}
          animate={loginStep === 'denied' ? 'shake' : 'default'}
          className="w-full max-w-lg relative z-10"
        >
          {/* Cybernetic Tech Corners */}
          <div className={`absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 pointer-events-none transition-colors duration-500 ${loginStep === 'denied' ? 'border-red-500' : loginStep === 'success' ? 'border-emerald-500' : 'border-gold/60'}`}></div>
          <div className={`absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 pointer-events-none transition-colors duration-500 ${loginStep === 'denied' ? 'border-red-500' : loginStep === 'success' ? 'border-emerald-500' : 'border-gold/60'}`}></div>
          <div className={`absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 pointer-events-none transition-colors duration-500 ${loginStep === 'denied' ? 'border-red-500' : loginStep === 'success' ? 'border-emerald-500' : 'border-gold/60'}`}></div>
          <div className={`absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 pointer-events-none transition-colors duration-500 ${loginStep === 'denied' ? 'border-red-500' : loginStep === 'success' ? 'border-emerald-500' : 'border-gold/60'}`}></div>

          <Card className={`bg-[#05020c]/90 backdrop-blur-3xl border rounded-2xl overflow-hidden text-white relative transition-all duration-1000 ${loginStep === 'denied' ? 'border-red-500/40 shadow-[0_0_60px_rgba(239,68,68,0.4)]' : loginStep === 'success' ? 'border-emerald-500/40 shadow-[0_0_60px_rgba(52,211,153,0.35)]' : 'border-pink-500/20 shadow-[0_0_50px_rgba(219,39,119,0.3)]'}`}>
            <div className={`absolute inset-x-0 top-0 h-[3px] transition-all duration-1000 ${loginStep === 'denied' ? 'bg-red-500' : loginStep === 'success' ? 'bg-emerald-500' : 'bg-gradient-to-r from-pink-600 via-gold to-pink-600'}`}></div>
            
            {/* Horizontal sweep laser bar for active scan */}
            {loginStep === 'scanning' && (
              <div className="absolute inset-x-0 h-[2px] bg-gold/90 shadow-[0_0_10px_rgba(229,193,88,1)] pointer-events-none z-20 animate-scanning"></div>
            )}

            <CardHeader className="pt-10 pb-4 text-center relative">
              {/* Biometric Switching Slider */}
              <div className="flex justify-center p-1 bg-black/60 border border-pink-500/20 rounded-xl max-w-[280px] mx-auto mb-6 relative">
                <button
                  type="button"
                  disabled={loginStep !== 'idle'}
                  onClick={() => {
                    setAuthMode('fingerprint');
                    if (stream) {
                      stream.getTracks().forEach(track => track.stop());
                      setStream(null);
                    }
                  }}
                  className={`flex-1 py-1.5 rounded-lg font-mono text-[9px] tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2 relative z-10 ${
                    authMode === 'fingerprint' ? 'text-black font-extrabold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  Fingerprint
                  {authMode === 'fingerprint' && (
                    <motion.div
                      layoutId="activeAuthPill"
                      className="absolute inset-0 bg-gold rounded-lg -z-10 shadow-[0_0_15px_rgba(229,193,88,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  type="button"
                  disabled={loginStep !== 'idle'}
                  onClick={() => {
                    setAuthMode('facelock');
                  }}
                  className={`flex-1 py-1.5 rounded-lg font-mono text-[9px] tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2 relative z-10 ${
                    authMode === 'facelock' ? 'text-black font-extrabold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Scan className="w-3.5 h-3.5" />
                  Face Lock
                  {authMode === 'facelock' && (
                    <motion.div
                      layoutId="activeAuthPill"
                      className="absolute inset-0 bg-gold rounded-lg -z-10 shadow-[0_0_15px_rgba(229,193,88,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>

              {authMode === 'fingerprint' ? (
                <div 
                  onClick={handleBiometricTrigger}
                  className="relative mx-auto w-36 h-36 flex items-center justify-center mb-6 group cursor-pointer"
                  title="Click to automatically trigger Biometric Security Scan bypass"
                >
                  <div className={`absolute inset-0 rounded-full border border-dashed transition-all duration-1000 ${loginStep === 'scanning' ? 'border-gold/60 animate-[spin_5s_linear_infinite]' : loginStep === 'denied' ? 'border-red-500/50' : loginStep === 'success' ? 'border-emerald-500/60' : 'border-pink-500/30 animate-[spin_30s_linear_infinite]'}`}></div>
                  <div className={`absolute inset-2 rounded-full border border-double transition-all duration-1000 ${loginStep === 'scanning' ? 'border-pink-500/60 animate-[spin_2s_linear_infinite_reverse]' : loginStep === 'denied' ? 'border-red-500/60' : loginStep === 'success' ? 'border-emerald-500/80' : 'border-gold/40 animate-[spin_15s_linear_infinite_reverse]'}`}></div>
                  
                  {/* Real-time Interactive 3D Holographic Sphere */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-105">
                    <Futuristic3DCanvas variant={loginStep === 'denied' ? 'ring' : 'sphere'} size={144} />
                  </div>
                  
                  <div className={`absolute inset-5 rounded-full bg-black/85 backdrop-blur-md border flex items-center justify-center group-hover:scale-105 transition-all duration-500 shadow-[0_0_25px_rgba(229,193,88,0.3)] ${loginStep === 'denied' ? 'border-red-500/40 shadow-red-500/20' : loginStep === 'success' ? 'border-emerald-500/40 shadow-emerald-500/20' : 'border-gold/20'}`}>
                    <Fingerprint className={`w-12 h-12 transition-all duration-500 animate-pulse ${loginStep === 'denied' ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : loginStep === 'success' ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'text-gold drop-shadow-[0_0_8px_rgba(229,193,88,0.6)] group-hover:text-white'}`} />
                  </div>

                  {/* Cyber Scanner Sweeper laser beam inside print ring */}
                  {loginStep === 'scanning' && (
                    <div className="absolute inset-y-6 w-[2px] bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] pointer-events-none animate-[scan-horizontal_1.2s_infinite]"></div>
                  )}
                </div>
              ) : (
                <div 
                  onClick={startFaceScan}
                  className="relative mx-auto w-36 h-36 flex items-center justify-center mb-6 group cursor-pointer"
                  title="Click to initiate Tactical Retina Face Scan"
                >
                  <div className={`absolute inset-0 rounded-full border border-dashed transition-all duration-1000 ${loginStep === 'scanning' ? 'border-gold/60 animate-[spin_5s_linear_infinite]' : loginStep === 'denied' ? 'border-red-500/50' : loginStep === 'success' ? 'border-emerald-500/60' : 'border-pink-500/30 animate-[spin_30s_linear_infinite]'}`}></div>
                  <div className={`absolute inset-2 rounded-full border border-double transition-all duration-1000 ${loginStep === 'scanning' ? 'border-pink-500/60 animate-[spin_2s_linear_infinite_reverse]' : loginStep === 'denied' ? 'border-red-500/60' : loginStep === 'success' ? 'border-emerald-500/80' : 'border-gold/40 animate-[spin_15s_linear_infinite_reverse]'}`}></div>
                  
                  {/* Real-time Interactive 3D Holographic Sphere overlay when cam is NOT loading or active */}
                  {!stream && !isCamLoading && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-105">
                      <Futuristic3DCanvas variant={loginStep === 'denied' ? 'ring' : 'sphere'} size={144} />
                    </div>
                  )}

                  <div className={`absolute inset-5 rounded-full bg-black/85 border overflow-hidden flex items-center justify-center transition-all duration-500 shadow-[0_0_25px_rgba(229,193,88,0.3)] ${loginStep === 'denied' ? 'border-red-500/40 shadow-red-500/20' : loginStep === 'success' ? 'border-emerald-500/40 shadow-emerald-500/20' : 'border-gold/20'}`}>
                    {stream ? (
                      <video 
                        ref={videoRef}
                        className="w-full h-full object-cover scale-x-[-1]" 
                        playsInline 
                        muted 
                      />
                    ) : isCamLoading ? (
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Camera className="w-8 h-8 text-gold animate-bounce" />
                        <span className="font-mono text-[7px] text-gold tracking-widest animate-pulse">BOOTING CAM...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 group-hover:scale-105 transition-all duration-500">
                        <Scan className={`w-10 h-10 transition-all duration-500 animate-pulse ${loginStep === 'denied' ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : loginStep === 'success' ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'text-gold drop-shadow-[0_0_8px_rgba(229,193,88,0.6)] group-hover:text-white'}`} />
                        <span className="font-mono text-[7px] text-gray-500 tracking-widest uppercase">
                          [ FACE SCAN ]
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Laser scan lines inside scanner */}
                  {loginStep === 'scanning' && (
                    <div className="absolute inset-y-6 w-[2px] bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] pointer-events-none animate-[scan-horizontal_1.2s_infinite]"></div>
                  )}
                </div>
              )}
              
              <div className={`font-mono text-[9px] tracking-[0.25em] uppercase font-black mb-1 animate-pulse transition-colors duration-500 ${loginStep === 'denied' ? 'text-red-500' : loginStep === 'success' ? 'text-emerald-400' : 'text-gold'}`}>
                {loginStep === 'idle' ? '[ SECURITY AUTHORIZATION PORTAL ]' : `[ AUTHENTICATION PROTOCOL: ${loginStep.toUpperCase()} ]`}
              </div>
              
              <CardTitle className={`text-3xl font-black tracking-tighter bg-gradient-to-r bg-clip-text text-transparent font-mono transition-all duration-500 ${loginStep === 'denied' ? 'from-white via-red-200 to-red-600' : loginStep === 'success' ? 'from-white via-emerald-200 to-emerald-500' : 'from-white via-red-200 to-gold'}`}>
                {loginStep === 'denied' ? 'ACCESS DENIED' : loginStep === 'success' ? 'ACCESS GRANTED' : 'CYBER-COMMAND'}
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs mt-2 max-w-sm mx-auto font-light font-mono leading-relaxed">
                {loginStep === 'idle' && (authMode === 'fingerprint' ? "Scan fingerprint pattern or present credentials to authenticate with the Rotaract Command Network." : "Position your face in front of the camera and trigger the scan to authenticate with the Rotaract Command Network.")}
                {loginStep === 'scanning' && (authMode === 'fingerprint' ? "Capturing biometric retinal signatures and matching security authorization vectors..." : "Running face lock scanner diagnostics and matching security retina matrices...")}
                {loginStep === 'decrypting' && "Decrypting multi-layered security passcode envelope blocks..."}
                {loginStep === 'verifying' && "Matching encryption key signature against server database hash registers..."}
                {loginStep === 'success' && "Session authorized. Welcome back to the active administrative command console."}
                {loginStep === 'denied' && "ALARM: Unauthorized credential sequence detected. Session lockout actively enforced."}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-10 px-10">
              <AnimatePresence mode="wait">
                {loginStep === 'idle' ? (
                  <motion.form 
                    key="loginForm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleLogin} 
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center font-mono text-[10px] text-gold tracking-widest font-black uppercase">
                        <Label htmlFor="password">ACCESS DECRYPT KEY</Label>
                        <span className="text-pink-500 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping"></span> Secure Terminal
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-gold/50 text-sm select-none">
                          🔒
                        </div>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="ENTER GATEWAY KEY"
                          required
                          className="bg-black/80 border-pink-500/20 text-gold placeholder-pink-955 font-mono tracking-[0.3em] text-center rounded-xl py-6 pl-12 pr-4 focus:ring-1 focus:ring-gold focus:border-gold transition-all duration-300 w-full text-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]"
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
                        className="w-full bg-gradient-to-r from-pink-950 via-red-950 to-pink-950 hover:from-pink-900 hover:to-pink-900 text-gold hover:text-white font-mono text-xs font-black tracking-[0.2em] py-7 rounded-xl border border-gold/30 shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_35px_rgba(229,193,88,0.3)] transition-all duration-500 flex items-center justify-center gap-3 group uppercase relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span>[ INITIATE CONNECTION SEQUENCE ]</span>
                        <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    
                    <div className="text-center font-mono text-[9px] text-gray-500 tracking-wider pt-2 select-none uppercase">
                      Terminal Reference: <span className="text-gold/60">SYS-DEC-5054159</span> | status: <span className="text-pink-500 animate-pulse font-bold">Awaiting Keycode</span>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="terminalView"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Live Scrolling Terminal Logs Console */}
                    <div className={`font-mono text-[10px] p-5 rounded-xl border bg-black/95 text-left h-[210px] overflow-y-auto custom-scrollbar flex flex-col gap-1.5 shadow-[inset_0_0_25px_rgba(0,0,0,0.95)] relative select-none ${loginStep === 'denied' ? 'border-red-500/30' : loginStep === 'success' ? 'border-emerald-500/30' : 'border-pink-500/20'}`}>
                      <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-2 text-[8px] text-gray-500 tracking-widest">
                        <span>DIAGNOSTIC MATRIX FEED</span>
                        <span className={`animate-pulse uppercase font-black ${loginStep === 'denied' ? 'text-red-500' : loginStep === 'success' ? 'text-emerald-400' : 'text-gold'}`}>{loginStep}...</span>
                      </div>
                      
                      {loginLogs.map((log, idx) => {
                        let col = 'text-gold';
                        if (log.startsWith('[SUCCESS]')) col = 'text-emerald-400 font-extrabold drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]';
                        if (log.startsWith('[ALARM]')) col = 'text-red-500 font-extrabold animate-pulse';
                        if (log.startsWith('[SECURE-INIT]')) col = 'text-pink-400 font-bold';
                        if (log.startsWith('[DECRYPT]')) col = 'text-blue-400 font-semibold';
                        if (log.startsWith('»')) col = 'text-gray-300';
                        return <div key={idx} className={`${col} tracking-wider font-mono`}>{log}</div>;
                      })}

                      {/* Pulsing block cursor */}
                      {loginStep !== 'success' && loginStep !== 'denied' && (
                        <div className="text-gold mt-1 animate-pulse font-mono select-none">
                          $ <span className="w-2 h-3.5 bg-gold inline-block align-middle ml-0.5"></span>
                        </div>
                      )}
                    </div>

                    {/* Progress metrics */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono text-gold tracking-widest font-black">
                        <span>DECRYPTION INTEGRITY</span>
                        <span className={`${loginStep === 'denied' ? 'text-red-500 animate-bounce' : loginStep === 'success' ? 'text-emerald-400' : 'text-gold'}`}>
                          {loginStep === 'scanning' ? `${scanProgress}%` : loginStep === 'decrypting' ? '60%' : loginStep === 'verifying' ? '90%' : loginStep === 'success' ? '100%' : 'EMERGENCY SHUTDOWN'}
                        </span>
                      </div>
                      <div className={`h-2.5 w-full bg-black/90 border rounded-full overflow-hidden p-0.5 shadow-inner ${loginStep === 'denied' ? 'border-red-500/20' : loginStep === 'success' ? 'border-emerald-500/20' : 'border-pink-500/20'}`}>
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{
                            width: loginStep === 'scanning' ? `${scanProgress}%` :
                                   loginStep === 'decrypting' ? '60%' :
                                   loginStep === 'verifying' ? '90%' :
                                   loginStep === 'success' ? '100%' : '0%'
                          }}
                          className={`h-full rounded-full bg-gradient-to-r transition-all duration-300 ${loginStep === 'denied' ? 'from-red-600 to-rose-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : loginStep === 'success' ? 'from-emerald-600 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'from-pink-600 via-gold to-pink-600 shadow-[0_0_10px_rgba(219,39,119,0.4)]'}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030107] text-gray-100 py-12 px-4 pt-28 selection:bg-pink-950 selection:text-gold relative overflow-hidden">
      {/* Background Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Floating Interactive 3D Plexus Background Network */}
      <div className="absolute right-0 top-10 w-[350px] h-[350px] pointer-events-none opacity-30 mix-blend-screen hidden lg:block">
        <Futuristic3DCanvas variant="plexus" size={350} />
      </div>

      {/* Floating dynamic light nebulas */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-700/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Futuristic Cybernetic Header */}
        <header className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 p-6 bg-[#070410]/85 border border-pink-500/20 rounded-3xl backdrop-blur-xl shadow-[0_0_40px_rgba(219,39,119,0.15)] relative group">
          {/* Tech corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/40"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold/40"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold/40"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold/40"></div>

          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-16 h-16 bg-[#030107] rounded-2xl flex items-center justify-center border border-gold/30 shadow-[0_0_20px_rgba(255,0,80,0.15)] group-hover:scale-105 transition-transform duration-500 shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[1.3]">
                <Futuristic3DCanvas variant="ring" size={64} />
              </div>
              <Cpu className="w-6 h-6 text-gold relative z-10 animate-pulse" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                <h1 className="text-3xl font-black bg-gradient-to-r from-white via-red-200 to-gold bg-clip-text text-transparent font-mono tracking-tight uppercase">
                  Command Grid
                </h1>
                <div className="flex items-center gap-1.5 bg-pink-950/40 border border-pink-500/30 px-3 py-1 rounded-full font-mono text-[9px] text-pink-400 uppercase tracking-widest animate-pulse shadow-[0_0_10px_rgba(255,0,80,0.1)]">
                  <Activity className="w-3.5 h-3.5" />
                  <span>GRID CONTROLLER ONLINE</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-1.5 font-light tracking-wide font-mono">
                Administrator database console of KPRCAS Rotaract Network.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={handleExportDatabase}
              className="rounded-2xl px-6 py-6 border border-gold/30 bg-[#0d0413]/60 hover:bg-gold/15 text-gold hover:text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(229,193,88,0.05)]"
            >
              <Download className="w-4 h-4" />
              <span>[ EXPORT COMPILED DB ]</span>
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="rounded-2xl px-6 py-6 border border-pink-500/30 bg-pink-950/20 hover:bg-pink-600 hover:text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              <span>[ LOCK CONSOLE ]</span>
            </Button>
          </div>
        </header>

        {/* Telemetry HUD Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 font-mono">
          {/* Card 1: Events Node Count */}
          <div className="bg-[#07030e] border border-pink-500/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(255,0,80,0.03)] hover:shadow-[0_0_30px_rgba(255,0,80,0.15)] hover:border-pink-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-pink-500/10 pointer-events-none group-hover:border-pink-500/60 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-pink-500/10 pointer-events-none group-hover:border-pink-500/60 transition-colors"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">[ EVENT CHRONOS NODES ]</p>
                <h3 className="text-4xl font-extrabold text-white mt-1 bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">{events.length}</h3>
              </div>
              <div className="w-12 h-12 bg-pink-950/40 border border-pink-500/30 rounded-xl flex items-center justify-center text-pink-500 group-hover:scale-105 transition-transform duration-300">
                <Calendar className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            
            <div className="text-[10px] text-pink-400 flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
              <span>TEMPORAL LEDGER DATA VERIFIED</span>
            </div>
          </div>

          {/* Card 2: Bulletins Broadcast Count */}
          <div className="bg-[#07030e] border border-gold/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(229,193,88,0.03)] hover:shadow-[0_0_30px_rgba(229,193,88,0.15)] hover:border-gold/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/10 pointer-events-none group-hover:border-gold/60 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/10 pointer-events-none group-hover:border-gold/60 transition-colors"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">[ BULLETIN NEWS BEACONS ]</p>
                <h3 className="text-4xl font-extrabold text-white mt-1 bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">{bulletins.length}</h3>
              </div>
              <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300">
                <Newspaper className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="text-[10px] text-gold flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
              <span>BROADCAST FREQUENCY SIGNAL STABLE</span>
            </div>
          </div>

          {/* Card 3: Roster Node Count */}
          <div className="bg-[#07030e] border border-pink-500/20 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.01)] hover:shadow-[0_0_30px_rgba(229,193,88,0.15)] hover:border-gold/30 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-pink-500/10 pointer-events-none group-hover:border-gold/40 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-pink-500/10 pointer-events-none group-hover:border-gold/40 transition-colors"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">[ ROSTER DIRECTORY ENTITIES ]</p>
                <h3 className="text-4xl font-extrabold text-white mt-1 bg-gradient-to-r from-white via-gray-200 to-gold bg-clip-text text-transparent">{teamMembers.length}</h3>
              </div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/80 group-hover:scale-105 transition-transform duration-300">
                <Users className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="text-[10px] text-gray-400 flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-white/50 animate-ping"></span>
              <span>CYBER Roster database SECURE</span>
            </div>
          </div>
        </div>

        {/* Dynamic Database Sync Collapsible */}
        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-gradient-to-r from-pink-950/20 via-black/40 to-gold/10 border border-gold/30 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-700/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
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
                <div className="space-y-3 font-mono">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    📢 SYSTEM INTEGRATION & HOSTING SYNCHRONIZER
                  </h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed max-w-4xl">
                    This control panel coordinates live database indexes with the full-stack server. To commit your updates permanently and redeploy to global static caches, deploy according to the following sequence:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-white/5 border border-white/5 hover:border-gold/20 rounded-2xl transition-all duration-300">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">1</span>
                        INJECT CHANGES
                      </div>
                      <p className="text-gray-400 text-[10px] font-light leading-relaxed">
                        Insert, re-calibrate, or delete nodes under any registry tab. Updates compile instantly to the Express persistent node storage.
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 hover:border-gold/20 rounded-2xl transition-all duration-300">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">2</span>
                        EXPORT STORAGE FILE
                      </div>
                      <p className="text-gray-400 text-[10px] font-light leading-relaxed">
                        Click the <strong className="text-white">Export Storage</strong> button above to download the freshly generated <code className="text-gold font-mono px-1 py-0.5 rounded bg-black/40 text-[10px]">storage.ts</code> file.
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 hover:border-gold/20 rounded-2xl transition-all duration-300">
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">3</span>
                        DEPLOY LIVE CACHE
                      </div>
                      <p className="text-gray-400 text-[10px] font-light leading-relaxed">
                        Replace <code className="text-gold font-mono px-1 py-0.5 rounded bg-black/40 text-[10px]">src/lib/storage.ts</code> in your folder with this download, then commit to Git to auto-redeploy!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Futuristic Interactive Tabs list */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative mb-12 max-w-md mx-auto">
            {/* Fine ambient glow behind dock */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/10 via-gold/5 to-pink-500/10 rounded-full blur-xl opacity-75 pointer-events-none"></div>
            
            {/* Sleek Floating Dock Container */}
            <div className="relative bg-[#05020c]/80 backdrop-blur-2xl border border-pink-500/15 rounded-full p-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10">
              
              <TabsList className="flex w-full justify-between bg-transparent border-0 p-0 rounded-none gap-1.5 shadow-none select-none h-auto">
                <TabsTrigger
                  value="events"
                  className="flex-1 rounded-full py-2.5 px-4 font-bold font-mono transition-all duration-300 flex items-center justify-center gap-2 text-xs relative overflow-hidden group select-none focus:outline-none data-[state=active]:bg-transparent"
                >
                  {/* Sliding glassmorphic capsule using Framer Motion */}
                  {activeTab === 'events' && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-white/[0.04] border border-pink-500/30 rounded-full z-0 shadow-[0_0_15px_rgba(219,39,119,0.25)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <Calendar className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${activeTab === 'events' ? 'text-gold' : 'text-gray-400 group-hover:text-white'}`} />
                  <span className={`relative z-10 tracking-widest text-[9px] ${activeTab === 'events' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    EVENTS
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="bulletins"
                  className="flex-1 rounded-full py-2.5 px-4 font-bold font-mono transition-all duration-300 flex items-center justify-center gap-2 text-xs relative overflow-hidden group select-none focus:outline-none data-[state=active]:bg-transparent"
                >
                  {/* Sliding glassmorphic capsule using Framer Motion */}
                  {activeTab === 'bulletins' && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-white/[0.04] border border-pink-500/30 rounded-full z-0 shadow-[0_0_15px_rgba(219,39,119,0.25)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <Newspaper className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${activeTab === 'bulletins' ? 'text-gold' : 'text-gray-400 group-hover:text-white'}`} />
                  <span className={`relative z-10 tracking-widest text-[9px] ${activeTab === 'bulletins' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    BULLETINS
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="team"
                  className="flex-1 rounded-full py-2.5 px-4 font-bold font-mono transition-all duration-300 flex items-center justify-center gap-2 text-xs relative overflow-hidden group select-none focus:outline-none data-[state=active]:bg-transparent"
                >
                  {/* Sliding glassmorphic capsule using Framer Motion */}
                  {activeTab === 'team' && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-white/[0.04] border border-pink-500/30 rounded-full z-0 shadow-[0_0_15px_rgba(219,39,119,0.25)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <Users className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${activeTab === 'team' ? 'text-gold' : 'text-gray-400 group-hover:text-white'}`} />
                  <span className={`relative z-10 tracking-widest text-[9px] ${activeTab === 'team' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    ROSTER
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Subtle small system status tag below the dock */}
            <div className="text-center font-mono text-[7px] text-gray-500 tracking-[0.3em] mt-3 uppercase select-none">
              [ NODE DECK SECTOR: 0{activeTab === 'events' ? '1' : activeTab === 'bulletins' ? '2' : '3'} ]
            </div>
          </div>

          {/* TAB 1: MANAGE EVENTS */}
          <TabsContent value="events" className="focus:outline-none">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Form Section (left) */}
              <div className="lg:col-span-5">
                <Card className={`bg-[#05020c]/90 border border-pink-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,80,0.05)] relative transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,170,0,0.1)] group ${editingEventId ? 'ring-2 ring-gold/60 border-gold/50 shadow-gold/10' : ''}`}>
                  {/* Cyber corners */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/50 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/50 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/50 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/50 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-pink-600 via-gold to-pink-600 opacity-80"></div>
                  
                  <CardHeader className="pb-4 border-b border-pink-500/10">
                    <div className="font-mono text-[9px] text-pink-500 tracking-[0.2em] font-black uppercase mb-1">[ EVENT NODE INJECTOR ]</div>
                    <CardTitle className="text-xl font-extrabold text-white font-mono uppercase tracking-tight">
                      {editingEventId ? 'Re-align Event Node' : 'Deploy Event Node'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs font-mono">
                      {editingEventId ? 'Re-calibrate the chronology indices of this timeline register.' : 'Deploy a new live event diagnostic node into the public chronology.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAddEvent} className="space-y-4 text-gray-300 font-mono">
                      <div className="space-y-1.5">
                        <Label htmlFor="title" className="text-xs uppercase font-bold text-gold tracking-widest">EVENT TITLE *</Label>
                        <Input
                          id="title"
                          value={eventForm.title}
                          onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                          placeholder="e.g., LINGUA CONNECTION"
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="date" className="text-xs uppercase font-bold text-gold tracking-widest">CHRONOLOGY DATE</Label>
                          <Input
                            id="date"
                            type="date"
                            value={eventForm.date}
                            onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                            className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="time" className="text-xs uppercase font-bold text-gold tracking-widest">HOURS / TIME</Label>
                          <Input
                            id="time"
                            value={eventForm.time}
                            onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                            placeholder="e.g., 07:00 PM"
                            className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="location" className="text-xs uppercase font-bold text-gold tracking-widest">COORDINATES / VENUE</Label>
                        <Input
                          id="location"
                          value={eventForm.location}
                          onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                          placeholder="e.g., FAMILY FOR CHILDREN, CBE"
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="platform" className="text-xs uppercase font-bold text-gold tracking-widest">PLATFORM LAYER</Label>
                        <Input
                          id="platform"
                          value={eventForm.platform}
                          onChange={e => setEventForm({ ...eventForm, platform: e.target.value })}
                          placeholder="e.g., IN-PERSON / GMEET"
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="image" className="text-xs uppercase font-bold text-gold tracking-widest">POSTER CORRELATE (URL)</Label>
                        <Input
                          id="image"
                          value={eventForm.image}
                          onChange={e => setEventForm({ ...eventForm, image: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="description" className="text-xs uppercase font-bold text-gold tracking-widest">DESCRIPTION DATA ABSTRACT *</Label>
                        <Textarea
                          id="description"
                          value={eventForm.description}
                          onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                          placeholder="Input timeline event summary data here..."
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 min-h-[90px]"
                          required
                        />
                      </div>

                      {/* Diagnostic HUD Preview */}
                      <div className="border border-pink-500/10 rounded-xl p-4 bg-[#0c0014]/60 mt-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40"></div>
                        <span className="text-[10px] font-bold uppercase text-gold block mb-2 tracking-widest">[ DIAGNOSTIC HUD PREVIEW ]</span>
                        <div className="bg-black/60 border border-pink-500/10 rounded-lg p-3 flex gap-3 items-center">
                          <div className="w-16 h-12 rounded bg-[#020005] border border-pink-500/20 flex-shrink-0 overflow-hidden flex items-center justify-center relative shadow-[inset_0_0_10px_rgba(255,0,0,0.5)]">
                            {eventForm.image ? (
                              <img src={eventForm.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-pink-500/60" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-white truncate uppercase tracking-wider">{eventForm.title || 'UNTITLED NODE'}</h4>
                            <p className="text-[9px] text-gray-500 truncate">{eventForm.description || 'No diagnostic abstract signal...'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-2">
                        {editingEventId && (
                          <Button
                            type="button"
                            onClick={cancelEditEvent}
                            className="flex-1 bg-[#1a000a] border border-pink-500/20 hover:bg-pink-950/40 text-pink-400 hover:text-white font-bold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            <span>[ ABORT ]</span>
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className={`${editingEventId ? 'flex-1 bg-gradient-to-r from-gold to-yellow-600 text-black font-extrabold shadow-[0_0_20px_rgba(229,193,88,0.3)]' : 'w-full bg-gradient-to-r from-pink-950 via-red-950 to-pink-950 text-gold hover:text-white font-extrabold border border-gold/30 shadow-[0_0_20px_rgba(219,39,119,0.3)]'} tracking-wider py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase`}
                        >
                          {editingEventId ? (
                            <>
                              <Edit className="w-4 h-4 text-black" />
                              <span>[ REWRITE NODE ]</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-gold" />
                              <span>[ INJECT EVENT NODE ]</span>
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
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <Input
                    type="text"
                    value={eventSearch}
                    onChange={e => setEventSearch(e.target.value)}
                    placeholder="QUERY MATRIX CHRONO INDEX BY NAME OR VENUE..."
                    className="bg-black/60 border border-pink-500/20 pl-12 py-6 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold w-full text-gold font-mono placeholder-pink-955 text-xs tracking-widest shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute top-0 right-4 bottom-0 flex items-center pointer-events-none font-mono text-[9px] text-gray-500 tracking-wider">
                    [ LEDGER REGISTER ]
                  </div>
                </div>

                <Card className="bg-[#05020c]/90 border border-pink-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,80,0.05)] relative group">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-pink-600 via-gold to-pink-600 opacity-80"></div>
                  
                  <CardHeader className="pb-4 border-b border-pink-500/10">
                    <div className="flex items-center justify-between font-mono">
                      <div>
                        <div className="text-[9px] text-pink-500 tracking-[0.2em] font-black uppercase mb-1">[ ACTIVE CHRONOLOGY INDICES ]</div>
                        <CardTitle className="text-lg font-bold text-white uppercase tracking-wider">Timeline Registries</CardTitle>
                        <CardDescription className="text-gray-400 text-xs mt-0.5">Monitoring timeline network register nodes ({filteredEvents.length} indexes).</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto divide-y divide-pink-950/20 custom-scrollbar font-mono">
                      <AnimatePresence initial={false}>
                        {filteredEvents.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-5 hover:bg-pink-950/10 transition-colors duration-300 relative group/row border-b border-pink-950/15"
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-gold opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="w-16 h-12 rounded bg-[#020005] border border-pink-500/20 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md relative shadow-[inset_0_0_10px_rgba(255,0,0,0.4)]">
                              {event.image ? (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-4 h-4 text-pink-500/60" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-xs truncate uppercase tracking-widest leading-snug">{event.title}</h4>
                                <span className="text-[8px] bg-pink-950/50 text-pink-400 border border-pink-500/20 px-1.5 py-0.5 rounded uppercase font-black tracking-widest shrink-0 scale-90">
                                  {event.id}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-gray-500 mt-1.5 font-mono">
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
                                className="rounded-xl w-10 h-10 border border-pink-500/20 bg-pink-500/10 text-pink-400 hover:bg-pink-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                                title="Delete Event"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredEvents.length === 0 && (
                        <div className="py-16 text-center text-gray-500">
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
                <Card className={`bg-[#05020c]/90 border border-pink-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,80,0.05)] relative transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,170,0,0.1)] group ${editingBulletinId ? 'ring-2 ring-gold/60 border-gold/50 shadow-gold/10' : ''}`}>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/50 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/50 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/50 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/50 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-pink-600 via-gold to-pink-600 opacity-80"></div>
                  
                  <CardHeader className="pb-4 border-b border-pink-500/10">
                    <div className="font-mono text-[9px] text-pink-500 tracking-[0.2em] font-black uppercase mb-1">[ BULLETIN TRANSMITTER ]</div>
                    <CardTitle className="text-xl font-extrabold text-white font-mono uppercase tracking-tight">
                      {editingBulletinId ? 'Re-calibrate Bulletin' : 'Deploy Bulletin'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs font-mono">
                      {editingBulletinId ? 'Re-calibrate the data parameters of this bulletin beacon.' : 'Broadcast a new monthly publication beacon into the archive grid.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAddBulletin} className="space-y-4 text-gray-300 font-mono">
                      <div className="space-y-1.5">
                        <Label htmlFor="b_title" className="text-xs uppercase font-bold text-gold tracking-widest">BULLETIN TITLE *</Label>
                        <Input
                          id="b_title"
                          value={bulletinForm.title}
                          onChange={e => setBulletinForm({ ...bulletinForm, title: e.target.value })}
                          placeholder="e.g., NOVEMBER 2025"
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_date" className="text-xs uppercase font-bold text-gold tracking-widest">CHRONO DATE KEY *</Label>
                        <Input
                          id="b_date"
                          value={bulletinForm.date}
                          onChange={e => setBulletinForm({ ...bulletinForm, date: e.target.value })}
                          placeholder="e.g., November-2025"
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 font-mono"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_fileId" className="text-xs uppercase font-bold text-gold tracking-widest">DRIVE SYSTEM KEY OR SHARE LINK *</Label>
                        <Input
                          id="b_fileId"
                          value={bulletinForm.fileId}
                          onChange={e => setBulletinForm({ ...bulletinForm, fileId: e.target.value })}
                          placeholder="Paste full Google Drive Link or File ID..."
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 text-xs"
                          required
                        />
                        <p className="text-[9px] text-gray-500 leading-tight font-sans">
                          💡 You can paste the **entire Google Drive Share Link** or just the File ID. We will extract the ID automatically.
                          <br />
                          ⚠️ Crucial: Make sure the file sharing in Google Drive is set to **"Anyone with the link can view"**.
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_coverImage" className="text-xs uppercase font-bold text-gold tracking-widest">COVER IMAGE URL</Label>
                        <Input
                          id="b_coverImage"
                          value={bulletinForm.coverImage}
                          onChange={e => setBulletinForm({ ...bulletinForm, coverImage: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_content" className="text-xs uppercase font-bold text-gold tracking-widest">BULLETIN SUMMARY FEED</Label>
                        <Textarea
                          id="b_content"
                          value={bulletinForm.content}
                          onChange={e => setBulletinForm({ ...bulletinForm, content: e.target.value })}
                          placeholder="Summarize key announcements in this broadcast data packet..."
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 min-h-[90px]"
                        />
                      </div>

                      <div className="flex gap-4 mt-2">
                        {editingBulletinId && (
                          <Button
                            type="button"
                            onClick={cancelEditBulletin}
                            className="flex-1 bg-[#1a000a] border border-pink-500/20 hover:bg-pink-950/40 text-pink-400 hover:text-white font-bold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            <span>[ ABORT ]</span>
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className={`${editingBulletinId ? 'flex-1 bg-gradient-to-r from-gold to-yellow-600 text-black font-extrabold shadow-[0_0_20px_rgba(229,193,88,0.3)]' : 'w-full bg-gradient-to-r from-pink-950 via-red-950 to-pink-950 text-gold hover:text-white font-extrabold border border-gold/30 shadow-[0_0_20px_rgba(219,39,119,0.3)]'} tracking-wider py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase`}
                        >
                          {editingBulletinId ? (
                            <>
                              <Edit className="w-4 h-4 text-black" />
                              <span>[ RE-SYNC BEACON ]</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-gold" />
                              <span>[ BROADCAST BEACON ]</span>
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
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <Input
                    type="text"
                    value={bulletinSearch}
                    onChange={e => setBulletinSearch(e.target.value)}
                    placeholder="QUERY TRANSMITTER GRID BY KEYWORD..."
                    className="bg-black/60 border border-pink-500/20 pl-12 py-6 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold w-full text-gold font-mono placeholder-pink-955 text-xs tracking-widest shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute top-0 right-4 bottom-0 flex items-center pointer-events-none font-mono text-[9px] text-gray-500 tracking-wider">
                    [ BEACON FILTER ]
                  </div>
                </div>

                <Card className="bg-[#05020c]/90 border border-pink-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,80,0.05)] relative group">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-pink-600 via-gold to-pink-600 opacity-80"></div>
                  
                  <CardHeader className="pb-4 border-b border-pink-500/10">
                    <div className="flex items-center justify-between font-mono">
                      <div>
                        <div className="text-[9px] text-pink-500 tracking-[0.2em] font-black uppercase mb-1">[ DIRECTORY BROADCAST BEACONS ]</div>
                        <CardTitle className="text-lg font-bold text-white uppercase tracking-wider font-mono">Transmitter Registers</CardTitle>
                        <CardDescription className="text-gray-400 text-xs mt-0.5">Monitoring active published news transmitters ({filteredBulletins.length} registers).</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto divide-y divide-pink-950/20 custom-scrollbar font-mono">
                      <AnimatePresence initial={false}>
                        {filteredBulletins.map((bulletin) => (
                          <motion.div
                            key={bulletin.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-5 hover:bg-pink-950/10 transition-colors duration-300 relative group/row border-b border-pink-950/15"
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-gold opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="w-12 h-16 rounded bg-[#020005] border border-pink-500/20 overflow-hidden flex-shrink-0 flex items-center justify-center text-gold shadow-md aspect-[3/4] relative shadow-[inset_0_0_10px_rgba(255,0,0,0.3)]">
                              {bulletin.coverImage ? (
                                <img src={bulletin.coverImage} alt={bulletin.title} className="w-full h-full object-cover" />
                              ) : (
                                <Newspaper className="w-5 h-5 text-gold/60" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-xs truncate uppercase tracking-widest leading-snug">{bulletin.title}</h4>
                                <span className="text-[8px] bg-pink-950/50 text-pink-400 border border-pink-500/20 px-1.5 py-0.5 rounded uppercase font-black tracking-widest shrink-0 scale-90">
                                  {bulletin.id}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-500 mt-2">
                                <span className="flex items-center gap-1 font-mono text-[9px] text-pink-500/60 font-semibold tracking-wider">REF: {bulletin.fileId.slice(0, 10)}...</span>
                                <span className="flex items-center gap-1 text-[9px] bg-pink-950/40 border border-pink-500/20 px-2 py-0.5 rounded-full text-gold font-bold uppercase tracking-widest">{bulletin.date}</span>
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
                                className="rounded-xl w-10 h-10 border border-pink-500/20 bg-pink-500/10 text-pink-400 hover:bg-pink-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                                title="Delete Bulletin"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredBulletins.length === 0 && (
                        <div className="py-16 text-center text-gray-500">
                          <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold animate-pulse" />
                          <p className="text-xs tracking-widest">[ NO TRANSMITTER CHANNELS STABLE ]</p>
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
                <Card className={`bg-[#05020c]/90 border border-pink-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,80,0.05)] relative group transition-all duration-300 ${editingTeamId ? 'ring-1 ring-gold shadow-[0_0_25px_rgba(229,193,88,0.15)] border-gold/50' : ''}`}>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-pink-600 via-gold to-pink-600 opacity-80"></div>
                  
                  <CardHeader className="pb-4 border-b border-pink-500/10">
                    <div className="font-mono text-[9px] text-pink-500 tracking-[0.2em] font-black uppercase mb-1">[ ROSTER GRID COMPILER ]</div>
                    <CardTitle className="text-xl font-extrabold text-white font-mono uppercase tracking-tight">
                      {editingTeamId ? 'Re-align Roster Node' : 'Commission Roster Node'}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs font-mono">
                      {editingTeamId ? 'Re-calibrate the registry properties of this roster entry.' : 'Deploy a new organizational node onto the leadership directory.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAddTeamMember} className="space-y-4 text-gray-300 font-mono">
                      <div className="space-y-1.5">
                        <Label htmlFor="m_name" className="text-xs uppercase font-bold text-gold tracking-widest">OFFICER IDENTIFIER / NAME *</Label>
                        <Input
                          id="m_name"
                          value={teamForm.name}
                          onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
                          placeholder="e.g., Rtr. Midun"
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 text-xs"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="m_position" className="text-xs uppercase font-bold text-gold tracking-widest">ASSIGNED SPECTOR ROLE *</Label>
                        <Input
                          id="m_position"
                          value={teamForm.position}
                          onChange={e => setTeamForm({ ...teamForm, position: e.target.value })}
                          placeholder="e.g., SECTOR TREASURER"
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 text-xs"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="m_image" className="text-xs uppercase font-bold text-gold tracking-widest">IDENTIFICATION IMAGE (URL)</Label>
                        <Input
                          id="m_image"
                          value={teamForm.image}
                          onChange={e => setTeamForm({ ...teamForm, image: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="bg-black/40 border-pink-500/20 text-white rounded-xl focus:ring-1 focus:ring-gold focus:border-gold placeholder-pink-955 text-xs"
                        />
                        <p className="text-[9px] text-gray-500 mt-1">
                          Leave empty to deploy standard KPRCAS Rotaract crest identity.
                        </p>
                      </div>

                      {/* Interactive Premium Card Preview */}
                      <div className="border border-pink-500/20 rounded-2xl p-6 bg-[#0d0413]/60 mt-6 relative overflow-hidden flex flex-col items-center group/preview shadow-[inset_0_0_20px_rgba(255,0,80,0.05)]">
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40"></div>
                        <div className="absolute top-2 left-3 text-[9px] font-bold text-gold/80 uppercase tracking-[0.2em]">
                          [ ROSTER ENTRY PREVIEW ]
                        </div>
                        
                        {/* Futuristic Hologram Ring */}
                        <div className="relative w-28 h-28 mx-auto mt-4 mb-4 flex-shrink-0 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border border-pink-500/20 animate-ping opacity-40"></div>
                          <div className="absolute inset-[-6px] rounded-full border border-dashed border-gold/40 animate-[spin_25s_linear_infinite]"></div>
                          <div className="absolute inset-0 rounded-full border-[3px] border-double border-pink-950 shadow-[0_0_15px_rgba(255,0,80,0.5)] overflow-hidden bg-black/60 flex items-center justify-center">
                            {teamForm.image ? (
                              <img src={teamForm.image} alt={teamForm.name} className="w-full h-full object-cover group-hover/preview:scale-110 transition-transform duration-500" />
                            ) : (
                              <User className="w-10 h-10 text-pink-500/40 animate-pulse" />
                            )}
                          </div>
                          {/* Horizontal scanline laser */}
                          <div className="absolute left-0 right-0 h-[2px] bg-pink-500 shadow-[0_0_8px_#ff003c] animate-[bounce_3s_infinite] pointer-events-none opacity-60"></div>
                        </div>
                        
                        <h4 className="text-sm font-bold text-white text-center leading-snug uppercase tracking-widest">
                          {teamForm.name || 'Candidate Node'}
                        </h4>
                        <p className="text-[10px] text-gold font-extrabold tracking-[0.25em] uppercase text-center mt-2.5 bg-pink-950/40 border border-pink-500/25 px-3 py-1 rounded">
                          {teamForm.position || 'COORDINATOR SECTOR'}
                        </p>
                      </div>

                      <div className="flex gap-4 mt-2">
                        {editingTeamId && (
                          <Button
                            type="button"
                            onClick={cancelEditTeamMember}
                            className="flex-1 bg-[#1a000a] border border-pink-500/20 hover:bg-pink-950/40 text-pink-400 hover:text-white font-bold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            <span>[ ABORT ]</span>
                          </Button>
                        )}
                        <Button
                          type="submit"
                          className={`${editingTeamId ? 'flex-1 bg-gradient-to-r from-gold to-yellow-600 text-black font-extrabold shadow-[0_0_20px_rgba(229,193,88,0.3)]' : 'w-full bg-gradient-to-r from-pink-950 via-red-950 to-pink-950 text-gold hover:text-white font-extrabold border border-gold/30 shadow-[0_0_20px_rgba(219,39,119,0.3)]'} tracking-wider py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase`}
                        >
                          {editingTeamId ? (
                            <>
                              <Edit className="w-4 h-4 text-black" />
                              <span>[ RE-SYNC DIRECTORY ]</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-gold" />
                              <span>[ COMPILE DIRECTORY ]</span>
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
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <Input
                    type="text"
                    value={teamSearch}
                    onChange={e => setTeamSearch(e.target.value)}
                    placeholder="QUERY LEADERSHIP ROSTER BY NAME OR ROLE..."
                    className="bg-black/60 border border-pink-500/20 pl-12 py-6 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold w-full text-gold font-mono placeholder-pink-955 text-xs tracking-widest shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute top-0 right-4 bottom-0 flex items-center pointer-events-none font-mono text-[9px] text-gray-500 tracking-wider">
                    [ ROSTER FILTER ]
                  </div>
                </div>

                <Card className="bg-[#05020c]/90 border border-pink-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,80,0.05)] relative group">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 pointer-events-none"></div>
                  
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-pink-600 via-gold to-pink-600 opacity-80"></div>
                  
                  <CardHeader className="pb-4 border-b border-pink-500/10">
                    <div className="flex items-center justify-between font-mono">
                      <div>
                        <div className="text-[9px] text-pink-500 tracking-[0.2em] font-black uppercase mb-1">[ DIRECTORY SECTOR REGISTRIES ]</div>
                        <CardTitle className="text-lg font-bold text-white uppercase tracking-wider font-mono">Roster Directory Ledgers</CardTitle>
                        <CardDescription className="text-gray-400 text-xs mt-0.5">Actively monitoring roster sector officer entities ({filteredTeamMembers.length} entities).</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[600px] overflow-y-auto divide-y divide-pink-950/20 custom-scrollbar font-mono">
                      <AnimatePresence initial={false}>
                        {filteredTeamMembers.map((member) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-5 hover:bg-pink-950/10 transition-colors duration-300 relative group/row border-b border-pink-950/15"
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-gold opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                              <div className="absolute inset-0 rounded-full border border-pink-500/20 group-hover/row:border-gold/50 transition-colors duration-300 group-hover/row:scale-105"></div>
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-pink-500/30 bg-[#020005] flex items-center justify-center relative shadow-[inset_0_0_8px_rgba(255,0,80,0.4)]">
                                {member.image ? (
                                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                  <User className="w-4 h-4 text-pink-500/40" />
                                )}
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-xs truncate uppercase tracking-widest leading-snug">{member.name}</h4>
                                <span className="text-[8px] bg-pink-950/50 text-pink-400 border border-pink-500/20 px-1.5 py-0.5 rounded uppercase font-black tracking-widest shrink-0 scale-90">
                                  {member.id}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-500 mt-2">
                                <span className="flex items-center gap-1 text-[9px] bg-pink-950/40 border border-pink-500/20 px-2.5 py-0.5 rounded-full text-gold font-bold uppercase tracking-widest">{member.position}</span>
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
                                className="rounded-xl w-10 h-10 border border-pink-500/20 bg-pink-500/10 text-pink-400 hover:bg-pink-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                                title="Delete Officer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredTeamMembers.length === 0 && (
                        <div className="py-16 text-center text-gray-500">
                          <Users className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold animate-pulse" />
                          <p className="text-xs tracking-widest">[ NO DIRECTORY DATASETS FOUND ]</p>
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
