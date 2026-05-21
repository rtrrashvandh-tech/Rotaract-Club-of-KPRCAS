import { useEffect } from 'react';
import { User, GraduationCap, Building, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion } from 'framer-motion';

const JoinUs = () => {
  useEffect(() => {
    document.title = 'Join Rotaract Club of KPRCAS | Membership Information';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Learn how to join the Rotaract Club of KPRCAS. Leadership, community service, and professional growth opportunities.');
  }, []);

  const benefits = [
    {
      icon: GraduationCap,
      title: 'Leadership Development',
      description: 'Develop essential leadership skills through hands-on experience and mentorship opportunities.'
    },
    {
      icon: User,
      title: 'Personal Growth',
      description: 'Build confidence, communication skills, and expand your comfort zone through diverse experiences.'
    },
    {
      icon: Building,
      title: 'Professional Networking',
      description: 'Connect with like-minded individuals, professionals, and alumni in various industries.'
    },
    {
      icon: CheckCircle,
      title: 'Community Impact',
      description: 'Make a meaningful difference in your community through impactful service projects.'
    }
  ];

  const requirements = [
    'Be a current student at KPRCAS',
    'Maintain good academic standing',
    'Commit to regular meeting attendance',
    'Participate in at least 2 service projects per semester',
    'Pay annual membership dues',
    'Uphold Rotaract values and ethics'
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-maroon selection:text-white pt-24 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-maroon/20 rounded-full blur-[100px] pointer-events-none animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[130px] pointer-events-none animate-pulse z-0" style={{ animationDelay: '2s' }} />
      
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80000008_1px,transparent_1px),linear-gradient(to_bottom,#80000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 z-10">
        <div className="container-custom px-4">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-5 py-2 mb-6 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gold">
                  Shape Your Future
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none">
                Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-600 to-gold">Our Legacy</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                Become part of a vibrant community of young leaders dedicated to 
                service, fellowship, and personal development.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-12 md:py-16 z-10">
        <div className="container-custom px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
              Why Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon to-gold">Rotaract?</span>
            </h2>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <AnimationWrapper key={benefit.title} delay={index * 100} animation="bounce-in">
                <Card className="group h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(212,175,55,0.1)] transition-all duration-500 rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8 text-center flex flex-col items-center h-full">
                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-maroon to-maroon-light rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(128,0,0,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:border-gold/40 transition-all duration-500">
                      <benefit.icon className="h-8 w-8 text-white group-hover:text-gold transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gold transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Call to Action Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent to-black/90 z-10">
        <div className="container-custom max-w-4xl px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimationWrapper>
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:shadow-[0_15px_30px_rgba(128,0,0,0.1)] hover:border-white/20 transition-all duration-500 h-full">
                <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                  Membership Requirements
                </h3>
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3 group">
                      <div className="bg-gold/10 rounded-full p-1 border border-gold/30 group-hover:bg-gold/20 transition-all duration-300 flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-gold" />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimationWrapper>

            <AnimationWrapper delay={200}>
              <Card className="relative overflow-hidden bg-gradient-to-br from-maroon/80 to-black backdrop-blur-md border border-gold/20 rounded-[2rem] p-8 hover:border-gold/40 hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] transition-all duration-500 h-full flex flex-col justify-between">
                {/* Visual backglow internal */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex-grow z-10">
                  <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest uppercase bg-gold/10 border border-gold/20 rounded-full text-gold">
                    Take Action
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4">Interested in Joining?</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-8">
                    If you're interested in becoming a member or have any questions about our club, 
                    feel free to reach out to us. We'd love to welcome you to our next meeting!
                  </p>
                </div>
                
                <div className="z-10 mt-auto">
                  <Button 
                    variant="outline" 
                    className="w-full inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-gold/40 text-gold bg-gold/5 backdrop-blur-sm hover:text-black hover:bg-gold hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Contact Us
                  </Button>
                </div>
              </Card>
            </AnimationWrapper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;