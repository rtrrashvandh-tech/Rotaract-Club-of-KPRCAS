
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    LayoutDashboard,
    Calendar,
    FileText,
    Plus,
    Trash2,
    LogOut,
    Lock,
    Eye,
    Settings,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import AnimationWrapper from '@/components/AnimationWrapper';
import {
    getCustomEvents,
    saveCustomEvent,
    deleteCustomEvent,
    getCustomBulletins,
    saveCustomBulletin,
    deleteCustomBulletin,
    ADMIN_PASSWORD,
    AdminEvent,
    AdminBulletin,
    AdminGalleryItem,
    getCustomGalleryItems,
    saveCustomGalleryItem,
    deleteCustomGalleryItem
} from '@/utils/adminData';

import { db } from '@/lib/firebase';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('events');
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [eventForm, setEventForm] = useState<Partial<AdminEvent>>({
        title: '',
        date: '',
        time: '',
        location: '',
        platform: 'In-person',
        image: '',
        description: ''
    });

    const [bulletinForm, setBulletinForm] = useState<Partial<AdminBulletin>>({
        title: '',
        date: '',
        content: '',
        fileId: ''
    });

    const [galleryForm, setGalleryForm] = useState<Partial<AdminGalleryItem>>({
        title: '',
        description: '',
        category: 'club service',
        src: ''
    });

    const [customEvents, setCustomEvents] = useState<AdminEvent[]>([]);
    const [customBulletins, setCustomBulletins] = useState<AdminBulletin[]>([]);
    const [customGallery, setCustomGallery] = useState<AdminGalleryItem[]>([]);

    // If database connection is missing, show localized warning instead of blank screen
    if (!db) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                <Card className="max-w-md w-full p-8 text-center shadow-2xl rounded-3xl border-none space-y-6">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Configuration Required</h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The Admin Dashboard requires **Firebase Environment Variables** to function on the live site.
                            If you haven't added them to your Render dashboard yet, please do so now.
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-left border border-blue-100">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Developer Note</p>
                        <p className="text-xs text-blue-800">
                            Check for `VITE_FIREBASE_API_KEY` and other credentials in your `.env` or Render settings.
                        </p>
                    </div>
                    <Button onClick={() => window.location.reload()} variant="outline" className="w-full rounded-xl">
                        Retry Connection
                    </Button>
                </Card>
            </div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                setIsLoading(true);
                const events = await getCustomEvents();
                const bulletins = await getCustomBulletins();
                const gallery = await getCustomGalleryItems();
                setCustomEvents(events);
                setCustomBulletins(bulletins);
                setCustomGallery(gallery);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            toast.success('Access Granted. Welcome back, Admin.');
        } else {
            toast.error('Invalid credentials. Access denied.');
        }
    };

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventForm.title || !eventForm.image) {
            toast.error('Please fill in required fields');
            return;
        }
        setIsLoading(true);
        try {
            await saveCustomEvent(eventForm as AdminEvent);
            const events = await getCustomEvents();
            setCustomEvents(events);
            setEventForm({ title: '', date: '', time: '', location: '', platform: 'In-person', image: '', description: '' });
            toast.success('Event published successfully!');
        } catch (error) {
            toast.error('Failed to save event');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddBulletin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bulletinForm.title || !bulletinForm.fileId) {
            toast.error('Please fill in required fields');
            return;
        }
        setIsLoading(true);
        try {
            await saveCustomBulletin(bulletinForm as AdminBulletin);
            const bulletins = await getCustomBulletins();
            setCustomBulletins(bulletins);
            setBulletinForm({ title: '', date: '', content: '', fileId: '' });
            toast.success('Bulletin uploaded successfully!');
        } catch (error) {
            toast.error('Failed to save bulletin');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteEvent = async (id: string) => {
        setIsLoading(true);
        try {
            await deleteCustomEvent(id);
            const events = await getCustomEvents();
            setCustomEvents(events);
            toast.info('Event removed');
        } catch (error) {
            toast.error('Failed to delete event');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteBulletin = async (id: string) => {
        setIsLoading(true);
        try {
            await deleteCustomBulletin(id);
            const bulletins = await getCustomBulletins();
            setCustomBulletins(bulletins);
            toast.info('Bulletin removed');
        } catch (error) {
            toast.error('Failed to delete bulletin');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddGalleryItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!galleryForm.title || !galleryForm.src) {
            toast.error('Please fill in required fields');
            return;
        }
        setIsLoading(true);
        try {
            await saveCustomGalleryItem(galleryForm as AdminGalleryItem);
            const gallery = await getCustomGalleryItems();
            setCustomGallery(gallery);
            setGalleryForm({ title: '', description: '', category: 'club service', src: '' });
            toast.success('Gallery item added!');
        } catch (error) {
            toast.error('Failed to save gallery item');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteGalleryItem = async (id: string) => {
        setIsLoading(true);
        try {
            await deleteCustomGalleryItem(id);
            const gallery = await getCustomGalleryItems();
            setCustomGallery(gallery);
            toast.info('Item removed from gallery');
        } catch (error) {
            toast.error('Failed to delete item');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-inter">
                <AnimationWrapper animation="zoom-in">
                    <Card className="w-full max-w-md p-8 bg-[#151515] border-[#333] shadow-2xl">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-16 h-16 bg-[#800000] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#800000]/20">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Admin Gateway</h1>
                            <p className="text-gray-400 text-sm">Secure access for Rotaract KPRCAS management</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-gray-300 text-xs uppercase tracking-widest font-bold">Encrypted Token</Label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="bg-[#1f1f1f] border-[#333] text-white focus:border-[#800000] h-12"
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 bg-[#800000] hover:bg-[#a00000] text-white font-bold transition-all transform hover:scale-[1.02]">
                                Initiate Session
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-[#333] text-center">
                            <p className="text-gray-500 text-xs uppercase tracking-tighter">Authorized Personnel Only</p>
                        </div>
                    </Card>
                </AnimationWrapper>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc] flex font-inter">
            {/* Sidebar */}
            <aside className="w-72 bg-[#111] text-white p-6 hidden lg:flex flex-col border-r border-[#222]">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 bg-[#800000] rounded-lg flex items-center justify-center">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-black text-lg tracking-tight">RAC DASH</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'events' ? 'bg-[#800000] text-white' : 'text-gray-400 hover:bg-[#222] hover:text-white'}`}
                    >
                        <Calendar className="w-5 h-5" />
                        <span className="text-sm font-semibold">Events Manager</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('bulletins')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bulletins' ? 'bg-[#800000] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Bulletins</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'gallery' ? 'bg-[#800000] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Gallery</span>
                    </button>
                    <div className="pt-4 mt-4 border-t border-[#222]">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-all">
                            <Settings className="w-5 h-5" />
                            <span className="text-sm font-semibold">System Settings</span>
                        </button>
                    </div>
                </nav>

                <div className="mt-auto pt-6 border-t border-[#222]">
                    <div className="flex items-center gap-3 px-2 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#333] to-[#444] border border-[#555]" />
                        <div>
                            <p className="text-sm font-bold">Club Admin</p>
                            <p className="text-[10px] text-gray-500 font-mono">VISION_YEAR_25_26</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => setIsAuthenticated(false)}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Terminate Session
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto bg-[#fafafa]">
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
                    <h2 className="text-xl font-black text-[#111] uppercase tracking-wide">
                        {activeTab === 'events' ? 'Strategic Events' : 'Monthly Bulletins'} Control
                    </h2>
                    <div className="flex items-center gap-4">
                        {isLoading && <Loader2 className="w-5 h-5 animate-spin text-[#800000]" />}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-100">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase">Cloud Sync Active</span>
                        </div>
                    </div>
                </header>

                <div className="p-10 max-w-6xl mx-auto space-y-10">

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsContent value="events" className="mt-0 space-y-10">
                            {/* Form Card */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <Card className="lg:col-span-5 p-8 border-none shadow-xl bg-white rounded-3xl">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                            <Plus className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-[#111]">Register New Event</h3>
                                            <p className="text-xs text-gray-400">Broadcast your impact to the club</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAddEvent} className="space-y-5">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Event Designation</Label>
                                            <Input
                                                placeholder="e.g. Mattaipandhu 3.0"
                                                value={eventForm.title}
                                                onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                                                className="bg-gray-50 border-gray-100 placeholder:text-gray-300 h-11"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-gray-500">Timeline (YYYY-MM-DD)</Label>
                                                <Input
                                                    placeholder="2025-10-31"
                                                    value={eventForm.date}
                                                    onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                                                    className="bg-gray-50 border-gray-100 h-11"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-gray-500">Venue</Label>
                                                <Input
                                                    placeholder="KPRCAS Campus"
                                                    value={eventForm.location}
                                                    onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                                                    className="bg-gray-50 border-gray-100 h-11"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Visual Resource (Image URL)</Label>
                                            <div className="relative">
                                                <Input
                                                    placeholder="https://res.cloudinary.com/..."
                                                    value={eventForm.image}
                                                    onChange={e => setEventForm({ ...eventForm, image: e.target.value })}
                                                    className="bg-gray-50 border-gray-100 pl-10 h-11"
                                                />
                                                <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Strategic Overview</Label>
                                            <textarea
                                                className="w-full h-24 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                                placeholder="Summarize the initiative and its objectives..."
                                                value={eventForm.description}
                                                onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                                            />
                                        </div>
                                        <Button type="submit" disabled={isLoading} className="w-full h-12 bg-[#111] hover:bg-[#222] text-white rounded-xl shadow-lg shadow-black/10">
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            Deploy Intelligence
                                        </Button>
                                    </form>
                                </Card>

                                <div className="lg:col-span-7 space-y-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest">Active Deployments</h3>
                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{customEvents.length} Items</span>
                                    </div>

                                    <ScrollArea className="h-[600px] pr-4">
                                        <div className="space-y-4">
                                            {customEvents.length === 0 && !isLoading && (
                                                <div className="p-12 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center text-center">
                                                    <AlertCircle className="w-10 h-10 text-gray-200 mb-4" />
                                                    <p className="text-gray-400 text-sm italic">No custom events registered in current ledger.</p>
                                                </div>
                                            )}
                                            {customEvents.map((e) => (
                                                <Card key={e.id} className="p-4 border-none shadow-sm hover:shadow-md transition-all group rounded-2xl bg-white">
                                                    <div className="flex gap-4">
                                                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-inner bg-gray-50 shrink-0">
                                                            <img src={e.image} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between">
                                                                <h4 className="font-bold text-[#111] truncate">{e.title}</h4>
                                                                <button
                                                                    onClick={() => handleDeleteEvent(e.id)}
                                                                    disabled={isLoading}
                                                                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                            <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400 font-bold uppercase">
                                                                <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{e.date}</span>
                                                                <span className="flex items-center gap-1">{e.location || 'Global'}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-3 line-clamp-1">{e.description}</p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="bulletins" className="mt-0 space-y-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <Card className="lg:col-span-5 p-8 border-none shadow-xl bg-white rounded-3xl">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-[#111]">Archive New Bulletin</h3>
                                            <p className="text-xs text-gray-400">Preserve the monthly history</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAddBulletin} className="space-y-5">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Edition Title</Label>
                                            <Input
                                                placeholder="e.g. November 2025"
                                                value={bulletinForm.title}
                                                onChange={e => setBulletinForm({ ...bulletinForm, title: e.target.value })}
                                                className="bg-gray-50 border-gray-100 placeholder:text-gray-300 h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Reference Period</Label>
                                            <Input
                                                placeholder="November-2025"
                                                value={bulletinForm.date}
                                                onChange={e => setBulletinForm({ ...bulletinForm, date: e.target.value })}
                                                className="bg-gray-50 border-gray-100 h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">G-Drive Identity (File ID)</Label>
                                            <Input
                                                placeholder="1HRRqhiuJIrOzChxt..."
                                                value={bulletinForm.fileId}
                                                onChange={e => setBulletinForm({ ...bulletinForm, fileId: e.target.value })}
                                                className="bg-gray-50 border-gray-100 h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Editorial Summary</Label>
                                            <textarea
                                                className="w-full h-24 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none"
                                                placeholder="Brief notes about this edition..."
                                                value={bulletinForm.content}
                                                onChange={e => setBulletinForm({ ...bulletinForm, content: e.target.value })}
                                            />
                                        </div>
                                        <Button type="submit" disabled={isLoading} className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-lg shadow-amber-600/20">
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            Commit to Archive
                                        </Button>
                                    </form>
                                </Card>

                                <div className="lg:col-span-7 space-y-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest">Digital Archives</h3>
                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{customBulletins.length} Items</span>
                                    </div>

                                    <ScrollArea className="h-[600px] pr-4">
                                        <div className="space-y-4">
                                            {customBulletins.length === 0 && !isLoading && (
                                                <div className="p-12 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center text-center">
                                                    <AlertCircle className="w-10 h-10 text-gray-200 mb-4" />
                                                    <p className="text-gray-400 text-sm italic">No custom bulletins archived.</p>
                                                </div>
                                            )}
                                            {customBulletins.map((b) => (
                                                <Card key={b.id} className="p-5 border-none shadow-sm hover:shadow-md transition-all rounded-2xl bg-white flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                                                            <FileText className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-[#111]">{b.title}</h4>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{b.fileId}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteBulletin(b.id)}
                                                        disabled={isLoading}
                                                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="gallery" className="mt-0 space-y-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <Card className="lg:col-span-5 p-8 border-none shadow-xl bg-white rounded-3xl">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                            <ImageIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-[#111]">Add Gallery Moment</h3>
                                            <p className="text-xs text-gray-400">Add new memories to the archive</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAddGalleryItem} className="space-y-5">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Moment Title</Label>
                                            <Input
                                                placeholder="e.g. Charter Day Celebration"
                                                value={galleryForm.title}
                                                onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })}
                                                className="bg-gray-50 border-gray-100 placeholder:text-gray-300 h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Direct Image Link</Label>
                                            <Input
                                                placeholder="https://res.cloudinary.com/..."
                                                value={galleryForm.src}
                                                onChange={e => setGalleryForm({ ...galleryForm, src: e.target.value })}
                                                className="bg-gray-50 border-gray-100 h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Service Avenue (Category)</Label>
                                            <select
                                                className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-3 text-sm outline-none transition-all"
                                                value={galleryForm.category}
                                                onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}
                                            >
                                                <option value="club service">Club Service</option>
                                                <option value="community">Community Service</option>
                                                <option value="professional service">Professional Service</option>
                                                <option value="international service">International Service</option>
                                                <option value="district priority projects">DPP</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-gray-500">Brief Description</Label>
                                            <textarea
                                                className="w-full h-24 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                                placeholder="What happened in this moment?"
                                                value={galleryForm.description}
                                                onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value })}
                                            />
                                        </div>
                                        <Button type="submit" disabled={isLoading} className="w-full h-12 bg-[#111] hover:bg-[#222] text-white rounded-xl">
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            Archive Moment
                                        </Button>
                                    </form>
                                </Card>

                                <div className="lg:col-span-7 space-y-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest">Gallery Feed</h3>
                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{customGallery.length} Items</span>
                                    </div>

                                    <ScrollArea className="h-[600px] pr-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {customGallery.length === 0 && !isLoading && (
                                                <div className="col-span-2 p-12 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center text-center">
                                                    <ImageIcon className="w-10 h-10 text-gray-200 mb-4" />
                                                    <p className="text-gray-400 text-sm italic">No custom gallery items found.</p>
                                                </div>
                                            )}
                                            {customGallery.map((item) => (
                                                <Card key={item.id} className="p-3 border-none shadow-sm hover:shadow-md transition-all group rounded-2xl bg-white overflow-hidden">
                                                    <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50 relative">
                                                        <img src={item.src} alt="" className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => handleDeleteGalleryItem(item.id)}
                                                            disabled={isLoading}
                                                            className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 text-white p-2 rounded-lg backdrop-blur-sm transition-all"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <h4 className="font-bold text-[#111] text-xs truncate px-1">{item.title}</h4>
                                                    <div className="flex items-center gap-1 mt-1 px-1">
                                                        <span className="text-[8px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Quick Stats */}
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10">
                        {[
                            { label: 'Intelligence Nodes', val: 'Active', icon: CheckCircle2, color: 'text-green-500' },
                            { label: 'Active Memory', val: 'Firebase Cloud', icon: Eye, color: 'text-blue-500' },
                            { label: 'System Uptime', val: '99.9%', icon: LayoutDashboard, color: 'text-purple-500' },
                            { label: 'Security Layer', val: 'Auth Gate', icon: Lock, color: 'text-[#800000]' },
                        ].map((s, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-4">
                                <div className={`p-3 rounded-2xl bg-gray-50 ${s.color}`}>
                                    <s.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider leading-none mb-1">{s.label}</p>
                                    <p className="text-sm font-black text-[#111]">{s.val}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                </div>
            </main>

            <footer className="py-6 border-t border-gray-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-300">
                    <span>© 2025 · All Rights Reserved</span>
                    <span>Rotaract Club of KPRCAS</span>
                </div>
            </footer>
        </div>
    );
};

export default Admin;
