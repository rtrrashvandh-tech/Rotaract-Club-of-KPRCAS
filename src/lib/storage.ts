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
    platform: 'Gmeet',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.05_3b4f2292_yjzwwh.jpg',
    description: 'A platform for language exchange and cultural enrichment.'
  },
  {
    id: 'e3',
    title: 'அன்பின் மறு உருவம்',
    date: '2025-08-26',
    time: '10:00 AM - 1:00 PM',
    location: 'FAMILY FOR CHILDREN, VELLALOR, CBE.',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.04_a199c8ac_zeoxqn.jpg',
    description: 'An initiative to help elderly people.'
  },
  {
    id: 'e4',
    title: 'Mattaipandhu 2.0',
    date: '2025-08-28',
    location: 'Karumathampatti',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053140/WhatsApp_Image_2025-08-24_at_21.45.07_224b18e3_fllgx6.jpg',
    description: 'An initiative to build a community.'
  },
  {
    id: 'e5',
    title: 'வெறும் பெண் இல்லை',
    date: '2025-08-28',
    location: 'Arasur Govt School',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.04_c5c998e3_o6x8vz.jpg',
    description: 'A self-defence learning session for girls.'
  },
  {
    id: 'e6',
    title: 'Excelerate - Art of Speaking',
    date: '2025-08-29',
    time: '10:00 AM',
    location: 'Seminar Hall (KPRCAS)',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053002/WhatsApp_Image_2025-08-24_at_20.52.42_78b8ef19_arjsxf.jpg',
    description: 'An initiative to enhance communication skills.'
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
    description: 'Unlock the potential of effective communication and personal growth.'
  },
  {
    id: 'e10',
    title: 'RAC-a-THON',
    date: '2025-09-15',
    time: '9:00 AM',
    location: 'KPRCAS Campus',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287839/IMG-20251001-WA0068_pnyicy.jpg',
    description: 'A 24-hour hackathon event.'
  },
  {
    id: 'e11',
    title: 'Veeram Pen Illai – Self-Defense Training',
    date: '2025-09-18',
    time: '10:00 AM',
    location: 'Vagarayampalayam Government School',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287144/IMG-20250917-WA0057_jzpqea.jpg',
    description: 'Empowering women with self-defense training for safety and confidence.'
  },
  {
    id: 'e12',
    title: 'Touro quiz',
    date: '2025-09-27',
    time: '2:00 PM - 4:00 PM',
    location: 'Gmeet',
    platform: 'Online',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760284629/Screenshot_2025-10-01-12-36-16-82_99c04817c0de5652397fc8b56c3b3817_fordh1.jpg',
    description: 'An event for quizzing and knowledge celebration.'
  },
  {
    id: 'e13',
    title: 'Charity Drive',
    date: '2025-09-27',
    time: '2:00 PM - 4:00 PM',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287422/IMG-20250929-WA0005_xuyg6l.jpg',
    description: 'An event to raise funds for the needy.'
  },
  {
    id: 'e14',
    title: 'Navrang - Navratri Celebration',
    date: '2025-09-29',
    time: '2:00 PM - 4:00 PM',
    location: 'KPRCAS Campus',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760283820/PHOTO-2025-09-26-21-51-21_mniq4e.jpg',
    description: 'Celebrating Navratri with vibrant traditions.'
  },
  {
    id: 'e15',
    title: 'Innovision',
    date: '2025-09-29',
    time: '10:00 AM',
    location: 'Gmeet',
    platform: 'Online',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760285361/IMG-20250926-WA0064_knpsv9.jpg',
    description: 'Unlock insights for SQL and enhance data understanding.'
  },
  {
    id: 'e16',
    title: 'Nalam oru Padhai',
    date: '2025-10-07',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467685/10_Oct_Nalam_Oru_Pathai_Club_jijdhv.jpg',
    location: '15-Vellampalyam Government School, Tiruppur',
    description: 'Health and wellness outreach to build a stronger, healthier community.'
  },
  {
    id: 'e17',
    title: 'Feed the Future',
    date: '2025-10-10',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/IMG-20251006-WA0012_tfllwk.jpg',
    location: 'Family for Children, Vellalore, Coimbatore',
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
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/IMG-20251009-WA0003_b93rpj.jpg',
    location: 'Universal Peace Foundation, Pogallur',
    description: 'Celebrating the many facets of empathy and togetherness.'
  },
  {
    id: 'e21',
    title: 'One Day Police',
    date: '2025-10-16',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468126/WhatsApp_Image_2025-12-11_at_8.46.45_PM_ufqwj2.jpg',
    location: 'Coimbatore',
    description: 'Immersive policing experience for youth (runs Oct 16 – Oct 20).'
  },
  {
    id: 'e22',
    title: 'Crewfinity',
    date: '2025-10-17',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468126/WhatsApp_Image_2025-12-11_at_8.46.45_PM_ufqwj2.jpg',
    location: 'Coimbatore',
    description: 'Team-building challenge to strengthen collaboration and leadership.'
  },
  {
    id: 'e23',
    title: 'Glow and Give',
    date: '2025-10-22',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/Photo_from_Monisha_n0whms.jpg',
    location: 'SRCAS, Coimbatore',
    description: 'Evening fundraiser combining art, light, and community giving.'
  },
  {
    id: 'e24',
    title: 'Help in Soul',
    date: '2025-10-26',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467842/10_Oct_Help_in_Soul_Club_limuzn.jpg',
    location: 'Annur Old Town Panchyath, Annur',
    description: 'Mental health support circle focused on listening and care.'
  },
  {
    id: 'e25',
    title: 'We are with you',
    date: '2025-10-27',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467987/10_Oct_We_are_with_you_Club_dazmz4.jpg',
    location: 'Avinashi Old Bus Stand, Tiruppur',
    description: 'Solidarity event to stand with those facing challenges.'
  },
  {
    id: 'e26',
    title: 'Dude Dayout',
    date: '2025-10-29',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468130/PHOTO-2025-10-24-21-44-38_d0g4j1.jpg',
    location: 'Mirage cinema',
    description: 'Fun social outing to unwind and build friendships.'
  },
  {
    id: 'e27',
    title: 'Mattai Pandhu 3.O',
    date: '2025-10-29',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468127/PHOTO-2025-10-24-21-44-38_1_ogc2cj.jpg',
    location: 'Karumathampatti',
    description: 'Street cricket 3.0 — friendly matches that bring the community together.'
  },
  {
    id: 'e28',
    title: 'Rotaween',
    date: '2025-10-31',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470143/IMG-20251103-WA0009_knttmi.jpg',
    location: 'Sathya Jeevan Home',
    description: 'Halloween-themed celebration with the club.'
  },
  {
    id: 'e29',
    title: 'Vaathi Raid 4.0',
    date: '2025-10-31',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470133/PHOTO-2025-12-02-15-23-50_t3jjan.jpg',
    location: 'KPRCAS Campus',
    description: 'The fourth edition of Vaathi Raid.'
  },
  {
    id: 'e30',
    title: 'Rotaract Fusion Fiesta',
    date: '2025-11-02',
    platform: 'Gmeet',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470132/IMG-20251028-WA0043_1_duvk0h.jpg',
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
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470134/IMG-20251125-WA0012_tsdstk.jpg',
    description: 'Service initiative focused on giving back.'
  },
  {
    id: 'e33',
    title: 'Cleanfluence',
    date: '2025-11-12',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470132/IMG-20251113-WA0001_scb5pg.jpg',
    location: 'Tinkle sevaa Tribal School',
    description: 'Cleanliness drive with international collaboration.'
  },
  {
    id: 'e34',
    title: 'Bouncing Back',
    date: '2025-11-12',
    platform: 'Gmeet',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470790/IMG-20251108-WA0073_lnkx5c.jpg',
    description: 'Session on resilience and professional growth.'
  },
  {
    id: 'e35',
    title: 'Pair and Share',
    date: '2025-11-13',
    platform: 'Gmeet',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765471195/PHOTO-2025-11-09-18-16-29_bpbevr.jpg',
    description: 'Club service activity focused on collaboration.'
  },
  {
    id: 'e36',
    title: 'Mind and Me',
    date: '2025-11-13',
    platform: 'Gmeet',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470131/IMG-20251112-WA0011_yxsck9.jpg',
    description: 'Mental wellness and professional development session.'
  },
  {
    id: 'e37',
    title: 'View Point',
    date: '2025-11-21',
    platform: 'Gmeet',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470134/IMG-20251120-WA0013_iu5vtf.jpg',
  },
  {
    id: 'e38',
    title: 'Pinnacle Leadership Summit',
    date: '2026-01-18',
    time: '09:30 AM - 4:30 PM',
    location: 'KPRCAS Auditorium',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760281257/PHOTO-2025-09-28-09-55-14_wodjhp.jpg',
    description: 'An empowering day of leadership workshops, keynotes, and team building to inspire next-generation changemakers.'
  },
  {
    id: 'e39',
    title: 'Pulse 2026: Sports Fiesta',
    date: '2026-02-14',
    time: '08:00 AM - 5:00 PM',
    location: 'KPR Sports Grounds',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053140/WhatsApp_Image_2025-08-24_at_21.45.07_224b18e3_fllgx6.jpg',
    description: 'Unleashing the spirit of sportsmanship! A thrilling inter-club tournament featuring cricket, football, and track events.'
  },
  {
    id: 'e40',
    title: 'EmpowerHer: Women in Tech',
    date: '2026-03-08',
    time: '10:30 AM - 12:30 PM',
    location: 'Google Meet',
    platform: 'Online',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760285361/IMG-20250926-WA0064_knpsv9.jpg',
    description: 'Celebrating International Women\'s Day with an expert panel sharing insights on breaking barriers and thriving in the tech industry.'
  },
  {
    id: 'e41',
    title: 'Green Earth Initiative',
    date: '2026-04-22',
    time: '07:30 AM - 11:30 AM',
    location: 'Arasur Village, Coimbatore',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470132/IMG-20251113-WA0001_scb5pg.jpg',
    description: 'Earth Day special tree-planting and environmental awareness drive to create a greener, more sustainable tomorrow.'
  },
  {
    id: 'e42',
    title: 'Care for Kids: Orphanage Visit',
    date: '2026-05-10',
    time: '09:30 AM - 01:30 PM',
    location: 'Mercy Home, Karumathampatti',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/IMG-20251006-WA0012_tfllwk.jpg',
    description: 'Bringing smiles and joy! A day filled with interactive games, drawing competitions, and sharing gifts and nutritious meals.'
  },
  {
    id: 'e43',
    title: 'Markaiyn Idhyam',
    date: '2025-11-27',
    time: '10:00 AM',
    location: 'Mangalam',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Markaiyn+Idhyam',
    description: 'A tree plantation and environmental awareness initiative promoting sustainability, greenery, and collective social responsibility.'
  },
  {
    id: 'e44',
    title: 'Revitalize',
    date: '2025-11-27',
    location: 'Uthavum Karangal – De Addiction Centre, Avinashi',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Revitalize',
    description: 'A mental wellness and motivational session focused on emotional healing, positivity, and personal empowerment.'
  },
  {
    id: 'e45',
    title: 'Vibe Up',
    date: '2025-12-07',
    time: '6:30 PM',
    platform: 'GMeet',
    image: 'https://placehold.co/800x400?text=Vibe+Up',
    description: 'An engaging online session designed to spread positivity, motivation, and meaningful interaction among participants.'
  },
  {
    id: 'e46',
    title: 'Voice Of Rights',
    date: '2025-12-10',
    time: '7:00 PM',
    platform: 'GMeet',
    image: 'https://placehold.co/800x400?text=Voice+Of+Rights',
    description: 'A human rights awareness program encouraging equality, justice, empowerment, and social responsibility.'
  },
  {
    id: 'e47',
    title: 'SafeBytes',
    date: '2025-12-13',
    time: '7:00 PM',
    platform: 'GMeet',
    image: 'https://placehold.co/800x400?text=SafeBytes',
    description: 'A cybersecurity awareness session teaching safe digital practices and responsible online behavior.'
  },
  {
    id: 'e49',
    title: 'Oru Gift-uh Parcel',
    date: '2025-12-22',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Oru+Gift-uh+Parcel',
    description: 'A joyful gifting initiative spreading happiness and festive cheer through thoughtful surprises and kindness.'
  },
  {
    id: 'e50',
    title: 'Creative Art',
    date: '2025-12-23',
    time: '2:00 PM',
    location: 'KPRCAS',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Creative+Art',
    description: 'A creative event encouraging imagination, artistic skills, and innovative thinking through fun activities.'
  },
  {
    id: 'e51',
    title: 'Ink To Impact',
    date: '2025-12-23',
    time: '3:00 PM',
    location: 'KPRCAS',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Ink+To+Impact',
    description: 'An inspiring session focused on writing, ideas, and using creativity as a tool to create meaningful change.'
  },
  {
    id: 'e52',
    title: 'Marudhamalai Dharisanam',
    date: '2026-01-18',
    time: '11:00 AM',
    location: 'Marudhamalai',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Marudhamalai+Dharisanam',
    description: 'A spiritual visit fostering unity, positivity, peace, and cultural connection among participants.'
  },
  {
    id: 'e53',
    title: 'The CA Sphere',
    date: '2026-01-26',
    time: '7:00 PM',
    platform: 'GMeet',
    image: 'https://placehold.co/800x400?text=The+CA+Sphere',
    description: 'A career guidance session for aspiring Chartered Accountants covering opportunities, preparation, and professional growth.'
  },
  {
    id: 'e54',
    title: 'Ratify The Future',
    date: '2026-01-29',
    time: '7:00 PM',
    platform: 'GMeet',
    image: 'https://placehold.co/800x400?text=Ratify+The+Future',
    description: 'A leadership and personality development session focused on preparing students for future challenges and opportunities.'
  },
  {
    id: 'e55',
    title: 'Upgrade Your Mindset',
    date: '2026-01-31',
    time: '7:00 PM',
    platform: 'GMeet',
    image: 'https://placehold.co/800x400?text=Upgrade+Your+Mindset',
    description: 'A motivational session helping students transition from academic life to professional success with confidence and clarity.'
  },
  {
    id: 'e56',
    title: 'Measuring Community Impact',
    date: '2026-03-23',
    time: '11:00 AM',
    location: 'KPRCAS',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Measuring+Community+Impact',
    description: 'An informative session on evaluating social initiatives and understanding their impact on communities.'
  },
  {
    id: 'e57',
    title: 'Eco Minds For Better Future',
    date: '2026-03-23',
    time: '2:00 PM',
    location: 'KPRCAS',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Eco+Minds+For+Better+Future',
    description: 'An environmental awareness session encouraging sustainable living and eco-friendly practices for a greener future.'
  },
  {
    id: 'e58',
    title: 'Strands For Smiles',
    date: '2026-03-25',
    time: '11:00 AM',
    location: 'KPRCAS',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Strands+For+Smiles',
    description: 'A hair donation awareness initiative supporting cancer patients through compassion, confidence, and care.'
  },
  {
    id: 'e59',
    title: 'Vanchi',
    date: '2026-04-10',
    location: 'Nannilam Eco Village, Kalvarayan Hills, Salem',
    platform: 'In-person',
    image: 'https://placehold.co/800x400?text=Vanchi',
    description: 'A 3-day immersive leadership camp focused on sustainability, eco-living, teamwork, and outreach activities.'
  }
];

const initialBulletins: BulletinType[] = [
  { id: 'b_1779561822551', title: 'APRIL 2026', date: 'April-2026', content: '', fileId: '1nuQCK1wlpEVWr8OdNhBW2Q2AnId4iryT', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779548254/Screenshot_2026-05-23_202717_to5dih.png' },
  { id: 'b_1779561764345', title: 'MARCH 2026 ', date: 'March-2026', content: '', fileId: '1lVdntXMY9yf6wH73-OTUBuf4RRtWzl52', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779547663/Screenshot_2026-05-23_201729_isge0z.png' },
  { id: 'b_1779561715605', title: 'FEBUARY 2026 ', date: 'Febuary-2026', content: '', fileId: '1K9c0G0_faZE73WTJthWRhXCZo3iIIWdt', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779547581/Screenshot_2026-05-23_201559_xfne9m.png' },
  { id: 'b1', title: 'July 2025', date: 'July-2025', content: 'Bulletin for July 2025', fileId: '1HRRqhiuJIrOzChxt-SfaaFnOWuq-jrdg', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779550532/Screenshot_2026-05-23_210518_noyfg0.png' },
  { id: 'b2', title: 'August 2025', date: 'August-2025', content: 'Bulletin for August 2025', fileId: '1wRTNBYPr2gLsgTdL-Cz4hsdbngBLDqHl', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779550477/Screenshot_2026-05-23_210417_gtwwfy.png' },
  { id: 'b3', title: 'September 2025', date: 'September-2025', content: 'Bulletin for September 2025', fileId: '1Fy5mcdadNAo2_u4BOdRK19HCxo_4H5xN', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779550361/Screenshot_2026-05-23_210222_ryepvn.png' },
  { id: 'b4', title: 'October 2025', date: 'October-2025', content: 'Bulletin for October 2025', fileId: '1JoC-BbeoHBoKWpdUvatnVwBRrd1n8Ui1', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779462067/Screenshot_2026-05-22_203014_wn1hwv.png' },
  { id: 'b5', title: 'November 2025', date: 'November-2025', content: 'Bulletin for November 2025', fileId: '1JoC-BbeoHBoKWpdUvatnVwBRrd1n8Ui1', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779550256/Screenshot_2026-05-23_210020_tnhs7q.png' },
  { id: 'b6', title: 'December 2025', date: 'December-2025', content: 'Official monthly updates, activities, and achievements summary.', fileId: '1JoC-BbeoHBoKWpdUvatnVwBRrd1n8Ui1', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779546558/Screenshot_2026-05-23_195606_gzlj1z.png' },
  { id: 'b7', title: 'January 2026', date: 'January-2026', content: 'Official monthly updates, activities, and achievements summary.', fileId: '1JoC-BbeoHBoKWpdUvatnVwBRrd1n8Ui1', coverImage: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1779461915/Screenshot_2026-05-22_202600_trdlbp.png' }
];

const sortEventsByDate = (eventsList: EventType[]): EventType[] => {
  return [...eventsList].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateA - dateB;
  });
};

export const getEvents = (): EventType[] => {
  const stored = localStorage.getItem(EVENTS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migration: Ensure newly added hardcoded initial events are merged for existing local caches
      if (Array.isArray(parsed)) {
        let updated = false;

        // Remove legacy initial events that are no longer in initialEvents
        const initialIds = new Set(initialEvents.map(e => e.id));
        const filtered = parsed.filter(e => {
          if (/^e\d+$/.test(e.id)) {
            const keep = initialIds.has(e.id);
            if (!keep) updated = true;
            return keep;
          }
          return true;
        });

        const merged = [...filtered];
        initialEvents.forEach(initE => {
          if (!merged.some(e => e.id === initE.id)) {
            merged.push(initE);
            updated = true;
          }
        });
        if (updated) {
          saveEvents(merged);
          return sortEventsByDate(merged);
        }
        return sortEventsByDate(filtered);
      }
      return sortEventsByDate(parsed);
    } catch (e) {
      console.error('Failed to parse events from local storage', e);
    }
  }
  // Initialize if empty (local cache only)
  saveEvents(initialEvents);
  return sortEventsByDate(initialEvents);
};

export const saveEvents = (events: EventType[], syncToServer = false) => {
  const sorted = sortEventsByDate(events);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(sorted));
  if (syncToServer) {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sorted)
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
  // Initialize if empty (local cache only)
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
  },
  {
    id: 't11',
    name: 'Dr. K.P. Ramasamy',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411671/Chairman_sir_mcs6ns.avif',
    position: 'Chairman'
  },
  {
    id: 't12',
    name: 'Dr. Geetha .P',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411672/principal_mam_gzmnvm.jpg',
    position: 'Principal'
  },
  {
    id: 't13',
    name: 'Dr. Vinayak SP',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/staff_coordinator_u61x5h.jpg',
    position: 'Head Staff Coordinator'
  },
  {
    id: 't14',
    name: 'Rtr. Sanjith Kumar Sri Krishnan',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/sanjith_yfeoyr.jpg',
    position: 'President'
  },
  {
    id: 't15',
    name: 'Rtr. Haripriya',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411703/team-member-haripriya_gj96fq.jpg',
    position: 'Secretary Administration'
  },
  {
    id: 't16',
    name: 'Rtr. Mounesh',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411701/mounish_kblucw.jpg',
    position: 'Secretary – Communication'
  },
  {
    id: 't17',
    name: 'Rtr.Saran G',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412967/team-member-saran_rhfrcq.jpg',
    position: 'Vice President'
  },
  {
    id: 't18',
    name: 'Rtr. Pratheesh',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413221/prateesh_xfstxd.jpg',
    position: 'Special Aid to the President'
  },
  {
    id: 't19',
    name: 'Rtr. Netra',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-netra_obbhqr.jpg',
    position: 'Joint Secretary'
  },
  {
    id: 't20',
    name: 'Rtr. Sanjay Harish',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411708/team-member-sanjay_lpxwng.jpg',
    position: 'Past President'
  },
  {
    id: 't21',
    name: 'Rtr. Midun',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-midun_gxbwsp.jpg',
    position: 'Treasurer'
  },
  {
    id: 't22',
    name: 'Rtr. Prabhagar S',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411707/team-member-prabhagar_x5ggfk.jpg',
    position: 'Community Service Director'
  },
  {
    id: 't23',
    name: 'Rtr. Mirthula R',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-mirthural_shkrm3.jpg',
    position: 'International Service Director'
  },
  {
    id: 't24',
    name: 'Rtr. Indupriya S',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411703/team-member-indupriya_emom2c.jpg',
    position: 'Community Service Chair'
  },
  {
    id: 't25',
    name: 'Rtr. Monisha',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-monisha_jpfpnu.jpg',
    position: 'Chair – District Priority Projects'
  },
  {
    id: 't26',
    name: 'Rtr. Rithanya L',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413228/rithanaya_m5iwib.jpg',
    position: 'Director – Professional Services'
  },
  {
    id: 't27',
    name: 'Rtr. Anuvarshini K.M',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/team-member-anuvarshini_dp3vxl.jpg',
    position: 'Director – Reporting and Grievance'
  },
  {
    id: 't28',
    name: 'Rtr. Sivaharini K.',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/sivaharini_ze7s9y.jpg',
    position: 'Chair – Grievances and Reporting'
  },
  {
    id: 't29',
    name: 'Rtr. Srinithi',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/Srinith_zb8k5t.jpg',
    position: 'Club Service Chair'
  },
  {
    id: 't30',
    name: 'Rtr. Priyanka J. K',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411663/JK_priyanka_hit03k.jpg',
    position: 'Chair – All Operations'
  },
  {
    id: 't31',
    name: 'Rtr. Naren',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-naren_ntcxpk.jpg',
    position: 'International Service Director'
  },
  {
    id: 't32',
    name: 'Rtr. Prajjeeith',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411707/team-member-prajjeeith_ckmlxz.jpg',
    position: 'District Priority Projects Director'
  },
  {
    id: 't33',
    name: 'Rtr. Deepana S.',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/deepana_wqphgt.jpg',
    position: 'Chair of Professional Services'
  },
  {
    id: 't34',
    name: 'Rtr. Miruthula Sri',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/mirthal_sri_hmns70.jpg',
    position: 'International Service Chair'
  },
  {
    id: 't35',
    name: 'Rtr. Dharaneesh',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413218/Dharanessh_fowipx.jpg',
    position: 'Treasurer'
  },
  {
    id: 't36',
    name: 'Rtr. Brindha P',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413216/Brinda_uk2jgf.jpg',
    position: 'Director – Professional Services'
  },
  {
    id: 't37',
    name: 'Rtr. Pavithra KS',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413219/Pavithra_utrapb.jpg',
    position: 'Chair – Interact–Rotaract Relationship'
  },
  {
    id: 't38',
    name: 'Rtr. Praveen',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/praveen_l0psb8.jpg',
    position: 'Club Service Director'
  },
  {
    id: 't39',
    name: 'Rtr. Sanjay D',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/Sanjay_f8kema.jpg',
    position: 'All Avenue Chair'
  },
  {
    id: 't40',
    name: 'Rtr. Rashvandh A',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411665/rashvandh_vkgvm4.jpg',
    position: 'Web Chair'
  },
  {
    id: 't41',
    name: 'Rtr. Dharsan Sastikesh S.P',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/Darshan_jnxkak.jpg',
    position: 'Public Relations Chair'
  }
];

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
  // Initialize if empty (local cache only)
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

// Background sync task to pull fresh database data from the Express server
export const syncWithBackend = async () => {
  try {
    let hasUpdated = false;

    // Sync events
    const eventsRes = await fetch('/api/events');
    if (eventsRes.ok) {
      const eventsData = await eventsRes.json();
      if (eventsData && Array.isArray(eventsData)) {
        const storedStr = localStorage.getItem(EVENTS_KEY);
        const sortedEvents = sortEventsByDate(eventsData);
        const freshStr = JSON.stringify(sortedEvents);
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
      if (bulletinsData && Array.isArray(bulletinsData)) {
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
      if (teamData && Array.isArray(teamData)) {
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

