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
            <AnimationWrapper key={index} delay={index * 100}>
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
                      <div className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
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