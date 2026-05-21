export type EventType = {
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

// --- Initial Data ---
const initialEvents: EventType[] = [
  {
    id: 'e1',
    title: 'Yours Lovingly',
    date: '2025-08-24',
    time: '10:00 AM – 1:00 PM',
    location: 'Uthavum Karangal, Avinashi',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.05_8f591faf_dlqyvp.jpg',
    description: 'A Dream Mental Support Initiative.'
  },
  {
    id: 'e2',
    title: 'Lingua Connection',
    date: '2025-08-25',
    time: '07:00 PM – 08:00 PM',
    location: '',
    platform: 'Gmeet',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.05_3b4f2292_yjzwwh.jpg',
    description: 'A platform for language exchange and cultural enrichment.'
  },
  {
    id: 'e3',
    title: 'அன்பின் மறு உருவம்',
    date: '2025-08-26',
    time: '10:00 AM - 1:00 PM',
    location: 'FAMILY FOR CHILDREN, VELLALOR,CBE.',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.04_a199c8ac_zeoxqn.jpg',
    description: 'அன்பின் மறு உருவம் is an initiative to help elderly people.'
  },
  {
    id: 'e4',
    title: 'Mattaipandhu 2.0',
    date: '2025-08-28',
    location: 'Karumathampatti',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053140/WhatsApp_Image_2025-08-24_at_21.45.07_224b18e3_fllgx6.jpg',
    description: 'Mattaipandhu 2.0 is an initiative to build a community.'
  },
  {
    id: 'e5',
    title: 'வெறும் பெண் இல்லை',
    date: '2025-08-28',
    location: 'Arasur Govt School',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.04_c5c998e3_o6x8vz.jpg',
    description: 'வெறும் பெண் இல்லை is a self-defence learning session for girls.'
  },
  {
    id: 'e6',
    title: 'Excelerate - Art of Speaking',
    date: '2025-08-29',
    time: '10:00 AM',
    location: 'Seminar Hall (KPRCAS)',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053002/WhatsApp_Image_2025-08-24_at_20.52.42_78b8ef19_arjsxf.jpg',
    description: 'Excelerate - Art of Speaking is an initiative to enhance communication skills.'
  },
  {
    id: 'e7',
    title: 'வளமான கல்விக்காக',
    date: '2025-08-30',
    time: '03:00 PM',
    location: 'Arasur Govt School',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053014/WhatsApp_Image_2025-08-24_at_21.45.07_f2b2c24d_ldwk5w.jpg',
    description: 'Books are bridges that connect dreams to reality — donate them.'
  },
  {
    id: 'e8',
    title: 'Tharagam - Onam Celebration',
    date: '2025-09-03',
    time: '10:00 AM - 1:00 PM',
    location: 'KPRCAS Campus',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760281232/PHOTO-2025-09-03-09-22-13_kow0x9.jpg',
    description: 'The Rotaract Club of KPRCAS proudly celebrated Onam under Tharangam 3.0.'
  },
  {
    id: 'e9',
    title: 'Words that Empower',
    date: '2025-09-08',
    time: '10:00 AM',
    location: 'Gmeet',
    platform: 'Online',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760285151/Screenshot_2025-10-01-12-32-50-85_99c04817c0de5652397fc8b56c3b3817_s6f6tr.jpg',
    description: 'Words that empower is an initiative to unlock the potential of effective communication and personal growth.'
  },
  {
    id: 'e10',
    title: 'RAC-a-THON',
    date: '2025-09-15',
    time: '9:00 AM',
    location: 'KPRCAS Campus',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287839/IMG-20251001-WA0068_pnyicy.jpg',
    description: 'RAC-a-THON is a 24-hour hackathon event.'
  },
  {
    id: 'e11',
    title: 'Veeram Pen Illai – Self-Defense Training',
    date: '2025-09-18',
    time: '10:00 AM',
    location: 'Vagarayampalayam Government School',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287144/IMG-20250917-WA0057_jzpqea.jpg',
    description: 'Join the Rotaract Club of KPRCAS for "Veeram Pen Illai", a self-defense training session aimed at empowering women and enhancing their confidence and safety skills.'
  },
  {
    id: 'e12',
    title: 'Touro quiz',
    date: '2025-09-27',
    time: '2:00 PM - 4:00 PM',
    location: 'Gmeet',
    platform: 'Online',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760284629/Screenshot_2025-10-01-12-36-16-82_99c04817c0de5652397fc8b56c3b3817_fordh1.jpg',
    description: 'Touro quiz is an event for quizzing and knowledge celebration.'
  },
  {
    id: 'e13',
    title: 'Charity Drive',
    date: '2025-09-27',
    time: '2:00 PM - 4:00 PM',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287422/IMG-20250929-WA0005_xuyg6l.jpg',
    description: 'Charity Drive is an event to raise funds for the needy.'
  },
  {
    id: 'e14',
    title: 'Navrang - Navratri Celebration',
    date: '2025-09-29',
    time: '2:00 PM - 4:00 PM',
    location: 'KPRCAS Campus',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760283820/PHOTO-2025-09-26-21-51-21_mniq4e.jpg',
    description: 'Navrang is an event celebrating Navratri with vibrant traditions.'
  },
  {
    id: 'e15',
    title: 'Innovision',
    date: '2025-09-29',
    time: '10:00 AM',
    location: 'Gmeet',
    platform: 'Online',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760285361/IMG-20250926-WA0064_knpsv9.jpg',
    description: 'Innovision is an initiative to unlock insights for SQL and enhance data understanding.'
  },
  {
    id: 'e16',
    title: 'Nalam oru Padhai',
    date: '2025-10-07',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467685/10_Oct_Nalam_Oru_Pathai_Club_jijdhv.jpg",
    location: "15-Vellampalyam Government School, Tiruppur",
    description: 'Health and wellness outreach to build a stronger, healthier community.'
  },
  {
    id: 'e17',
    title: 'Feed the Future',
    date: '2025-10-10',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/IMG-20251006-WA0012_tfllwk.jpg",
    location: "Family for Children, Vellalore, Coimbatore",
    description: 'Food distribution drive to support families in need.'
  },
  {
    id: 'e18',
    title: 'Anbin maru Uruvam',
    date: '2025-10-10',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765464462/IMG-20251126-WA0007_c88v2i.jpg',
    location: 'Family for Children, Vellalore, Coimbatore',
    description: 'A compassion-led visit to spread kindness and support.'
  },
  {
    id: 'e19',
    title: 'Nambikkai Siragugal',
    date: '2025-10-13',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Event+Poster',
    description: 'Inspiration session to empower students with hope and confidence.'
  },
  {
    id: 'e20',
    title: 'Paasathin Pakkangal',
    date: '2025-10-13',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/IMG-20251009-WA0003_b93rpj.jpg",
    location: "Universal Peace Foundation,Pogallur",
    description: 'Celebrating the many facets of empathy and togetherness.'
  },
  {
    id: 'e21',
    title: 'One Day Police',
    date: '2025-10-16',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468126/WhatsApp_Image_2025-12-11_at_8.46.45_PM_ufqwj2.jpg",
    location: "Coimbatore",
    description: 'Immersive policing experience for youth (runs Oct 16 – Oct 20).'
  },
  {
    id: 'e22',
    title: 'Crewfinity',
    date: '2025-10-17',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468126/WhatsApp_Image_2025-12-11_at_8.46.45_PM_ufqwj2.jpg",
    location: "Coimbatore",
    description: 'Team-building challenge to strengthen collaboration and leadership.'
  },
  {
    id: 'e23',
    title: 'Glow and Give',
    date: '2025-10-22',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/Photo_from_Monisha_n0whms.jpg",
    location: "SRCAS,Coimbatore",
    description: 'Evening fundraiser combining art, light, and community giving.'
  },
  {
    id: 'e24',
    title: 'Help in Soul',
    date: '2025-10-26',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467842/10_Oct_Help_in_Soul_Club_limuzn.jpg",
    location: "Annur Old Town Panchyath,Annur",
    description: 'Mental health support circle focused on listening and care.'
  },
  {
    id: 'e25',
    title: 'We are with you',
    date: '2025-10-27',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467987/10_Oct_We_are_with_you_Club_dazmz4.jpg",
    location: "Avinashi Old Bus Stand,Tiruppur",
    description: 'Solidarity event to stand with those facing challenges.'
  },
  {
    id: 'e26',
    title: 'Dude Dayout',
    date: '2025-10-29',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468130/PHOTO-2025-10-24-21-44-38_d0g4j1.jpg",
    location: "Mirage cinema",
    description: 'Fun social outing to unwind and build friendships.'
  },
  {
    id: 'e27',
    title: 'Mattai Pandhu 3.O',
    date: '2025-10-29',
    platform: 'In-person',
    image: "/turf_cricket.jpg",
    location: "Karumathampatti",
    description: 'Street cricket 3.0—friendly matches that bring the community together.'
  },
  {
    id: 'e28',
    title: 'Rotaween',
    date: '2025-10-31',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470143/IMG-20251103-WA0009_knttmi.jpg",
    location: "Sathya Jeevan Home",
    description: 'Halloween-themed celebration with the club.'
  },
  {
    id: 'e29',
    title: 'Vaathi Raid 4.0',
    date: '2025-10-31',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470133/PHOTO-2025-12-02-15-23-50_t3jjan.jpg",
    location: "KPRCAS Campus",
    description: 'The fourth edition of Vaathi Raid.'
  },
  {
    id: 'e30',
    title: 'Rotaract Fusion Fiesta',
    date: '2025-11-02',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470132/IMG-20251028-WA0043_1_duvk0h.jpg",
    description: 'Fusion Fiesta celebrating international service.'
  },
  {
    id: 'e31',
    title: 'Cyber Security Awareness',
    date: '2025-11-08',
    platform: 'Professional Service',
    image: 'https://placehold.co/800x400?text=Event+Poster',
    description: 'Workshop on staying safe online.'
  },
  {
    id: 'e32',
    title: 'Eegai',
    date: '2025-11-12',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470134/IMG-20251125-WA0012_tsdstk.jpg",
    description: 'Service initiative focused on giving back.'
  },
  {
    id: 'e33',
    title: 'Cleanfluence',
    date: '2025-11-12',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470132/IMG-20251113-WA0001_scb5pg.jpg",
    location: "Tinkle sevaa Tribal School",
    description: 'Cleanliness drive with international collaboration.'
  },
  {
    id: 'e34',
    title: 'Bouncing Back',
    date: '2025-11-12',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470790/IMG-20251108-WA0073_lnkx5c.jpg",
    description: 'Session on resilience and professional growth.'
  },
  {
    id: 'e35',
    title: 'Pair and Share',
    date: '2025-11-13',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765471195/PHOTO-2025-11-09-18-16-29_bpbevr.jpg",
    description: 'Club service activity focused on collaboration.'
  },
  {
    id: 'e36',
    title: 'Mind and Me',
    date: '2025-11-13',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470131/IMG-20251112-WA0011_yxsck9.jpg",
    description: 'Mental wellness and professional development session.'
  },
  {
    id: 'e37',
    title: 'View Point',
    date: '2025-11-21',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470134/IMG-20251120-WA0013_iu5vtf.jpg",
    description: 'Media,Mindset and Screen Cluture.'
  }
];

const initialBulletins: BulletinType[] = [
  { id: 'b1', title: 'July 2025', date: 'July-2025', content: 'Bulletin for July 2025', fileId: '1HRRqhiuJIrOzChxt-SfaaFnOWuq-jrdg', coverImage: '/bulletin-covers/july.png' },
  { id: 'b2', title: 'August 2025', date: 'August-2025', content: 'Bulletin for August 2025', fileId: '1wRTNBYPr2gLsgTdL-Cz4hsdbngBLDqHl', coverImage: '/bulletin-covers/august.png' },
  { id: 'b3', title: 'September 2025', date: 'September-2025', content: 'Bulletin for September 2025', fileId: '1Fy5mcdadNAo2_u4BOdRK19HCxo_4H5xN', coverImage: '/bulletin-covers/september.png' },
  { id: 'b4', title: 'October 2025', date: 'October-2025', content: 'Bulletin for October 2025', fileId: '1JoC-BbeoHBoKWpdUvatnVwBRrd1n8Ui1', coverImage: '/bulletin-covers/october.png' },
  // Let's reuse October fileId for November as a placeholder for the hardcoded one without fileId
  { id: 'b5', title: 'November 2025', date: 'November-2025', content: 'Bulletin for November 2025', fileId: '1JoC-BbeoHBoKWpdUvatnVwBRrd1n8Ui1', coverImage: '/bulletin-covers/november.png' }
];

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
  // Initialize if empty
  saveEvents(initialEvents);
  return initialEvents;
};

export const saveEvents = (events: EventType[]) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(events)
  }).catch(e => console.warn('Backend server unreachable, saved to local cache only.', e));
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
  // Initialize if empty
  saveBulletins(initialBulletins);
  return initialBulletins;
};

export const saveBulletins = (bulletins: BulletinType[]) => {
  localStorage.setItem(BULLETINS_KEY, JSON.stringify(bulletins));
  fetch('/api/bulletins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bulletins)
  }).catch(e => console.warn('Backend server unreachable, saved to local cache only.', e));
};

const initialTeamMembers: TeamMemberType[] = [
  {
    id: 't1',
    name: 'Rtr. Angala Pariwar',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411663/angala_pariwar_vauawb.jpg',
    position: 'DIRECTOR-PARTNER AND SERVICES'
  },
  {
    id: 't2',
    name: 'Rtr. Hari Priya G',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411665/Hari_PriyaG_f7xxu4.jpg',
    position: 'LEARNING FACILITATOR - CHAIR '
  },
  {
    id: 't3',
    name: 'Rtr. Jairam',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/Jairam_wiwxrr.jpg',
    position: 'MEMBERSHIP CHAIR '
  },
  {
    id: 't4',
    name: 'Rtr. Lohit',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/lohit_nnfyiq.jpg',
    position: 'PHOTOGRAPHY CHAIR '
  },
  {
    id: 't5',
    name: 'Rtr. Niswetha',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/niswetha_yvg0d0.jpg',
    position: 'CHAIR SOCIAL MEDIA'
  },
  {
    id: 't6',
    name: 'Rtr. Prateesh',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/prateesh_vj5chv.jpg',
    position: 'ALL OPERATION CHAIR '
  },
  {
    id: 't7',
    name: 'Rtr. Sakthi Ram',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/srisakti_vtnylf.jpg',
    position: ' IMMEDIATE PAST PRESIDENT  '
  },
  {
    id: 't8',
    name: 'Rtr. Surya Prakash',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/Surya_Prakash_joopwi.jpg',
    position: 'SEARGANT AT ARMS'
  },
  {
    id: 't9',
    name: 'Rtr. Vallamai',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/vallamai_leog4m.jpg',
    position: 'HOSPITALITY '
  },
  {
    id: 't10',
    name: 'Rtr. Vishnu Prasad',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/vishnu_prasad_x8dh8n.jpg',
    position: 'MEMBERSHIP DIRECTOR '
  }
];

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
  fetch('/api/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(members)
  }).catch(e => console.warn('Backend server unreachable, saved to local cache only.', e));
};

// Background sync task to pull fresh database data from the Express server
export const syncWithBackend = async () => {
  try {
    let hasUpdated = false;

    // Sync events
    const eventsRes = await fetch('/api/events');
    if (eventsRes.ok) {
      const eventsData = await eventsRes.json();
      if (eventsData && Array.isArray(eventsData) && eventsData.length > 0) {
        const storedStr = localStorage.getItem(EVENTS_KEY);
        const freshStr = JSON.stringify(eventsData);
        if (storedStr !== freshStr) {
          localStorage.setItem(EVENTS_KEY, freshStr);
          hasUpdated = true;
        }
      }
    }

    // Sync bulletins
    const bulletinsRes = await fetch('/api/bulletins');
    if (bulletinsRes.ok) {
      const bulletinsData = await bulletinsRes.json();
      if (bulletinsData && Array.isArray(bulletinsData) && bulletinsData.length > 0) {
        const storedStr = localStorage.getItem(BULLETINS_KEY);
        const freshStr = JSON.stringify(bulletinsData);
        if (storedStr !== freshStr) {
          localStorage.setItem(BULLETINS_KEY, freshStr);
          hasUpdated = true;
        }
      }
    }

    // Sync team members
    const teamRes = await fetch('/api/team');
    if (teamRes.ok) {
      const teamData = await teamRes.json();
      if (teamData && Array.isArray(teamData) && teamData.length > 0) {
        const storedStr = localStorage.getItem(TEAM_MEMBERS_KEY);
        const freshStr = JSON.stringify(teamData);
        if (storedStr !== freshStr) {
          localStorage.setItem(TEAM_MEMBERS_KEY, freshStr);
          hasUpdated = true;
        }
      }
    }

    // Dispatch custom event to notify active React components to reload state reactively
    if (hasUpdated) {
      window.dispatchEvent(new Event('storage-synced'));
    }
  } catch (e) {
    console.warn('Backend sync is unavailable, running in offline/static sandbox mode:', e);
  }
};

