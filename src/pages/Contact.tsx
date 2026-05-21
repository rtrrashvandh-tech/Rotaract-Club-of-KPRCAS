import { useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion } from 'framer-motion';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Rotaract Club of KPRCAS | Get In Touch';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Get in touch with the Rotaract Club of KPRCAS. Feel free to contact us with any questions or comments.');
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'rac@kprcas.ac.in',
      link: 'mailto:rac@kprcas.ac.in'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 9629009396',
      link: 'tel:+91 9629009396'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'KPR College of Arts Science and Research, Arasur, Coimbatore - 641407',
      link: 'https://www.google.com/maps/place/KPR+College+of+Arts+Science+and+Research/@11.0805985,77.1329603,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba8ff39cc24b9ab:0x2ae19c385129a1b5!8m2!3d11.0805985!4d77.1355352!16s%2Fg%2F11h7s08zt4?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/rac_kprcas',
      color: 'hover:text-gold hover:border-gold/40 hover:bg-gold/5'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/rotaract-club-of-kprcas/',
      color: 'hover:text-gold hover:border-gold/40 hover:bg-gold/5'
    },
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
                  Get in Touch
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-red-600 to-gold">Us</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                Have any questions, suggestions, or want to learn more about our club activities and membership? We'd love to hear from you.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="relative py-8 md:py-12 z-10">
        <div className="container-custom px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <AnimationWrapper key={info.title} delay={index * 150} animation="bounce-in">
                <Card className="group h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(212,175,55,0.1)] transition-all duration-500 rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8 text-center flex flex-col items-center h-full">
                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-maroon to-maroon-light rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(128,0,0,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:border-gold/40 transition-all duration-500">
                      <info.icon className="h-8 w-8 text-white group-hover:text-gold transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gold transition-colors duration-300">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-gray-400 group-hover:text-gold transition-colors duration-300 leading-relaxed text-center block max-w-xs break-words px-2"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-400 leading-relaxed text-center">
                        {info.content}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Map, Socials, & Office Hours */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent to-black/90 z-10">
        <div className="container-custom max-w-5xl px-4 mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Map Frame (Left on large screen) */}
            <div className="lg:col-span-7 h-full">
              <AnimationWrapper delay={150}>
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden p-2 hover:border-maroon/30 hover:shadow-[0_15px_30px_rgba(128,0,0,0.1)] transition-all duration-500 h-full min-h-[350px]">
                  <div className="h-[350px] rounded-[1.8rem] overflow-hidden relative border border-white/5">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.7890123456789!2d77.0123456789!3d11.0123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKPR%20College%20of%20Arts%20Science%20and%20Research!5e0!3m2!1sen!2sin!4v1234567890123"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="KPR College Location"
                    />
                  </div>
                </Card>
              </AnimationWrapper>
            </div>

            {/* Socials & Hours (Right on large screen) */}
            <div className="lg:col-span-5 space-y-8">
              <AnimationWrapper delay={300}>
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:border-white/20 hover:shadow-[0_15px_30px_rgba(128,0,0,0.1)] transition-all duration-500">
                  <h3 className="text-xl font-bold text-white mb-2">Follow Us</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Stay connected with us on social media for the latest updates, highlights, and events.
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <AnimationWrapper key={social.name} delay={index * 100} animation="zoom-in">
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-4 rounded-full border border-white/10 text-white transition-all duration-300 flex items-center justify-center ${social.color} hover:scale-110 active:scale-95`}
                        >
                          <social.icon className="h-6 w-6" />
                        </a>
                      </AnimationWrapper>
                    ))}
                  </div>
                </Card>
              </AnimationWrapper>

              <AnimationWrapper delay={450}>
                <Card className="relative overflow-hidden bg-gradient-to-br from-maroon/80 to-black backdrop-blur-md border border-gold/20 rounded-[2rem] p-8 hover:border-gold/40 hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] transition-all duration-500 text-white">
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/10 rounded-full blur-xl pointer-events-none" />
                  <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-3">Office Hours</h3>
                  <div className="space-y-3 text-sm font-light text-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">Monday - Friday:</span>
                      <span>10:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">Saturday:</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">Sunday:</span>
                      <span className="text-gold font-medium">Closed</span>
                    </div>
                  </div>
                </Card>
              </AnimationWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 md:py-24 bg-black z-10">
        <div className="container-custom px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon to-gold">Questions</span>
            </h2>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <AnimationWrapper delay={100} animation="slide-in-left">
              <Card className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/20 hover:shadow-[0_10px_25px_rgba(128,0,0,0.1)] rounded-2xl p-6 transition-all duration-500 h-full">
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">How can I join the club?</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    Contact us directly through our social media channels or email us at rac@kprcas.ac.in 
                    to express your interest in joining our club. We'll guide you through the process.
                  </p>
                </CardContent>
              </Card>
            </AnimationWrapper>

            <AnimationWrapper delay={200} animation="slide-in-right">
              <Card className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/20 hover:shadow-[0_10px_25px_rgba(128,0,0,0.1)] rounded-2xl p-6 transition-all duration-500 h-full">
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">What activities do you offer?</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    We offer various community service projects, leadership development programs, professional workshops, 
                    and social networking events throughout the year.
                  </p>
                </CardContent>
              </Card>
            </AnimationWrapper>

            <AnimationWrapper delay={300} animation="slide-in-left">
              <Card className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/20 hover:shadow-[0_10px_25px_rgba(128,0,0,0.1)] rounded-2xl p-6 transition-all duration-500 h-full">
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">Is there a membership fee?</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    Yes, there's a nominal annual membership fee that covers club activities, project materials, 
                    and Rotary International registration/administration dues.
                  </p>
                </CardContent>
              </Card>
            </AnimationWrapper>

            <AnimationWrapper delay={400} animation="slide-in-right">
              <Card className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/20 hover:shadow-[0_10px_25px_rgba(128,0,0,0.1)] rounded-2xl p-6 transition-all duration-500 h-full">
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">Can I participate without joining?</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    You can attend our open public events and volunteer for some of our large-scale service projects, 
                    but complete leadership roles, certification, and official voting rights require full membership.
                  </p>
                </CardContent>
              </Card>
            </AnimationWrapper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;