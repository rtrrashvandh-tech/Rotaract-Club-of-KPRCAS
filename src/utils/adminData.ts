import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy,
    Timestamp
} from "firebase/firestore";

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
    createdAt?: any;
}

export interface AdminBulletin {
    id: string;
    title: string;
    date: string;
    content: string;
    fileId: string;
    isCustom?: boolean;
    createdAt?: any;
}

export interface AdminGalleryItem {
    id: string;
    title: string;
    description: string;
    category: string;
    src: string;
    isCustom?: boolean;
    createdAt?: any;
}

export const getCustomEvents = async (): Promise<AdminEvent[]> => {
    if (!db) return [];
    try {
        const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as AdminEvent[];
    } catch (e) {
        console.error("Error fetching events: ", e);
        return [];
    }
};

export const saveCustomEvent = async (event: AdminEvent) => {
    if (!db) return;
    try {
        await addDoc(collection(db, "events"), {
            ...event,
            isCustom: true,
            createdAt: Timestamp.now()
        });
    } catch (e) {
        console.error("Error adding event: ", e);
        throw e;
    }
};

export const deleteCustomEvent = async (id: string) => {
    try {
        await deleteDoc(doc(db, "events", id));
    } catch (e) {
        console.error("Error deleting event: ", e);
        throw e;
    }
};

export const getCustomBulletins = async (): Promise<AdminBulletin[]> => {
    if (!db) return [];
    try {
        const q = query(collection(db, "bulletins"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as AdminBulletin[];
    } catch (e) {
        console.error("Error fetching bulletins: ", e);
        return [];
    }
};

export const saveCustomBulletin = async (bulletin: AdminBulletin) => {
    if (!db) return;
    try {
        await addDoc(collection(db, "bulletins"), {
            ...bulletin,
            isCustom: true,
            createdAt: Timestamp.now()
        });
    } catch (e) {
        console.error("Error adding bulletin: ", e);
        throw e;
    }
};

export const deleteCustomBulletin = async (id: string) => {
    try {
        await deleteDoc(doc(db, "bulletins", id.toString()));
    } catch (e) {
        console.error("Error deleting bulletin: ", e);
        throw e;
    }
};

export const getCustomGalleryItems = async (): Promise<AdminGalleryItem[]> => {
    if (!db) return [];
    try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as AdminGalleryItem[];
    } catch (e) {
        console.error("Error fetching gallery: ", e);
        return [];
    }
};

export const saveCustomGalleryItem = async (item: AdminGalleryItem) => {
    if (!db) return;
    try {
        await addDoc(collection(db, "gallery"), {
            ...item,
            isCustom: true,
            createdAt: Timestamp.now()
        });
    } catch (e) {
        console.error("Error adding gallery item: ", e);
        throw e;
    }
};

export const deleteCustomGalleryItem = async (id: string) => {
    try {
        await deleteDoc(doc(db, "gallery", id));
    } catch (e) {
        console.error("Error deleting gallery item: ", e);
        throw e;
    }
};
