
export const ADMIN_PASSWORD = "rotaractkprcas";

export interface AdminEvent {
    id: string;
    title: string;
    date: string;
    time?: string;
    location?: string;
    platform?: string;
    image: string;
    description: string;
    isCustom?: boolean;
}

export interface AdminBulletin {
    id: string | number;
    title: string;
    date: string;
    content: string;
    fileId: string;
    isCustom?: boolean;
}

const STORAGE_KEYS = {
    EVENTS: 'rac_kprcas_custom_events',
    BULLETINS: 'rac_kprcas_custom_bulletins',
};

export const getCustomEvents = (): AdminEvent[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
};

export const saveCustomEvent = (event: AdminEvent) => {
    const events = getCustomEvents();
    events.push({ ...event, id: Date.now().toString(), isCustom: true });
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
};

export const deleteCustomEvent = (id: string) => {
    const events = getCustomEvents();
    const filtered = events.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(filtered));
};

export const getCustomBulletins = (): AdminBulletin[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BULLETINS);
    return data ? JSON.parse(data) : [];
};

export const saveCustomBulletin = (bulletin: AdminBulletin) => {
    const bulletins = getCustomBulletins();
    bulletins.push({ ...bulletin, id: Date.now().toString(), isCustom: true });
    localStorage.setItem(STORAGE_KEYS.BULLETINS, JSON.stringify(bulletins));
};

export const deleteCustomBulletin = (id: string | number) => {
    const bulletins = getCustomBulletins();
    const filtered = bulletins.filter(b => b.id.toString() !== id.toString());
    localStorage.setItem(STORAGE_KEYS.BULLETINS, JSON.stringify(filtered));
};
