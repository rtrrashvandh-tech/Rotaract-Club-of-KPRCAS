import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimationWrapper from '@/components/AnimationWrapper';

const Contact = () => {
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
      link:'https://www.google.com/maps/place/KPR+College+of+Arts+Science+and+Research/@11.0805985,77.1329603,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba8ff39cc24b9ab:0x2ae19c385129a1b5!8m2!3d11.0805985!4d77.1355352!16s%2Fg%2F11h7s08zt4?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/rac_kprcas',
      color: 'hover:text-pink-600'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/rotaract-club-of-kprcas/',
      color: 'hover:text-blue-600'
    },
  ];



  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get in touch with us for any questions, suggestions, or to learn more 
                about our club activities and membership opportunities.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <AnimationWrapper key={info.title} delay={index * 150} animation="bounce-in">
                <Card className="card-hover text-center bg-white border-none shadow-soft h-full hover-lift">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center hover-scale transition-transform duration-300">
                      <info.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors leading-relaxed hover-scale"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed">
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

      {/* Contact Form & Map */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-1 gap-12">
            {/* Map and Additional Info */}
            <AnimationWrapper delay={300} animation="slide-in-right">
              <div className="space-y-6">
                {/* Google Maps Embed */}
                <Card className="bg-white border-none shadow-soft overflow-hidden">
                  <div className="h-64 md:h-80">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.7890123456789!2d77.0123456789!3d11.0123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKPR%20College%20of%20Arts%20Science%20and%20Research!5e0!3m2!1sen!2sin!4v1234567890123"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="KPR College Location"
                    />
                  </div>
                </Card>

                {/* Social Media */}
                <Card className="bg-white border-none shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-xl">Follow Us</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      Stay connected with us on social media for the latest updates and events.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <AnimationWrapper key={social.name} delay={index * 100} animation="zoom-in">
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-3 rounded-full transition-all duration-300 ${social.color} hover:scale-110 hover-rotate hover:bg-secondary/30`}
                          >
                            <social.icon className="h-6 w-6" />
                          </a>
                        </AnimationWrapper>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card className="bg-gradient-to-br from-primary to-primary-light text-white border-none">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                    <div className="space-y-2 text-sm opacity-90">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>10:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimationWrapper delay={200} animation="slide-in-left">
              <Card className="bg-white border-none shadow-soft hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">How can I join the club?</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact us directly through our social media channels or email us at rac@kprcas.ac.in 
                    to express your interest in joining our club.
                  </p>
                </CardContent>
              </Card>
            </AnimationWrapper>

            <AnimationWrapper delay={300} animation="slide-in-right">
              <Card className="bg-white border-none shadow-soft hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">What activities do you offer?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer various community service projects, leadership development programs, 
                    and social events throughout the year.
                  </p>
                </CardContent>
              </Card>
            </AnimationWrapper>

            <AnimationWrapper delay={400} animation="slide-in-left">
              <Card className="bg-white border-none shadow-soft hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Is there a membership fee?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, there's a nominal annual membership fee that covers club activities, 
                    materials, and Rotary International registration.
                  </p>
                </CardContent>
              </Card>
            </AnimationWrapper>

            <AnimationWrapper delay={500} animation="slide-in-right">
              <Card className="bg-white border-none shadow-soft hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Can I participate without joining?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can attend our public events and volunteer for some projects, 
                    but full participation requires membership.
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