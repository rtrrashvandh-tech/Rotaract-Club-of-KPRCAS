import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimationWrapper from "@/components/AnimationWrapper";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// ✅ Event type
type EventType = {
  title: string;
  date?: string;
  time?: string;
  location?: string;
  platform?: string;
  image: string;
  description: string;
};

const placeholderImage = 'https://placehold.co/800x400?text=Event+Poster';

// ✅ Event list
const events: EventType[] = [
  {
    title: 'Yours Lovingly',
    date: '2025-08-24',
    time: '10:00 AM – 1:00 PM',
    location: 'Uthavum Karangal, Avinashi',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.05_8f591faf_dlqyvp.jpg', 
    description: 'A Dream Mental Support Initiative.'
  },
  {
    title: 'Lingua Connection',
    date: '2025-08-25',
    time: '07:00 PM – 08:00 PM',
    location: '',
    platform: 'Gmeet',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.05_3b4f2292_yjzwwh.jpg',
    description: 'A platform for language exchange and cultural enrichment.'
  },
  {
    title: 'அன்பின் மறு உருவம்',
    date: '2025-08-26',
    time: '10:00 AM - 1:00 PM',
    location: 'FAMILY FOR CHILDREN, VELLALOR,CBE.',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.04_a199c8ac_zeoxqn.jpg',
    description: 'அன்பின் மறு உருவம் is an initiative to help elderly people.'
  },
  {
    title: 'Mattaipandhu 2.0',
    date: '2025-08-28',
    location: 'Karumathampatti',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053140/WhatsApp_Image_2025-08-24_at_21.45.07_224b18e3_fllgx6.jpg',
    description: 'Mattaipandhu 2.0 is an initiative to build a community.'
  },
  {
    title: 'வெறும் பெண் இல்லை',
    date: '2025-08-28',
    location: 'Arasur Govt School',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755885523/WhatsApp_Image_2025-08-22_at_20.54.04_c5c998e3_o6x8vz.jpg',
    description: 'வெறும் பெண் இல்லை is a self-defence learning session for girls.'
  },
  {
    title: 'Excelerate - Art of Speaking',
    date: '2025-08-29',
    time: '10:00 AM',
    location: 'Seminar Hall (KPRCAS)',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053002/WhatsApp_Image_2025-08-24_at_20.52.42_78b8ef19_arjsxf.jpg',
    description: 'Excelerate - Art of Speaking is an initiative to enhance communication skills.'
  },
  {
    title: 'வளமான கல்விக்காக',
    date: '2025-08-30',
    time: '03:00 PM',
    location: 'Arasur Govt School',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1756053014/WhatsApp_Image_2025-08-24_at_21.45.07_f2b2c24d_ldwk5w.jpg',
    description: 'Books are bridges that connect dreams to reality — donate them.'
  },
  {
    title: 'Tharagam - Onam Celebration',
    date: '2025-09-03',
    time: '10:00 AM - 1:00 PM',
    location: 'KPRCAS Campus',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760281232/PHOTO-2025-09-03-09-22-13_kow0x9.jpg',
    description: 'The Rotaract Club of KPRCAS proudly celebrated Onam under Tharangam 3.0.'
  },
  {
    title: 'Words that Empower',
    date: '2025-09-08',
    time: '10:00 AM',
    location: 'Gmeet',
    platform: 'Online',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760285151/Screenshot_2025-10-01-12-32-50-85_99c04817c0de5652397fc8b56c3b3817_s6f6tr.jpg',
    description: 'Words that empower is an initiative to unlock the potential of effective communication and personal growth.'
  },
  {
    title: 'RAC-a-THON',
    date: '2025-09-15',
    time: '9:00 AM',
    location: 'KPRCAS Campus',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287839/IMG-20251001-WA0068_pnyicy.jpg',
    description: 'RAC-a-THON is a 24-hour hackathon event.'
  },
  {
    title: 'Veeram Pen Illai – Self-Defense Training',
    date: '2025-09-18',
    time: '10:00 AM',
    location: 'Vagarayampalayam Government School',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287144/IMG-20250917-WA0057_jzpqea.jpg',
    description: 'Join the Rotaract Club of KPRCAS for "Veeram Pen Illai", a self-defense training session aimed at empowering women and enhancing their confidence and safety skills.'
  },
  {
    title: 'Touro quiz',
    date: '2025-09-27',
    time: '2:00 PM - 4:00 PM',
    location: 'Gmeet',
    platform: 'Online',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760284629/Screenshot_2025-10-01-12-36-16-82_99c04817c0de5652397fc8b56c3b3817_fordh1.jpg',
    description: 'Touro quiz is an event for quizzing and knowledge celebration.'
  },
  {
    title: 'Charity Drive',
    date: '2025-09-27',
    time: '2:00 PM - 4:00 PM',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760287422/IMG-20250929-WA0005_xuyg6l.jpg',
    description: 'Charity Drive is an event to raise funds for the needy.'
  },
  {
    title: 'Navrang - Navratri Celebration',
    date: '2025-09-29',
    time: '2:00 PM - 4:00 PM',
    location: 'KPRCAS Campus',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760283820/PHOTO-2025-09-26-21-51-21_mniq4e.jpg',
    description: 'Navrang is an event celebrating Navratri with vibrant traditions.'
  },
  {
    title: 'Innovision',
    date: '2025-09-29',
    time: '10:00 AM',
    location: 'Gmeet',
    platform: 'Online',
    image: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760285361/IMG-20250926-WA0064_knpsv9.jpg',
    description: 'Innovision is an initiative to unlock insights for SQL and enhance data understanding.'
  },
  // October events
  {
    title: 'Nalam oru Padhai',
    date: '2025-10-07',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467685/10_Oct_Nalam_Oru_Pathai_Club_jijdhv.jpg",
    location:"15-Vellampalyam Government School, Tiruppur",
    description: 'Health and wellness outreach to build a stronger, healthier community.'
  },
  {
    title: 'Feed the Future',
    date: '2025-10-10',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/IMG-20251006-WA0012_tfllwk.jpg",
    location:"Family for Children, Vellalore, Coimbatore",
    description: 'Food distribution drive to support families in need.'
  },
  {
    title: 'Anbin maru Uruvam',
    date: '2025-10-10',
    platform: 'In-person',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1765464462/IMG-20251126-WA0007_c88v2i.jpg',
    location: 'Family for Children, Vellalore, Coimbatore',
    description: 'A compassion-led visit to spread kindness and support.'
  },
  {
    title: 'Nambikkai Siragugal',
    date: '2025-10-13',
    platform: 'In-person',
    image: placeholderImage,
    description: 'Inspiration session to empower students with hope and confidence.'
  },
  {
    title: 'Paasathin Pakkangal',
    date: '2025-10-13',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/IMG-20251009-WA0003_b93rpj.jpg",
    location:"Universal Peace Foundation,Pogallur",
    description: 'Celebrating the many facets of empathy and togetherness.'
  },
  {
    title: 'One Day Police',
    date: '2025-10-16',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468126/WhatsApp_Image_2025-12-11_at_8.46.45_PM_ufqwj2.jpg",
    location:"Coimbatore",
    description: 'Immersive policing experience for youth (runs Oct 16 – Oct 20).'
  },
  {
    title: 'Crewfinity',
    date: '2025-10-17',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468126/WhatsApp_Image_2025-12-11_at_8.46.45_PM_ufqwj2.jpg",
    location:"Coimbatore",
    description: 'Team-building challenge to strengthen collaboration and leadership.'
  },
  {
    title: 'Glow and Give',
    date: '2025-10-22',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468534/Photo_from_Monisha_n0whms.jpg",
    location:"SRCAS,Coimbatore",
    description: 'Evening fundraiser combining art, light, and community giving.'
  },
  {
    title: 'Help in Soul',
    date: '2025-10-26',
    platform: 'In-person',
    image:"https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467842/10_Oct_Help_in_Soul_Club_limuzn.jpg",
    location:"Annur Old Town Panchyath,Annur",
    description: 'Mental health support circle focused on listening and care.'
  },
  {
    title: 'We are with you',
    date: '2025-10-27',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765467987/10_Oct_We_are_with_you_Club_dazmz4.jpg",
    location:"Avinashi Old Bus Stand,Tiruppur",
    description: 'Solidarity event to stand with those facing challenges.'
  },
  {
    title: 'Dude Dayout',
    date: '2025-10-29',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468130/PHOTO-2025-10-24-21-44-38_d0g4j1.jpg",
    location:"Mirage cinema",
    description: 'Fun social outing to unwind and build friendships.'
  },
  {
    title: 'Mattai Pandhu 3.O',
    date: '2025-10-29',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765468127/PHOTO-2025-10-24-21-44-38_1_ogc2cj.jpg",
    location:"Karumathampatti",
    description: 'Street cricket 3.0—friendly matches that bring the community together.'
  },
  // Late October additions
  {
    title: 'Rotaween',
    date: '2025-10-31',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470143/IMG-20251103-WA0009_knttmi.jpg",
    location:"Sathya Jeevan Home",
    description: 'Halloween-themed celebration with the club.'
  },
  {
    title: 'Vaathi Raid 4.0',
    date: '2025-10-31',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470133/PHOTO-2025-12-02-15-23-50_t3jjan.jpg",
    location:"KPRCAS Campus",
    description: 'The fourth edition of Vaathi Raid.'
  },
  // November events
  {
    title: 'Rotaract Fusion Fiesta',
    date: '2025-11-02',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470132/IMG-20251028-WA0043_1_duvk0h.jpg",
    description: 'Fusion Fiesta celebrating international service.'
  },
  {
    title: 'Cyber Security Awareness',
    date: '2025-11-08',
    platform: 'Professional Service',
    image: placeholderImage,
    description: 'Workshop on staying safe online.'
  },
  {
    title: 'Eegai',
    date: '2025-11-12',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470134/IMG-20251125-WA0012_tsdstk.jpg",
    description: 'Service initiative focused on giving back.'
  },
  {
    title: 'Cleanfluence',
    date: '2025-11-12',
    platform: 'In-person',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470132/IMG-20251113-WA0001_scb5pg.jpg",
    location:"Tinkle sevaa Tribal School",
    description: 'Cleanliness drive with international collaboration.'
  },
  {
    title: 'Bouncing Back',
    date: '2025-11-12',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470790/IMG-20251108-WA0073_lnkx5c.jpg",
    description: 'Session on resilience and professional growth.'
  },
  {
    title: 'Pair and Share',
    date: '2025-11-13',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765471195/PHOTO-2025-11-09-18-16-29_bpbevr.jpg",
    description: 'Club service activity focused on collaboration.'
  },
  {
    title: 'Mind and Me',
    date: '2025-11-13',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470131/IMG-20251112-WA0011_yxsck9.jpg",
    description: 'Mental wellness and professional development session.'
  },
  {
    title: 'View Point',
    date: '2025-11-21',
    platform: 'Gmeet',
    image: "https://res.cloudinary.com/drmwtmeg3/image/upload/v1765470134/IMG-20251120-WA0013_iu5vtf.jpg",
    description: 'Media,Mindset and Screen Cluture.'
  }
];

const Events = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [zoom, setZoom] = useState(1); // Initial zoom level

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3)); // Max zoom x3
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5)); // Min zoom x0.5
  const handleClose = () => {
    setSelectedImage(null);
    setZoom(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50" />
          <img
            src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg"
            alt="Events Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <AnimationWrapper>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Events</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Join us for exciting events that make a difference in our community and beyond.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Event Grid */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <AnimationWrapper key={index} delay={index * 50}>
              <Card className="h-full bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                {event.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <button
                      onClick={() => setSelectedImage({ src: event.image, alt: event.title })}
                      className="w-full h-full focus:outline-none"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-zoom-in"
                      />
                    </button>
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
                    {event.date && (
                      <div className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                  {event.location && <p className="text-xs text-gray-600">📍 {event.location}</p>}
                  {event.time && <p className="text-xs text-gray-600">🕒 {event.time}</p>}
                  {event.platform && <p className="text-xs text-gray-600">💼 {event.platform}</p>}
                </CardHeader>
              </Card>
            </AnimationWrapper>
          ))}
        </div>
      </div>

      {/* Image Zoom Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={handleClose}>
        <DialogContent className="p-4 max-w-4xl flex flex-col items-center">
          {selectedImage && (
            <>
              <div className="flex space-x-2 mb-2">
                <button
                  onClick={handleZoomOut}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  ➖
                </button>
                <button
                  onClick={handleZoomIn}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  ➕
                </button>
              </div>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                style={{ transform: `scale(${zoom})` }}
                className="transition-transform duration-200 max-h-[80vh] rounded-lg object-contain"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;