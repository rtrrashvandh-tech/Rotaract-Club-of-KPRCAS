export const ADMIN_PASSWORD = "rotaractkprcas";

export interface AdminEvent {
    id?: string;
    title: string;
    date: string;
    time?: string;
    location?: string;
    platform?: string;
    image: string;
    description: string;
    isCustom?: boolean;
    createdAt?: any;
}

export interface AdminBulletin {
    id?: string;
    title: string;
    date: string;
    content: string;
    fileId: string;
    isCustom?: boolean;
    createdAt?: any;
}

export interface AdminGalleryItem {
    id?: string;
    title: string;
    description: string;
    category: string;
    src: string;
    isCustom?: boolean;
    createdAt?: any;
}

const API_URL = ''; // Use empty string for relative paths in production

export const getCustomEvents = async (): Promise<AdminEvent[]> => {
    try {
        const response = await fetch(`${API_URL}/api/events`);
        return await response.json();
    } catch (e) {
        console.error("Error fetching events: ", e);
        return [];
    }
};

export const saveCustomEvent = async (event: AdminEvent) => {
    try {
        await fetch(`${API_URL}/api/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        });
    } catch (e) {
        console.error("Error adding event: ", e);
        throw e;
    }
};

export const deleteCustomEvent = async (id: string) => {
    try {
        await fetch(`${API_URL}/api/events/${id}`, { method: 'DELETE' });
    } catch (e) {
        console.error("Error deleting event: ", e);
        throw e;
    }
};

export const getCustomBulletins = async (): Promise<AdminBulletin[]> => {
    try {
        const response = await fetch(`${API_URL}/api/bulletins`);
        return await response.json();
    } catch (e) {
        console.error("Error fetching bulletins: ", e);
        return [];
    }
};

export const saveCustomBulletin = async (bulletin: AdminBulletin) => {
    try {
        await fetch(`${API_URL}/api/bulletins`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bulletin)
        });
    } catch (e) {
        console.error("Error adding bulletin: ", e);
        throw e;
    }
};

export const deleteCustomBulletin = async (id: string) => {
    try {
        await fetch(`${API_URL}/api/bulletins/${id}`, { method: 'DELETE' });
    } catch (e) {
        console.error("Error deleting bulletin: ", e);
        throw e;
    }
};

export const getCustomGalleryItems = async (): Promise<AdminGalleryItem[]> => {
    try {
        const response = await fetch(`${API_URL}/api/gallery`);
        return await response.json();
    } catch (e) {
        console.error("Error fetching gallery: ", e);
        return [];
    }
};

export const saveCustomGalleryItem = async (item: AdminGalleryItem) => {
    try {
        await fetch(`${API_URL}/api/gallery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
    } catch (e) {
        console.error("Error adding gallery item: ", e);
        throw e;
    }
};

export const deleteCustomGalleryItem = async (id: string) => {
    try {
        await fetch(`${API_URL}/api/gallery/${id}`, { method: 'DELETE' });
    } catch (e) {
        console.error("Error deleting gallery item: ", e);
        throw e;
    }
};
