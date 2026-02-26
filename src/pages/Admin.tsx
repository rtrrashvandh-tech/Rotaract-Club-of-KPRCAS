import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Calendar, FileText, Plus, Trash2, LogOut,
    Lock, Settings, Image as ImageIcon, CheckCircle2,
    AlertCircle, Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import {
    getCustomEvents, saveCustomEvent, deleteCustomEvent,
    getCustomBulletins, saveCustomBulletin, deleteCustomBulletin,
    ADMIN_PASSWORD, AdminEvent, AdminBulletin, AdminGalleryItem,
    getCustomGalleryItems, saveCustomGalleryItem, deleteCustomGalleryItem
} from '@/utils/adminData';
import { db } from '@/lib/firebase';

const adminStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&family=Unbounded:wght@300;400;500;700;900&family=Instrument+Serif:ital@0;1&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #0D0D0F; --paper: #F2EFE8; --red: #E8192C;
    --lime: #C8FF00; --muted: #8A8680; --border: #D4D0C8;
  }

  .ad-root {
    display: flex; min-height: 100vh;
    background: var(--paper); color: var(--ink);
    font-family: 'Fragment Mono', monospace;
  }

  /* ERROR */
  .ad-error-card {
    max-width: 440px; width: 100%;
    border: 3px solid var(--ink); padding: 48px 40px;
    background: var(--paper); text-align: center;
  }
  .ad-error-icon { color: var(--red); display: flex; justify-content: center; margin-bottom: 20px; }
  .ad-error-title { font-family: 'Unbounded', sans-serif; font-size: 22px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin-bottom: 12px; }
  .ad-error-body { font-size: 11px; line-height: 1.8; color: var(--muted); margin-bottom: 28px; }

  /* LOGIN */
  .ad-login-root {
    min-height: 100vh; width: 100%; display: grid;
    grid-template-columns: 1fr 1px 1fr;
    background: var(--paper);
  }
  .ad-login-left {
    background: var(--ink); position: relative; overflow: hidden;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 56px 52px;
  }
  .ad-login-bg-word {
    position: absolute; left: -10px; top: 50%; transform: translateY(-50%);
    font-family: 'Unbounded', sans-serif; font-size: 160px; font-weight: 900;
    color: rgba(255,255,255,0.03); letter-spacing: -10px; pointer-events: none;
    line-height: 1; text-transform: uppercase;
  }
  .ad-login-left-content { position: relative; z-index: 2; }
  .ad-login-eyebrow { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: var(--lime); margin-bottom: 20px; }
  .ad-login-h1 {
    font-family: 'Unbounded', sans-serif; font-size: clamp(40px,7vw,90px);
    font-weight: 900; letter-spacing: -4px; line-height: 0.9; text-transform: uppercase;
    color: var(--paper); margin-bottom: 40px;
  }
  .ad-outline { -webkit-text-stroke: 1.5px var(--paper); color: transparent; }
  .ad-accent { color: var(--lime); }
  .ad-login-meta { display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.06); }
  .ad-meta-row {
    display: flex; justify-content: space-between; padding: 12px 14px;
    background: rgba(13,13,15,0.7); font-size: 9px; letter-spacing: 3px;
    text-transform: uppercase; transition: background 0.25s;
  }
  .ad-meta-row:hover { background: rgba(200,255,0,0.08); }
  .ad-meta-k { color: rgba(242,239,232,0.3); }
  .ad-meta-v { font-weight: 700; color: var(--paper); transition: color 0.25s; }
  .ad-meta-row:hover .ad-meta-v { color: var(--lime); }

  .ad-login-div { background: rgba(242,239,232,0.1); }

  .ad-login-right {
    padding: 56px 52px; display: flex; flex-direction: column;
    justify-content: center; gap: 16px;
  }
  .ad-login-icon-wrap {
    width: 48px; height: 48px; background: var(--red);
    display: flex; align-items: center; justify-content: center;
    color: #fff; margin-bottom: 8px;
  }
  .ad-login-title {
    font-family: 'Unbounded', sans-serif; font-size: clamp(24px,4vw,40px);
    font-weight: 900; letter-spacing: -2px; text-transform: uppercase;
    color: var(--ink); line-height: 1;
  }
  .ad-login-sub { font-size: 11px; line-height: 1.7; color: var(--muted); margin-bottom: 8px; }
  .ad-login-form { display: flex; flex-direction: column; gap: 20px; }

  /* SHARED */
  .ad-field { display: flex; flex-direction: column; gap: 8px; }
  .ad-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ad-label { font-size: 8px; letter-spacing: 4px; text-transform: uppercase; color: var(--red); }
  .ad-input {
    width: 100%; background: var(--paper); border: 1px solid var(--border);
    padding: 12px 14px; font-family: 'Fragment Mono', monospace; font-size: 12px;
    color: var(--ink); outline: none; transition: border-color 0.2s;
    -webkit-appearance: none; appearance: none; border-radius: 0;
  }
  .ad-input:focus { border-color: var(--ink); }
  .ad-textarea {
    width: 100%; background: var(--paper); border: 1px solid var(--border);
    padding: 12px 14px; font-family: 'Fragment Mono', monospace; font-size: 12px;
    color: var(--ink); outline: none; resize: vertical; min-height: 90px;
    transition: border-color 0.2s; border-radius: 0;
  }
  .ad-textarea:focus { border-color: var(--ink); }
  .ad-btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 14px 24px; background: var(--ink); color: var(--paper);
    font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; border: none; cursor: pointer;
    transition: background 0.2s; width: 100%;
  }
  .ad-btn-primary:hover { background: var(--red); }
  .ad-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  /* SIDEBAR */
  .ad-sidebar {
    width: 256px; background: var(--ink); border-right: 3px solid var(--ink);
    display: flex; flex-direction: column; padding: 32px 0;
    position: sticky; top: 0; height: 100vh; overflow-y: auto;
    flex-shrink: 0;
  }
  .ad-sidebar-brand {
    display: flex; align-items: center; gap: 12px;
    padding: 0 24px 24px; border-bottom: 1px solid rgba(255,255,255,0.06);
    font-family: 'Unbounded', sans-serif; font-size: 13px; font-weight: 900;
    letter-spacing: -0.5px; text-transform: uppercase; color: var(--paper);
    margin-bottom: 24px;
  }
  .ad-sidebar-logo {
    width: 34px; height: 34px; background: var(--red);
    display: flex; align-items: center; justify-content: center;
    color: #fff; flex-shrink: 0;
  }
  .ad-sidebar-eyebrow {
    font-size: 8px; letter-spacing: 4px; text-transform: uppercase;
    color: rgba(242,239,232,0.2); padding: 0 24px; margin-bottom: 8px;
  }
  .ad-sidebar-nav { display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.04); margin-bottom: 8px; }
  .ad-nav-btn {
    display: flex; align-items: center; gap: 12px; padding: 14px 24px;
    background: transparent; color: rgba(242,239,232,0.35); border: none;
    font-family: 'Fragment Mono', monospace; font-size: 10px; letter-spacing: 2px;
    text-transform: uppercase; cursor: pointer; transition: all 0.2s;
    text-align: left; width: 100%; position: relative;
  }
  .ad-nav-btn::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: var(--lime); transform: scaleY(0); transition: transform 0.25s;
  }
  .ad-nav-btn:hover { background: rgba(255,255,255,0.04); color: var(--paper); }
  .ad-nav-btn.active { background: rgba(200,255,0,0.06); color: var(--paper); }
  .ad-nav-btn.active::before { transform: scaleY(1); }
  .ad-nav-code {
    font-family: 'Unbounded', sans-serif; font-size: 9px; font-weight: 900;
    color: rgba(242,239,232,0.15); min-width: 20px;
  }
  .ad-nav-btn.active .ad-nav-code { color: var(--lime); }
  .ad-sidebar-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 12px 0; }
  .ad-sidebar-footer { margin-top: auto; padding: 20px 24px 0; border-top: 1px solid rgba(255,255,255,0.06); }
  .ad-sidebar-user { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .ad-user-avatar { width: 34px; height: 34px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); flex-shrink: 0; }
  .ad-user-name { font-size: 11px; font-weight: 700; color: var(--paper); }
  .ad-user-tag { font-size: 8px; letter-spacing: 2px; color: rgba(242,239,232,0.3); text-transform: uppercase; margin-top: 2px; }
  .ad-logout-btn {
    display: flex; align-items: center; gap: 8px; width: 100%;
    padding: 11px 14px; background: transparent; color: rgba(232,25,44,0.5);
    font-family: 'Fragment Mono', monospace; font-size: 9px; letter-spacing: 3px;
    text-transform: uppercase; border: 1px solid rgba(232,25,44,0.15); cursor: pointer;
    transition: all 0.2s;
  }
  .ad-logout-btn:hover { background: rgba(232,25,44,0.08); color: var(--red); border-color: var(--red); }

  /* MAIN */
  .ad-main { flex: 1; display: flex; flex-direction: column; min-height: 100vh; overflow-y: auto; }
  .ad-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 24px 44px; border-bottom: 3px solid var(--ink);
    background: var(--paper); position: sticky; top: 0; z-index: 30;
  }
  .ad-header-eyebrow { font-size: 8px; letter-spacing: 5px; text-transform: uppercase; color: var(--red); margin-bottom: 5px; }
  .ad-header-title {
    font-family: 'Unbounded', sans-serif; font-size: clamp(16px,2vw,24px);
    font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: var(--ink);
  }
  .ad-header-right { display: flex; align-items: center; gap: 14px; }
  .ad-sync-badge {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 14px; border: 1px solid var(--border);
    font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
  }
  .ad-sync-dot { width: 6px; height: 6px; background: var(--lime); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .ad-spinner { animation: spin 1s linear infinite; }
  @keyframes spin { to{ transform: rotate(360deg); } }

  /* CONTENT */
  .ad-content { padding: 36px 44px; flex: 1; display: flex; flex-direction: column; gap: 28px; }

  /* STATS */
  .ad-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .ad-stat-cell { background: var(--paper); padding: 22px 18px; cursor: default; transition: background 0.3s; }
  .ad-stat-cell:hover { background: var(--ink); }
  .ad-stat-icon { color: var(--muted); margin-bottom: 10px; transition: color 0.3s; }
  .ad-stat-cell:hover .ad-stat-icon { color: var(--lime); }
  .ad-stat-n { font-family: 'Unbounded', sans-serif; font-size: 26px; font-weight: 900; letter-spacing: -1px; color: var(--ink); line-height: 1; margin-bottom: 4px; transition: color 0.3s; }
  .ad-stat-cell:hover .ad-stat-n { color: var(--paper); }
  .ad-stat-l { font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); transition: color 0.3s; }
  .ad-stat-cell:hover .ad-stat-l { color: rgba(242,239,232,0.3); }

  /* TAB GRID */
  .ad-tab-grid {
    display: grid; grid-template-columns: 1fr 1px 1.4fr;
    background: var(--border); border: 1px solid var(--border);
    min-height: 580px;
  }

  /* FORM PANEL */
  .ad-form-panel { background: var(--paper); padding: 32px 28px; }
  .ad-panel-hdr { margin-bottom: 24px; }
  .ad-panel-eyebrow { font-size: 8px; letter-spacing: 5px; text-transform: uppercase; color: var(--red); margin-bottom: 5px; }
  .ad-panel-title { font-family: 'Unbounded', sans-serif; font-size: 18px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; color: var(--ink); }
  .ad-form { display: flex; flex-direction: column; gap: 16px; }

  /* LIST PANEL */
  .ad-list-panel { background: var(--ink); display: flex; flex-direction: column; }
  .ad-list-hdr {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 22px 24px; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .ad-list-title { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: rgba(242,239,232,0.3); }
  .ad-list-count { font-family: 'Unbounded', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: -2px; color: rgba(255,255,255,0.05); }
  .ad-list { flex: 1; overflow-y: auto; max-height: 520px; display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.04); }

  /* EVENT ITEM */
  .ad-event-item {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 16px 22px; background: rgba(13,13,15,0.6);
    transition: background 0.2s;
  }
  .ad-event-item:hover { background: rgba(200,255,0,0.04); }
  .ad-event-img { width: 60px; height: 60px; flex-shrink: 0; overflow: hidden; background: rgba(255,255,255,0.05); }
  .ad-event-img img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(0.6); transition: filter 0.3s; }
  .ad-event-item:hover .ad-event-img img { filter: saturate(1); }
  .ad-event-info { flex: 1; min-width: 0; }
  .ad-event-title { font-size: 11px; font-weight: 700; color: var(--paper); margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ad-event-meta { display: flex; align-items: center; gap: 10px; font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: rgba(242,239,232,0.3); margin-bottom: 5px; }
  .ad-event-desc { font-size: 9px; line-height: 1.6; color: rgba(242,239,232,0.2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ad-tag { display: inline-block; background: var(--lime); color: var(--ink); font-size: 7px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; padding: 3px 7px; }
  .ad-delete-btn {
    flex-shrink: 0; width: 28px; height: 28px; background: transparent;
    border: 1px solid rgba(232,25,44,0.15); color: rgba(232,25,44,0.3);
    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
  }
  .ad-delete-btn:hover { background: var(--red); border-color: var(--red); color: #fff; }

  /* BULLETIN ITEM */
  .ad-bulletin-item {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 22px; background: rgba(13,13,15,0.6); transition: background 0.2s;
  }
  .ad-bulletin-item:hover { background: rgba(200,255,0,0.04); }
  .ad-bulletin-icon { width: 40px; height: 40px; flex-shrink: 0; background: rgba(200,255,0,0.08); color: var(--lime); display: flex; align-items: center; justify-content: center; }
  .ad-bulletin-info { flex: 1; min-width: 0; }
  .ad-bulletin-id { font-size: 8px; letter-spacing: 2px; color: rgba(242,239,232,0.2); text-transform: uppercase; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* GALLERY GRID */
  .ad-gallery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(255,255,255,0.04); overflow-y: auto; max-height: 520px; align-content: start; }
  .ad-gallery-card { background: rgba(13,13,15,0.7); }
  .ad-gallery-img { position: relative; aspect-ratio: 1; overflow: hidden; background: rgba(255,255,255,0.04); }
  .ad-gallery-img img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(0.6); transition: filter 0.3s; }
  .ad-gallery-card:hover .ad-gallery-img img { filter: saturate(1); }
  .ad-gallery-delete {
    position: absolute; top: 8px; right: 8px; width: 26px; height: 26px;
    background: rgba(13,13,15,0.8); border: none; color: rgba(242,239,232,0.5);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: all 0.2s;
  }
  .ad-gallery-card:hover .ad-gallery-delete { opacity: 1; }
  .ad-gallery-delete:hover { background: var(--red); color: #fff; }
  .ad-gallery-info { padding: 10px 12px; display: flex; flex-direction: column; gap: 5px; }
  .ad-gallery-title { font-size: 10px; font-weight: 700; color: var(--paper); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* EMPTY */
  .ad-empty { padding: 56px 28px; text-align: center; background: rgba(13,13,15,0.4); flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .ad-empty-text { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: rgba(242,239,232,0.15); margin-top: 10px; }

  /* FOOTER */
  .ad-footer { padding: 18px 44px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: var(--paper); }
  .ad-footer-brand { font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 900; letter-spacing: -0.5px; color: rgba(13,13,15,0.18); text-transform: uppercase; }
  .ad-footer-note { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); opacity: 0.5; }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .ad-sidebar { display: none; }
    .ad-content { padding: 24px; }
    .ad-header { padding: 18px 24px; }
    .ad-stats-row { grid-template-columns: repeat(2, 1fr); }
    .ad-tab-grid { grid-template-columns: 1fr; }
    .ad-login-root { grid-template-columns: 1fr; }
    .ad-login-left { min-height: 280px; }
    .ad-login-div { display: none; }
    .ad-login-right { padding: 40px 28px; }
    .ad-footer { padding: 14px 24px; flex-direction: column; gap: 6px; }
  }
  @media (max-width: 600px) {
    .ad-gallery-grid { grid-template-columns: 1fr; }
    .ad-field-row { grid-template-columns: 1fr; }
  }
`;

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('events');
    const [isLoading, setIsLoading] = useState(false);

    const [eventForm, setEventForm] = useState<Partial<AdminEvent>>({ title: '', date: '', time: '', location: '', platform: 'In-person', image: '', description: '' });
    const [bulletinForm, setBulletinForm] = useState<Partial<AdminBulletin>>({ title: '', date: '', content: '', fileId: '' });
    const [galleryForm, setGalleryForm] = useState<Partial<AdminGalleryItem>>({ title: '', description: '', category: 'club service', src: '' });

    const [customEvents, setCustomEvents] = useState<AdminEvent[]>([]);
    const [customBulletins, setCustomBulletins] = useState<AdminBulletin[]>([]);
    const [customGallery, setCustomGallery] = useState<AdminGalleryItem[]>([]);


    useEffect(() => {
        if (!isAuthenticated) return;
        const load = async () => {
            setIsLoading(true);
            const [e, b, g] = await Promise.all([getCustomEvents(), getCustomBulletins(), getCustomGalleryItems()]);
            setCustomEvents(e); setCustomBulletins(b); setCustomGallery(g);
            setIsLoading(false);
        };
        load();
    }, [isAuthenticated]);

    if (!db) {
        return (
            <>
                <style>{adminStyles}</style>
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: 'var(--paper)', fontFamily: 'Fragment Mono, monospace' }}>
                    <div className="ad-error-card">
                        <div className="ad-error-icon"><AlertCircle size={28} /></div>
                        <div className="ad-error-title">Config Required</div>
                        <p className="ad-error-body">Firebase env variables missing. Add <code>VITE_FIREBASE_API_KEY</code> to your deployment settings.</p>
                        <button className="ad-btn-primary" onClick={() => window.location.reload()}>Retry Connection</button>
                    </div>
                </div>
            </>
        );
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) { setIsAuthenticated(true); toast.success('Access granted.'); }
        else toast.error('Invalid credentials.');
    };

    const withLoad = async (fn: () => Promise<void>) => { setIsLoading(true); try { await fn(); } catch { toast.error('Operation failed.'); } finally { setIsLoading(false); } };

    const handleAddEvent = (e: React.FormEvent) => { e.preventDefault(); if (!eventForm.title || !eventForm.image) { toast.error('Fill required fields'); return; } withLoad(async () => { await saveCustomEvent(eventForm as AdminEvent); setCustomEvents(await getCustomEvents()); setEventForm({ title: '', date: '', time: '', location: '', platform: 'In-person', image: '', description: '' }); toast.success('Event published!'); }); };
    const handleAddBulletin = (e: React.FormEvent) => { e.preventDefault(); if (!bulletinForm.title || !bulletinForm.fileId) { toast.error('Fill required fields'); return; } withLoad(async () => { await saveCustomBulletin(bulletinForm as AdminBulletin); setCustomBulletins(await getCustomBulletins()); setBulletinForm({ title: '', date: '', content: '', fileId: '' }); toast.success('Bulletin archived!'); }); };
    const handleAddGallery = (e: React.FormEvent) => { e.preventDefault(); if (!galleryForm.title || !galleryForm.src) { toast.error('Fill required fields'); return; } withLoad(async () => { await saveCustomGalleryItem(galleryForm as AdminGalleryItem); setCustomGallery(await getCustomGalleryItems()); setGalleryForm({ title: '', description: '', category: 'club service', src: '' }); toast.success('Moment archived!'); }); };
    const handleDeleteEvent = (id: string) => withLoad(async () => { await deleteCustomEvent(id); setCustomEvents(await getCustomEvents()); toast.info('Event removed.'); });
    const handleDeleteBulletin = (id: string) => withLoad(async () => { await deleteCustomBulletin(id); setCustomBulletins(await getCustomBulletins()); toast.info('Bulletin removed.'); });
    const handleDeleteGallery = (id: string) => withLoad(async () => { await deleteCustomGalleryItem(id); setCustomGallery(await getCustomGalleryItems()); toast.info('Item removed.'); });

    /* ── LOGIN PAGE ── */
    if (!isAuthenticated) return (
        <>
            <style>{adminStyles}</style>
            <div className="ad-login-root">
                <div className="ad-login-left">
                    <div className="ad-login-bg-word">ADMIN</div>
                    <div className="ad-login-left-content">
                        <div className="ad-login-eyebrow">// Secure Access</div>
                        <h1 className="ad-login-h1">
                            <span className="ad-outline">Admin</span><br />
                            <span className="ad-accent">Gate</span>
                        </h1>
                        <div className="ad-login-meta">
                            {[{ k: 'Access Level', v: 'Club Admin' }, { k: 'Season', v: '2025–26' }, { k: 'Auth', v: 'Token Gate' }].map(r => (
                                <div key={r.k} className="ad-meta-row">
                                    <span className="ad-meta-k">{r.k}</span>
                                    <span className="ad-meta-v">{r.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="ad-login-div" />
                <div className="ad-login-right">
                    <div className="ad-login-icon-wrap"><Lock size={20} /></div>
                    <div className="ad-login-title">Authenticate</div>
                    <p className="ad-login-sub">Authorized personnel only. Enter your access token to proceed.</p>
                    <form onSubmit={handleLogin} className="ad-login-form">
                        <div className="ad-field">
                            <label className="ad-label">// Encrypted Token</label>
                            <input type="password" className="ad-input" placeholder="••••••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="ad-btn-primary">Initiate Session</button>
                    </form>
                </div>
            </div>
        </>
    );

    /* ── DASHBOARD ── */
    const tabs = [
        { id: 'events', label: 'Events', icon: Calendar, code: '01' },
        { id: 'bulletins', label: 'Bulletins', icon: FileText, code: '02' },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon, code: '03' },
    ];
    const currentTab = tabs.find(t => t.id === activeTab);

    return (
        <>
            <style>{adminStyles}</style>
            <div className="ad-root">

                {/* SIDEBAR */}
                <aside className="ad-sidebar">
                    <div className="ad-sidebar-brand">
                        <div className="ad-sidebar-logo"><LayoutDashboard size={16} /></div>
                        <span>RAC Dash</span>
                    </div>
                    <div className="ad-sidebar-eyebrow">// Navigation</div>
                    <nav className="ad-sidebar-nav">
                        {tabs.map(t => (
                            <button key={t.id} className={`ad-nav-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                                <span className="ad-nav-code">{t.code}</span>
                                <t.icon size={13} />
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </nav>
                    <div className="ad-sidebar-divider" />
                    <button className="ad-nav-btn" style={{ opacity: 0.4, cursor: 'default' }}>
                        <span className="ad-nav-code">04</span>
                        <Settings size={13} />
                        <span>Settings</span>
                    </button>
                    <div className="ad-sidebar-footer">
                        <div className="ad-sidebar-user">
                            <div className="ad-user-avatar" />
                            <div>
                                <div className="ad-user-name">Club Admin</div>
                                <div className="ad-user-tag">Vision 25–26</div>
                            </div>
                        </div>
                        <button className="ad-logout-btn" onClick={() => setIsAuthenticated(false)}>
                            <LogOut size={12} /> Terminate Session
                        </button>
                    </div>
                </aside>

                {/* MAIN */}
                <div className="ad-main">
                    <header className="ad-header">
                        <div className="ad-header-left">
                            <div className="ad-header-eyebrow">// Control Panel</div>
                            <h2 className="ad-header-title">{currentTab?.label} Manager</h2>
                        </div>
                        <div className="ad-header-right">
                            {isLoading && <Loader2 size={15} className="ad-spinner" />}
                            <div className="ad-sync-badge">
                                <span className="ad-sync-dot" /> Cloud Sync Active
                            </div>
                        </div>
                    </header>

                    <div className="ad-content">

                        {/* STATS */}
                        <div className="ad-stats-row">
                            {[
                                { label: 'Events', val: customEvents.length, icon: Calendar },
                                { label: 'Bulletins', val: customBulletins.length, icon: FileText },
                                { label: 'Gallery', val: customGallery.length, icon: ImageIcon },
                                { label: 'Status', val: 'Online', icon: CheckCircle2 },
                            ].map((s, i) => (
                                <div key={i} className="ad-stat-cell">
                                    <div className="ad-stat-icon"><s.icon size={14} /></div>
                                    <div className="ad-stat-n">{s.val}</div>
                                    <div className="ad-stat-l">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* EVENTS */}
                        {activeTab === 'events' && (
                            <div className="ad-tab-grid">
                                <div className="ad-form-panel">
                                    <div className="ad-panel-hdr">
                                        <div className="ad-panel-eyebrow">// New Entry</div>
                                        <div className="ad-panel-title">Register Event</div>
                                    </div>
                                    <form onSubmit={handleAddEvent} className="ad-form">
                                        <div className="ad-field"><label className="ad-label">Event Title *</label><input className="ad-input" placeholder="e.g. Mattaipandhu 3.0" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} /></div>
                                        <div className="ad-field-row">
                                            <div className="ad-field"><label className="ad-label">Date</label><input className="ad-input" placeholder="2025-10-31" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} /></div>
                                            <div className="ad-field"><label className="ad-label">Venue</label><input className="ad-input" placeholder="KPRCAS Campus" value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} /></div>
                                        </div>
                                        <div className="ad-field"><label className="ad-label">Image URL *</label><input className="ad-input" placeholder="https://res.cloudinary.com/..." value={eventForm.image} onChange={e => setEventForm({ ...eventForm, image: e.target.value })} /></div>
                                        <div className="ad-field"><label className="ad-label">Description</label><textarea className="ad-textarea" placeholder="Describe the event..." value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} /></div>
                                        <button type="submit" className="ad-btn-primary" disabled={isLoading}>
                                            {isLoading ? <Loader2 size={13} className="ad-spinner" /> : <Plus size={13} />} Publish Event
                                        </button>
                                    </form>
                                </div>
                                <div style={{ background: 'var(--border)' }} />
                                <div className="ad-list-panel">
                                    <div className="ad-list-hdr">
                                        <div className="ad-list-title">Active Events</div>
                                        <div className="ad-list-count">{String(customEvents.length).padStart(2, '0')}</div>
                                    </div>
                                    <div className="ad-list">
                                        {customEvents.length === 0 && !isLoading && <div className="ad-empty"><AlertCircle size={28} style={{ color: 'rgba(242,239,232,0.1)' }} /><div className="ad-empty-text">No events registered</div></div>}
                                        {customEvents.map(ev => (
                                            <div key={ev.id} className="ad-event-item">
                                                <div className="ad-event-img"><img src={ev.image} alt={ev.title} /></div>
                                                <div className="ad-event-info">
                                                    <div className="ad-event-title">{ev.title}</div>
                                                    <div className="ad-event-meta"><span className="ad-tag">{ev.date}</span><span>{ev.location || 'TBD'}</span></div>
                                                    <div className="ad-event-desc">{ev.description}</div>
                                                </div>
                                                <button className="ad-delete-btn" onClick={() => handleDeleteEvent(ev.id)} disabled={isLoading}><Trash2 size={12} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BULLETINS */}
                        {activeTab === 'bulletins' && (
                            <div className="ad-tab-grid">
                                <div className="ad-form-panel">
                                    <div className="ad-panel-hdr">
                                        <div className="ad-panel-eyebrow">// New Entry</div>
                                        <div className="ad-panel-title">Archive Bulletin</div>
                                    </div>
                                    <form onSubmit={handleAddBulletin} className="ad-form">
                                        <div className="ad-field"><label className="ad-label">Edition Title *</label><input className="ad-input" placeholder="e.g. November 2025" value={bulletinForm.title} onChange={e => setBulletinForm({ ...bulletinForm, title: e.target.value })} /></div>
                                        <div className="ad-field"><label className="ad-label">Reference Period</label><input className="ad-input" placeholder="November-2025" value={bulletinForm.date} onChange={e => setBulletinForm({ ...bulletinForm, date: e.target.value })} /></div>
                                        <div className="ad-field"><label className="ad-label">G-Drive File ID *</label><input className="ad-input" placeholder="1HRRqhiuJIrOzChxt..." value={bulletinForm.fileId} onChange={e => setBulletinForm({ ...bulletinForm, fileId: e.target.value })} /></div>
                                        <div className="ad-field"><label className="ad-label">Editorial Summary</label><textarea className="ad-textarea" placeholder="Brief notes about this edition..." value={bulletinForm.content} onChange={e => setBulletinForm({ ...bulletinForm, content: e.target.value })} /></div>
                                        <button type="submit" className="ad-btn-primary" disabled={isLoading}>
                                            {isLoading ? <Loader2 size={13} className="ad-spinner" /> : <Plus size={13} />} Commit to Archive
                                        </button>
                                    </form>
                                </div>
                                <div style={{ background: 'var(--border)' }} />
                                <div className="ad-list-panel">
                                    <div className="ad-list-hdr">
                                        <div className="ad-list-title">Digital Archives</div>
                                        <div className="ad-list-count">{String(customBulletins.length).padStart(2, '0')}</div>
                                    </div>
                                    <div className="ad-list">
                                        {customBulletins.length === 0 && !isLoading && <div className="ad-empty"><FileText size={28} style={{ color: 'rgba(242,239,232,0.1)' }} /><div className="ad-empty-text">No bulletins archived</div></div>}
                                        {customBulletins.map(b => (
                                            <div key={b.id} className="ad-bulletin-item">
                                                <div className="ad-bulletin-icon"><FileText size={16} /></div>
                                                <div className="ad-bulletin-info">
                                                    <div className="ad-event-title">{b.title}</div>
                                                    <div className="ad-bulletin-id">{b.fileId}</div>
                                                </div>
                                                <button className="ad-delete-btn" onClick={() => handleDeleteBulletin(b.id)} disabled={isLoading}><Trash2 size={12} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* GALLERY */}
                        {activeTab === 'gallery' && (
                            <div className="ad-tab-grid">
                                <div className="ad-form-panel">
                                    <div className="ad-panel-hdr">
                                        <div className="ad-panel-eyebrow">// New Entry</div>
                                        <div className="ad-panel-title">Add Moment</div>
                                    </div>
                                    <form onSubmit={handleAddGallery} className="ad-form">
                                        <div className="ad-field"><label className="ad-label">Moment Title *</label><input className="ad-input" placeholder="e.g. Charter Day" value={galleryForm.title} onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })} /></div>
                                        <div className="ad-field"><label className="ad-label">Image URL *</label><input className="ad-input" placeholder="https://res.cloudinary.com/..." value={galleryForm.src} onChange={e => setGalleryForm({ ...galleryForm, src: e.target.value })} /></div>
                                        <div className="ad-field">
                                            <label className="ad-label">Service Avenue</label>
                                            <select className="ad-input" style={{ cursor: 'pointer' }} value={galleryForm.category} onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}>
                                                <option value="club service">Club Service</option>
                                                <option value="community">Community Service</option>
                                                <option value="professional service">Professional Service</option>
                                                <option value="international service">International Service</option>
                                                <option value="district priority projects">DPP</option>
                                            </select>
                                        </div>
                                        <div className="ad-field"><label className="ad-label">Description</label><textarea className="ad-textarea" placeholder="What happened in this moment?" value={galleryForm.description} onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value })} /></div>
                                        <button type="submit" className="ad-btn-primary" disabled={isLoading}>
                                            {isLoading ? <Loader2 size={13} className="ad-spinner" /> : <Plus size={13} />} Archive Moment
                                        </button>
                                    </form>
                                </div>
                                <div style={{ background: 'var(--border)' }} />
                                <div className="ad-list-panel">
                                    <div className="ad-list-hdr">
                                        <div className="ad-list-title">Gallery Feed</div>
                                        <div className="ad-list-count">{String(customGallery.length).padStart(2, '0')}</div>
                                    </div>
                                    <div className="ad-gallery-grid">
                                        {customGallery.length === 0 && !isLoading && <div className="ad-empty" style={{ gridColumn: 'span 2' }}><ImageIcon size={28} style={{ color: 'rgba(242,239,232,0.1)' }} /><div className="ad-empty-text">No gallery items added</div></div>}
                                        {customGallery.map(item => (
                                            <div key={item.id} className="ad-gallery-card">
                                                <div className="ad-gallery-img">
                                                    <img src={item.src} alt={item.title} />
                                                    <button className="ad-gallery-delete" onClick={() => handleDeleteGallery(item.id)} disabled={isLoading}><Trash2 size={11} /></button>
                                                </div>
                                                <div className="ad-gallery-info">
                                                    <div className="ad-gallery-title">{item.title}</div>
                                                    <div className="ad-tag">{item.category}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    <footer className="ad-footer">
                        <div className="ad-footer-brand">Rotaract KPRCAS</div>
                        <div className="ad-footer-note">© 2025 · Admin Dashboard</div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Admin;