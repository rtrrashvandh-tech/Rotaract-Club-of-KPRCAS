import { useState, useEffect, useMemo } from 'react';
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
  X
} from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState<EventType[]>([]);
  const [bulletins, setBulletins] = useState<BulletinType[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [showGuide, setShowGuide] = useState(true);

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

  // --- Add Event Handler ---
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.description) {
      toast.error('Title and Description are required');
      return;
    }

    const newEvent: EventType = {
      ...eventForm,
      id: `e_${Date.now()}`
    };

    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    setEventForm({ title: '', date: '', time: '', location: '', platform: '', image: '', description: '' });
    toast.success(`Event "${newEvent.title}" added successfully!`);
  };

  // --- Delete Event Handler ---
  const handleDeleteEvent = (id: string) => {
    const eventToDelete = events.find(e => e.id === id);
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    toast.success(`Deleted Event: ${eventToDelete?.title || 'Event'}`);
  };

  // --- Add Bulletin Handler ---
  const handleAddBulletin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinForm.title || !bulletinForm.fileId || !bulletinForm.date) {
      toast.error('Title, Identifier, and Google Drive File ID are required');
      return;
    }

    const newBulletin: BulletinType = {
      ...bulletinForm,
      id: `b_${Date.now()}`
    };

    const updatedBulletins = [newBulletin, ...bulletins];
    setBulletins(updatedBulletins);
    saveBulletins(updatedBulletins);
    setBulletinForm({ title: '', date: '', content: '', fileId: '', coverImage: '' });
    toast.success(`Bulletin "${newBulletin.title}" added successfully!`);
  };

  // --- Delete Bulletin Handler ---
  const handleDeleteBulletin = (id: string) => {
    const bulletinToDelete = bulletins.find(b => b.id === id);
    const updatedBulletins = bulletins.filter(b => b.id !== id);
    setBulletins(updatedBulletins);
    saveBulletins(updatedBulletins);
    toast.success(`Deleted Bulletin: ${bulletinToDelete?.title || 'Bulletin'}`);
  };

  // --- Add Team Member Handler ---
  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.position) {
      toast.error('Full Name and Position/Role are required');
      return;
    }

    const defaultImage = 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411700/club-logo_wsjsmp.png';
    const newMember: TeamMemberType = {
      ...teamForm,
      image: teamForm.image.trim() || defaultImage,
      id: `t_${Date.now()}`
    };

    const updatedMembers = [newMember, ...teamMembers];
    setTeamMembers(updatedMembers);
    saveTeamMembers(updatedMembers);
    setTeamForm({ name: '', position: '', image: '' });
    toast.success(`Team Member "${newMember.name}" added successfully!`);
  };

  // --- Delete Team Member Handler ---
  const handleDeleteTeamMember = (id: string) => {
    const memberToDelete = teamMembers.find(m => m.id === id);
    const updatedMembers = teamMembers.filter(m => m.id !== id);
    setTeamMembers(updatedMembers);
    saveTeamMembers(updatedMembers);
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
      <div className="min-h-screen bg-gradient-to-br from-[#3b000a] via-[#120004] to-[#050001] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-maroon/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden text-white relative">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            <CardHeader className="pt-8 pb-4 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-maroon to-red-600 flex items-center justify-center border border-white/20 shadow-lg mb-4">
                <Lock className="w-6 h-6 text-gold animate-bounce" />
              </div>
              <CardTitle className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-gold bg-clip-text text-transparent">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm mt-2">
                Enter the password to access the KPRCAS console.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8 px-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 text-xs font-semibold uppercase tracking-wider">
                    Console Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder-gray-500 rounded-2xl py-6 px-4 focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 w-full"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-maroon to-red-700 hover:from-maroon-dark hover:to-red-800 text-white font-bold py-6 rounded-2xl shadow-xl shadow-red-950/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Authenticate Console</span>
                  <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 pt-28 selection:bg-maroon selection:text-white relative">
      {/* Background radial overlays */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-maroon/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Sticky Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-maroon to-red-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
              <Users className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-gray-100 to-gold bg-clip-text text-transparent">
                Rotaract Admin Console
              </h1>
              <p className="text-gray-400 text-xs mt-0.5">Roar & Vision Year Dashboard</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={handleExportDatabase}
              className="rounded-2xl px-6 py-6 border border-gold/30 hover:bg-gold/10 text-gold bg-transparent flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Export Database Code</span>
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="rounded-2xl px-6 py-6 border border-red-500/20 hover:bg-red-500/10 text-red-400 bg-transparent flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              <span>Lock Console</span>
            </Button>
          </div>
        </header>

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
              className={`rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm ${activeTab === 'events' ? 'bg-gradient-to-r from-maroon to-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger
              value="bulletins"
              className={`rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm ${activeTab === 'bulletins' ? 'bg-gradient-to-r from-maroon to-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Bulletins</span>
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className={`rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm ${activeTab === 'team' ? 'bg-gradient-to-r from-maroon to-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
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
                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-maroon to-gold"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-white">Create New Event</CardTitle>
                    <CardDescription className="text-gray-400 text-xs">Fill in the fields to deploy a live event card.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddEvent} className="space-y-4 text-gray-300">
                      <div className="space-y-1.5">
                        <Label htmlFor="title" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Event Title *</Label>
                        <Input
                          id="title"
                          value={eventForm.title}
                          onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                          placeholder="e.g., Mattaipandhu 3.0"
                          className="bg-white/5 border-white/10 rounded-xl"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="date" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={eventForm.date}
                            onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                            className="bg-white/5 border-white/10 rounded-xl"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="time" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Time</Label>
                          <Input
                            id="time"
                            value={eventForm.time}
                            onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                            placeholder="e.g., 10:00 AM - 1:00 PM"
                            className="bg-white/5 border-white/10 rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="location" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Location</Label>
                        <Input
                          id="location"
                          value={eventForm.location}
                          onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                          placeholder="e.g., KPRCAS Seminar Hall"
                          className="bg-white/5 border-white/10 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="platform" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Platform/Type</Label>
                        <Input
                          id="platform"
                          value={eventForm.platform}
                          onChange={e => setEventForm({ ...eventForm, platform: e.target.value })}
                          placeholder="e.g., In-person, Gmeet, Online"
                          className="bg-white/5 border-white/10 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="image" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Image URL</Label>
                        <Input
                          id="image"
                          value={eventForm.image}
                          onChange={e => setEventForm({ ...eventForm, image: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="bg-white/5 border-white/10 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="description" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Description *</Label>
                        <Textarea
                          id="description"
                          value={eventForm.description}
                          onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                          placeholder="Provide a compelling description..."
                          className="bg-white/5 border-white/10 rounded-xl min-h-[100px]"
                          required
                        />
                      </div>

                      {/* Dynamic Live Preview */}
                      <div className="border border-white/10 rounded-2xl p-4 bg-white/5 mt-4">
                        <span className="text-xs font-semibold uppercase text-gold block mb-2">Live Form Preview</span>
                        <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex gap-3 items-center">
                          <div className="w-16 h-12 rounded bg-gray-800 border border-white/10 flex-shrink-0 overflow-hidden flex items-center justify-center">
                            {eventForm.image ? (
                              <img src={eventForm.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-bold text-white truncate">{eventForm.title || 'Untitled Event'}</h4>
                            <p className="text-[11px] text-gray-400 truncate">{eventForm.description || 'No description yet'}</p>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-maroon to-red-700 text-white font-bold py-6 rounded-2xl shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mt-2 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-5 h-5 text-gold" />
                        <span>Deploy Event</span>
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List Section (right) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Search Header */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    value={eventSearch}
                    onChange={e => setEventSearch(e.target.value)}
                    placeholder="Search existing events by title or location..."
                    className="bg-white/5 border-white/10 pl-12 py-6 rounded-2xl focus:ring-2 focus:ring-gold focus:border-gold w-full text-white"
                  />
                </div>

                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-white">Existing Events</CardTitle>
                        <CardDescription className="text-gray-400 text-xs">Manage currently active events ({filteredEvents.length}).</CardDescription>
                      </div>
                    </div>
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
                            className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors duration-300"
                          >
                            <div className="w-16 h-12 rounded bg-gray-800 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md">
                              {event.image ? (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white text-sm truncate leading-snug">{event.title}</h4>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mt-1">
                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold/80" /> {event.date || 'No Date'}</span>
                                {event.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gold/80" /> {event.location}</span>}
                              </div>
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="rounded-xl w-10 h-10 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredEvents.length === 0 && (
                        <div className="py-16 text-center text-gray-500">
                          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold" />
                          <p className="text-sm">No events found matching your search.</p>
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
                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-maroon to-gold"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-white">Add New Bulletin</CardTitle>
                    <CardDescription className="text-gray-400 text-xs">Link a PDF bulletin file from your Google Drive storage.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddBulletin} className="space-y-4 text-gray-300">
                      <div className="space-y-1.5">
                        <Label htmlFor="b_title" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Bulletin Title *</Label>
                        <Input
                          id="b_title"
                          value={bulletinForm.title}
                          onChange={e => setBulletinForm({ ...bulletinForm, title: e.target.value })}
                          placeholder="e.g., November 2025 Edition"
                          className="bg-white/5 border-white/10 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_date" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Identifier (Date/Month) *</Label>
                        <Input
                          id="b_date"
                          value={bulletinForm.date}
                          onChange={e => setBulletinForm({ ...bulletinForm, date: e.target.value })}
                          placeholder="e.g., November-2025"
                          className="bg-white/5 border-white/10 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_fileId" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Google Drive File ID *</Label>
                        <Input
                          id="b_fileId"
                          value={bulletinForm.fileId}
                          onChange={e => setBulletinForm({ ...bulletinForm, fileId: e.target.value })}
                          placeholder="e.g., 1HRRqhiuJIrOzChxt..."
                          className="bg-white/5 border-white/10 rounded-xl"
                          required
                        />
                        <p className="text-[10px] text-gray-500 leading-tight">
                          ⚠️ Ensure the file share setting is set to **"Anyone with the link can view"** in Google Drive.
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_coverImage" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Cover Image URL</Label>
                        <Input
                          id="b_coverImage"
                          value={bulletinForm.coverImage}
                          onChange={e => setBulletinForm({ ...bulletinForm, coverImage: e.target.value })}
                          placeholder="e.g., /bulletin-covers/november.png or https://..."
                          className="bg-white/5 border-white/10 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="b_content" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Summary / Content</Label>
                        <Textarea
                          id="b_content"
                          value={bulletinForm.content}
                          onChange={e => setBulletinForm({ ...bulletinForm, content: e.target.value })}
                          placeholder="Summarize the key announcements in this edition..."
                          className="bg-white/5 border-white/10 rounded-xl min-h-[100px]"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-maroon to-red-700 text-white font-bold py-6 rounded-2xl shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mt-2 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-5 h-5 text-gold" />
                        <span>Publish Bulletin</span>
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List Section (right) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Search Header */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    value={bulletinSearch}
                    onChange={e => setBulletinSearch(e.target.value)}
                    placeholder="Search bulletins by title, identifier..."
                    className="bg-white/5 border-white/10 pl-12 py-6 rounded-2xl focus:ring-2 focus:ring-gold focus:border-gold w-full text-white"
                  />
                </div>

                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-white">Existing Bulletins</CardTitle>
                        <CardDescription className="text-gray-400 text-xs">Manage published monthly bulletins ({filteredBulletins.length}).</CardDescription>
                      </div>
                    </div>
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
                            className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors duration-300"
                          >
                             <div className="w-12 h-16 rounded bg-gray-900 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center text-gold shadow-md aspect-[3/4]">
                              {bulletin.coverImage ? (
                                <img src={bulletin.coverImage} alt={bulletin.title} className="w-full h-full object-cover" />
                              ) : (
                                <Newspaper className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white text-sm truncate leading-snug">{bulletin.title}</h4>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mt-1">
                                <span className="flex items-center gap-1 font-mono text-[10px] text-gray-500">ID: {bulletin.fileId}</span>
                                <span className="flex items-center gap-1 text-[11px] bg-white/5 border border-white/5 px-2 py-0.5 rounded-full text-gold/80">{bulletin.date}</span>
                              </div>
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteBulletin(bulletin.id)}
                              className="rounded-xl w-10 h-10 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredBulletins.length === 0 && (
                        <div className="py-16 text-center text-gray-500">
                          <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold" />
                          <p className="text-sm">No bulletins found matching your search.</p>
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
                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-maroon to-gold"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-white">Add Team Member</CardTitle>
                    <CardDescription className="text-gray-400 text-xs">Publish a new team card onto the leadership roster.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddTeamMember} className="space-y-4 text-gray-300">
                      <div className="space-y-1.5">
                        <Label htmlFor="m_name" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Full Name *</Label>
                        <Input
                          id="m_name"
                          value={teamForm.name}
                          onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
                          placeholder="e.g., Rtr. Sanjay K"
                          className="bg-white/5 border-white/10 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="m_position" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Position / Role *</Label>
                        <Input
                          id="m_position"
                          value={teamForm.position}
                          onChange={e => setTeamForm({ ...teamForm, position: e.target.value })}
                          placeholder="e.g., DESIGN CHAIR"
                          className="bg-white/5 border-white/10 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="m_image" className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Profile Photo URL</Label>
                        <Input
                          id="m_image"
                          value={teamForm.image}
                          onChange={e => setTeamForm({ ...teamForm, image: e.target.value })}
                          placeholder="https://res.cloudinary.com/..."
                          className="bg-white/5 border-white/10 rounded-xl"
                        />
                        <p className="text-[10px] text-gray-500">
                          Leave empty to use a standard KPRCAS Rotaract placeholder logo.
                        </p>
                      </div>

                      {/* Interactive Premium Card Preview */}
                      <div className="border border-white/10 rounded-3xl p-6 bg-white/5 mt-6 relative overflow-hidden flex flex-col items-center">
                        <div className="absolute top-2 left-3 text-[10px] font-bold text-gold/80 uppercase tracking-widest">
                          Live Roster Preview
                        </div>
                        <div className="w-28 h-28 mx-auto mt-2 mb-4 rounded-full overflow-hidden border-4 border-maroon/30 shadow-xl flex items-center justify-center bg-gray-900 flex-shrink-0">
                          {teamForm.image ? (
                            <img src={teamForm.image} alt={teamForm.name} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-12 h-12 text-gray-600" />
                          )}
                        </div>
                        <h4 className="text-base font-bold text-white text-center leading-snug">
                          {teamForm.name || 'Rtr. Member Name'}
                        </h4>
                        <p className="text-xs text-gold/90 font-semibold tracking-wider uppercase text-center mt-1">
                          {teamForm.position || 'ROLE / POSITION'}
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-maroon to-red-700 text-white font-bold py-6 rounded-2xl shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mt-2 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-5 h-5 text-gold" />
                        <span>Deploy Team Member</span>
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List Section (right) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Search Header */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    value={teamSearch}
                    onChange={e => setTeamSearch(e.target.value)}
                    placeholder="Search roster by name or position..."
                    className="bg-white/5 border-white/10 pl-12 py-6 rounded-2xl focus:ring-2 focus:ring-gold focus:border-gold w-full text-white"
                  />
                </div>

                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-white">Dynamic Roster</CardTitle>
                        <CardDescription className="text-gray-400 text-xs">Manage currently active roster members ({filteredTeamMembers.length}).</CardDescription>
                      </div>
                    </div>
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
                            className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors duration-300"
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-gray-800 flex-shrink-0 flex items-center justify-center">
                              {member.image ? (
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-5 h-5 text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white text-sm truncate leading-snug">{member.name}</h4>
                              <p className="text-xs text-gold font-semibold uppercase tracking-wider mt-0.5">{member.position}</p>
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteTeamMember(member.id)}
                              className="rounded-xl w-10 h-10 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {filteredTeamMembers.length === 0 && (
                        <div className="py-16 text-center text-gray-500">
                          <Users className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold" />
                          <p className="text-sm">No team members found matching your search.</p>
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
