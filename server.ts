import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
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
dotenv.config();

// We import the db from our existing firebase config
import { db } from "./src/lib/firebase";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes

// Events
app.get('/api/events', async (req: Request, res: Response) => {
    try {
        if (!db) return res.json([]);
        const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const events = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/events', async (req: Request, res: Response) => {
    try {
        const event = req.body;
        const docRef = await addDoc(collection(db, "events"), {
            ...event,
            isCustom: true,
            createdAt: Timestamp.now()
        });
        res.json({ id: docRef.id });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/events/:id', async (req: Request, res: Response) => {
    try {
        await deleteDoc(doc(db, "events", req.params.id as string));
        res.json({ success: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Bulletins
app.get('/api/bulletins', async (req: Request, res: Response) => {
    try {
        if (!db) return res.json([]);
        const q = query(collection(db, "bulletins"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const bulletins = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        res.json(bulletins);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/bulletins', async (req: Request, res: Response) => {
    try {
        const bulletin = req.body;
        const docRef = await addDoc(collection(db, "bulletins"), {
            ...bulletin,
            isCustom: true,
            createdAt: Timestamp.now()
        });
        res.json({ id: docRef.id });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/bulletins/:id', async (req: Request, res: Response) => {
    try {
        await deleteDoc(doc(db, "bulletins", req.params.id));
        res.json({ success: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Gallery
app.get('/api/gallery', async (req: Request, res: Response) => {
    try {
        if (!db) return res.json([]);
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/gallery', async (req: Request, res: Response) => {
    try {
        const item = req.body;
        const docRef = await addDoc(collection(db, "gallery"), {
            ...item,
            isCustom: true,
            createdAt: Timestamp.now()
        });
        res.json({ id: docRef.id });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/gallery/:id', async (req: Request, res: Response) => {
    try {
        await deleteDoc(doc(db, "gallery", req.params.id));
        res.json({ success: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

// SPA support: catch-all
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
