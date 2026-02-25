import { useState } from 'react';
import { Filter, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AnimationWrapper from '@/components/AnimationWrapper';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<{ src: string; type: string; title: string; description: string; category: string } | null>(null);

  const filters = [
    { id: 'all', label: 'All Moments' },
    { id: 'club service', label: 'Club Service' },
    { id: 'community', label: 'Community' },
    { id: 'professional service', label: 'Professional' },
    { id: 'international service', label: 'International' },
    { id: 'district priority projects', label: 'DPP' },
  ];

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755328575/IMG_2630_lfgtit.jpg',
      category: 'club service',
      title: 'Charter Day',
      description: 'Charter Day celebration "Purpose Power Progress"'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755328351/IMG_2449_fig2hu.jpg',
      category: 'club service',
      title: 'Swap and Serve',
      description: 'An initiative to build a sustainable community through sharing.'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755331800/IMG-20250727-WA0011_1_avnbqn.jpg',
      category: 'district priority projects',
      title: 'Plates of Joy',
      description: 'Serving hot meals with love and compassion to those in need.'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417179/WhatsApp_Image_2025-07-20_at_19.16.57_99f3161a_xktitp.jpg',
      category: 'professional service',
      title: 'Skill up Summit',
      description: 'Empowering youth through motivational leadership sessions.'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417387/WhatsApp_Image_2025-07-21_at_23.31.20_ca301d31_yh4q7o.jpg',
      category: 'professional service',
      title: 'Income Tax Insights',
      description: 'A deep dive into financial literacy and tax management.'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417519/IMG_2547_deej97.jpg',
      category: 'professional service',
      title: 'Checkmate Challenge',
      description: 'Strategic thinking and sportsmanship at the annual chess tourney.'
    },
    {
      id: 7,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755327320/IMG_2688_vkdcns.jpg',
      category: 'club service',
      title: 'Mattai Pandhu',
      description: 'Building sports fellowship through community cricket matches.'
    },
    {
      id: 8,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760281257/PHOTO-2025-09-28-09-55-14_wodjhp.jpg',
      category: 'club service',
      title: 'Tharangam 3.0',
      description: 'Vibrant Onam celebrations filled with tradition and unity.'
    },
    {
      id: 9,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761841757/IMG_20250831_141950_ymbxjs.jpg',
      category: 'club service',
      title: 'Shuffle and Roll',
      description: 'An evening of fun, games, and member engagement.'
    },
    {
      id: 10,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761841998/IMG_20250916_115541_rftji2.jpg',
      category: 'club service',
      title: 'Verum Pen Illa',
      description: 'A special initiative focused on women empowerment and health.'
    },
    {
      id: 11,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761842038/Screenshot_2025-09-29-22-04-09-91_6012fa4d4ddec268fc5c7112cbb265e7_o0kocj.jpg',
      category: 'club service',
      title: 'Charity Drive',
      description: 'Mobilizing resources to support local community projects.'
    },
    {
      id: 12,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760283874/IMG_5440_any3nm.jpg',
      category: 'club service',
      title: 'Navrang',
      description: 'A colorful celebration of Navratri and cultural diversity.'
    },
    {
      id: 13,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761842489/IMG-20250927-WA0100_zlndtq.jpg',
      category: 'professional service',
      title: 'Rac-a-thon',
      description: 'Harnessing innovation through our flagship 24-hour hackathon.'
    },
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ── HERO SECTION ── */}
      <section className="gallery-hero">
        <div className="gallery-hero-overlay" />
        <div className="gallery-hero-content">
          <span className="gallery-eyebrow">Visual Journey</span>
          <h1 className="gallery-title">
            Our <span className="gallery-accent">Gallery</span>
          </h1>
          <p className="gallery-sub">
            Capturing the essence of service, the spirit of leadership, and the bonds of fellowship that define our club.
          </p>
        </div>
        {/* decorative blobs */}
        <div className="gallery-blob-1" />
        <div className="gallery-blob-2" />
      </section>

      {/* ── FILTER SECTION ── */}
      <section className="gallery-filter-bar">
        <div className="gallery-filter-container">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`gallery-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── GALLERY GRID ── */}
      <section className="gallery-grid-section">
        <div className="gallery-container">
          {filteredItems.length > 0 ? (
            <div className="gallery-mosaic">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item-wrap"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="gallery-card">
                    <img src={item.src} alt={item.title} className="gallery-img" />
                    <div className="gallery-overlay">
                      <div className="gallery-info">
                        <span className="gallery-cat">{item.category}</span>
                        <h3 className="gallery-item-title">{item.title}</h3>
                        <p className="gallery-item-desc">{item.description}</p>
                      </div>
                      <div className="gallery-expand-icon">
                        <Maximize2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <Filter className="h-12 w-12 text-[#800000] opacity-20 mb-4" />
              <h3>No moments found</h3>
              <p>Try exploring another service avenue.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL ── */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="gallery-modal-content">
          <div className="gallery-modal-inner">
            <button className="gallery-modal-close" onClick={() => setSelectedItem(null)}>
              <X className="h-6 w-6" />
            </button>
            {selectedItem && (
              <div className="gallery-modal-body">
                <div className="gallery-modal-media">
                  <img src={selectedItem.src} alt={selectedItem.title} />
                </div>
                <div className="gallery-modal-info">
                  <span className="gallery-cat">{selectedItem.category}</span>
                  <h2>{selectedItem.title}</h2>
                  <p>{selectedItem.description}</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        .gallery-hero {
          position: relative; min-height: 50vh; padding: 8rem 1.5rem 6rem;
          display: flex; align-items: center; justify-content: center;
          background: #000; overflow: hidden; text-align: center;
          background-image: url('https://res.cloudinary.com/drmwtmeg3/image/upload/v1755327320/IMG_2688_vkdcns.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .gallery-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%);
          backdrop-filter: blur(2px);
          pointer-events: none;
        }
        .gallery-hero-content { position: relative; z-index: 5; max-width: 800px; }
        .gallery-eyebrow {
          display: block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.3em;
          text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 1rem;
        }
        .gallery-title { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; color: #fff; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
        .gallery-accent {
          background: linear-gradient(90deg, #f5c6c6, #ffffff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .gallery-sub { font-size: 1.1rem; color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto; line-height: 1.6; }

        .gallery-blob-1 { position: absolute; width: 400px; height: 400px; top: -100px; left: -100px; background: rgba(128,0,0,0.2); filter: blur(100px); border-radius: 50%; }
        .gallery-blob-2 { position: absolute; width: 350px; height: 350px; bottom: -50px; right: -50px; background: rgba(200,50,50,0.1); filter: blur(90px); border-radius: 50%; }

        .gallery-filter-bar {
          position: sticky; top: 0; z-index: 40; background: rgba(255,255,255,0.8);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,0,0,0.05); padding: 1rem 0;
        }
        .gallery-filter-container {
          display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin: 0 auto; max-width: 1200px;
        }
        .gallery-filter-btn {
          padding: 0.6rem 1.4rem; font-size: 0.75rem; font-weight: 600; border-radius: 100px;
          border: 1px solid rgba(0,0,0,0.08); background: #fff; color: #4b5563;
          transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .gallery-filter-btn:hover { background: #f9fafb; border-color: #800000; color: #800000; }
        .gallery-filter-btn.active { background: #800000; color: #fff; border-color: #800000; box-shadow: 0 4px 12px rgba(128,0,0,0.2); }

        .gallery-grid-section { padding: 4rem 1.5rem; }
        .gallery-container { max-width: 1400px; margin: 0 auto; }
        .gallery-mosaic {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .gallery-item-wrap { cursor: pointer; perspective: 1000px; }
        .gallery-card {
          position: relative; aspect-ratio: 4/5; border-radius: 20px; overflow: hidden;
          background: #eee; box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-item-wrap:hover .gallery-card { transform: scale(1.02) translateY(-8px); shadow: 0 20px 40px rgba(0,0,0,0.15); }
        .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
        .gallery-item-wrap:hover .gallery-img { transform: scale(1.1); }

        .gallery-overlay {
          position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,0,0,0.92) 0%, rgba(15,0,0,0.4) 40%, transparent 70%);
          opacity: 0; transition: all 0.4s ease; display: flex; align-items: flex-end; padding: 2rem;
        }
        .gallery-item-wrap:hover .gallery-overlay { opacity: 1; }
        .gallery-info { transform: translateY(20px); transition: transform 0.4s ease 0.1s; }
        .gallery-item-wrap:hover .gallery-info { transform: translateY(0); }
        .gallery-cat {
          display: block; font-size: 0.6rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.15em; color: #fca5a5; margin-bottom: 0.5rem;
        }
        .gallery-item-title { font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .gallery-item-title::after { content: ' →'; opacity: 0; transition: opacity 0.3s ease; }
        .gallery-item-wrap:hover .gallery-item-title::after { opacity: 1; }
        .gallery-item-desc { font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.5; }
        .gallery-expand-icon {
          position: absolute; top: 1.5rem; right: 1.5rem; width: 40px; height: 40px;
          background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.8); transition: all 0.3s ease;
        }
        .gallery-item-wrap:hover .gallery-expand-icon { opacity: 1; transform: scale(1); }

        .gallery-empty { text-align: center; padding: 6rem 0; width: 100%; }
        .gallery-empty h3 { font-size: 1.5rem; color: #111; margin-bottom: 0.5rem; }
        .gallery-empty p { color: #6b7280; }

        .gallery-modal-content { max-width: 95vw !important; width: 1100px !important; padding: 0 !important; background: transparent !important; border: none !important; box-shadow: none !important; }
        .gallery-modal-inner { position: relative; background: #fff; border-radius: 30px; overflow: hidden; display: flex; flex-direction: column; }
        .gallery-modal-close {
          position: absolute; top: 1.5rem; right: 1.5rem; z-index: 100; width: 44px; height: 44px;
          background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: #111; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: all 0.2s;
        }
        .gallery-modal-close:hover { transform: rotate(90deg); color: #800000; }
        .gallery-modal-body { display: flex; flex-direction: row; height: 80vh; }
        .gallery-modal-media { flex: 1.7; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .gallery-modal-media img { width: 100%; height: 100%; object-fit: contain; }
        .gallery-modal-info { flex: 1; padding: 4rem 3rem; display: flex; flex-direction: column; justify-content: center; background: #fff; }
        .gallery-modal-info h2 { font-size: 2.25rem; font-weight: 900; color: #111; margin: 1rem 0 1.5rem; line-height: 1.1; }
        .gallery-modal-info p { font-size: 1.1rem; color: #4b5563; line-height: 1.7; }

        @media (max-width: 991px) {
          .gallery-modal-body { flex-direction: column; height: auto; max-height: 90vh; overflow-y: auto; }
          .gallery-modal-media { height: 50vh; }
          .gallery-modal-info { padding: 2.5rem 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;