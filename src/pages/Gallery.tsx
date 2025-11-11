import { useState } from 'react';
import { Filter, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AnimationWrapper from '@/components/AnimationWrapper';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<{src: string; type: string} | null>(null);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'club service', label: 'Club Service' },
    { id: 'community', label: 'Community Service' },
    { id: 'professional service', label: 'Professional Service' },
    { id: 'international service', label: 'International Service' },
    { id: 'district priority projects', label: 'District Priority Projects' },
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
      description: 'Swap and Serve an initiative to build a community'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755331800/IMG-20250727-WA0011_1_avnbqn.jpg',
      category: 'district priority projects',
      title: 'Plates of Joy',
      description: 'Serving with full hearted'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417179/WhatsApp_Image_2025-07-20_at_19.16.57_99f3161a_xktitp.jpg',
      category: 'professional service',
      title: 'Skill up Summit',
      description: 'Skill up summit-Motivational session'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417387/WhatsApp_Image_2025-07-21_at_23.31.20_ca301d31_yh4q7o.jpg',
      category: 'professional service',
      title: 'Income tax Insights',
      description: 'Income tax Insights'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755417519/IMG_2547_deej97.jpg',
      category: 'professional service',
      title: 'Checkmate-Challenge',
      description: 'Checkmate-Challenge'
    },
    {
      id: 7,
      type: 'image',
      src: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755327320/IMG_2688_vkdcns.jpg',
      category: 'club service',
      title: 'Mattai Pandhu',
      description: 'Mattai Pandhu an initiative to build a community'
    },
    {
      id: 8,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760281257/PHOTO-2025-09-28-09-55-14_wodjhp.jpg',
      category: 'club service',
      title: 'Tharagam',
      description: 'The Rotaract Club of KPRCAS proudly celebrated Onam under Tharangam 3.0.'
    },
    {
      id: 9,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761841757/IMG_20250831_141950_ymbxjs.jpg',
      category: 'club service',
      title: 'Shuffle and roll',
      description: 'Shuffle and roll an initiative to build a community'
    },
    {
      id: 10,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761841998/IMG_20250916_115541_rftji2.jpg',
      category: 'club service',
      title:'Verum pen illa',
      description: 'Verum pen illa an initiative to empower the womens'
    },
    {
      id: 11,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761842038/Screenshot_2025-09-29-22-04-09-91_6012fa4d4ddec268fc5c7112cbb265e7_o0kocj.jpg',
      category: 'club service',
      title:'Charity drive',
      description: 'Charity drive an initiative to raise funds for the needy'
    },
    {
      id: 12,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1760283874/IMG_5440_any3nm.jpg',
      category: 'club service',
      title:'Navrang',
      description: 'Navrang is an event celebrating Navratri with vibrant traditions'
    },
    {
      id: 13,
      type: 'image',
      src: 'https://res.cloudinary.com/dmwvo0u6p/image/upload/v1761842489/IMG-20250927-WA0100_zlndtq.jpg',
      category: 'professional service',
      title:'Rac-a-thon',
      description: 'Rac-a-thon is a 24-hour hackathon event'
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-primary">Gallery</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Capturing moments of service, leadership, and fellowship throughout our journey.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((filter, index) => (
                <AnimationWrapper key={filter.id} delay={index * 50} animation="zoom-in">
                  <Button
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`transition-all duration-300 hover-scale ${
                      activeFilter === filter.id ? 'bg-primary text-white' : 'hover:bg-primary/10'
                    }`}
                  >
                    {filter.label}
                  </Button>
                </AnimationWrapper>
              ))}
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <AnimationWrapper key={item.id} delay={index * 100} animation="bounce-in">
                  <div 
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 hover-lift"
                    onClick={() => setSelectedItem({src: item.src, type: item.type})}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover-scale transition-transform duration-300">
                            <Play className="h-8 w-8 text-white ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm opacity-90">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          ) : (
            <AnimationWrapper>
              <div className="text-center py-12">
                <Filter className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground">Try selecting a different category to view more content.</p>
              </div>
            </AnimationWrapper>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          <div className="relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            {selectedItem && (
              <div className="w-full h-[80vh] flex items-center justify-center bg-black">
                {selectedItem.type === 'video' ? (
                  <video 
                    src={selectedItem.src} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem.src}
                    alt="Gallery item"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;